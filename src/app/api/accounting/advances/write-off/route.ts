import { NextResponse } from 'next/server';
import { getSession } from "@/lib/auth";
import { writeOffCustomerAdvance, getPartnerBalance } from "@/lib/accounting-service";
import { enforcePeriodLock, LockType } from "@/lib/financial-periods";
import { Decimal } from "@prisma/client/runtime/library";

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: "Access denied. Admin only." }, { status: 403 });
        }

        const body = await req.json();
        const { partnerId, amount, description, date } = body;

        if (!partnerId || !amount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 1. Check if user has enough advance to write off
        const netBalance = await getPartnerBalance(session.user.companyId, partnerId);
        const availableAdvance = netBalance.lt(0) ? netBalance.abs() : new Decimal(0);

        if (availableAdvance.lt(new Decimal(amount))) {
            return NextResponse.json({ error: `Insufficient advance balance to write off. Available: ${availableAdvance}` }, { status: 400 });
        }

        const writeOffDate = date ? new Date(date) : new Date();

        // 🔒 ENFORCE PERIOD LOCK
        await enforcePeriodLock(
            session.user.companyId,
            writeOffDate,
            LockType.ACCOUNTING,
            "write-off advance"
        );

        const journal = await writeOffCustomerAdvance({
            companyId: session.user.companyId,
            branchId: session.user.branchId || undefined,
            partnerId,
            amount: parseFloat(amount),
            description,
        });

        return NextResponse.json({ success: true, journalId: journal.id });
    } catch (error: any) {
        console.error("Advance Write-off Error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
