import { NextResponse } from 'next/server';
import { getSession } from "@/lib/auth";
import { refundCustomerAdvance, getPartnerBalance } from "@/lib/accounting-service";
import { enforcePeriodLock, LockType } from "@/lib/financial-periods";
import { Decimal } from "@prisma/client/runtime/library";

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { partnerId, amount, bankAccountId, description, date } = body;

        if (!partnerId || !amount || !bankAccountId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 1. Check if user has enough advance to refund
        const netBalance = await getPartnerBalance(session.user.companyId, partnerId);
        const availableAdvance = netBalance.lt(0) ? netBalance.abs() : new Decimal(0);

        if (availableAdvance.lt(new Decimal(amount))) {
            return NextResponse.json({ error: `Insufficient advance balance to refund. Available: ${availableAdvance}` }, { status: 400 });
        }

        const refundDate = date ? new Date(date) : new Date();

        // 🔒 ENFORCE PERIOD LOCK
        await enforcePeriodLock(
            session.user.companyId,
            refundDate,
            LockType.ACCOUNTING,
            "refund advance"
        );

        const journal = await refundCustomerAdvance({
            companyId: session.user.companyId,
            branchId: session.user.branchId || undefined,
            partnerId,
            amount: parseFloat(amount),
            bankAccountId,
            description,
        });

        return NextResponse.json({ success: true, journalId: journal.id });
    } catch (error: any) {
        console.error("Advance Refund Error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
