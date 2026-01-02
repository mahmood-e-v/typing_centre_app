import { prisma } from "./db";
import { Decimal } from "@prisma/client/runtime/library";
import { getAccountByCode } from "./accounting-service";

export interface DailySummary {
    openingCash: Decimal;
    cashIn: Decimal;
    cashOut: Decimal;
    closingCash: Decimal;
    bankIn: Decimal;
    posIn: Decimal;
    totalSales: Decimal;
    totalVat: Decimal;
    totalGovFee: Decimal;
    outstandingGovFee: Decimal;
    invoices: any[];
    receipts: any[];
    expenses: any[];
    advances: any[];
}

/**
 * Get accurate daily summary for a branch from the LEDGER
 */
export async function getDailySummary(companyId: string, branchId: string, date: Date): Promise<DailySummary> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const cashAccount = await getAccountByCode(companyId, "1010");
    const bankAccount = await getAccountByCode(companyId, "1020");
    const posAccount = await getAccountByCode(companyId, "1040");

    // 1. Opening Cash Balance (All time until yesterday)
    const openingRaw = await prisma.ledgerTransaction.aggregate({
        where: {
            companyId,
            branchId,
            accountId: cashAccount?.id,
            journalEntry: {
                postingDate: { lt: startOfDay }
            }
        },
        _sum: { debit: true, credit: true }
    });
    const openingCash = new Decimal(openingRaw._sum.debit || 0).minus(new Decimal(openingRaw._sum.credit || 0));

    // 2. Daily Cash Fluctuations
    const cashDaily = await prisma.ledgerTransaction.aggregate({
        where: {
            companyId,
            branchId,
            accountId: cashAccount?.id,
            journalEntry: {
                postingDate: { gte: startOfDay, lte: endOfDay }
            }
        },
        _sum: { debit: true, credit: true }
    });
    const cashIn = new Decimal(cashDaily._sum.debit || 0);
    const cashOut = new Decimal(cashDaily._sum.credit || 0);
    const closingCash = openingCash.plus(cashIn).minus(cashOut);

    // 3. Bank & POS Inflows
    const bankRaw = await prisma.ledgerTransaction.aggregate({
        where: {
            companyId,
            branchId,
            accountId: bankAccount?.id,
            journalEntry: {
                postingDate: { gte: startOfDay, lte: endOfDay }
            }
        },
        _sum: { debit: true }
    });
    const bankIn = new Decimal(bankRaw._sum.debit || 0);

    const posRaw = await prisma.ledgerTransaction.aggregate({
        where: {
            companyId,
            branchId,
            accountId: posAccount?.id,
            journalEntry: {
                postingDate: { gte: startOfDay, lte: endOfDay }
            }
        },
        _sum: { debit: true }
    });
    const posIn = new Decimal(posRaw._sum.debit || 0);

    // 4. Sales / Invoice Report
    const invoices = await prisma.invoice.findMany({
        where: {
            companyId,
            branchId,
            date: { gte: startOfDay, lte: endOfDay }
        },
        include: { transactions: true }
    });

    let totalSales = new Decimal(0);
    let totalVat = new Decimal(0);
    let totalGovFee = new Decimal(0);

    invoices.forEach(inv => {
        totalSales = totalSales.plus(new Decimal(inv.total.toString()));
        totalVat = totalVat.plus(new Decimal(inv.tax.toString()));
        inv.transactions.forEach(t => {
            totalGovFee = totalGovFee.plus(new Decimal(t.govFee.toString()));
        });
    });

    // 5. Govt Fee Reconciliation (Outstanding balance of 2020)
    const govtFeeAccount = await getAccountByCode(companyId, "2020");
    const govtFeeSnap = await prisma.ledgerTransaction.aggregate({
        where: {
            companyId,
            branchId,
            accountId: govtFeeAccount?.id,
            journalEntry: {
                postingDate: { lte: endOfDay }
            }
        },
        _sum: { debit: true, credit: true }
    });
    const outstandingGovFee = new Decimal(govtFeeSnap._sum.credit || 0).minus(new Decimal(govtFeeSnap._sum.debit || 0));

    // 6. Receipts Report
    const receipts = await prisma.transaction.findMany({
        where: {
            companyId,
            branchId,
            type: 'PAYMENT',
            date: { gte: startOfDay, lte: endOfDay }
        }
    });

    // 7. Expenses / Vouchers
    const expenses = await prisma.voucher.findMany({
        where: {
            companyId,
            branchId,
            date: { gte: startOfDay, lte: endOfDay }
        },
        include: { items: true, vendor: true }
    });

    // 8. Customer Advances (Daily Activity)
    const advanceAccount = await getAccountByCode(companyId, "2010");
    const advances = await prisma.ledgerTransaction.findMany({
        where: {
            companyId,
            branchId,
            accountId: advanceAccount?.id || undefined,
            journalEntry: {
                postingDate: { gte: startOfDay, lte: endOfDay }
            }
        },
        include: { partner: true, journalEntry: true }
    });

    return {
        openingCash,
        cashIn,
        cashOut,
        closingCash,
        bankIn,
        posIn,
        totalSales,
        totalVat,
        totalGovFee,
        outstandingGovFee,
        invoices,
        receipts,
        expenses,
        advances
    };
}

/**
 * Perform Day Closing - Snapshots data and marks as CLOSED
 */
export async function closeDay(companyId: string, branchId: string, date: Date, userId: string) {
    const summary = await getDailySummary(companyId, branchId, date);

    return await prisma.dailyClosing.upsert({
        where: {
            companyId_branchId_date: {
                companyId,
                branchId,
                date: new Date(date.setHours(0, 0, 0, 0))
            }
        },
        update: {
            status: 'CLOSED',
            openingCash: summary.openingCash,
            cashIn: summary.cashIn,
            cashOut: summary.cashOut,
            closingCash: summary.closingCash,
            bankIn: summary.bankIn,
            posIn: summary.posIn,
            totalSales: summary.totalSales,
            totalVat: summary.totalVat,
            totalGovFee: summary.totalGovFee,
            closedById: userId,
            closedAt: new Date()
        },
        create: {
            companyId,
            branchId,
            date: new Date(date.setHours(0, 0, 0, 0)),
            status: 'CLOSED',
            openingCash: summary.openingCash,
            cashIn: summary.cashIn,
            cashOut: summary.cashOut,
            closingCash: summary.closingCash,
            bankIn: summary.bankIn,
            posIn: summary.posIn,
            totalSales: summary.totalSales,
            totalVat: summary.totalVat,
            totalGovFee: summary.totalGovFee,
            closedById: userId,
            closedAt: new Date()
        }
    });
}
