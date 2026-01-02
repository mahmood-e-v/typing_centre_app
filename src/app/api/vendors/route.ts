
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const q = searchParams.get('q');

        const vendors = await prisma.vendor.findMany({
            where: q ? {
                name: { contains: q, mode: 'insensitive' }
            } : {},
            orderBy: { name: 'asc' },
        });
        return NextResponse.json(vendors);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const vendor = await prisma.vendor.upsert({
            where: {
                companyId_name: {
                    companyId: session.user.companyId,
                    name: body.name
                }
            },
            update: {},
            create: {
                name: body.name,
                companyId: session.user.companyId,
                phone: body.phone,
                email: body.email,
                address: body.address
            }
        });
        return NextResponse.json(vendor);
    } catch (error) {
        console.error("Vendor Create Error:", error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
