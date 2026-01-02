import { prisma } from "@/lib/db";
import { Decimal } from "@prisma/client/runtime/library";

export class CardService {
    /**
     * Checks if a card has sufficient funds/limit for a transaction.
     * @param cardId The ID of the BusinessCard
     * @param amount The amount to charge (Positive number)
     * @returns { isValid: boolean, message: string, availableBalance: Decimal }
     */
    static async validateAvailability(cardId: string, amount: number | Decimal) {
        const card = await prisma.businessCard.findUnique({
            where: { id: cardId },
            include: { ledgerAccount: true }
        });

        if (!card) throw new Error("Card not found");
        if (!card.isActive) throw new Error("Card is inactive");

        const reqAmount = new Decimal(amount);

        // 1. Calculate Current Balance of the Linked Ledger Account
        const balance = await this.getAccountBalance(card.ledgerAccountId);

        // 2. Check Logic based on Type
        if (card.type === "DEBIT") {
            // Asset Account (Bank): Balance is Cash Available.
            // Formula: Debit(In) - Credit(Out)
            // If Balance < Amount, Fail.
            if (balance.lessThan(reqAmount)) {
                return {
                    isValid: false,
                    message: `Insufficient Funds. Available: ${balance.toFixed(2)}`,
                    available: balance
                };
            }
        } else {
            // CREDIT Card (Liability): Balance is Current Debt.
            // Formula: Credit(Spent) - Debit(Paid Back)
            // Available = Limit - Debt.
            if (!card.creditLimit) return { isValid: true, available: new Decimal(999999) }; // No limit?

            const limit = new Decimal(card.creditLimit);
            const available = limit.minus(balance);

            if (available.lessThan(reqAmount)) {
                return {
                    isValid: false,
                    message: `Credit Limit Exceeded. Available: ${available.toFixed(2)}`,
                    available: available
                };
            }
        }

        return { isValid: true, message: "Approved", available: new Decimal(0) }; // Available not needed for success
    }

    /**
     * Calculates the effective balance based on Account Type.
     * Asset (Bank): Debit - Credit
     * Liability (CC): Credit - Debit
     */
    private static async getAccountBalance(accountId: string): Promise<Decimal> {
        const account = await prisma.account.findUnique({ where: { id: accountId } });
        if (!account) return new Decimal(0);

        const aggs = await prisma.ledgerTransaction.groupBy({
            by: ['accountId'],
            where: { accountId },
            _sum: {
                debit: true,
                credit: true
            }
        });

        if (aggs.length === 0) return new Decimal(0);

        const { debit, credit } = aggs[0]._sum;
        const totalDebit = debit || new Decimal(0);
        const totalCredit = credit || new Decimal(0);

        // Determine Sign based on Category/Type
        // Bank (ASSET) -> Normal Debit
        // CC (LIABILITY) -> Normal Credit

        if (account.category === 'ASSET' || account.type === 'BANK' || account.type === 'CASH') {
            return totalDebit.minus(totalCredit);
        } else {
            // Liability
            return totalCredit.minus(totalDebit);
        }
    }
}
