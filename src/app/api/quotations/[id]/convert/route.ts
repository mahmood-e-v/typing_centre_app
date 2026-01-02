import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { enforcePeriodLock, LockType, enforceDailyLock } from "@/lib/financial-periods";
import {
    createJournalEntry,
    getAccountByCode,
    getPartnerBalance
} from "@/lib/accounting-service";
import { JournalEntryType } from '@prisma/client';
import { Decimal } from "@prisma/client/runtime/library";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: quotationId } = await params;
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const convertDate = new Date(); // Invoice Date = Now
        const { branchId } = await req.json().catch(() => ({ branchId: null })); // Optional override

        // 1. Fetch Quotation
        const quotation = await prisma.quotation.findUnique({
            where: { id: quotationId },
            include: { items: { include: { workType: true } }, partner: true }
        });

        if (!quotation || quotation.deletedAt) return NextResponse.json({ error: "Quotation not found" }, { status: 404 });
        if (quotation.status === 'CONVERTED') return NextResponse.json({ error: "Quotation already converted" }, { status: 400 });

        // REFINEMENT 3.2: Explicit Validations
        // Status Must be ACCEPTED (which we equate to Approved for now, or explicitly check approvedAt)
        if (quotation.status !== 'ACCEPTED') {
            return NextResponse.json({ error: "Quotation must be ACCEPTED (Approved) to convert." }, { status: 400 });
        }

        // Expiry Check
        if (new Date(quotation.validUntil) < new Date()) {
            return NextResponse.json({ error: "Quotation has EXPIRED." }, { status: 400 });
        }

        // 🔒 ENFORCE PERIOD LOCK
        await enforcePeriodLock(
            session.user.companyId,
            convertDate,
            LockType.ACCOUNTING,
            "convert quotation"
        );

        await enforceDailyLock(
            session.user.companyId,
            branchId || quotation.branchId || undefined,
            convertDate,
            "convert quotation"
        );

        // PRE-FETCH ACCOUNTS (Optimization: Do this outside transaction)
        const arAccount = await getAccountByCode(session.user.companyId, "1030");
        const revenueAccount = await getAccountByCode(session.user.companyId, "4010");
        const vatAccount = await getAccountByCode(session.user.companyId, "2200");
        const govtFeeAccount = await getAccountByCode(session.user.companyId, "2020");

        const result = await prisma.$transaction(async (tx) => {
            const finalPartnerId = quotation.partnerId;
            const finalBeneficiaryId = null;

            // 2. Generate Invoice No
            const targetBranchId = branchId || quotation.branchId || session.user.branchId;
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

            // 3. Create Invoice
            const invoice = await tx.invoice.create({
                data: {
                    companyId: session.user.companyId,
                    branchId: targetBranchId,
                    invoiceNo: invNo,
                    date: convertDate,
                    customerName: quotation.partner?.name || "Unknown",
                    customerPhone: quotation.partner?.phone,
                    customerEmail: quotation.partner?.email,
                    customerId: finalPartnerId,
                    agentId: session.user.id,
                    quotationId: quotation.id, // LINK

                    subtotal: quotation.subtotal,
                    tax: quotation.totalTax,
                    discount: 0,
                    total: quotation.grandTotal,

                    paidAmount: 0,
                    balance: quotation.grandTotal,
                    paymentMethod: 'CASH',
                    status: 'DRAFT'
                }
            });

            // 4. Create Transactions (Items)
            for (const item of quotation.items) {
                await tx.transaction.create({
                    data: {
                        companyId: session.user.companyId,
                        branchId: invoice.branchId,
                        invoiceId: invoice.id,
                        date: convertDate,
                        enteredById: session.user.id,
                        partnerId: finalPartnerId,
                        customerName: quotation.partner?.name,
                        applicantName: item.description,
                        workTypeId: item.workTypeId,
                        type: 'SERVICE',
                        govFee: item.govFee,
                        typingCharge: item.typingCharge,
                        vat: item.taxAmount,
                        vatRate: item.taxRate,
                        isVatApplicable: item.isVatApplicable ?? true, // Pass from Quotation
                        total: item.total,
                        paymentMethod: 'CASH',
                        status: 'PAID'
                    }
                });
            }

            // 5. Update Quotation
            await tx.quotation.update({
                where: { id: quotationId },
                data: {
                    status: 'CONVERTED',
                    convertedAt: new Date(),
                    invoicedAmount: quotation.grandTotal // Assuming Full Conversion
                }
            });

            // 6. Accounting Postings (AR, Revenue, VAT, Govt Fee)
            const transactions = [];

            // 6.1 AR - Debit Customer
            if (arAccount) {
                transactions.push({
                    accountId: arAccount.id,
                    debit: quotation.grandTotal,
                    credit: 0,
                    partnerId: finalPartnerId
                });
            }

            // 6.2 Revenue
            const totalRevenue = quotation.items.reduce((sum, item) => sum + Number(item.typingCharge), 0);
            if (totalRevenue > 0) {
                if (revenueAccount) {
                    transactions.push({
                        accountId: revenueAccount.id,
                        debit: 0,
                        credit: new Decimal(totalRevenue)
                    });
                }
            }

            // 6.3 VAT
            const totalVat = quotation.totalTax;
            if (Number(totalVat) > 0) {
                if (vatAccount) {
                    transactions.push({
                        accountId: vatAccount.id,
                        debit: 0,
                        credit: totalVat
                    });
                }
            }

            // 6.4 Govt Fee
            const totalGovFee = quotation.totalGovFee;
            if (Number(totalGovFee) > 0) {
                if (govtFeeAccount) {
                    transactions.push({
                        accountId: govtFeeAccount.id,
                        debit: 0,
                        credit: totalGovFee
                    });
                }
            }

            if (transactions.length > 0) {
                await createJournalEntry({
                    companyId: session.user.companyId,
                    branchId: invoice.branchId || undefined,
                    description: `Invoice ${invNo} (from Quotation ${quotation.quotationNo})`,
                    type: JournalEntryType.INVOICE,
                    referenceType: "INVOICE",
                    referenceId: invoice.id,
                    transactions: transactions as any
                }, tx); // PASS THE TRANSACTION (tx)
            }

            return invoice;
        }, {
            timeout: 20000 // 20 seconds timeout
        });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("Conversion Error:", error);
        return NextResponse.json({ error: error.message || "Failed to convert" }, { status: 500 });
    }
}
