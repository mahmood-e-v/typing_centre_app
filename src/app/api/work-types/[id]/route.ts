
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
        }

        // Check if service exists and belongs to company
        const existingService = await prisma.workType.findUnique({
            where: {
                id,
                companyId: session.user.companyId
            }
        });

        if (!existingService) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 });
        }

        // Delete the service
        await prisma.workType.delete({
            where: {
                id
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete Service Error:", error);
        return NextResponse.json(
            { error: "Failed to delete service" },
            { status: 500 }
        );
    }
}
