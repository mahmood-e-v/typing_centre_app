
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { closeFinancialYear } from '@/lib/financial-periods';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { year } = await req.json();

        if (!year || typeof year !== 'number') {
            return NextResponse.json({ error: "Invalid year" }, { status: 400 });
        }

        // Check Permissions
        // Allow ADMIN, OWNER, or specific permission
        // Note: permissions field might not be typed in session yet if I didn't update types, 
        // but 'user.role' is standard.
        const isAuthorized =
            session.user.role === 'ADMIN' ||
            session.user.role === 'OWNER' ||
            (session.user.permissions && session.user.permissions.includes('period.year_end_close'));

        if (!isAuthorized) {
            return NextResponse.json({ error: "Insufficient permissions for Year-End Close" }, { status: 403 });
        }

        // Perform Close
        await closeFinancialYear(session.user.companyId, year, session.user.id);

        // Audit Log
        await prisma.auditLog.create({
            data: {
                companyId: session.user.companyId,
                action: 'YEAR_END_CLOSE',
                module: 'financial-period',
                recordType: 'FinancialPeriod',
                recordId: String(year),
                newValue: JSON.stringify({ details: `Closed financial year ${year}` }),
                userId: session.user.id
            }
        });

        return NextResponse.json({ success: true, message: `Financial Year ${year} closed successfully.` });

    } catch (error: any) {
        console.error("Year End Close Error:", error);
        return NextResponse.json({ error: error.message || "Failed to close financial year" }, { status: 500 });
    }
}
