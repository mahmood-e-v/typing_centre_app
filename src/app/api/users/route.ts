
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession, hasPermission } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { getDataFilter, enforceBranchIsolation } from '@/lib/authorization';

export async function GET() {
    try {
        const session = await getSession();
        if (!session || !session.user.companyId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const users = await prisma.user.findMany({
            where: getDataFilter(session),
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                username: true,
                role: true,
                createdAt: true,
                branchId: true,
                branch: { select: { name: true } },
                userRoles: {
                    include: {
                        role: { select: { name: true, code: true } }
                    }
                }
            },
            orderBy: {
                firstName: 'asc'
            }
        });

        return NextResponse.json({ users });

    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || !session.user.companyId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { email, username, password, roleIds, firstName, lastName, branchId } = body;

        // Branch Isolation: Check if user can create in this branch
        const finalBranchId = branchId || session.user.branchId;
        const isAllowed = await enforceBranchIsolation(session, finalBranchId);
        if (!isAllowed) {
            return NextResponse.json({ error: "Forbidden - Branch access restricted" }, { status: 403 });
        }

        if (!roleIds || !Array.isArray(roleIds) || roleIds.length === 0 || roleIds.some((id: string) => !id || id.trim() === '')) {
            return NextResponse.json({ error: 'At least one valid Role is required' }, { status: 400 });
        }

        // Filter out any potential empty strings just in case
        const validRoleIds = roleIds.filter((id: string) => id && id.trim() !== '');

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and Password are required' }, { status: 400 });
        }

        const existing = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email: email || undefined }
                ]
            }
        });

        if (existing) {
            return NextResponse.json({ error: 'Username or Email already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // Fetch the primary role code
        let roleCode = 'EMPLOYEE';
        if (roleIds && roleIds.length > 0) {
            const role = await prisma.role.findUnique({
                where: { id: roleIds[0] }
            });
            if (role) {
                roleCode = role.code;
            }
        }

        // Map dynamic role to legacy enum (ADMIN or EMPLOYEE)
        let legacyRole = 'EMPLOYEE';
        if (roleCode === 'ADMIN' || roleCode === 'SUPER_ADMIN' || roleCode === 'OWNER') {
            legacyRole = 'ADMIN';
        }

        const user = await prisma.user.create({
            data: {
                companyId: session.user.companyId,
                username,
                email: email || `${username}@${session.user.company.code.toLowerCase()}.local`,
                password: hashedPassword,
                firstName: firstName || null,
                lastName: lastName || null,
                branchId: finalBranchId,
                role: legacyRole as any,
                userRoles: {
                    create: (validRoleIds || []).map((roleId: string) => ({
                        roleId
                    }))
                }
            }
        });

        return NextResponse.json({ user });

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
