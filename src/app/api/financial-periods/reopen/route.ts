import { NextRequest, NextResponse } from "next/server";
import { getSession, createAuditLog, getClientIp, getUserAgent } from "@/lib/auth";
import { unlockPeriod, LockType } from "@/lib/financial-periods";
import { withPermission } from "@/lib/authorization";

export const POST = withPermission("period.reopen", async (req: NextRequest) => {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { year, month } = body;

        if (!year || !month) {
            return NextResponse.json(
                { error: "Year and month are required" },
                { status: 400 }
            );
        }

        await unlockPeriod(
            session.user.companyId,
            parseInt(year),
            parseInt(month),
            LockType.ACCOUNTING,
            session.user.id,
            "Reopened via Admin Panel" // Reasonable default reason
        );

        // Create audit log
        await createAuditLog({
            companyId: session.user.companyId,
            userId: session.user.id,
            action: "PERIOD_REOPENED",
            module: "financial-period",
            recordId: `${year}-${month}`,
            recordType: "FinancialPeriod",
            newValue: { year, month, isLocked: false },
            ipAddress: getClientIp(req),
            userAgent: getUserAgent(req),
        });

        return NextResponse.json({
            success: true,
            message: `Period ${year}-${month} reopened successfully`,
        });
    } catch (error: any) {
        console.error("Error reopening period:", error);
        return NextResponse.json(
            { error: error.message || "Failed to reopen period" },
            { status: 500 }
        );
    }
});
