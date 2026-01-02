import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from "@/lib/auth";
import { enforcePeriodLock, LockType, enforceDailyLock } from "@/lib/financial-periods";
import { createJournalEntry, getAccountByCode } from "@/lib/accounting-service";
import { JournalEntryType } from '@/generated/client_v2';
import { Decimal } from "@prisma/client/runtime/library";
import { getDataFilter } from '@/lib/authorization';

export async function GET(req: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const vendorId = searchParams.get('vendorId');

        const vouchers = await prisma.voucher.findMany({
            where: {
                ...getDataFilter(session),
                ...(vendorId ? { vendorId } : {}),
                ...(searchParams.get('type') ? { type: searchParams.get('type') as any } : {})
            },
            include: {
                vendor: true,
                items: { include: { category: { include: { ledgerAccount: true } } } },
                payments: true,
                enteredBy: true
            },
            orderBy: { date: 'desc' }
        });

        return NextResponse.json(vouchers);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to fetch vouchers" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();

        // Handle payload structure: { header, items } vs flat body
        const header = body.header || body;
        const items = body.items || [];

        const {
            date,
            vendorId, // Keeps holding the ID, but for Receipt it's PartnerId
            vendorName,
            description,
            // items, // Items are now separate
            paymentMethod,
            bankAccountId,
            type // 'PAYMENT' | 'RECEIPT'
        } = header;

        const voucherType = type || 'PAYMENT';
        const isReceipt = voucherType === 'RECEIPT';
        const dAccountId = bankAccountId || header.accountId; // Handle both key names (header.accountId is sent by frontend)
        const dPaidAmount = new Decimal(header.paidAmount || 0);

        // 🔒 ENFORCE PERIOD LOCK
        await enforcePeriodLock(
            session.user.companyId,
            new Date(date),
            LockType.ACCOUNTING,
            "create voucher"
        );

        await enforceDailyLock(
            session.user.companyId,
            header.branchId || session.user.branchId || undefined,
            new Date(date || new Date()),
            "create voucher"
        );

        // Validations
        if (isReceipt) {
            if (!vendorId) {
                return NextResponse.json({ error: "Customer must be selected for Receipt" }, { status: 400 });
            }
        } else {
            if (!items || items.length === 0) {
                return NextResponse.json({ error: "Expense Voucher must have items" }, { status: 400 });
            }
            if (!vendorId && !vendorName) {
                return NextResponse.json({ error: "Vendor is required" }, { status: 400 });
            }
        }

        // Account Validation: Required ONLY if there is a paid amount
        if (dPaidAmount.greaterThan(0) && !dAccountId) {
            return NextResponse.json({ error: isReceipt ? "Deposit Account is required" : "Payment Account is required" }, { status: 400 });
        }

        // --- PRE-TRANSACTION: Ensure Default Accounts Exist and Bulk Fetch ---

        let officeExpenseId = "";
        let accountsPayableId = "";
        let customerAdvanceId = "";

        // 1. Ensure System Accounts Exist (Idempotent checks)
        if (!isReceipt) {
            // Office Expenses (5140)
            const defaultExpAcc = await prisma.account.findUnique({
                where: { companyId_code: { companyId: session.user.companyId, code: "5140" } }
            });
            if (defaultExpAcc) {
                officeExpenseId = defaultExpAcc.id;
            } else {
                const newAcc = await prisma.account.create({
                    data: {
                        companyId: session.user.companyId,
                        code: "5140",
                        name: "Office Expenses",
                        category: "EXPENSE",
                        type: "CASH",
                        isSystem: true,
                        isPostable: true
                    }
                });
                officeExpenseId = newAcc.id;
            }

            // Accounts Payable (2050)
            const apAcc = await prisma.account.findUnique({
                where: { companyId_code: { companyId: session.user.companyId, code: "2050" } }
            });
            if (apAcc) {
                accountsPayableId = apAcc.id;
            } else {
                const parentAp = await prisma.account.findUnique({ where: { companyId_code: { companyId: session.user.companyId, code: "2000" } } });
                const newAp = await prisma.account.create({
                    data: {
                        companyId: session.user.companyId,
                        code: "2050",
                        name: "Accounts Payable",
                        category: "LIABILITY",
                        type: "CASH",
                        isSystem: true,
                        isPostable: true,
                        parentAccountId: parentAp?.id
                    }
                });
                accountsPayableId = newAp.id;
            }

        } else {
            // Customer Advances (2010)
            const advAcc = await prisma.account.findUnique({
                where: { companyId_code: { companyId: session.user.companyId, code: "2010" } }
            });
            if (advAcc) {
                customerAdvanceId = advAcc.id;
            } else {
                const newAdv = await prisma.account.create({
                    data: {
                        companyId: session.user.companyId,
                        code: "2010",
                        name: "Customer Advances",
                        category: "LIABILITY",
                        type: "CASH",
                        isSystem: true,
                        isPostable: true
                    }
                });
                customerAdvanceId = newAdv.id;
            }
        }

        // 2. Bulk Fetch Expense Categories (if Payment)
        const categoryMap = new Map<string, any>();
        if (!isReceipt && items.length > 0) {
            const categoryIds = items.map((i: any) => i.categoryId).filter((id: string) => id);
            const categories = await prisma.expenseCategory.findMany({
                where: { id: { in: categoryIds } }
            });
            categories.forEach(c => categoryMap.set(c.id, c));
        }

        // Generate Voucher Number
        const lastVoucher = await prisma.voucher.findFirst({
            where: {
                companyId: session.user.companyId,
                voucherNo: { startsWith: `VOU-${new Date().getFullYear()}-` }
            },
            orderBy: { voucherNo: 'desc' }
        });
        let nextNum = 1;
        if (lastVoucher && lastVoucher.voucherNo) {
            const parts = lastVoucher.voucherNo.split('-');
            nextNum = parseInt(parts[parts.length - 1]) + 1;
        }
        const voucherNo = `VOU-${new Date().getFullYear()}-${nextNum.toString().padStart(4, '0')}`;

        const result = await prisma.$transaction(async (tx) => {
            // Determine Total Amount
            let totalAmount = new Decimal(0);

            if (isReceipt) {
                totalAmount = dPaidAmount;
            } else {
                // Sum up items (Adjustments are negative items)
                // REMOVED QTY MULTIPLIER AS PER REQUEST. Treat Amount as Total Line Amount.
                totalAmount = items.reduce((sum: Decimal, item: any) => sum.plus(new Decimal(item.amount)), new Decimal(0));
            }

            // Calculate Balance and Status
            const balance = totalAmount.minus(dPaidAmount);
            const status = balance.lessThanOrEqualTo(0) ? 'PAID' : 'OPEN';

            // Create Voucher
            const voucher = await tx.voucher.create({
                data: {
                    companyId: session.user.companyId,
                    branchId: session.user.branchId || undefined,
                    voucherNo,
                    date: new Date(date),
                    vendorId: (!isReceipt && vendorId) ? vendorId : null,
                    vendorName: vendorName,
                    description: description || (isReceipt ? 'Advance Receipt' : 'Expense Voucher'),
                    total: totalAmount,
                    paidAmount: dPaidAmount,
                    balance: balance,
                    status: status,
                    type: isReceipt ? 'RECEIPT' : 'PAYMENT',
                    paymentMethod: paymentMethod || 'CASH',
                    accountId: dPaidAmount.greaterThan(0) ? dAccountId : null,
                    enteredById: session.user.id,
                    billUrl: header.billUrl || null, // NEW FIELD
                    items: {
                        create: !isReceipt ? items.map((item: any) => ({
                            categoryId: item.categoryId,
                            quantity: 1, // Fixed to 1
                            amount: new Decimal(item.amount),
                            description: item.description,
                            vatRate: 0,
                            vatAmount: 0,
                            isVatApplicable: false
                        })) : []
                    }
                }
            });

            // JOURNAL ENTRIES
            const transactions = [];

            if (isReceipt) {
                // 1. Debit Bank/Cash (Asset Increase)
                if (dPaidAmount.greaterThan(0)) {
                    transactions.push({
                        accountId: dAccountId,
                        debit: dPaidAmount,
                        credit: new Decimal(0)
                    });
                }

                // 2. Credit Customer Advance (Liability Increase)
                if (!customerAdvanceId) throw new Error("Account 2010 (Customer Advance) not found");

                transactions.push({
                    accountId: customerAdvanceId,
                    debit: new Decimal(0),
                    credit: totalAmount,
                    partnerId: vendorId // Link to Customer
                });

            } else {
                // EXPENSE VOUCHER with potential Partial Payment

                // 1. Debit Expenses (For each item)
                for (const item of items) {
                    const itemAmount = new Decimal(item.amount);
                    const cat = categoryMap.get(item.categoryId);

                    let expenseAccountId = cat?.ledgerAccountId;
                    if (!expenseAccountId) {
                        expenseAccountId = officeExpenseId; // Fallback to 5140
                    }

                    if (!expenseAccountId) {
                        throw new Error(`Expense Category '${cat?.name || item.categoryId}' is not linked to a ledger account, and default account '5140' could not be found.`);
                    }

                    transactions.push({ accountId: expenseAccountId, debit: itemAmount, credit: new Decimal(0) });
                }

                // 2. Credit Side (Split between Bank/Cash and Accounts Payable)

                // Credit Bank/Cash (If paid amount > 0)
                if (dPaidAmount.greaterThan(0) && dAccountId) {
                    transactions.push({
                        accountId: dAccountId,
                        debit: new Decimal(0),
                        credit: dPaidAmount
                    });
                }

                // Credit Accounts Payable (If balance > 0)
                if (balance.greaterThan(0)) {
                    if (accountsPayableId) {
                        transactions.push({
                            accountId: accountsPayableId,
                            debit: new Decimal(0),
                            credit: balance
                            // partnerId: vendorId -- Cannot link Vendor ID to Partner FK
                        });
                    } else {
                        throw new Error("Critical: Accounts Payable (2050) not found even after pre-check.");
                    }
                }
            }

            // Post Journal
            if (transactions.length > 0) {
                await createJournalEntry({
                    companyId: session.user.companyId,
                    branchId: voucher.branchId || undefined,
                    description: `Voucher ${voucherNo}: ${description || vendorName}`,
                    type: isReceipt ? JournalEntryType.PAYMENT : JournalEntryType.EXPENSE,
                    referenceType: "VOUCHER",
                    referenceId: voucher.id,
                    transactions: transactions as any
                }, tx);
            }
            return voucher;
        }, {
            maxWait: 5000,
            timeout: 15000 // 15s timeout
        });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("Voucher Error:", error);
        return NextResponse.json({ error: error.message || "Failed to create voucher" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { id, paymentAmount, paymentMethod, reference } = body;

        if (!id || !paymentAmount) {
            return NextResponse.json({ error: "ID and Payment Amount are required" }, { status: 400 });
        }

        const amount = new Decimal(paymentAmount);
        if (amount.lte(0)) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        // Generate Receipt No (outside transaction to avoid delays, or use optimistic locking implicitly by table lock if needed)
        // Better to do inside transaction for sequence integrity but keep it fast.

        const result = await prisma.$transaction(async (tx) => {
            const voucher = await tx.voucher.findUnique({ where: { id } });
            if (!voucher || voucher.companyId !== session.user.companyId) {
                throw new Error("Voucher not found");
            }

            // 🔒 ENFORCE PERIOD LOCK (Now)
            await enforcePeriodLock(
                session.user.companyId,
                new Date(),
                LockType.ACCOUNTING,
                "pay voucher"
            );

            // Calc New Balance
            const currentBal = new Decimal(voucher.balance.toString());
            if (amount.gt(currentBal)) {
                // Optional: Allow overpayment? No, usually block.
                throw new Error(`Amount exceeds balance. Due: ${currentBal}`);
            }

            const newPaid = new Decimal(voucher.paidAmount.toString()).plus(amount);
            const newBal = currentBal.minus(amount);
            const newStatus = newBal.lte(0) ? 'PAID' : 'OPEN';

            // Update Voucher
            await tx.voucher.update({
                where: { id },
                data: {
                    paidAmount: newPaid,
                    balance: newBal,
                    status: newStatus
                }
            });

            // Generate Sequential Receipt No
            const prefix = voucher.type === 'RECEIPT' ? 'RCP' : 'PAY';
            const year = new Date().getFullYear();

            const lastPayment = await tx.voucherPayment.findFirst({
                where: {
                    companyId: session.user.companyId,
                    receiptNo: { startsWith: `${prefix}-${year}-` }
                },
                orderBy: { receiptNo: 'desc' }
            });

            let nextNum = 1;
            if (lastPayment && lastPayment.receiptNo) {
                const parts = lastPayment.receiptNo.split('-');
                // Format: PREFIX-YYYY-XXXX
                if (parts.length >= 3) {
                    nextNum = parseInt(parts[parts.length - 1]) + 1;
                }
            }

            const receiptNo = `${prefix}-${year}-${nextNum.toString().padStart(4, '0')}`;

            // Create Payment Record
            const pv = await tx.voucherPayment.create({
                data: {
                    voucherId: id,
                    companyId: session.user.companyId,
                    amount: amount,
                    date: new Date(),
                    paymentMethod: paymentMethod || 'CASH',
                    receiptNo: receiptNo,
                    enteredById: session.user.id
                }
            });

            // JOURNAL ENTRY for Payment
            // Dr Accounts Payable (2050), Cr Cash/Bank
            const apAcc = await getAccountByCode(session.user.companyId, "2050");
            // Determine Credit Account (Cash/Bank)
            const creditAccCode = paymentMethod === 'BANK' || paymentMethod === 'ONLINE' ? '1020' : '1010'; // 1020 Bank, 1010 Cash
            const creditAcc = await getAccountByCode(session.user.companyId, creditAccCode);

            if (apAcc && creditAcc) {
                await createJournalEntry({
                    companyId: session.user.companyId,
                    branchId: voucher.branchId || undefined,
                    description: `Payment for Voucher ${voucher.voucherNo} (Ref: ${receiptNo})`,
                    type: JournalEntryType.PAYMENT,
                    referenceType: "VOUCHER",
                    referenceId: voucher.id,
                    transactions: [
                        {
                            accountId: apAcc.id,
                            debit: amount,
                            credit: 0
                        },
                        {
                            accountId: creditAcc.id,
                            debit: 0,
                            credit: amount
                        }
                    ]
                }, tx);
            }

            return pv;
        }, {
            maxWait: 5000,
            timeout: 20000 // Increased to 20s to prevent 'Transaction already closed'
        });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("Voucher Payment Error:", error);
        return NextResponse.json({ error: error.message || "Failed to record payment" }, { status: 500 });
    }
}
