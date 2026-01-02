import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { Decimal } from "@prisma/client/runtime/library";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('q');

        const beneficiaries = await prisma.beneficiary.findMany({
            where: search ? {
                name: { contains: search, mode: 'insensitive' }
            } : undefined,
            include: {
                partner: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                }
            },
            orderBy: { name: 'asc' },
            take: 100
        });

        // OPTIMIZED: Bulk Balance Injection
        const partnerIds = beneficiaries.map(b => b.partnerId).filter(id => id !== null) as string[];

        if (partnerIds.length > 0) {
            const session = await getSession();
            // Fetch Account IDs
            const accounts = await prisma.account.findMany({
                where: {
                    companyId: session?.user.companyId,
                    code: { in: ["1030", "2010"] }
                }
            });

            // 1. Fetch Invoice Balances (Receivables - Source of Truth for Legacy & New)
            const invoiceAggregations = await prisma.invoice.groupBy({
                by: ['customerId'],
                where: {
                    companyId: session?.user.companyId,
                    customerId: { in: partnerIds },
                    balance: { gt: 0 }
                },
                _sum: { balance: true }
            });

            // 2. Fetch Wallet/Advance Balances (Ledger Account 2010)
            const advanceAccId = accounts.find(a => a.code === "2010")?.id;

            let partnerBalances: Record<string, { dues: number, liabilities: number }> = {};

            // Fill from Invoices (Liabilities)
            invoiceAggregations.forEach(agg => {
                if (!agg.customerId) return;
                if (!partnerBalances[agg.customerId]) partnerBalances[agg.customerId] = { dues: 0, liabilities: 0 };
                partnerBalances[agg.customerId].liabilities = agg._sum.balance?.toNumber() || 0;
            });

            // Fill from Ledger (Wallet/Advance)
            if (advanceAccId) {
                const ledgerAggregations = await prisma.ledgerTransaction.groupBy({
                    by: ['partnerId'],
                    where: {
                        companyId: session?.user.companyId,
                        accountId: advanceAccId,
                        partnerId: { in: partnerIds }
                    },
                    _sum: { debit: true, credit: true }
                });

                ledgerAggregations.forEach(agg => {
                    if (!agg.partnerId) return;
                    if (!partnerBalances[agg.partnerId]) partnerBalances[agg.partnerId] = { dues: 0, liabilities: 0 };

                    const credits = agg._sum.credit?.toNumber() || 0;
                    const debits = agg._sum.debit?.toNumber() || 0;
                    // Advance Liability = Credit - Debit
                    partnerBalances[agg.partnerId].dues = credits - debits;
                });
            }

            // Inject balances
            return NextResponse.json(beneficiaries.map(b => {
                if (!b.partner || !b.partnerId) return b;
                return {
                    ...b,
                    partner: {
                        ...b.partner,
                        dues: partnerBalances[b.partnerId]?.dues || 0,
                        liabilities: partnerBalances[b.partnerId]?.liabilities || 0
                    }
                };
            }));
        }

        return NextResponse.json(beneficiaries);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { name, partnerId, phone, email, details } = body;

        if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

        const beneficiary = await prisma.beneficiary.create({
            data: {
                name,
                companyId: session.user.companyId,
                partnerId: partnerId || null,
                phone,
                email,
                details
            }
        });

        return NextResponse.json(beneficiary);
    } catch (error) {
        console.error("Beneficiary Creation Error:", error);
        return NextResponse.json({ error: "Creation failed" }, { status: 500 });
    }
}
export async function PUT(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id, name } = await req.json();
        if (!id || !name) return NextResponse.json({ error: "ID and Name required" }, { status: 400 });

        const beneficiary = await prisma.beneficiary.update({
            where: { id },
            data: { name }
        });

        return NextResponse.json(beneficiary);
    } catch (error) {
        console.error("Beneficiary Update Error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getSession();
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Access denied. Admin only." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    try {
        const beneficiary = await prisma.beneficiary.findUnique({
            where: { id },
            include: { transactions: { include: { invoice: true } } }
        });

        if (!beneficiary) return NextResponse.json({ error: "Beneficiary not found" }, { status: 404 });

        // Check if any associated transaction has an unpaid invoice
        const hasDues = beneficiary.transactions.some(t => t.invoice && new Decimal(t.invoice.balance.toString()).gt(0));

        if (hasDues) {
            return NextResponse.json({
                error: "Cannot delete. Beneficiary has transactions with unpaid balances."
            }, { status: 400 });
        }

        // Two layer verification on frontend, but for DB we cleanup links
        await prisma.transaction.updateMany({
            where: { beneficiaryId: id },
            data: { beneficiaryId: null }
        });

        await prisma.beneficiary.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
    }
}
