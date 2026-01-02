import { prisma } from "@/lib/db";
import { FinancialPeriod, Prisma } from "@/generated/client_v2";

export enum LockType {
    ACCOUNTING = "ACCOUNTING",
    VAT = "VAT",
}

export class PeriodLockError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PeriodLockError";
    }
}

/**
 * Generate periods for a company from start date to current month
 */
export async function generatePeriodsForCompany(companyId: string): Promise<void> {
    const company = await prisma.company.findUnique({
        where: { id: companyId },
        select: { startDate: true },
    });

    if (!company) throw new Error("Company not found");

    const startDate = new Date(company.startDate);
    const today = new Date();

    // Default to at least one period if startDate is future or invalid (fallback)
    let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    if (isNaN(currentDate.getTime())) {
        currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
    }

    // Generate up to current month (or next month if needed)
    while (currentDate <= today || (currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear())) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;

        // Check/Create
        await prisma.financialPeriod.upsert({
            where: {
                companyId_year_month: {
                    companyId,
                    year,
                    month,
                },
            },
            update: {}, // No update needed if exists
            create: {
                companyId,
                year,
                month,
                periodStart: new Date(year, month - 1, 1),
                // Last day of month: day 0 of next month
                periodEnd: new Date(year, month, 0, 23, 59, 59, 999),
                accountingLocked: false,
                vatLocked: false,
            },
        });

        // Advance to next month
        currentDate.setMonth(currentDate.getMonth() + 1);

        // Safety break for loop (e.g. max 10 years ahead)
        if (currentDate.getFullYear() > today.getFullYear() + 2) break;
    }
}

/**
 * Enforce period lock - throws error if locked
 */
export async function enforcePeriodLock(
    companyId: string,
    transactionDate: Date,
    lockType: LockType,
    action: string
): Promise<void> {
    const year = transactionDate.getFullYear();
    const month = transactionDate.getMonth() + 1;

    // 1. Check company-level global lock
    const company = await prisma.company.findUnique({
        where: { id: companyId },
        select: { lockedUntil: true },
    });

    if (company?.lockedUntil && transactionDate < company.lockedUntil) {
        const dateStr = company.lockedUntil.toISOString().split("T")[0];
        throw new PeriodLockError(
            `Cannot ${action} - Company is globally locked until ${dateStr}`
        );
    }

    // 2. Find or Create Period
    let period = await prisma.financialPeriod.findUnique({
        where: {
            companyId_year_month: {
                companyId,
                year,
                month,
            },
        },
        include: {
            accountingLockedBy: { select: { username: true } },
            vatLockedBy: { select: { username: true } },
        }
    });

    if (!period) {
        // Auto-generate if missing (lazy generation)
        await generatePeriodsForCompany(companyId);
        // Fetch again
        period = await prisma.financialPeriod.findUnique({
            where: {
                companyId_year_month: { companyId, year, month },
            },
            include: {
                accountingLockedBy: { select: { username: true } },
                vatLockedBy: { select: { username: true } },
            }
        });

        if (!period) {
            // Should not happen, but safe fallback
            return;
        }
    }

    // 3. Check Year-End Close
    if (period.isYearEndClosed) {
        throw new PeriodLockError(
            `Cannot ${action} - Financial Period ${month}/${year} is closed for year-end.`
        );
    }

    // 4. Check Specific Lock
    if (lockType === LockType.ACCOUNTING && period.accountingLocked) {
        const locker = period.accountingLockedBy?.username || "Admin";
        const dateStr = period.accountingLockedAt?.toLocaleDateString() || "";
        throw new PeriodLockError(
            `Cannot ${action} - Accounting Period ${month}/${year} is LOCKED by ${locker} on ${dateStr}.`
        );
    }

    if (lockType === LockType.VAT && period.vatLocked) {
        const locker = period.vatLockedBy?.username || "Admin";
        const dateStr = period.vatLockedAt?.toLocaleDateString() || "";
        throw new PeriodLockError(
            `Cannot ${action} - VAT Period ${month}/${year} is LOCKED by ${locker} on ${dateStr}.`
        );
    }

    // 5. Check Daily Branch Close
    // Some actions might not pass branchId, but if they do, we check it.
    // We'll try to find any existing branchId from context or allow it to be passed.
}

/**
 * Enhanced check for daily closing (used within api handlers)
 */
export async function enforceDailyLock(
    companyId: string,
    branchId: string | undefined,
    date: Date,
    action: string
): Promise<void> {
    if (!branchId) return;

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const closing = await prisma.dailyClosing.findUnique({
        where: {
            companyId_branchId_date: {
                companyId,
                branchId,
                date: startOfDay,
            },
        },
    });

    if (closing?.status === "CLOSED") {
        throw new PeriodLockError(
            `Cannot ${action} - Day ${startOfDay.toLocaleDateString()} is officially CLOSED for this branch. Re-opening requires Admin approval.`
        );
    }
}

/**
 * Lock a period
 */
export async function lockPeriod(
    companyId: string,
    year: number,
    month: number,
    lockType: LockType,
    userId: string
): Promise<FinancialPeriod> {
    const data: any = {};
    if (lockType === LockType.ACCOUNTING) {
        data.accountingLocked = true;
        data.accountingLockedAt = new Date();
        data.accountingLockedById = userId;
    } else {
        data.vatLocked = true;
        data.vatLockedAt = new Date();
        data.vatLockedById = userId;
    }

    return await prisma.financialPeriod.update({
        where: {
            companyId_year_month: { companyId, year, month },
        },
        data,
    });
}

/**
 * Unlock a period
 */
export async function unlockPeriod(
    companyId: string,
    year: number,
    month: number,
    lockType: LockType,
    userId: string,
    reason: string
): Promise<FinancialPeriod> {
    const data: any = {};

    // Validate reason length
    if (!reason || reason.trim().length < 20) {
        throw new Error("Unlock reason must be at least 20 characters describing why this is necessary.");
    }

    if (lockType === LockType.ACCOUNTING) {
        data.accountingLocked = false;
        data.accountingLockedAt = null;
        data.accountingLockedById = null;
    } else {
        data.vatLocked = false;
        data.vatLockedAt = null;
        data.vatLockedById = null;
    }

    // Log the unlock
    data.lastUnlockReason = reason;
    data.lastUnlockedAt = new Date();
    data.lastUnlockedById = userId;

    return await prisma.financialPeriod.update({
        where: {
            companyId_year_month: { companyId, year, month },
        },
        data,
    });
}

/**
 * Close a financial year
 * Locks all periods in the year and marks them as closed.
 */
export async function closeFinancialYear(
    companyId: string,
    year: number,
    userId: string
): Promise<void> {
    // 1. Ensure all periods exist
    await generatePeriodsForCompany(companyId);

    // 2. Update all periods for the year
    await prisma.financialPeriod.updateMany({
        where: {
            companyId,
            year,
        },
        data: {
            isYearEndClosed: true,
            yearEndClosedAt: new Date(),
            yearEndClosedById: userId,
            accountingLocked: true, // Auto-lock accounting
            vatLocked: true,       // Auto-lock VAT
        }
    });
}
