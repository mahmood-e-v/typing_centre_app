import { NextResponse } from 'next/server';
import { getSession } from "@/lib/auth";
import { receiveCustomerAdvance } from "@/lib/accounting-service";
import { enforcePeriodLock, LockType } from "@/lib/financial-periods";

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { partnerId, amount, paymentMethod, bankAccountId, description, date } = body;

        if (!partnerId || !amount || !bankAccountId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const receiptDate = date ? new Date(date) : new Date();

        // 🔒 ENFORCE PERIOD LOCK
        await enforcePeriodLock(
            session.user.companyId,
            receiptDate,
            LockType.ACCOUNTING,
            "receive advance"
        );

        const journal = await receiveCustomerAdvance({
            companyId: session.user.companyId,
            branchId: session.user.branchId || undefined,
            partnerId,
            amount: parseFloat(amount),
            paymentMethod,
            bankAccountId,
            description,
        });

        return NextResponse.json({ success: true, journalId: journal.id });
    } catch (error: any) {
        console.error("Advance Receipt Error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
