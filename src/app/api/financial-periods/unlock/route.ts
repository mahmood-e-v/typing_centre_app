import { NextRequest, NextResponse } from "next/server";
import { getSession, createAuditLog, getClientIp, getUserAgent } from "@/lib/auth";
import { unlockPeriod, LockType } from "@/lib/financial-periods";

export const POST = async (req: NextRequest) => {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { year, month, lockType, reason } = body;

        if (!year || !month || !lockType || !reason) {
            return NextResponse.json({ error: "Missing required fields (reason is mandatory)" }, { status: 400 });
        }

        // Strict Role Check: ONLY Owner or Super Admin
        const allowedRoles = ["OWNER", "SUPER_ADMIN"];
        // In some systems, current role ID might be checked, but here we check code
        // assuming session.user.role contains the code like "OWNER"
        if (!allowedRoles.includes(session.user.role || "")) {
            return NextResponse.json(
                { error: "Only Owners and Super Admins can unlock financial periods." },
                { status: 403 }
            );
        }

        const period = await unlockPeriod(
            session.user.companyId,
            year,
            month,
            lockType,
            session.user.id,
            reason
        );

        // Audit Log
        await createAuditLog({
            companyId: session.user.companyId,
            userId: session.user.id,
            action: "UNLOCK_PERIOD",
            module: "financial_period",
            recordId: period.id,
            recordType: "FinancialPeriod",
            newValue: { year, month, lockType, unlockedBy: session.user.username, reason },
            ipAddress: getClientIp(req),
            userAgent: getUserAgent(req),
        });

        return NextResponse.json({ success: true, period });
    } catch (error: any) {
        console.error("Unlock period error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to unlock period" },
            { status: 500 }
        );
    }
};
