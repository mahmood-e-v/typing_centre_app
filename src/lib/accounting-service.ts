import { prisma } from "./db";
import { Decimal } from "@prisma/client/runtime/library";
import { AccountCategory, JournalEntryType, AccountType } from "@/generated/client_v2";

/**
 * Standard Chart of Accounts Template for UAE Typing Centers
 */
export const DEFAULT_COA = [
    // 1000 ASSETS
    { code: "1000", name: "Assets", category: "ASSET", type: "CASH", isSystem: true, isPostable: false },
    { code: "1010", name: "Cash in Hand", category: "ASSET", type: "CASH", isSystem: true, isPostable: true, parentCode: "1000" },
    { code: "1020", name: "Bank Accounts", category: "ASSET", type: "BANK", isSystem: true, isPostable: false, parentCode: "1000" },
    { code: "1030", name: "Accounts Receivable", category: "ASSET", type: "CASH", isSystem: true, isPostable: true, parentCode: "1000" },
    { code: "1040", name: "POS Settlement Pending", category: "ASSET", type: "CASH", isSystem: true, isPostable: true, parentCode: "1000" },
    { code: "1050", name: "VAT Receivable (Recoverable)", category: "ASSET", type: "CASH", isSystem: true, isPostable: true, parentCode: "1000" },
    { code: "1200", name: "VAT Recoverable (Input)", category: "ASSET", type: "CASH", isSystem: true, isPostable: true, parentCode: "1000" },

    // 2000 LIABILITIES
    { code: "2000", name: "Liabilities", category: "LIABILITY", type: "CASH", isSystem: true, isPostable: false },
    { code: "2010", name: "Customer Advance", category: "LIABILITY", type: "CASH", isSystem: true, isPostable: true, parentCode: "2000" },
    { code: "2020", name: "Government Fees Payable", category: "LIABILITY", type: "CASH", isSystem: true, isPostable: true, parentCode: "2000" },
    { code: "2030", name: "Credit Card Payable", category: "LIABILITY", type: "CREDIT_CARD", isSystem: true, isPostable: true, parentCode: "2000" },
    { code: "2200", name: "VAT Payable (Output)", category: "LIABILITY", type: "CASH", isSystem: true, isPostable: true, parentCode: "2000" },
    { code: "2050", name: "Accounts Payable", category: "LIABILITY", type: "CASH", isSystem: true, isPostable: true, parentCode: "2000" },

    // 3000 EQUITY
    { code: "3000", name: "Equity", category: "EQUITY", type: "CASH", isSystem: true, isPostable: false },
    { code: "3010", name: "Owner Capital", category: "EQUITY", type: "CASH", isSystem: true, isPostable: true, parentCode: "3000" },
    { code: "3020", name: "Retained Earnings", category: "EQUITY", type: "CASH", isSystem: true, isPostable: true, parentCode: "3000" },

    // 4000 INCOME
    { code: "4000", name: "Income", category: "INCOME", type: "CASH", isSystem: true, isPostable: false },
    { code: "4010", name: "Service Revenue", category: "INCOME", type: "CASH", isSystem: true, isPostable: true, parentCode: "4000" },
    { code: "4020", name: "Typing Charges", category: "INCOME", type: "CASH", isSystem: true, isPostable: true, parentCode: "4000" },
    { code: "4030", name: "PRO Service Fees", category: "INCOME", type: "CASH", isSystem: true, isPostable: true, parentCode: "4000" },

    // 5000 EXPENSES
    { code: "5000", name: "Expenses", category: "EXPENSE", type: "CASH", isSystem: true, isPostable: false },
    { code: "5100", name: "Operating Expenses", category: "EXPENSE", type: "CASH", isSystem: true, isPostable: false, parentCode: "5000" },
    { code: "5110", name: "Rent", category: "EXPENSE", type: "CASH", isSystem: true, isPostable: true, parentCode: "5100" },
    { code: "5120", name: "Utilities", category: "EXPENSE", type: "CASH", isSystem: true, isPostable: true, parentCode: "5100" },
    { code: "5130", name: "Salary Expense", category: "EXPENSE", type: "CASH", isSystem: true, isPostable: true, parentCode: "5100" },
    { code: "5140", name: "Office Expenses", category: "EXPENSE", type: "CASH", isSystem: true, isPostable: true, parentCode: "5100" },
    { code: "5200", name: "Financial Charges", category: "EXPENSE", type: "CASH", isSystem: true, isPostable: false, parentCode: "5000" },
    { code: "5210", name: "Bank Charges", category: "EXPENSE", type: "CASH", isSystem: true, isPostable: true, parentCode: "5200" },
    { code: "5220", name: "Card Processing Charges", category: "EXPENSE", type: "CASH", isSystem: true, isPostable: true, parentCode: "5200" },
];

