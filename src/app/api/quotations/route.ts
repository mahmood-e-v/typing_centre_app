import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const search = searchParams.get('q');
        const status = searchParams.get('status');
        const partnerId = searchParams.get('partnerId');

        const where: any = {
            companyId: session.user.companyId
        };

        if (status) {
            where.status = status;
        }

        if (partnerId) {
            where.partnerId = partnerId;
        }

        if (search) {
            where.OR = [
                { quotationNo: { contains: search, mode: 'insensitive' } },
                { partner: { name: { contains: search, mode: 'insensitive' } } },
                { beneficiaryName: { contains: search, mode: 'insensitive' } }
            ];
        }

        const quotations = await prisma.quotation.findMany({
            where,
            include: {
                partner: { select: { name: true, phone: true } },
                salesperson: { select: { username: true } },
                invoices: { select: { invoiceNo: true } },
                approvedBy: { select: { username: true } }
            },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        return NextResponse.json(quotations);
    } catch (error) {
        console.error("Fetch quotations error:", error);
        return NextResponse.json({ error: "Failed to fetch quotations" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { header, items } = body;

        // Auto-generate ID: Q-YYYYMM-XXXX
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const prefix = `Q-${year}${month}`;

        // Get last number
        const lastQuotation = await prisma.quotation.findFirst({
            where: {
                companyId: session.user.companyId,
                quotationNo: { startsWith: prefix }
            },
            orderBy: { quotationNo: 'desc' }
        });

        let nextSeq = 1;
        if (lastQuotation) {
            const parts = lastQuotation.quotationNo.split('-');
            if (parts.length === 3) {
                nextSeq = parseInt(parts[2]) + 1;
            }
        }
        const quotationNo = `${prefix}-${String(nextSeq).padStart(4, '0')}`;

        const subtotal = items.reduce((sum: number, item: any) => sum + ((Number(item.typingCharge) || 0) * (item.quantity || 1)), 0);
        const totalGovFee = items.reduce((sum: number, item: any) => sum + ((Number(item.govFee) || 0) * (item.quantity || 1)), 0);
        const totalTax = items.reduce((sum: number, item: any) => sum + ((Number(item.taxAmount) || 0) * (item.quantity || 1)), 0);
        const grandTotal = subtotal + totalGovFee + totalTax;

        const quotation = await prisma.quotation.create({
            data: {
                companyId: session.user.companyId,
                quotationNo,
                date: new Date(header.date),
                validUntil: new Date(header.validUntil),
                partnerId: header.partnerId,
                beneficiaryName: header.beneficiaryName,
                salespersonId: session.user.id,
                branchId: session.user.branchId,
                notes: header.notes,
                subtotal,
                totalGovFee,
                totalTax,
                grandTotal,
                status: 'DRAFT',
                items: {
                    create: items.map((item: any) => ({
                        description: item.description,
                        workTypeId: item.workTypeId,
                        govFee: item.govFee,
                        typingCharge: item.typingCharge,
                        quantity: item.quantity || 1, // Store quantity
                        taxRate: item.taxRate || 5,
                        taxAmount: item.taxAmount,
                        total: item.total,
                        isVatApplicable: item.isVatApplicable ?? true
                    }))
                }
            }
        });

        return NextResponse.json(quotation);
    } catch (error) {
        console.error("Create quotation error:", error);
        return NextResponse.json({ error: "Failed to create quotation" }, { status: 500 });
    }
}
