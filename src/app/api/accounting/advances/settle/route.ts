import { NextResponse } from 'next/server';
import { getSession } from "@/lib/auth";
import { settleAdvanceAgainstAR, getPartnerBalance } from "@/lib/accounting-service";
import { enforcePeriodLock, LockType } from "@/lib/financial-periods";
import { Decimal } from "@prisma/client/runtime/library";

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { partnerId, invoiceId, amount, date } = body;

        if (!partnerId || !invoiceId || !amount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 1. Check if user has enough advance
        const netBalance = await getPartnerBalance(session.user.companyId, partnerId);
        // Net Balance = AR - Advance. If -1000, they have 1000 advance.
        const availableAdvance = netBalance.lt(0) ? netBalance.abs() : new Decimal(0);

        if (availableAdvance.lt(new Decimal(amount))) {
            return NextResponse.json({ error: `Insufficient advance balance. Available: ${availableAdvance}` }, { status: 400 });
        }

        const settlementDate = date ? new Date(date) : new Date();

        // 🔒 ENFORCE PERIOD LOCK
        await enforcePeriodLock(
            session.user.companyId,
            settlementDate,
            LockType.ACCOUNTING,
            "settle advance"
        );

        const journal = await settleAdvanceAgainstAR({
            companyId: session.user.companyId,
            branchId: session.user.branchId || undefined,
            partnerId,
            invoiceId,
            amount: parseFloat(amount),
        });

        return NextResponse.json({ success: true, journalId: journal.id });
    } catch (error: any) {
        console.error("Advance Settlement Error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
