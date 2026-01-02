import { NextResponse } from 'next/server';
import { getSession } from "@/lib/auth";
import { getDailySummary } from "@/lib/report-service";
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const dateStr = searchParams.get('date') || new Date().toISOString().split('T')[0];
        const branchId = searchParams.get('branchId') || session.user.branchId;

        if (!branchId) {
            return NextResponse.json({ error: "Branch ID is required" }, { status: 400 });
        }

        const { enforceBranchIsolation } = await import("@/lib/authorization");
        const isAllowed = await enforceBranchIsolation(session, branchId);

        if (!isAllowed) {
            return NextResponse.json({ error: "Access denied to this branch data" }, { status: 403 });
        }

        const date = new Date(dateStr);
        const summary = await getDailySummary(session.user.companyId, branchId, date);

        // Also check if day is closed
        const closing = await prisma.dailyClosing.findUnique({
            where: {
                companyId_branchId_date: {
                    companyId: session.user.companyId,
                    branchId,
                    date: new Date(date.setHours(0, 0, 0, 0))
                }
            }
        });

        return NextResponse.json({
            ...summary,
            status: closing?.status || 'OPEN',
            closedAt: closing?.closedAt,
            closedBy: closing?.closedById
        });

    } catch (error: any) {
        console.error("Daily Report Error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch report" }, { status: 500 });
    }
}
