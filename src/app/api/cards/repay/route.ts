import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { createJournalEntry } from '@/lib/accounting-service';
import { JournalEntryType } from '@/generated/client_v2'; // Ensure this enum is imported

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { cardId, amount, sourceAccountId } = body;

        if (!cardId || !amount || !sourceAccountId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const amt = parseFloat(amount);
        if (isNaN(amt) || amt <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        // 1. Fetch Card and its Ledger Account
        const card = await prisma.businessCard.findUnique({
            where: { id: cardId },
        });

        if (!card) return NextResponse.json({ error: "Card not found" }, { status: 404 });
        if (!card.ledgerAccountId) return NextResponse.json({ error: "Card not linked to an account" }, { status: 400 });

        // 2. Fetch Source Account
        const sourceAccount = await prisma.account.findUnique({
            where: { id: sourceAccountId }
        });
        if (!sourceAccount) return NextResponse.json({ error: "Source account not found" }, { status: 404 });

        // 3. Create Journal Entry using Service
        // This handles double-entry and atomic balance updates correctly.
        // Debit: Card Liability (Reduces Debt => Increases signed balance towards 0)
        // Credit: Source Asset (Reduces Asset => Decreases signed balance)
        const journalEntry = await createJournalEntry({
            companyId: session.user.companyId,
            description: `Repayment for ${card.name}`,
            type: JournalEntryType.PAYMENT,
            postingDate: new Date(),
            transactions: [
                {
                    accountId: card.ledgerAccountId,
                    debit: amt,
                    credit: 0
                },
                {
                    accountId: sourceAccountId,
                    debit: 0,
                    credit: amt
                }
            ]
        });

        return NextResponse.json({ success: true, journalEntryId: journalEntry.id });

    } catch (error: any) {
        console.error("Repayment Error:", error);
        return NextResponse.json({ error: error.message || "Repayment failed" }, { status: 500 });
    }
}
