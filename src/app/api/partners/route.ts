
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const partnerId = searchParams.get('id');
    const includeInvoices = searchParams.get('invoices');

    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        if (partnerId && includeInvoices === 'true') {
            const invoices = await prisma.invoice.findMany({
                where: { customerId: partnerId, balance: { gt: 0 } },
                orderBy: { date: 'desc' }
            });
            return NextResponse.json(invoices);
        }

        const partners = await prisma.partner.findMany({
            orderBy: { name: 'asc' },
            include: { beneficiaries: true }
        });

        // OPTIMIZED: Bulk Balance Calculation
        // Fetch all transactions for Account 2010 (Customer Advance) grouped by Partner
        // OPTIMIZED: Bulk Balance Calculation
        // 1. Fetch Invoice Balances (Receivables - Source of Truth for Legacy & New)
        // Groups by customerId -> which is Partner ID
        const invoiceAggregations = await prisma.invoice.groupBy({
            by: ['customerId'],
            where: {
                companyId: session.user.companyId,
                customerId: { not: null },
                balance: { gt: 0 }
            },
            _sum: { balance: true }
        });

        // 2. Fetch Wallet/Advance Balances (Ledger Account 2010)
        const advanceAccount = await prisma.account.findFirst({
            where: { companyId: session.user.companyId, code: "2010" }
        });

        let partnerBalances: Record<string, { dues: number, liabilities: number }> = {};

        // Fill from Invoices (Liabilities)
        invoiceAggregations.forEach(agg => {
            if (!agg.customerId) return;
            if (!partnerBalances[agg.customerId]) partnerBalances[agg.customerId] = { dues: 0, liabilities: 0 };
            partnerBalances[agg.customerId].liabilities = agg._sum.balance?.toNumber() || 0;
        });

        if (advanceAccount) {
            const aggregations = await prisma.ledgerTransaction.groupBy({
                by: ['partnerId'],
                where: {
                    companyId: session.user.companyId,
                    accountId: advanceAccount.id,
                    partnerId: { not: null }
                },
                _sum: {
                    debit: true,
                    credit: true
                }
            });

            aggregations.forEach(agg => {
                if (!agg.partnerId) return;

                if (!partnerBalances[agg.partnerId]) {
                    partnerBalances[agg.partnerId] = { dues: 0, liabilities: 0 };
                }

                const credits = agg._sum.credit?.toNumber() || 0;
                const debits = agg._sum.debit?.toNumber() || 0;

                // Advance (Liability): Credit - Debit
                partnerBalances[agg.partnerId].dues = (credits - debits);
            });
        }

        const partnersWithBalance = partners.map(p => ({
            ...p,
            dues: partnerBalances[p.id]?.dues || 0,
            liabilities: partnerBalances[p.id]?.liabilities || 0
        }));

        return NextResponse.json(partnersWithBalance);
    } catch (error) {
        console.error("Partners Fetch Error:", error);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { name, type } = await req.json();
        if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

        const partner = await prisma.partner.upsert({
            where: {
                companyId_name: {
                    companyId: session.user.companyId,
                    name
                }
            },
            update: { type: type || 'CORPORATE' },
            create: {
                name,
                companyId: session.user.companyId,
                type: type || 'CORPORATE'
            }
        });

        return NextResponse.json(partner);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to create partner" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id, name } = await req.json();
        if (!id || !name) return NextResponse.json({ error: "ID and Name required" }, { status: 400 });

        const partner = await prisma.partner.update({
            where: { id },
            data: { name }
        });

        return NextResponse.json(partner);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const bulk = searchParams.get('bulk');

    try {
        if (bulk === 'true') {
            // Bulk clear for dev/reset
            await prisma.beneficiary.deleteMany({});
            await prisma.partner.deleteMany({});
            return NextResponse.json({ success: true });
        }

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        const partner = await prisma.partner.findUnique({
            where: { id },
            include: { transactions: true }
        });

        if (!partner) return NextResponse.json({ error: "Partner not found" }, { status: 404 });

        // Check for pending dues
        // 1. Check liabilities field
        // 2. Check associated invoices for balances
        const invoices = await prisma.invoice.findMany({
            where: { customerId: id, balance: { gt: 0 } }
        });

        if (partner.transactions.length > 0 || invoices.length > 0) {
            return NextResponse.json({
                error: "Cannot delete. Company has transactions or unpaid invoices."
            }, { status: 400 });
        }

        // Two layer verification is handled on frontend (confirmation prompt)
        // If there are transactions but we passed the check above?
        // Wait, partner.transactions includes ALL transactions.
        // So the check above covers it.

        await prisma.partner.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
    }
}
