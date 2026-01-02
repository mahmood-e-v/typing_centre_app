import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const quotation = await prisma.quotation.findUnique({
            where: { id },
            include: {
                partner: { select: { id: true, name: true, phone: true, email: true } },
                salesperson: { select: { username: true } },
                invoices: { select: { invoiceNo: true, status: true } },
                approvedBy: { select: { username: true } },
                items: { include: { workType: true } }
            }
        });

        if (!quotation) {
            return NextResponse.json({ error: "Quotation not found" }, { status: 404 });
        }

        // Soft delete check?
        // Ideally we filter out soft deleted ones in main list, but allow fetching if ID known?
        // Or return 404. Let's return 404 if deleted.
        if (quotation.deletedAt) {
            return NextResponse.json({ error: "Quotation deleted" }, { status: 410 }); // Gone
        }

        return NextResponse.json(quotation);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch quotation" }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { status, action } = body;

        const quotation = await prisma.quotation.findUnique({
            where: { id },
        });

        if (!quotation || quotation.deletedAt) return NextResponse.json({ error: "Quotation not found" }, { status: 404 });

        // Status update logic
        if (action === 'CANCEL') {
            if (quotation.status === 'CONVERTED' || quotation.status === 'PARTIALLY_INVOICED') {
                return NextResponse.json({ error: "Cannot cancel a converted quotation" }, { status: 400 });
            }
            const updated = await prisma.quotation.update({
                where: { id },
                data: { status: 'CANCELLED' }
            });
            return NextResponse.json(updated);
        }

        // Approval Logic
        if (action === 'APPROVE') {
            // Check permission? For now assume 'ADMIN' or 'BRANCH_MANAGER'
            // Simpler: Just allow if role is high enough.
            const allowedRoles = ['ADMIN', 'BRANCH_MANAGER', 'OWNER', 'SUPER_ADMIN'];
            if (!allowedRoles.includes(session.user.role)) {
                return NextResponse.json({ error: "Permission denied" }, { status: 403 });
            }

            const updated = await prisma.quotation.update({
                where: { id },
                data: {
                    status: 'ACCEPTED', // Approve -> Accepted usually? Or internal "APPROVED" status?
                    // User requested "Only APPROVED / ACCEPTED quotations can be converted".
                    // Let's treat ACCEPTED as Approved for now, or use distinct status.
                    // Schema has ACCEPTED. Let's use that.
                    approvedById: session.user.id,
                    approvedAt: new Date()
                }
            });
            return NextResponse.json(updated);
        }

        if (action === 'UPDATE_STATUS' && status) {
            // Prevent setting to ACCEPTED manually if approval required?
            // User said: "Permission: quotation.approve. Rule: Only APPROVED / ACCEPTED quotations can be converted"
            // If manual "Mark as Accepted" is same as "Approve", then check role.
            if (status === 'ACCEPTED') {
                const allowedRoles = ['ADMIN', 'BRANCH_MANAGER', 'OWNER', 'SUPER_ADMIN'];
                if (!allowedRoles.includes(session.user.role)) {
                    return NextResponse.json({ error: "Approval required to mark as ACCEPTED" }, { status: 403 });
                }
                // Also record approval
                const updated = await prisma.quotation.update({
                    where: { id },
                    data: {
                        status,
                        approvedById: session.user.id,
                        approvedAt: new Date()
                    }
                });
                return NextResponse.json(updated);
            }

            const updated = await prisma.quotation.update({
                where: { id },
                data: { status }
            });
            return NextResponse.json(updated);
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });

    } catch (error) {
        return NextResponse.json({ error: "Failed to update quotation" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const quotation = await prisma.quotation.findUnique({
            where: { id },
        });

        if (!quotation) return NextResponse.json({ error: "Quotation not found" }, { status: 404 });

        // Soft Delete (User Requirement 3.1)
        // Prevent if converted?
        if (quotation.status === 'CONVERTED' || quotation.status === 'PARTIALLY_INVOICED') {
            return NextResponse.json({ error: "Cannot delete a converted quotation" }, { status: 400 });
        }

        await prisma.quotation.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                status: 'CANCELLED' // Explicitly cancel too?
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete quotation" }, { status: 500 });
    }
}
