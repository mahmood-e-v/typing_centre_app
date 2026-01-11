import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const q = searchParams.get('q');
        const companyId = searchParams.get('companyId');
        const type = searchParams.get('type'); // 'INDIVIDUAL' or undefined

        if (!q || q.length < 1) {
            return NextResponse.json([]);
        }

        const { getPartnerBalance } = await import("@/lib/accounting-service");
        const session = await ((await import("@/lib/auth")).getSession());
        if (!session) return NextResponse.json([]);

        // OPTIMIZED: Bulk Balance Helper
        const getBalances = async (partnerIds: string[]) => {
            if (partnerIds.length === 0) return {};

            // 1. Invoice Balances (Liabilities)
            const invoiceAgg = await prisma.invoice.groupBy({
                by: ['customerId'],
                where: {
                    companyId: session.user.companyId,
                    customerId: { in: partnerIds },
                    balance: { gt: 0 }
                },
                _sum: { balance: true }
            });

            // 2. Ledger Advances (Dues/Wallet)
            const advanceAccount = await prisma.account.findFirst({
                where: { companyId: session.user.companyId, code: "2010" }
            });

            let balances: Record<string, { dues: number, liabilities: number }> = {};

            // Init
            partnerIds.forEach(id => balances[id] = { dues: 0, liabilities: 0 });

            // Fill Liabilities
            invoiceAgg.forEach(agg => {
                if (agg.customerId) {
                    if (!balances[agg.customerId]) balances[agg.customerId] = { dues: 0, liabilities: 0 };
                    balances[agg.customerId].liabilities = agg._sum.balance?.toNumber() || 0;
                }
            });

            // Fill Advances
            if (advanceAccount) {
                const ledgerAgg = await prisma.ledgerTransaction.groupBy({
                    by: ['partnerId'],
                    where: {
                        companyId: session.user.companyId,
                        accountId: advanceAccount.id,
                        partnerId: { in: partnerIds }
                    },
                    _sum: { debit: true, credit: true }
                });

                ledgerAgg.forEach(agg => {
                    if (agg.partnerId) {
                        if (!balances[agg.partnerId]) balances[agg.partnerId] = { dues: 0, liabilities: 0 };
                        const credits = agg._sum.credit?.toNumber() || 0;
                        const debits = agg._sum.debit?.toNumber() || 0;
                        balances[agg.partnerId].dues = credits - debits;
                    }
                });
            }
            return balances;
        };

        if (type === 'INDIVIDUAL') {
            // 1. Search Partners of type INDIVIDUAL
            const partners = await prisma.partner.findMany({
                where: {
                    companyId: session.user.companyId,
                    type: 'INDIVIDUAL',
                    name: { contains: q, mode: 'insensitive' }
                },
                take: 10,
                orderBy: { name: 'asc' }
            });

            // 2. Search Orphan Beneficiaries (Individuals saved in Beneficiary list)
            const beneficiaries = await prisma.beneficiary.findMany({
                where: {
                    companyId: session.user.companyId,
                    partnerId: null, // Orphan
                    name: { contains: q, mode: 'insensitive' }
                },
                take: 10,
                orderBy: { name: 'asc' }
            });

            // Get Balances for Partners
            const balances = await getBalances(partners.map(p => p.id));

            // Combine Results
            const results = [
                ...partners.map(p => ({
                    id: p.id,
                    name: p.name,
                    phone: p.phone,
                    email: p.email,
                    type: 'INDIVIDUAL', // From Partner
                    dues: balances[p.id]?.dues || 0,
                    liabilities: balances[p.id]?.liabilities || 0,
                    company: null,
                    source: 'PARTNER'
                })),
                ...beneficiaries.map(b => ({
                    id: b.id,
                    name: b.name,
                    phone: b.phone,
                    email: b.email,
                    type: 'INDIVIDUAL', // Treat as Individual
                    dues: 0, // Beneficiaries don't have direct ledger accounts usually
                    liabilities: 0,
                    company: null,
                    source: 'BENEFICIARY'
                }))
            ];

            // Sort combined results
            results.sort((a, b) => a.name.localeCompare(b.name));

            return NextResponse.json(results.slice(0, 15));

        } else {
            const beneficiaries = await prisma.beneficiary.findMany({
                where: {
                    name: { contains: q, mode: 'insensitive' },
                    ...(companyId ? { partnerId: companyId } : { companyId: session.user.companyId })
                },
                include: {
                    partner: {
                        select: { id: true, name: true, type: true, companyId: true }
                    }
                },
                orderBy: { name: 'asc' },
                take: 10
            });

            const partnerIds = beneficiaries.map(b => b.partnerId).filter(id => id !== null) as string[];
            const balances = await getBalances(partnerIds);

            const results = beneficiaries.map(b => ({
                id: b.id,
                name: b.name,
                phone: b.phone,
                email: b.email,
                details: b.details,
                type: 'BENEFICIARY',
                company: b.partner ? {
                    id: b.partner.id,
                    name: b.partner.name,
                    type: b.partner.type,
                    dues: balances[b.partner.id]?.dues || 0,
                    liabilities: balances[b.partner.id]?.liabilities || 0
                } : null
            }));
            return NextResponse.json(results);
        }
    } catch (error) {
        console.error("Search Error:", error);
        return NextResponse.json({ error: "Failed to search" }, { status: 500 });
    }
}
