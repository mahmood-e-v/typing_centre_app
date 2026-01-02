import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { withPermission } from "@/lib/authorization";
import { prisma } from "@/lib/db";

// GET - List all financial periods
export const GET = withPermission("period.view", async (req: NextRequest) => {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const year = searchParams.get("year");

        const where: any = {
            companyId: session.user.companyId,
        };

        if (year) {
            where.year = parseInt(year);
        }

        const periods = await prisma.financialPeriod.findMany({
            where,
            orderBy: [
                { year: "desc" },
                { month: "desc" },
            ],
            include: {
                accountingLockedBy: {
                    select: { username: true, firstName: true, lastName: true }
                },
                vatLockedBy: {
                    select: { username: true, firstName: true, lastName: true }
                },
                lastUnlockedBy: {
                    select: { username: true, firstName: true, lastName: true }
                }
            }
        });

        return NextResponse.json({ periods });
    } catch (error) {
        console.error("Error fetching periods:", error);
        return NextResponse.json(
            { error: "Failed to fetch periods" },
            { status: 500 }
        );
    }
});
