import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { enforcePeriodLock, LockType, enforceDailyLock } from "@/lib/financial-periods";
import {
    createJournalEntry,
    getAccountByCode,
    JournalEntryInput,
    getPartnerBalance,
    initializeCompanyCOA
} from "@/lib/accounting-service";
import { JournalEntryType } from '@prisma/client';
import { Decimal } from "@prisma/client/runtime/library";
import { getDataFilter, enforceBranchIsolation } from '@/lib/authorization';

export async function GET(req: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const partnerId = searchParams.get('partnerId');
    const customerName = searchParams.get('customerName');
    const pending = searchParams.get('pending');

    try {
        if (id) {
            const invoice = await prisma.invoice.findUnique({
                where: { id },
                include: { transactions: { include: { workType: true } } }
            });
            // Ensure company and branch isolation
            if (invoice) {
                if (invoice.companyId !== session.user.companyId) {
                    return NextResponse.json({ error: "Access denied" }, { status: 403 });
                }
                const isBranchAllowed = await enforceBranchIsolation(session, invoice.branchId || undefined);
                if (!isBranchAllowed) {
                    return NextResponse.json({ error: "Access denied - Branch restricted" }, { status: 403 });
                }
            }
            return NextResponse.json(invoice);
        }

        if ((partnerId || customerName) && pending === 'true') {
            const baseWhere: any = {
                ...getDataFilter(session),
                balance: { gt: 0 }
            };

            if (partnerId && customerName) {
                baseWhere.OR = [
                    { customerId: partnerId },
                    { customerName: { contains: customerName, mode: 'insensitive' } }
                ];
            } else if (partnerId) {
                baseWhere.customerId = partnerId;
            } else if (customerName) {
                baseWhere.customerName = { contains: customerName, mode: 'insensitive' };
            }

            const invoices = await prisma.invoice.findMany({
                where: baseWhere,
                orderBy: { date: 'asc' }
            });
            return NextResponse.json(invoices);
        }

        // Default list (limited) if needed or error
        return NextResponse.json({ error: 'ID, PartnerID, or CustomerName required' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { header, items, financials, payment } = body;
        const invoiceDate = new Date(header.date);

        // 🔒 ENFORCE PERIOD LOCK
        await enforcePeriodLock(
            session.user.companyId,
            invoiceDate,
            LockType.ACCOUNTING,
            "create invoice"
        );

        await enforceDailyLock(
            session.user.companyId,
            session.user.branchId || undefined,
            invoiceDate,
            "create invoice"
        );

        // Validation
        if (!header.customerName || items.length === 0) {
            return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
        }

        // 🛠️ SELF-HEALING: Check if Critical Accounts Exist
        const revenueCheck = await getAccountByCode(session.user.companyId, '4010');
        if (!revenueCheck) {
            console.log("⚠️ COA Missing. Initializing Default Chart of Accounts...");
            await initializeCompanyCOA(session.user.companyId);
        }

        const agentId = session.user.id;

        const result = await prisma.$transaction(async (tx) => {
            let finalPartnerId: string | null = null;
            let finalBeneficiaryId: string | null = null;
            const customerType = header.customerType || 'WALKIN';

            // 1.1 Determine Partner based on Type
            if (customerType === 'WALKIN') {
                // Walk-in Validation: Must be fully paid
                if (payment.balance > 0.01) { // Small tolerance
                    throw new Error("Walk-in customers cannot have pending dues. Please register as Individual or Company.");
                }
                finalPartnerId = null; // No partner for Walk-in

            } else if (customerType === 'INDIVIDUAL') {
                if (header.customerId) {
                    // Existing Individual selected
                    finalPartnerId = header.customerId;
                } else {
                    // Auto-create new Individual Partner
                    const newPartner = await tx.partner.create({
                        data: {
                            companyId: session.user.companyId,
                            name: header.customerName,
                            type: 'INDIVIDUAL',
                            phone: header.customerPhone || null,
                            email: header.customerEmail || null
                        }
                    });
                    finalPartnerId = newPartner.id;
                }

            } else if (customerType === 'COMPANY') {
                if (!header.customerId) {
                    throw new Error("Company must be selected for Corporate invoices.");
                }
                finalPartnerId = header.customerId; // This is the Company ID (Partner)
            }

            // Note: finalPartnerId can be null for Walk-ins
            // Validate if partner exists if ID provided (double check)
            if (finalPartnerId) {
                const p = await tx.partner.findUnique({ where: { id: finalPartnerId } });
                if (!p || p.companyId !== session.user.companyId) {
                    throw new Error("Invalid Customer / Partner ID.");
                }
            }

            // 1.2 Handle Beneficiary (Person) - Beneficiaries can be auto-created for speed as they are not accounting entities
            let beneficiary = await tx.beneficiary.findFirst({
                where: { companyId: session.user.companyId, name: header.customerName }
            });

            if (beneficiary) {
                await tx.beneficiary.update({
                    where: { id: beneficiary.id },
                    data: {
                        phone: header.customerPhone || beneficiary.phone,
                        email: header.customerEmail || beneficiary.email,
                        partnerId: finalPartnerId
                    }
                });
            } else {
                beneficiary = await tx.beneficiary.create({
                    data: {
                        companyId: session.user.companyId,
                        name: header.customerName,
                        phone: header.customerPhone,
                        email: header.customerEmail,
                        partnerId: finalPartnerId
                    }
                });
            }
            finalBeneficiaryId = beneficiary.id;

            // 1.3 Invoice No
            // 1.3 Invoice No
            const targetBranchId = header.branchId || session.user.branchId;
            let invNo = "";

            if (targetBranchId) {
                const branch = await tx.branch.findUnique({ where: { id: targetBranchId } });
                if (branch && branch.separateNumbering) {
                    const prefix = branch.invoicePrefix || `INV-${branch.code}-`;
                    invNo = `${prefix}${branch.nextInvoiceNumber.toString().padStart(4, '0')}`;

                    await tx.branch.update({
                        where: { id: branch.id },
                        data: { nextInvoiceNumber: { increment: 1 } }
                    });
                }
            }

            if (!invNo) {
                // Global Sequence Fallback
                const lastInvoice = await tx.invoice.findFirst({
                    where: {
                        companyId: session.user.companyId,
                        invoiceNo: { startsWith: `INV - ${new Date().getFullYear()} -` }
                    },
                    orderBy: { invoiceNo: 'desc' },
                    select: { invoiceNo: true }
                });

                let nextNum = 1;
                if (lastInvoice) {
                    const parts = lastInvoice.invoiceNo.split('-');
                    nextNum = parseInt(parts[parts.length - 1]) + 1;
                }
                invNo = `INV - ${new Date().getFullYear()} -${nextNum.toString().padStart(4, '0')} `;
            }

            // payment already destructured above

            // 1.4 Create Invoice
            const invoice = await tx.invoice.create({
                data: {
                    companyId: session.user.companyId, // Tenant ID
                    branchId: header.branchId || session.user.branchId || undefined,
                    invoiceNo: invNo,
                    date: invoiceDate,
                    customerName: header.customerName,
                    customerPhone: header.customerPhone,
                    customerEmail: header.customerEmail,
                    customerId: finalPartnerId,
                    agentId: agentId,

                    subtotal: payment.subtotal || financials.subtotal,
                    tax: payment.tax || financials.tax,
                    discount: payment.discount || 0,
                    total: payment.total || financials.total,

                    paidAmount: payment.amount || 0,
                    balance: payment.balance || 0,
                    paymentMethod: payment.method || 'CASH',
                    paymentRef: payment.refNumber,
                    bankName: payment.bankName,
                    govtFeeAccountId: payment.govtFeeAccountId || null,
                    govtFeeRef: payment.govtFeeRef || null,

                    status: (payment.balance <= 0 && payment.total > 0) ? 'PAID' : (payment.amount > 0 ? 'PARTIAL' : 'DRAFT')
                }
            });

            // 1.5 Update Partner Liabilities (DELETED - Ledger is truth)
            // 1.6 Update Account Balances (Handled by accounting-service)

            // 2. Transactions
            const allWorkTypes = await tx.workType.findMany({ where: { companyId: session.user.companyId } });

            for (const item of items) {
                const workType = allWorkTypes.find(wt => wt.description === item.service);

                await tx.transaction.create({
                    data: {
                        companyId: session.user.companyId, // Tenant ID
                        branchId: invoice.branchId,
                        invoiceId: invoice.id,
                        date: invoiceDate,
                        enteredById: agentId,
                        partnerId: finalPartnerId,
                        beneficiaryId: finalBeneficiaryId,
                        customerName: header.customerName,
                        applicantName: item.particulars,
                        workTypeId: workType?.id,
                        quantity: item.quantity || 1,
                        type: 'SERVICE',
                        govFee: item.govFee,
                        typingCharge: item.typingCharge || 0,
                        vat: item.tax,
                        vatRate: new Decimal(workType?.vatRate?.toString() || "5"),
                        isVatApplicable: workType?.vatApplicable ?? true,
                        total: item.total,
                        paymentMethod: payment.method || 'CASH',
                        status: 'PAID', // SERVICE lines are considered earned immediately
                        govtFeeAccountId: payment.govtFeeAccountId || null,
                        govtFeeRef: payment.govtFeeRef || null,
                    }
                });
            }

            // 3. Payment Transaction
            if (payment.amount > 0) {
                const lastReceipt = await tx.transaction.findFirst({
                    where: {
                        companyId: session.user.companyId,
                        type: 'PAYMENT',
                        receiptNo: { startsWith: `RCP - ${new Date().getFullYear()} -` }
                    },
                    orderBy: { receiptNo: 'desc' },
                    select: { receiptNo: true }
                });

                let nextRNum = 1;
                if (lastReceipt && lastReceipt.receiptNo) {
                    const parts = lastReceipt.receiptNo.split('-');
                    nextRNum = parseInt(parts[parts.length - 1]) + 1;
                }
                const rNo = `RCP-${new Date().getFullYear()}-${nextRNum.toString().padStart(4, '0')}`;

                await tx.transaction.create({
                    data: {
                        companyId: session.user.companyId, // Tenant ID
                        branchId: invoice.branchId,
                        invoiceId: invoice.id,
                        date: invoiceDate, // Payment date same as invoice for initial payment
                        enteredById: agentId,
                        partnerId: finalPartnerId,
                        customerName: header.customerName,
                        applicantName: `Payment for ${invNo}`,
                        type: 'PAYMENT',
                        receiptNo: rNo,
                        govFee: 0,
                        typingCharge: 0,
                        vat: 0,
                        total: payment.amount,
                        paymentMethod: payment.method || 'CASH',
                        status: 'PAID',
                        details: `Initial Payment for ${invNo}. Method: ${payment.method}${payment.ref ? ` Ref: ${payment.ref}` : ""}`,
                    }
                });

                // ============================================
                // 4. AUTOMATED ACCOUNTING POSTING
                // ============================================

                const transactions = [];

                // 4.1 AR (Accounts Receivable) - Debit full invoice total
                const arAccount = await getAccountByCode(session.user.companyId, "1030");
                // 4.1 Accounts Receivable - Debit Customer
                const totalInvoiceAmount = new Decimal(invoice.total.toString());
                if (arAccount) {
                    transactions.push({
                        accountId: arAccount.id,
                        debit: totalInvoiceAmount,
                        credit: new Decimal(0),
                        partnerId: finalPartnerId // PARTNER DIMENSION CAPTURED
                    });
                }

                // 4.2 Revenue - Credit Service Revenue (Sum of typing charges)
                // 4.2 Revenue - Credit Service Revenue (Sum of typing charges)
                const totalRevenue = items.reduce((sum: number, item: any) => sum + ((parseFloat(item.typingCharge?.toString() || "0")) * (item.quantity || 1)), 0);
                if (totalRevenue > 0) {
                    const revenueAccount = await getAccountByCode(session.user.companyId, "4010");
                    if (!revenueCheck) { // Use the variable we already checked above, or re-fetch if confident
                        // Actually revenueCheck is boolean/object from start of function. 
                        // To be safe and consistent with logic below:
                    }
                    // Wait, we used `revenueCheck` at the top of the file as valid account.
                    // But here we need the ID.
                    const revenueAcc = await getAccountByCode(session.user.companyId, "4010");
                    if (!revenueAcc) throw new Error("Revenue Account (4010) not found. Please contact support.");

                    transactions.push({
                        accountId: revenueAcc.id,
                        debit: new Decimal(0),
                        credit: new Decimal(totalRevenue.toString())
                    });
                }

                // 4.3 VAT - Credit VAT Payable (Output VAT 2200) (Sum of line VAT)
                // item.tax is ALREADY Total for the line from frontend logic (typing * qty * rate)
                const totalVat = items.reduce((sum: number, item: any) => sum + (parseFloat(item.tax?.toString() || "0")), 0);
                if (totalVat > 0) {
                    const vatAccount = await getAccountByCode(session.user.companyId, "2200");
                    if (!vatAccount) throw new Error("VAT Payable Account (2200) not found. Please contact support.");

                    transactions.push({
                        accountId: vatAccount.id,
                        debit: new Decimal(0),
                        credit: new Decimal(totalVat.toString())
                    });
                }

                // 4.4 Govt Fees - Credit Govt Fees Payable (Sum of govt fees)
                const totalGovFee = items.reduce((sum: number, item: any) => sum + ((parseFloat(item.govFee?.toString() || "0")) * (item.quantity || 1)), 0);
                if (totalGovFee > 0) {
                    const govtFeePayableAcc = await getAccountByCode(session.user.companyId, "2020");
                    if (!govtFeePayableAcc) throw new Error("Govt Fee Payable Account (2020) not found. Please contact support.");

                    transactions.push({
                        accountId: govtFeePayableAcc.id,
                        debit: new Decimal(0),
                        credit: new Decimal(totalGovFee.toString())
                    });
                }

                // 4.5 Discount - Debit Expense/Contra-Revenue
                // Failure to record discount debits causes unbalanced journal if AR is Net and Income is Gross.
                // AR (Net) + Discount (Debit) = Income (Gross)
                const discountAmount = new Decimal(payment.discount || 0);

                if (discountAmount.gt(0)) {
                    // We use "5100" (Operating Expenses) as a generic bucket if "Discount" specific account doesn't exist.
                    // Ideally, this should be "Sales Discount" (4xxx Contra Revenue) or "Discount Expense" (5xxx).
                    const discountAcc = await getAccountByCode(session.user.companyId, "5100");

                    if (discountAcc) {
                        transactions.push({
                            accountId: discountAcc.id,
                            debit: discountAmount,
                            credit: new Decimal(0)
                        });
                    } else {
                        // Fallback: If no expense account, we must reduce the Revenue Credit to balance (Net Revenue Request)
                        // But we already pushed the Revenue Credit line above.
                        // So we MUST find an account to Debit. 
                        // Let's try finding ANY Expense account.
                        const anyExpense = await prisma.account.findFirst({
                            where: { companyId: session.user.companyId, category: 'EXPENSE' }
                        });
                        if (anyExpense) {
                            transactions.push({
                                accountId: anyExpense.id,
                                debit: discountAmount,
                                credit: new Decimal(0)
                            });
                        } else {
                            // CRITICAL: If we can't debit anything, the journal will fail.
                            // We should probably throw an error or force create 'Sales Discount'.
                            throw new Error("Cannot process Discount: No Expense account found to Debit.");
                        }
                    }
                }

                if (transactions.length > 0) {
                    await createJournalEntry({
                        companyId: session.user.companyId,
                        branchId: invoice.branchId || undefined,
                        description: `Invoice ${invNo} for ${header.customerName}`,
                        type: JournalEntryType.INVOICE,
                        referenceType: "INVOICE",
                        referenceId: invoice.id,
                        transactions: transactions as any
                    }, tx);
                }

                // 4.5 Handle Payment Posting
                const totalPaidAmount = new Decimal(invoice.paidAmount.toString());

                if (totalPaidAmount.gt(0)) {
                    const paymentTransactions = [];
                    const isWallet = payment.method === 'WALLET';

                    // Determine Debit Account (Source of Funds)
                    // If Wallet: Debit "Customer Advance" (Liability) -> reducing liability = Debit
                    // If Cash/Card: Debit "Cash/Bank" (Asset) -> increasing asset = Debit

                    let debitAccountId = payment.depositToAccountId;

                    if (isWallet) {
                        const advanceAcc = await getAccountByCode(session.user.companyId, "2010");
                        if (!advanceAcc) throw new Error("Customer Advance Account (2010) not found.");
                        debitAccountId = advanceAcc.id;

                        // Validate Partner for Wallet
                        if (!finalPartnerId) throw new Error("Wallet payment requires a registered customer.");
                    } else if (!debitAccountId) {
                        // Fallback for Cash/Card if frontend didn't send ID
                        // Assuming Cash On Hand (1010) or similar default
                        // For now, if not provided, we might fail or try to find default.
                        // Let's try to find '1010' (Cash) as fallback
                        const cashAcc = await getAccountByCode(session.user.companyId, "1010");
                        if (cashAcc) debitAccountId = cashAcc.id;
                    }

                    if (debitAccountId) {
                        // AR Account (to Credit)
                        // Must match the AR account debited in Invoice Journal (1030)
                        const arAccountForPayment = await getAccountByCode(session.user.companyId, "1030");
                        if (!arAccountForPayment) throw new Error("AR Account (1030) not found.");

                        const amountToAR = Decimal.min(totalPaidAmount, totalInvoiceAmount);
                        // Any excess (overpayment) logic could go here, but usually totalPaidAmount <= totalInvoiceAmount

                        // 1. Debit Source (Wallet/Cash/Bank)
                        paymentTransactions.push({
                            accountId: debitAccountId,
                            debit: amountToAR,
                            credit: new Decimal(0),
                            partnerId: isWallet ? finalPartnerId : undefined // Link Partner if Wallet (Liability adjustment)
                        });

                        // 2. Credit AR
                        paymentTransactions.push({
                            accountId: arAccountForPayment.id,
                            debit: new Decimal(0),
                            credit: amountToAR,
                            partnerId: finalPartnerId // Decrease Customer AR
                        });

                        await createJournalEntry({
                            companyId: session.user.companyId,
                            branchId: invoice.branchId || undefined,
                            description: `Payment for Invoice ${invNo} (${payment.method})`,
                            type: JournalEntryType.PAYMENT,
                            referenceType: "TRANSACTION",
                            referenceId: lastReceipt?.receiptNo || "PAYMENT",
                            transactions: paymentTransactions as any
                        }, tx);
                    }
                }


                // 4.5.1 Handle Settlement from Advance
                const settleAmount = new Decimal(payment.settleFromAdvanceAmount || 0);
                if (settleAmount.gt(0)) {
                    // Validate available advance
                    const netBalance = await getPartnerBalance(session.user.companyId, finalPartnerId!, tx);
                    const availableAdvance = netBalance.lt(0) ? netBalance.abs() : new Decimal(0);

                    if (availableAdvance.lt(settleAmount)) {
                        throw new Error(`Insufficient advance balance.Available: ${availableAdvance}, Requested: ${settleAmount} `);
                    }

                    const settlementTransactions = [];
                    const advanceAccount = await getAccountByCode(session.user.companyId, "2010");
                    const arAccount = await getAccountByCode(session.user.companyId, "1030");

                    if (advanceAccount && arAccount) {
                        settlementTransactions.push({
                            accountId: advanceAccount.id,
                            debit: settleAmount,
                            credit: 0,
                            partnerId: finalPartnerId
                        });

                        settlementTransactions.push({
                            accountId: arAccount.id,
                            debit: 0,
                            credit: settleAmount,
                            partnerId: finalPartnerId
                        });

                        await createJournalEntry({
                            companyId: session.user.companyId,
                            branchId: invoice.branchId || undefined,
                            description: `Advance Settle: Invoice ${invNo} `,
                            type: JournalEntryType.ADJUSTMENT,
                            referenceType: "INVOICE",
                            referenceId: invoice.id,
                            transactions: settlementTransactions as any
                        }, tx);
                    }
                }

                // 4.6 Handle Govt Fee CC Flow
                // If paid via Card, we record the liability to the CC and cancel the govt fee payable
                if (payment.govtFeeAccountId && totalGovFee > 0) {
                    const ccAccount = await tx.account.findUnique({ where: { id: payment.govtFeeAccountId } });
                    if (ccAccount && ccAccount.type === 'CREDIT_CARD') {
                        const ccFlowTransactions = [];
                        const govtFeePayableAcc = await getAccountByCode(session.user.companyId, "2020");

                        if (govtFeePayableAcc) {
                            ccFlowTransactions.push({
                                accountId: govtFeePayableAcc.id,
                                debit: totalGovFee,
                                credit: 0
                            });
                            ccFlowTransactions.push({
                                accountId: ccAccount.id,
                                debit: 0,
                                credit: totalGovFee
                            });

                            await createJournalEntry({
                                companyId: session.user.companyId,
                                branchId: invoice.branchId || undefined,
                                description: `Govt Fee settled via Card for Invoice ${invNo}`,
                                type: JournalEntryType.GOVT_FEE,
                                referenceType: "INVOICE",
                                referenceId: invoice.id,
                                transactions: ccFlowTransactions as any
                            }, tx);
                        }
                    }
                }
            }

            return invoice;
        }, { timeout: 60000 });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("Invoice Create Error:", error);
        return NextResponse.json({ error: error.message || "Failed to create invoice" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const session = await getSession();
    if (!session || session.user.role !== 'ADMIN') { // TODO: Better RBAC
        return NextResponse.json({ error: "Access denied." }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    try {
        const inv = await prisma.invoice.findUnique({ where: { id } });
        if (!inv || inv.companyId !== session.user.companyId) {
            return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
        }

        // 🔒 ENFORCE PERIOD LOCK
        await enforcePeriodLock(
            session.user.companyId,
            new Date(inv.date),
            LockType.ACCOUNTING,
            "delete invoice"
        );

        await prisma.$transaction(async (tx) => {
            // Revert Partner Liabilities (DELETED - Ledger is truth)
            await tx.transaction.deleteMany({ where: { invoiceId: id } });
            await tx.invoice.delete({ where: { id } });
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to delete' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { payments, paymentMethod, paymentRef, bankAccountId } = await req.json();

        if (!payments || !Array.isArray(payments) || payments.length === 0) {
            return NextResponse.json({ error: "No payments provided" }, { status: 400 });
        }

        // 🔒 ENFORCE PERIOD LOCK (For payment date = NOW)
        await enforcePeriodLock(
            session.user.companyId,
            new Date(),
            LockType.ACCOUNTING,
            "receive payment"
        );

        // Fetch last receipt once
        const lastReceipt = await prisma.transaction.findFirst({
            where: {
                companyId: session.user.companyId,
                type: 'PAYMENT',
                receiptNo: { startsWith: `RCP-${new Date().getFullYear()}-` }
            },
            orderBy: { receiptNo: 'desc' },
            select: { receiptNo: true }
        });

        let nextRNum = 1;
        if (lastReceipt && lastReceipt.receiptNo) {
            const parts = lastReceipt.receiptNo.split('-');
            nextRNum = parseInt(parts[parts.length - 1]) + 1;
        }

        const result = await prisma.$transaction(async (tx) => {
            const results = [];
            let currentRNum = nextRNum;

            for (const p of payments) {
                const { invoiceId, paymentAmount, advanceAmount } = p;
                const cashPaid = new Decimal(paymentAmount?.toString() || "0");
                const advanceSettle = new Decimal(advanceAmount?.toString() || "0");

                if (cashPaid.lte(0) && advanceSettle.lte(0)) continue;

                const invoice = await tx.invoice.findUnique({
                    where: { id: invoiceId }
                });

                if (!invoice || invoice.companyId !== session.user.companyId) {
                    throw new Error(`Invoice ${invoiceId} not found`);
                }

                // 🔒 Check if old invoice period is locked? Only if changing invoice itself. 
                // Adding payment updates 'balance' and 'status' on invoice.
                // Strictly speaking, if the invoice period is locked, can we update its status?
                // VAT Audit: If it changes VAT report (No, payments don't change VAT)
                // Accounting: Balances change. 
                // Usually Payment is a NEW transaction in CURRENT period.
                // But it UPDATES the old invoice record.
                // We allow it because the "Transaction" (Payment) is in open period.
                // The update to invoice is "Status update", not "Financial Value of Service update".
                // So checking check on 'new Date()' is sufficient.

                const currentPaid = new Decimal(invoice.paidAmount?.toString() || "0");
                const total = new Decimal(invoice.total?.toString() || "0");

                const newPaidAmount = currentPaid.plus(cashPaid).plus(advanceSettle);
                const newBalance = total.minus(newPaidAmount);

                const updatedInvoice = await tx.invoice.update({
                    where: { id: invoiceId },
                    data: {
                        paidAmount: newPaidAmount,
                        balance: newBalance,
                        status: newBalance.lte(0) ? 'PAID' : 'PARTIAL'
                    }
                });

                // 1. Process Cash/Bank Payment if present
                if (cashPaid.gt(0)) {
                    const rNo = `RCP-${new Date().getFullYear()}-${currentRNum.toString().padStart(4, '0')}`;
                    currentRNum++;

                    await tx.transaction.create({
                        data: {
                            companyId: session.user.companyId,
                            branchId: invoice.branchId,
                            invoiceId: invoiceId,
                            date: new Date(),
                            enteredById: session.user.id,
                            partnerId: invoice.customerId,
                            customerName: invoice.customerName,
                            applicantName: `Balance Payment for ${invoice.invoiceNo}`,
                            details: `Receipt No: ${rNo}. Method: ${paymentMethod}${paymentRef ? ` Ref: ${paymentRef}` : ""}`,
                            type: 'PAYMENT',
                            receiptNo: rNo,
                            govFee: 0,
                            typingCharge: 0,
                            vat: 0,
                            total: cashPaid,
                            paymentMethod: paymentMethod || 'CASH',
                            status: 'PAID',
                        }
                    });

                    // Journal for Cash Payment
                    const arAccount = await getAccountByCode(session.user.companyId, "1030");
                    const depositAccId = bankAccountId;

                    if (depositAccId && arAccount) {
                        const remainingBalance = new Decimal(invoice.balance.toString());
                        const amountToAR = Decimal.min(cashPaid, remainingBalance);
                        const amountToAdvance = cashPaid.minus(amountToAR);

                        const journalTransactions: any[] = [
                            { accountId: depositAccId, debit: cashPaid, credit: new Decimal(0) }
                        ];

                        if (amountToAR.gt(0)) {
                            journalTransactions.push({
                                accountId: arAccount.id,
                                debit: new Decimal(0),
                                credit: amountToAR,
                                partnerId: invoice.customerId || undefined
                            });
                        }

                        if (amountToAdvance.gt(0)) {
                            const advanceAccount = await getAccountByCode(session.user.companyId, "2010");
                            if (advanceAccount) {
                                journalTransactions.push({
                                    accountId: advanceAccount.id,
                                    debit: new Decimal(0),
                                    credit: amountToAdvance,
                                    partnerId: invoice.customerId || undefined
                                });
                            }
                        }

                        await createJournalEntry({
                            companyId: session.user.companyId,
                            branchId: invoice.branchId || undefined,
                            description: `Payment for Invoice ${invoice.invoiceNo} (Ref: ${rNo})`,
                            type: JournalEntryType.PAYMENT,
                            referenceType: "INVOICE",
                            referenceId: invoiceId,
                            transactions: journalTransactions as any
                        });
                    }
                }

                // 2. Process Advance Settlement if present
                if (advanceSettle.gt(0)) {
                    // Validate available advance
                    const netBalance = await getPartnerBalance(session.user.companyId, invoice.customerId!, tx);
                    const availableAdvance = netBalance.lt(0) ? netBalance.abs() : new Decimal(0);

                    if (availableAdvance.lt(advanceSettle)) {
                        throw new Error(`Insufficient advance balance for ${invoice.customerName}.Available: ${availableAdvance} `);
                    }

                    const advanceAccount = await getAccountByCode(session.user.companyId, "2010");
                    const arAccount = await getAccountByCode(session.user.companyId, "1030");

                    if (advanceAccount && arAccount) {
                        await createJournalEntry({
                            companyId: session.user.companyId,
                            branchId: invoice.branchId || undefined,
                            description: `Advance Settlement: Invoice ${invoice.invoiceNo} `,
                            type: JournalEntryType.ADJUSTMENT,
                            referenceType: "INVOICE",
                            referenceId: invoiceId,
                            transactions: [
                                { accountId: advanceAccount.id, debit: advanceSettle, credit: 0, partnerId: invoice.customerId || undefined },
                                { accountId: arAccount.id, debit: 0, credit: advanceSettle, partnerId: invoice.customerId || undefined }
                            ]
                        });
                    }
                }
                results.push(updatedInvoice);
            }
            return results;
        }, { timeout: 20000 });

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update payment" }, { status: 500 });
    }
}
