import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * GET /api/permissions - List all permissions grouped by module
 */
export async function GET() {
    try {
        const permissions = await prisma.permission.findMany({
            orderBy: [{ module: "asc" }, { action: "asc" }],
        });

        // Group by module
        const grouped = permissions.reduce((acc: any, perm) => {
            if (!acc[perm.module]) {
                acc[perm.module] = [];
            }
            acc[perm.module].push(perm);
            return acc;
        }, {});

        return NextResponse.json({
            permissions,
            grouped,
        });
    } catch (error) {
        console.error("Get permissions error:", error);
        return NextResponse.json(
            { error: "Failed to fetch permissions" },
            { status: 500 }
        );
    }
}
