import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // Correct type for dynamic route params in Next.js 15
) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        const body = await req.json();
        const { name, issuingBank, last4Digits, creditLimit, type } = body;

        // Validation
        if (!name || !issuingBank || !last4Digits) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const result = await prisma.$transaction(async (tx) => {
            // 1. Fetch current card to get ledgerAccountId
            const currentCard = await tx.businessCard.findUnique({
                where: { id },
                include: { ledgerAccount: true }
            });

            if (!currentCard) throw new Error("Card not found");

            // 2. Update Card
            const updatedCard = await tx.businessCard.update({
                where: { id },
                data: {
                    name,
                    issuingBank,
                    last4Digits,
                    creditLimit: type === 'CREDIT' ? parseFloat(creditLimit) : null,
                    // If type changed (rare), we might need more logic, but assume type is static for now or just update it
                    // type: type // Usually we don't change type from Debit to Credit easily without changing Account Type too
                }
            });

            // 3. Update Linked Account Name to match new Card details
            // Format: "Bank Type - Last4" e.g. "ADCB Credit - 1234"
            if (currentCard.ledgerAccountId) {
                const newAccountName = `${issuingBank} ${currentCard.type === 'CREDIT' ? 'Credit' : 'Debit'} - ${last4Digits}`;
                await tx.account.update({
                    where: { id: currentCard.ledgerAccountId },
                    data: { name: newAccountName }
                });
            }

            return updatedCard;
        });

        return NextResponse.json({ card: result });

    } catch (error: any) {
        console.error("Update Card Error:", error);
        return NextResponse.json({ error: error.message || "Failed to update card" }, { status: 500 });
    }
}
