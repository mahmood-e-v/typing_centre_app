
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const categories = await prisma.expenseCategory.findMany({
            where: { companyId: session.user.companyId },
            include: { ledgerAccount: true },
            orderBy: { name: 'asc' },
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const category = await prisma.expenseCategory.create({
            data: {
                name: body.name,
                description: body.description,
                ledgerAccountId: body.ledgerAccountId,
                companyId: session.user.companyId
            }
        });
        return NextResponse.json(category);
    } catch (error: any) {
        console.error("Expense Category Create Error:", error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'Category with this name already exists' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
