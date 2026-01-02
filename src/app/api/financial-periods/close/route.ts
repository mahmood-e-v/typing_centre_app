import { NextRequest, NextResponse } from "next/server";
import { getSession, createAuditLog, getClientIp, getUserAgent } from "@/lib/auth";
import { lockPeriod, LockType } from "@/lib/financial-periods";
import { withPermission } from "@/lib/authorization";

export const POST = withPermission("period.close", async (req: NextRequest) => {
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

        await lockPeriod(
            session.user.companyId,
            parseInt(year),
            parseInt(month),
            LockType.ACCOUNTING,
            session.user.id
        );

        // Create audit log
        await createAuditLog({
            companyId: session.user.companyId,
            userId: session.user.id,
            action: "PERIOD_CLOSED",
            module: "financial-period",
            recordId: `${year}-${month}`,
            recordType: "FinancialPeriod",
            newValue: { year, month, isLocked: true },
            ipAddress: getClientIp(req),
            userAgent: getUserAgent(req),
        });

        return NextResponse.json({
            success: true,
            message: `Period ${year}-${month} closed successfully`,
        });
    } catch (error: any) {
        console.error("Error closing period:", error);
        return NextResponse.json(
            { error: error.message || "Failed to close period" },
            { status: 500 }
        );
    }
});
