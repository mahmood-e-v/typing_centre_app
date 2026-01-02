import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { withPermission } from "@/lib/authorization";

/**
 * GET /api/audit-logs - Get audit logs with filtering
 */
export const GET = withPermission("audit.view", async (req: NextRequest) => {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const module = searchParams.get("module");
        const userId = searchParams.get("userId");
        const action = searchParams.get("action");
        const limit = parseInt(searchParams.get("limit") || "100");
        const offset = parseInt(searchParams.get("offset") || "0");

        const filter: any = {
            companyId: session.user.companyId,
        };

        if (module) filter.module = module;
        if (userId) filter.userId = userId;
        if (action) filter.action = action;

        const [logs, total] = await Promise.all([
            prisma.auditLog.findMany({
                where: filter,
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            username: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
                orderBy: { timestamp: "desc" },
                take: limit,
                skip: offset,
            }),
            prisma.auditLog.count({ where: filter }),
        ]);

        return NextResponse.json({
            logs,
            total,
            limit,
            offset,
        });
    } catch (error) {
        console.error("Get audit logs error:", error);
        return NextResponse.json(
            { error: "Failed to fetch audit logs" },
            { status: 500 }
        );
    }
});
