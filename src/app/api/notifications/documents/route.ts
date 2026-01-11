
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days') || '30');

    try {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + days);

        // Fetch Expiring or Expired Records
        const documents = await prisma.customerDocument.findMany({
            where: {
                companyId: session.user.companyId,
                status: { in: ['ACTIVE', 'EXPIRING_SOON', 'EXPIRED'] },
                expiryDate: {
                    lte: futureDate
                }
            },
            include: {
                documentType: true,
                partner: { select: { name: true, phone: true, email: true } },
                beneficiary: { select: { name: true } }
            },
            orderBy: {
                expiryDate: 'asc'
            }
        });

        const serialized = documents.map(doc => {
            const exp = new Date(doc.expiryDate!);
            const diffTime = exp.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return {
                id: doc.id,
                type: doc.documentType.name,
                number: doc.documentNumber,
                expiryDate: doc.expiryDate,
                daysRemaining: diffDays,
                status: diffDays < 0 ? 'EXPIRED' : 'EXPIRING_SOON',
                ownerName: doc.beneficiary?.name || doc.partner?.name || 'Unknown',
                phone: doc.partner?.phone || 'N/A',
                email: doc.partner?.email || 'N/A'
            };
        });

        return NextResponse.json({
            count: serialized.length,
            documents: serialized
        });

    } catch (error) {
        console.error("Notifications API Error:", error);
        return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
    }
}
