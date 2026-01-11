import { prisma } from "./db";
import { Decimal } from "@prisma/client/runtime/library";
import { getAccountByCode } from "./accounting-service";

export interface DashboardData {
    kpis: {
        totalCash: Decimal;
        totalBank: Decimal;
        accountsReceivable: Decimal;
        accountsPayable: Decimal;
        creditCardPayable: Decimal;
        netRevenueToday: Decimal;
        dailyProfit: Decimal;
    };
    trends: {
        date: string;
        revenue: number;
        expenses: number;
    }[];
    services: {
        name: string;
        value: number;
    }[];
    vats: {
        output: Decimal;
        input: Decimal;
        net: Decimal;
    };
    recentInvoices: any[];
    expiringDocumentsCount: number;
}

export async function getDashboardData(companyId: string, branchId?: string): Promise<DashboardData> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // 1. Fetch all required Account IDs in one go to avoid repeated lookups
    const systemCodes = ["1010", "1020", "1030", "2000", "2050", "4010", "2200", "1200"];
    const [systemAccounts, expenseAccounts, creditCardAccounts] = await Promise.all([
        prisma.account.findMany({
            where: { companyId, code: { in: systemCodes } }
        }),
        prisma.account.findMany({
            where: { companyId, category: 'EXPENSE' }
        }),
        prisma.account.findMany({
            where: { companyId, type: 'CREDIT_CARD' } // Fetch all Credit Card accounts
        })
    ]);

    const accMap = new Map(systemAccounts.map(a => [a.code, a]));
    const expenseAccIds = expenseAccounts.map(a => a.id);
    const creditCardAccIds = creditCardAccounts.map(a => a.id);

    const getAccId = (code: string) => accMap.get(code)?.id;

    // Helper to get total balance (Debit - Credit) for a specific account or set of accounts
    const fetchBalance = async (accountIds: string[], type: 'ASSET' | 'LIABILITY') => {
        if (accountIds.length === 0) return new Decimal(0);
        const raw = await prisma.ledgerTransaction.aggregate({
            where: {
                companyId,
                ...(branchId ? { branchId } : {}),
                accountId: { in: accountIds }
            },
            _sum: { debit: true, credit: true }
        });
        const bal = new Decimal(raw._sum.debit || 0).minus(new Decimal(raw._sum.credit || 0));
        return type === 'LIABILITY' ? bal.negated() : bal;
    };

    // Define Parallel Tasks
    const kpiTask = (async () => {
        const [cash, bank, ar, ap, cc, revToday, expToday] = await Promise.all([
            fetchBalance([getAccId("1010")!].filter(Boolean), 'ASSET'),
            fetchBalance([getAccId("1020")!].filter(Boolean), 'ASSET'),
            fetchBalance([getAccId("1030")!].filter(Boolean), 'ASSET'),
            fetchBalance([getAccId("2050"), getAccId("2000")].filter(Boolean) as string[], 'LIABILITY'),
            fetchBalance(creditCardAccIds, 'LIABILITY'), // Fetch CC Payable
            // Today's Revenue
            prisma.ledgerTransaction.aggregate({
                where: {
                    companyId,
                    ...(branchId ? { branchId } : {}),
                    accountId: getAccId("4010"),
                    journalEntry: { postingDate: { gte: today, lte: endOfToday } }
                },
                _sum: { credit: true, debit: true }
            }).then(r => new Decimal(r._sum.credit || 0).minus(new Decimal(r._sum.debit || 0))),
            // Today's Expenses
            prisma.ledgerTransaction.aggregate({
                where: {
                    companyId,
                    ...(branchId ? { branchId } : {}),
                    accountId: { in: expenseAccIds },
                    journalEntry: { postingDate: { gte: today, lte: endOfToday } }
                },
                _sum: { debit: true, credit: true }
            }).then(r => new Decimal(r._sum.debit || 0).minus(new Decimal(r._sum.credit || 0)))
        ]);

        return {
            totalCash: cash,
            totalBank: bank,
            accountsReceivable: ar,
            accountsPayable: ap,
            creditCardPayable: cc,
            netRevenueToday: revToday,
            dailyProfit: revToday.minus(expToday)
        };
    })();

    const trendsTask = (async () => {
        // Fetch all transactions for the last 7 days in one query to avoid N+1 aggregations
        const revAccId = getAccId("4010");
        if (!revAccId) return [];

        const trendData = await prisma.ledgerTransaction.findMany({
            where: {
                companyId,
                ...(branchId ? { branchId } : {}),
                accountId: { in: [revAccId, ...expenseAccIds] },
                journalEntry: { postingDate: { gte: sevenDaysAgo, lte: endOfToday } }
            },
            include: { journalEntry: { select: { postingDate: true } } }
        });

        // Group in memory
        const dailyTrends = new Map<string, { revenue: number, expenses: number }>();
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            const dateStr = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
            dailyTrends.set(dateStr, { revenue: 0, expenses: 0 });
        }

        trendData.forEach(tx => {
            const dateStr = tx.journalEntry.postingDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
            const current = dailyTrends.get(dateStr);
            if (current) {
                if (tx.accountId === revAccId) {
                    current.revenue += parseFloat(tx.credit.toString()) - parseFloat(tx.debit.toString());
                } else {
                    current.expenses += parseFloat(tx.debit.toString()) - parseFloat(tx.credit.toString());
                }
            }
        });

        return Array.from(dailyTrends.entries()).map(([date, vals]) => ({
            date,
            revenue: Math.max(0, vals.revenue),
            expenses: Math.max(0, vals.expenses)
        }));
    })();

    const servicesTask = (async () => {
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const [usage, workTypes] = await Promise.all([
            prisma.transaction.groupBy({
                by: ['workTypeId'],
                where: {
                    companyId,
                    ...(branchId ? { branchId } : {}),
                    type: 'SERVICE',
                    date: { gte: monthStart }
                },
                _sum: { typingCharge: true }
            }),
            prisma.workType.findMany({ where: { companyId } })
        ]);

        return usage.map(u => ({
            name: workTypes.find(wt => wt.id === u.workTypeId)?.description || "Other",
            value: parseFloat(u._sum.typingCharge?.toString() || "0")
        })).sort((a, b) => b.value - a.value).slice(0, 5);
    })();

    const vatTask = (async () => {
        const outAccId = getAccId("2200");
        const inAccId = getAccId("1200");
        const [outRaw, inRaw] = await Promise.all([
            prisma.ledgerTransaction.aggregate({
                where: {
                    companyId,
                    ...(branchId ? { branchId } : {}),
                    accountId: outAccId,
                    journalEntry: { postingDate: { gte: today, lte: endOfToday } }
                },
                _sum: { credit: true }
            }),
            prisma.ledgerTransaction.aggregate({
                where: {
                    companyId,
                    ...(branchId ? { branchId } : {}),
                    accountId: inAccId,
                    journalEntry: { postingDate: { gte: today, lte: endOfToday } }
                },
                _sum: { debit: true }
            })
        ]);

        const output = new Decimal(outRaw._sum.credit || 0);
        const input = new Decimal(inRaw._sum.debit || 0);
        return { output, input, net: output.minus(input) };
    })();

    const recentTask = prisma.invoice.findMany({
        where: { companyId, ...(branchId ? { branchId } : {}) },
        orderBy: { createdAt: 'desc' },
        take: 5
    });

    // Expiry Task
    const expiringTask = prisma.customerDocument.count({
        where: {
            companyId,
            status: 'ACTIVE',
            expiryDate: {
                lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Next 30 days
                gte: today // Not expired yet (or recently expired if we want to include them?) - keeping it forward looking for now, but user might want expired too. Let's stick to "Near Expiry"
            }
        }
    });

    // Execute all top-level sections in parallel
    const [kpis, trends, services, vats, recentInvoices, expiringDocumentsCount] = await Promise.all([
        kpiTask, trendsTask, servicesTask, vatTask, recentTask, expiringTask
    ]);

    return {
        kpis,
        trends,
        services,
        vats,
        recentInvoices,
        expiringDocumentsCount
    };
}

