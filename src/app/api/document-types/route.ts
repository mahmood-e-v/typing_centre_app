
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db'; // Assumes lib/db or similar exists
import { getSession } from '@/lib/auth'; // Assumes lib/auth

export async function GET(req: Request) {
    const session = await getSession();
    if (!session?.user?.companyId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type'); // Optional filter

    try {
        const docs = await prisma.documentType.findMany({
            where: {
                companyId: session.user.companyId,
            },
            orderBy: { name: 'asc' }
        });

        return NextResponse.json(docs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch document types' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getSession();
    if (!session?.user?.companyId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { name, description, issueAuthority, requiresNumber, requiresExpiry } = body;

        const doc = await prisma.documentType.create({
            data: {
                companyId: session.user.companyId,
                name,
                description,
                issueAuthority,
                requiresNumber: requiresNumber ?? true,
                requiresExpiry: requiresExpiry ?? true,
            }
        });

        return NextResponse.json(doc);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create document type' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await getSession();
    if (!session?.user?.companyId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { id, name, ...updates } = body;

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const doc = await prisma.documentType.update({
            where: { id, companyId: session.user.companyId },
            data: { name, ...updates }
        });

        return NextResponse.json(doc);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update document type' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getSession();
    if (!session?.user?.companyId) { // Admin check ideal
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    try {
        await prisma.documentType.delete({
            where: { id, companyId: session.user.companyId }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
