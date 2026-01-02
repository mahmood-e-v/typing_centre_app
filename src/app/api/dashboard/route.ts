import { NextResponse } from 'next/server';
import { getSession } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard-service";

export async function GET(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const requestedBranchId = searchParams.get('branchId') || session.user.branchId;

        const { enforceBranchIsolation } = await import("@/lib/authorization");
        const isAllowed = await enforceBranchIsolation(session, requestedBranchId || undefined);
        const branchId = isAllowed ? requestedBranchId : session.user.branchId;

        const data = await getDashboardData(session.user.companyId, branchId || undefined);

        return NextResponse.json(data);

    } catch (error: any) {
        console.error("Dashboard API Error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch dashboard data" }, { status: 500 });
    }
}