export async function initializeCompanyCOA(companyId: string) {
    // 1. Create top-level accounts first
    const topLevel = DEFAULT_COA.filter(a => !a.parentCode);
    for (const acc of topLevel) {
        await prisma.account.upsert({
            where: { companyId_code: { companyId, code: acc.code } },
            update: {},
            create: {
                companyId,
                code: acc.code,
                name: acc.name,
                category: acc.category as AccountCategory,
                type: acc.type as AccountType,
                isSystem: acc.isSystem,
                isPostable: acc.isPostable,
            }
        });
    }

    // 2. Create sub-accounts and link them
    const subAccounts = DEFAULT_COA.filter(a => a.parentCode);
    for (const acc of subAccounts) {
        const parent = await prisma.account.findUnique({
            where: { companyId_code: { companyId, code: acc.parentCode! } }
        });

        await prisma.account.upsert({
            where: { companyId_code: { companyId, code: acc.code } },
            update: {},
            create: {
                companyId,
                code: acc.code,
                name: acc.name,
                category: acc.category as AccountCategory,
                type: acc.type as AccountType,
                isSystem: acc.isSystem,
                isPostable: acc.isPostable,
                parentAccountId: parent?.id
            }
        });
    }
}

export interface JournalEntryInput {
    companyId: string;
    branchId?: string;
    postingDate?: Date;
    description: string;
    type: JournalEntryType;
    referenceType?: string;
    referenceId?: string;
    reversedEntryId?: string;
    transactions: {
        accountId: string;
        debit: number | Decimal;
        credit: number | Decimal;
        partnerId?: string; // Optional: Link transaction line to a customer/partner
    }[];
}

export async function createJournalEntry(input: JournalEntryInput, tx?: any) {
    // 1. Validate Balance
    let totalDebit = new Decimal(0);
    let totalCredit = new Decimal(0);

    for (const tx of input.transactions) {
        totalDebit = totalDebit.plus(new Decimal(tx.debit.toString()));
        totalCredit = totalCredit.plus(new Decimal(tx.credit.toString()));
    }

    if (!totalDebit.equals(totalCredit)) {
        throw new Error(`Unbalanced Journal Entry: Debits (${totalDebit}) !== Credits (${totalCredit})`);
    }

    const client = tx || prisma;

    // Helper to perform the actual DB writes
    const performWrites = async (transactionClient: any) => {
        const entry = await transactionClient.journalEntry.create({
            data: {
                companyId: input.companyId,
                branchId: input.branchId,
                postingDate: input.postingDate || new Date(),
                description: input.description,
                type: input.type,
                referenceType: input.referenceType,
                referenceId: input.referenceId,
                reversedEntryId: input.reversedEntryId,
                transactions: {
                    create: input.transactions.map((t) => ({
                        accountId: t.accountId,
                        debit: new Decimal(t.debit.toString()),
                        credit: new Decimal(t.credit.toString()),
                        companyId: input.companyId,
                        branchId: input.branchId,
                        partnerId: t.partnerId, // SAVING PARTNER DIMENSION
                    })),
                },
            },
        });

        // 3. Update Account Balances
        // OPTIMIZATION: Aggregate updates by Account ID to prevent N+1 and reducing lock contention
        const accountUpdates = new Map<string, Decimal>();

        for (const t of input.transactions) {
            const amount = new Decimal(t.debit.toString()).minus(new Decimal(t.credit.toString()));
            if (!amount.equals(0)) {
                const current = accountUpdates.get(t.accountId) || new Decimal(0);
                accountUpdates.set(t.accountId, current.plus(amount));
            }
        }

        for (const [accountId, netChange] of accountUpdates.entries()) {
            if (!netChange.equals(0)) {
                await transactionClient.account.update({
                    where: { id: accountId },
                    data: {
                        balance: { increment: netChange }
                    }
                });
            }
        }

        return entry;
    };

    // 2. Execute
    if (tx) {
        // Use existing transaction
        return await performWrites(tx);
    } else {
        // Start new transaction
        return await prisma.$transaction(async (newTx) => {
            return await performWrites(newTx);
        });
    }
}

/**
 * Derived Partner Balance (Source of Truth)
 * Positive balance = Receivable (Debit > Credit)
 */
export async function getPartnerBalance(companyId: string, partnerId: string, tx?: any) {
    const arAccount = await getAccountByCode(companyId, "1030"); // Accounts Receivable
    const advanceAccount = await getAccountByCode(companyId, "2010"); // Customer Advance

    if (!arAccount) return new Decimal(0);

    const client = tx || prisma;

    const transactions = await client.ledgerTransaction.aggregate({
        where: {
            companyId,
            partnerId,
            accountId: { in: [arAccount.id, advanceAccount?.id || ""] }
        },
        _sum: {
            debit: true,
            credit: true
        }
    });

    const debits = transactions._sum.debit || new Decimal(0);
    const credits = transactions._sum.credit || new Decimal(0);

    // Balance = Total Debits - Total Credits
    // For AR, Debit is "+" and Credit is "-"
    return debits.minus(credits);
}

