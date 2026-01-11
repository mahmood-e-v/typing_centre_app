
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';


export async function GET() {
    try {
        const workTypes = await prisma.workType.findMany({
            orderBy: { description: 'asc' },
            include: { defaultDocumentType: true } // Include config
        });

        // Serialize Decimals to Numbers for JSON
        const serialized = workTypes.map(wt => ({
            ...wt,
            presetGovFee: Number(wt.presetGovFee?.toString() || 0),
            presetTypingCharge: Number(wt.presetTypingCharge?.toString() || 0),
            vatRate: Number(wt.vatRate?.toString() || 5),
            // New fields are auto-compatible
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
        const { description, presetGovFee, presetTypingCharge, vatApplicable, vatRate, tracksExpiry, defaultDocumentTypeId, defaultReminderDays } = body;

        const workType = await prisma.workType.create({
            data: {
                description,
                companyId: session.user.companyId,
                presetGovFee: presetGovFee?.toString() || "0",
                presetTypingCharge: presetTypingCharge?.toString() || "0",
                vatApplicable: vatApplicable !== undefined ? vatApplicable : true,
                vatRate: vatRate?.toString() || "5",
                tracksExpiry: tracksExpiry || false,
                defaultDocumentTypeId: defaultDocumentTypeId || null,
                defaultReminderDays: defaultReminderDays ? Number(defaultReminderDays) : 30
            }
        });
        return NextResponse.json(workType);
    } catch (error) {
        console.error("WorkType Create Error:", error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { id, description, presetGovFee, presetTypingCharge, tracksExpiry, defaultDocumentTypeId, defaultReminderDays } = body;

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        const workType = await prisma.workType.update({
            where: { id, companyId: session.user.companyId },
            data: {
                description,
                presetGovFee: presetGovFee?.toString(),
                presetTypingCharge: presetTypingCharge?.toString(),
                tracksExpiry,
                defaultDocumentTypeId,
                defaultReminderDays: defaultReminderDays ? Number(defaultReminderDays) : undefined
            }
        });
        return NextResponse.json(workType);
    } catch (error) {
        console.error("WorkType Update Error:", error);
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}
