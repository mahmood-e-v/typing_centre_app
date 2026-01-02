import { NextResponse } from 'next/server';
import { getSession } from "@/lib/auth";
import { closeDay } from "@/lib/report-service";

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // Only MANAGERS or ADMINS can close the day
        if (session.user.role !== 'BRANCH_MANAGER' && session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: "Only Managers or Admins can perform day-close" }, { status: 403 });
        }

        const body = await request.json();
        const { date, branchId } = body;

        const finalBranchId = branchId || session.user.branchId;
        if (!finalBranchId) {
            return NextResponse.json({ error: "Branch ID required" }, { status: 400 });
        }

        // Access check
        if (session.user.role !== 'ADMIN' && session.user.branchId !== finalBranchId) {
            return NextResponse.json({ error: "Unauthorized for this branch" }, { status: 403 });
        }

        const closeDate = new Date(date || new Date());
        const result = await closeDay(session.user.companyId, finalBranchId, closeDate, session.user.id);

        return NextResponse.json({
            message: "Day successfully closed and snapshotted",
            result
        });

    } catch (error: any) {
        console.error("Day Close Error:", error);
        return NextResponse.json({ error: error.message || "Failed to close day" }, { status: 500 });
    }
}
