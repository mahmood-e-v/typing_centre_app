import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from "@/lib/auth";
import { enforcePeriodLock, LockType } from "@/lib/financial-periods";
import { createJournalEntry, getAccountByCode } from "@/lib/accounting-service";
import { JournalEntryType } from '@prisma/client';
import { Decimal } from "@prisma/client/runtime/library";

export async function GET() {
    try {
        const expenses = await prisma.expense.findMany({
            orderBy: { date: 'desc' },
            include: { category: true, enteredBy: true }
        });
        return NextResponse.json(expenses);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();

        // 🔒 ENFORCE PERIOD LOCK
        await enforcePeriodLock(
            session.user.companyId,
            new Date(body.date),
            LockType.ACCOUNTING,
            "create expense"
        );

        const amount = new Decimal(body.amount.toString());
        const taxAmount = new Decimal(body.tax?.toString() || "0"); // Assuming tax included or separate input
        const netAmount = amount.minus(taxAmount);

        // 1. Create Expense
        const result = await prisma.$transaction(async (tx) => {
            const expense = await tx.expense.create({
                data: {
                    companyId: session.user.companyId,
                    branchId: body.branchId || session.user.branchId, // Capture Branch ID
                    amount: netAmount, // Use Net Amount for the Expense record if needed, or stick to Total Amount
                    description: body.description,
                    paymentMethod: body.paymentMethod,
                    date: new Date(body.date),
                    categoryId: body.categoryId,
                    enteredById: session.user.id,
                    accountId: body.accountId,
                }
            });

            // ============================================
            // AUTOMATED ACCOUNTING POSTING
            // ============================================

            const transactions = [];

            // 1. Debit Expense Account (by category or generic expense)
            // Ideally category should link to an Account ID. For now using body.categoryId if it matches an Account or getOperatingExpenses
            const expenseAccId = body.expenseAccountId; // Expected from UI or derived
            if (expenseAccId) {
                transactions.push({
                    accountId: expenseAccId,
                    debit: netAmount,
                    credit: 0
                });
            } else {
                // Fallback to generic Operating Expenses sub-account if needed
                const operatingExp = await getAccountByCode(session.user.companyId, "5140"); // Office Expenses
                if (operatingExp) {
                    transactions.push({
                        accountId: operatingExp.id,
                        debit: netAmount,
                        credit: 0
                    });
                }
            }

            // 2. Debit VAT Input (Receivable)
            if (taxAmount.gt(0)) {
                const vatInputAcc = await getAccountByCode(session.user.companyId, "1050");
                if (vatInputAcc) {
                    transactions.push({
                        accountId: vatInputAcc.id,
                        debit: taxAmount,
                        credit: 0
                    });
                }
            }

            // 3. Credit Cash/Bank/CC
            if (body.accountId) {
                transactions.push({
                    accountId: body.accountId,
                    debit: 0,
                    credit: amount
                });
            }

            // Post Journal
            if (transactions.length > 0) {
                await createJournalEntry({
                    companyId: session.user.companyId,
                    branchId: expense.branchId || undefined,
                    description: `Expense: ${body.description}`,
                    type: JournalEntryType.EXPENSE,
                    referenceType: "EXPENSE",
                    referenceId: expense.id,
                    transactions: transactions as any
                });
            }

            return expense;
        });

        return NextResponse.json(result);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message || 'Failed to save expense' }, { status: 500 });
    }
}
