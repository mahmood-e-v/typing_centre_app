import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { enforcePeriodLock, LockType } from '@/lib/financial-periods';
import { getDataFilter } from '@/lib/authorization';
import { Decimal } from "@prisma/client/runtime/library";

export async function GET(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);

        const transactions = await prisma.transaction.findMany({
            where: getDataFilter(session),
            include: {
                enteredBy: true,
                beneficiary: true,
                partner: true,
                workType: true,
                govtFeeAccount: true,
                invoice: true
            },
            orderBy: { createdAt: 'desc' },
            take: 100
        });

        // FETCH VOUCHERS (Expenses/Advances)
        const vouchers = await prisma.voucher.findMany({
            where: getDataFilter(session),
            include: {
                vendor: true,
                items: { include: { category: true } },
                enteredBy: true
            },
            orderBy: { date: 'desc' },
            take: 100
        });

        const txMapped = transactions.map(t => ({
            id: t.id,
            invoiceId: t.invoiceId,
            invNo: t.invNo || t.invoice?.invoiceNo || '-',
            date: t.date,
            enteredBy: t.enteredBy?.username || '-',
            customer: t.customerName || t.beneficiary?.name || '-',
            company: t.partner?.name || '-',
            beneficiary: t.beneficiary?.name || '-',
            govtFeePaidFrom: t.govtFeeAccount?.name || '',
            govtFeeRef: t.govtFeeRef || '',
            type: t.type,
            receiptNo: t.receiptNo || '',
            quantity: t.quantity || 1,
            workDescription: t.type === 'PAYMENT' ? `Payment Received: ${t.receiptNo}` : (t.workType?.description || t.details || '-'),
            govFee: new Decimal(t.govFee || 0).toNumber(),
            typingCharge: new Decimal(t.typingCharge || 0).toNumber(),
            vat: new Decimal(t.vat || 0).toNumber(),
            discount: t.type === 'SERVICE' ? new Decimal(t.invoice?.discount || 0).toNumber() : 0,
            total: new Decimal(t.total || 0).toNumber(),
            paidAmount: t.type === 'SERVICE' ? new Decimal(t.invoice?.paidAmount || 0).toNumber() : null,
            balance: t.type === 'SERVICE' ? new Decimal(t.invoice?.balance || 0).toNumber() : null,
            status: t.invoice?.status || 'PAID',
            paymentMethod: t.paymentMethod || t.invoice?.paymentMethod || 'CASH',
        }));

        const vMapped = vouchers.map(v => ({
            id: v.id,
            invNo: v.voucherNo,
            date: v.date,
            enteredBy: v.enteredBy?.username || '-',
            customer: v.type === 'RECEIPT' ? (v.vendorName || '-') : (v.vendor?.name || v.vendorName || '-'),
            company: '-',
            beneficiary: '-',
            workDescription: v.items.map((i: any) => i.description || i.category?.name).join(', '),
            govFee: 0,
            typingCharge: 0,
            vat: v.items.reduce((acc: any, i: any) => acc + (Number(i.taxAmount) || 0), 0),
            discount: 0,
            total: new Decimal(v.total).toNumber(),
            paidAmount: new Decimal(v.paidAmount).toNumber(),
            balance: new Decimal(v.total).minus(new Decimal(v.paidAmount)).toNumber(),
            status: v.status === 'PAID' ? 'PAID' : 'PARTIAL',
            paymentMethod: 'CASH', // Default or need field
            type: v.type === 'PAYMENT' ? 'EXPENSE' : 'RECEIPT',
            receiptNo: v.type === 'RECEIPT' ? v.voucherNo : '',
            receivedFrom: v.type === 'RECEIPT' ? v.vendorName : undefined
        }));

        // Merge and Sort
        const combined = [...txMapped, ...vMapped].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


        return NextResponse.json(combined);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getSession();
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    try {
        const txRecord = await prisma.transaction.findUnique({
            where: { id },
            include: { invoice: true }
        });

        if (!txRecord || txRecord.companyId !== session.user.companyId) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        // Branch Isolation for DELETE
        if (!session.user.permissions.includes("dashboard.view_all_branches") && txRecord.branchId !== session.user.branchId) {
            return NextResponse.json({ error: "Forbidden - Access to this branch restricted" }, { status: 403 });
        }

        // 🔒 ENFORCE PERIOD LOCK
        await enforcePeriodLock(
            session.user.companyId,
            txRecord.date,
            LockType.ACCOUNTING,
            "delete transaction"
        );

        await prisma.$transaction(async (tx) => {
            if (txRecord.invoiceId && txRecord.invoice) {
                if (txRecord.type === 'PAYMENT') {
                    await tx.invoice.update({
                        where: { id: txRecord.invoiceId },
                        data: {
                            paidAmount: { decrement: txRecord.total },
                            balance: { increment: txRecord.total },
                            status: 'PARTIAL'
                        }
                    });
                } else if (txRecord.type === 'SERVICE') {
                    await tx.invoice.update({
                        where: { id: txRecord.invoiceId },
                        data: {
                            subtotal: { decrement: new Decimal(txRecord.govFee || 0).add(new Decimal(txRecord.typingCharge || 0)) },
                            tax: { decrement: txRecord.vat },
                            total: { decrement: txRecord.total },
                            balance: { decrement: txRecord.total }
                        }
                    });
                }
            }
            await tx.transaction.delete({ where: { id } });
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
