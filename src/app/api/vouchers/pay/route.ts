import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from "@/lib/auth";
import { enforcePeriodLock, LockType, enforceDailyLock } from "@/lib/financial-periods";
import { createJournalEntry, getAccountByCode } from "@/lib/accounting-service";
import { JournalEntryType } from '@prisma/client';
import { Decimal } from "@prisma/client/runtime/library";

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { voucherId, amount, paymentMethod, bankAccountId, date } = body;

        if (!voucherId || !amount || !bankAccountId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 🔒 ENFORCE PERIOD LOCK
        await enforcePeriodLock(
            session.user.companyId,
            new Date(date || new Date()),
            LockType.ACCOUNTING,
            "pay voucher"
        );

        await enforceDailyLock(
            session.user.companyId,
            session.user.branchId || undefined,
            new Date(date || new Date()),
            "pay voucher"
        );

        const result = await prisma.$transaction(async (tx) => {
            const voucher = await tx.voucher.findUnique({
                where: { id: voucherId },
                include: { vendor: true }
            });

            if (!voucher || voucher.companyId !== session.user.companyId) {
                throw new Error("Voucher not found");
            }

            const paymentAmt = new Decimal(amount.toString());
            const newPaidAmount = new Decimal(voucher.paidAmount.toString()).plus(paymentAmt);
            const newBalance = new Decimal(voucher.total.toString()).minus(newPaidAmount);

            if (newBalance.lt(0)) {
                throw new Error("Payment exceeds voucher balance");
            }

            // Generate Receipt No
            const lastPayment = await tx.voucherPayment.findFirst({
                where: {
                    companyId: session.user.companyId,
                    receiptNo: { startsWith: `VRCP-${new Date().getFullYear()}-` }
                },
                orderBy: { receiptNo: 'desc' }
            });

            let nextNum = 1;
            if (lastPayment && lastPayment.receiptNo) {
                const parts = lastPayment.receiptNo.split('-');
                nextNum = parseInt(parts[parts.length - 1]) + 1;
            }
            const receiptNo = `VRCP-${new Date().getFullYear()}-${nextNum.toString().padStart(4, '0')}`;

            // 1. Create Payment Record
            const payment = await tx.voucherPayment.create({
                data: {
                    companyId: session.user.companyId,
                    voucherId,
                    amount: paymentAmt,
                    date: new Date(date || new Date()),
                    paymentMethod,
                    accountId: bankAccountId,
                    receiptNo,
                    enteredById: session.user.id
                }
            });

            // 2. Update Voucher
            await tx.voucher.update({
                where: { id: voucherId },
                data: {
                    paidAmount: newPaidAmount,
                    balance: newBalance,
                    status: newBalance.lte(0) ? 'PAID' : 'OPEN'
                }
            });

            // ============================================
            // AUTOMATED ACCOUNTING POSTING
            // ============================================
            const transactions = [];

            // Debit Accounts Payable (2050)
            const apAccount = await getAccountByCode(session.user.companyId, "2050");
            if (apAccount) {
                transactions.push({
                    accountId: apAccount.id,
                    debit: paymentAmt,
                    credit: new Decimal(0),
                    partnerId: voucher.vendorId || undefined
                });
            }

            // Credit Cash/Bank
            transactions.push({
                accountId: bankAccountId,
                debit: new Decimal(0),
                credit: paymentAmt
            });

            // Post Journal
            await createJournalEntry({
                companyId: session.user.companyId,
                branchId: session.user.branchId || undefined,
                description: `Payment for Voucher ${voucher.voucherNo} (${receiptNo})`,
                type: JournalEntryType.PAYMENT,
                referenceType: "VOUCHER_PAYMENT",
                referenceId: payment.id,
                transactions: transactions as any
            });

            return payment;
        });

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("Voucher Payment Error:", error);
        return NextResponse.json({ error: error.message || "Failed to process payment" }, { status: 500 });
    }
}