export async function createReversalEntry(journalEntryId: string, reason: string) {
    const original = await prisma.journalEntry.findUnique({
        where: { id: journalEntryId },
        include: { transactions: true }
    });

    if (!original) throw new Error("Original Journal Entry not found");

    return await createJournalEntry({
        companyId: original.companyId,
        branchId: original.branchId || undefined,
        description: `REVERSAL: ${reason} (Ref: ${original.id})`,
        type: JournalEntryType.REVERSAL,
        reversedEntryId: original.id,
        transactions: original.transactions.map(t => ({
            accountId: t.accountId,
            debit: t.credit, // Flip credit to debit
            credit: t.debit, // Flip debit to credit
            partnerId: t.partnerId || undefined,
        }))
    });
}

/**
 * Step 1: Record Advance Receipt
 * Debit Bank, Credit Customer Advance (Liability)
 */
export async function receiveCustomerAdvance(input: {
    companyId: string;
    branchId?: string;
    partnerId: string;
    amount: number | Decimal;
    paymentMethod: string;
    bankAccountId: string; // The account receiving the cash/bank deposit
    description?: string;
}) {
    const advanceAccount = await getAccountByCode(input.companyId, "2010");
    if (!advanceAccount) throw new Error("Customer Advance account (2010) not found");

    return await createJournalEntry({
        companyId: input.companyId,
        branchId: input.branchId,
        description: input.description || `Advance Receipt from Customer`,
        type: JournalEntryType.PAYMENT,
        transactions: [
            {
                accountId: input.bankAccountId,
                debit: input.amount,
                credit: 0
            },
            {
                accountId: advanceAccount.id,
                debit: 0,
                credit: input.amount,
                partnerId: input.partnerId
            }
        ]
    });
}

/**
 * Step 2: Settle Advance against Accounts Receivable
 * Debit Customer Advance, Credit Accounts Receivable
 */
export async function settleAdvanceAgainstAR(input: {
    companyId: string;
    branchId?: string;
    partnerId: string;
    invoiceId: string;
    amount: number | Decimal;
}) {
    const advanceAccount = await getAccountByCode(input.companyId, "2010");
    const arAccount = await getAccountByCode(input.companyId, "1030");

    if (!advanceAccount || !arAccount) throw new Error("Required settlement accounts not found");

    return await createJournalEntry({
        companyId: input.companyId,
        branchId: input.branchId,
        description: `Advance Settlement for Invoice Ref: ${input.invoiceId}`,
        type: JournalEntryType.ADJUSTMENT,
        referenceType: "INVOICE",
        referenceId: input.invoiceId,
        transactions: [
            {
                accountId: advanceAccount.id,
                debit: input.amount,
                credit: 0,
                partnerId: input.partnerId
            },
            {
                accountId: arAccount.id,
                debit: 0,
                credit: input.amount,
                partnerId: input.partnerId
            }
        ]
    });
}

/**
 * Step 3: Refund Customer Advance
 * Debit Customer Advance, Credit Bank/Cash
 */
export async function refundCustomerAdvance(input: {
    companyId: string;
    branchId?: string;
    partnerId: string;
    amount: number | Decimal;
    bankAccountId: string;
    description?: string;
}) {
    const advanceAccount = await getAccountByCode(input.companyId, "2010");
    if (!advanceAccount) throw new Error("Customer Advance account (2010) not found");

    return await createJournalEntry({
        companyId: input.companyId,
        branchId: input.branchId,
        description: input.description || `Advance Refund to Customer`,
        type: JournalEntryType.ADJUSTMENT,
        transactions: [
            {
                accountId: advanceAccount.id,
                debit: input.amount,
                credit: 0,
                partnerId: input.partnerId
            },
            {
                accountId: input.bankAccountId,
                debit: 0,
                credit: input.amount
            }
        ]
    });
}

/**
 * Step 4: Write-off Customer Advance (Forfeited)
 * Debit Customer Advance, Credit Other Income (e.g., Code 4050)
 */
export async function writeOffCustomerAdvance(input: {
    companyId: string;
    branchId?: string;
    partnerId: string;
    amount: number | Decimal;
    description?: string;
}) {
    const advanceAccount = await getAccountByCode(input.companyId, "2010");
    const otherIncomeAcc = await getAccountByCode(input.companyId, "4010"); // Defaulting to 4010 for now if 4050 doesn't exist

    if (!advanceAccount) throw new Error("Customer Advance account (2010) not found");

    return await createJournalEntry({
        companyId: input.companyId,
        branchId: input.branchId,
        description: input.description || `Advance Write-off (Forfeited)`,
        type: JournalEntryType.ADJUSTMENT,
        transactions: [
            {
                accountId: advanceAccount.id,
                debit: input.amount,
                credit: 0,
                partnerId: input.partnerId
            },
            {
                accountId: otherIncomeAcc?.id || (await getAccountByCode(input.companyId, "4010"))?.id || "",
                debit: 0,
                credit: input.amount
            }
        ]
    });
}

/**
 * Get account by system code
 */
export async function getAccountByCode(companyId: string, code: string) {
    return await prisma.account.findUnique({
        where: { companyId_code: { companyId, code } }
    });
}

