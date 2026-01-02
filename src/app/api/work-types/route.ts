import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';


export async function GET() {
    try {
        const workTypes = await prisma.workType.findMany({
            orderBy: { description: 'asc' },
        });

        // Serialize Decimals to Numbers for JSON
        const serialized = workTypes.map(wt => ({
            ...wt,
            presetGovFee: Number(wt.presetGovFee?.toString() || 0),
            presetTypingCharge: Number(wt.presetTypingCharge?.toString() || 0),
            vatRate: Number(wt.vatRate?.toString() || 5),
        }));

        return NextResponse.json(serialized);
    } catch (error) {
        console.error("Fetch WorkTypes Error:", error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { description, presetGovFee, presetTypingCharge, vatApplicable, vatRate } = body;

        const workType = await prisma.workType.create({
            data: {
                description,
                companyId: session.user.companyId,
                presetGovFee: presetGovFee?.toString() || "0",
                presetTypingCharge: presetTypingCharge?.toString() || "0",
                vatApplicable: vatApplicable !== undefined ? vatApplicable : true,
                vatRate: vatRate?.toString() || "5",
            },
            select: {
                id: true,
                description: true,
                presetGovFee: true,
                presetTypingCharge: true,
                vatApplicable: true,
                vatRate: true,
                companyId: true,
            }
        });
        return NextResponse.json(workType);
    } catch (error) {
        console.error("WorkType Create Error:", error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}
