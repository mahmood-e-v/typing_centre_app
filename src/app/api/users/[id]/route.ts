
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { enforceBranchIsolation } from '@/lib/authorization';
import bcrypt from 'bcryptjs';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session || !session.user.companyId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { username, password, roleIds, branchId, firstName, lastName } = body;

        // 1. Fetch existing user to check permissions
        const existingUser = await prisma.user.findUnique({
            where: { id },
            include: { userRoles: true }
        });

        if (!existingUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // 2. Enforce Branch Isolation (Target User)
        // You generally can only edit users in your allowed branches
        // If you are MAIN branch, you can edit anyone. If you are SUB branch, only your branch.
        const isAllowedTarget = await enforceBranchIsolation(session, existingUser.branchId || undefined);
        if (!isAllowedTarget) {
            return NextResponse.json({ error: "Forbidden - Cannot edit users from restricted branches" }, { status: 403 });
        }

        // 3. Enforce Branch Isolation (New Branch)
        if (branchId && branchId !== existingUser.branchId) {
            const isAllowedNew = await enforceBranchIsolation(session, branchId);
            if (!isAllowedNew) {
                return NextResponse.json({ error: "Forbidden - Cannot assign to restricted branch" }, { status: 403 });
            }
        }

        // 4. Prepare update data
        const updateData: any = {
            firstName,
            lastName
        };

        if (username) updateData.username = username;
        if (branchId) updateData.branchId = branchId;

        // Password update
        if (password && password.trim() !== "") {
            updateData.password = await bcrypt.hash(password, 12);
        }

        // Role update
        if (roleIds && roleIds.length > 0) {
            // Fetch role code
            const role = await prisma.role.findUnique({
                where: { id: roleIds[0] }
            });
            if (role) {
                // Map to legacy enum
                let legacyRole = 'EMPLOYEE';
                if (role.code === 'ADMIN' || role.code === 'SUPER_ADMIN' || role.code === 'OWNER') {
                    legacyRole = 'ADMIN';
                }
                updateData.role = legacyRole;
            }

            // Delete existing roles and create new ones
            await prisma.userRole.deleteMany({
                where: { userId: id }
            });

            updateData.userRoles = {
                create: roleIds.map((roleId: string) => ({
                    roleId
                }))
            };
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json({ user: updatedUser });

    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
