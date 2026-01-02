import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession, hasPermission } from '@/lib/auth';

export async function GET(req: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const cards = await prisma.businessCard.findMany({
        where: { companyId: session.user.companyId },
        include: { ledgerAccount: true }
    });

    return NextResponse.json({ cards });
}

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // Permission: 'company.edit' (Owner) or finance role?
        // Let's restrict to Owner for now as it affects COA.
        const canEdit = await hasPermission(session.user.id, 'company.edit');
        if (!canEdit) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

        const body = await req.json();
        const {
            name, type, // 'CREDIT' | 'DEBIT'
            issuingBank, last4Digits, creditLimit,
            statementCycleDay, paymentDueDays,
            existingAccountId // Optional: Link to existing account (for Debit)
        } = body;

        // Transaction to create Card + Account (if needed)
        const result = await prisma.$transaction(async (tx) => {
            let ledgerAccountId = existingAccountId;

            // 1. If Credit Card, usually create a NEW Liability Account
            // If Debit Card, user MIGHT select existing Bank Account, OR create new.
            if (!ledgerAccountId) {
                // Create Account
                const accountName = `${issuingBank} ${type === 'CREDIT' ? 'Credit' : 'Debit'} - ${last4Digits}`;
                const accountCode = `CARD-${Date.now().toString().slice(-6)}`;

                const newAcc = await tx.account.create({
                    data: {
                        companyId: session.user.companyId,
                        name: accountName,
                        code: accountCode,
                        type: type === 'CREDIT' ? 'CREDIT_CARD' : 'BANK',
                        category: type === 'CREDIT' ? 'LIABILITY' : 'ASSET',
                        // Link to all branches by default? Or Main?
                        linkedBranchIds: [],
                        balance: body.openingBalance ? parseFloat(body.openingBalance) : 0
                    }
                });
                ledgerAccountId = newAcc.id;

                // Create Opening Balance Transaction if needed
                if (body.openingBalance && parseFloat(body.openingBalance) > 0) {
                    await tx.transaction.create({
                        data: {
                            companyId: session.user.companyId,
                            type: 'OPENING_BALANCE',
                            total: parseFloat(body.openingBalance),
                            status: 'PAID',
                            cardId: newAcc.id, // Using cardId field which links to Account
                            details: `Opening Balance for ${name}`,
                            paymentMethod: 'CASH', // Placeholder
                            date: new Date()
                        }
                    });
                }
            }

            // 2. Create Card
            const card = await tx.businessCard.create({
                data: {
                    companyId: session.user.companyId,
                    name,
                    type,
                    issuingBank,
                    last4Digits,
                    creditLimit: type === 'CREDIT' ? (creditLimit || 0) : null,
                    statementCycleDay: type === 'CREDIT' ? statementCycleDay : null,
                    paymentDueDays: type === 'CREDIT' ? paymentDueDays : null,
                    ledgerAccountId
                }
            });

            return card;
        });

        return NextResponse.json({ card: result });

    } catch (error) {
        console.error("Create Card Error:", error);
        return NextResponse.json({ error: "Failed to create card" }, { status: 500 });
    }
}
