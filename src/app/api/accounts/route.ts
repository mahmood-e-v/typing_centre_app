import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const accounts = await prisma.account.findMany({
            where: {
                companyId: session.user.companyId
            },
            include: { businessCards: true },
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(accounts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { name, type, balance } = body; // type is AccountType

        if (!name || !type) return NextResponse.json({ error: "Name and Type required" }, { status: 400 });

        // Auto-generate code
        const code = `ACC-${Date.now().toString().slice(-6)}`;

        // Determine Category (Heuristic)
        // Bank/Cash -> ASSET
        // Credit Card -> LIABILITY
        let category: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'INCOME' | 'EXPENSE' = 'ASSET';
        if (type === 'CREDIT_CARD') category = 'LIABILITY';

        const account = await prisma.account.create({
            data: {
                companyId: session.user.companyId,
                name,
                code,
                category,
                type: type, // 'BANK', 'CASH', 'CREDIT_CARD'
                balance: parseFloat(balance) || 0,
                linkedBranchIds: session.user.branchId ? [session.user.branchId] : []
            }
        });

        return NextResponse.json(account);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Creation failed" }, { status: 500 });
    }
}
