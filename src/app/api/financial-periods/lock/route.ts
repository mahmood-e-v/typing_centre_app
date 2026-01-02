import { NextRequest, NextResponse } from "next/server";
import { getSession, createAuditLog, getClientIp, getUserAgent } from "@/lib/auth";
import { withPermission } from "@/lib/authorization";
import { lockPeriod, LockType } from "@/lib/financial-periods";

export const POST = async (req: NextRequest) => {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { year, month, lockType } = body;

        if (!year || !month || !lockType) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (lockType !== LockType.ACCOUNTING && lockType !== LockType.VAT) {
            return NextResponse.json({ error: "Invalid lock type" }, { status: 400 });
        }

        // Check specific permissions
        const hasAccountingPerm = session.user.permissions.includes("period.lock_accounting");
        const hasVatPerm = session.user.permissions.includes("period.lock_vat");

        if (lockType === LockType.ACCOUNTING && !hasAccountingPerm) {
            // Fallback for OWNER/SUPER_ADMIN if permission not explicitly assigned in older setup
            const isOwnerOrAdmin = ["OWNER", "SUPER_ADMIN", "ADMIN"].includes(session.user.role || "");
            if (!isOwnerOrAdmin) {
                return NextResponse.json({ error: "Permission denied for accounting lock" }, { status: 403 });
            }
        }

        if (lockType === LockType.VAT && !hasVatPerm) {
            const isOwnerOrAdmin = ["OWNER", "SUPER_ADMIN", "ADMIN"].includes(session.user.role || "");
            if (!isOwnerOrAdmin) {
                return NextResponse.json({ error: "Permission denied for VAT lock" }, { status: 403 });
            }
        }

        const period = await lockPeriod(
            session.user.companyId,
            year,
            month,
            lockType,
            session.user.id
        );

        // Audit Log
        await createAuditLog({
            companyId: session.user.companyId,
            userId: session.user.id,
            action: "LOCK_PERIOD",
            module: "financial_period",
            recordId: period.id,
            recordType: "FinancialPeriod",
            newValue: { year, month, lockType, lockedBy: session.user.username },
            ipAddress: getClientIp(req),
            userAgent: getUserAgent(req),
        });

        return NextResponse.json({ success: true, period });
    } catch (error: any) {
        console.error("Lock period error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to lock period" },
            { status: 500 }
        );
    }
};
