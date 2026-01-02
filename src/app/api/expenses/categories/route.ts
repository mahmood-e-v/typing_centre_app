
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        const categories = await prisma.expenseCategory.findMany({
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { name, description } = await request.json();
        const category = await prisma.expenseCategory.create({
            data: {
                name,
                description,
                companyId: session.user.companyId
            }
        });
        return NextResponse.json(category);
    } catch (error) {
        console.error("Expense Category Create Error:", error);
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}
