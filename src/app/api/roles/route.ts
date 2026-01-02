import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        // Fetch all roles with their permissions and user counts
        const roles = await prisma.role.findMany({
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
                userRoles: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                username: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                name: 'asc',
            },
        });

        // Transform data for frontend
        const rolesData = roles.map((role) => {
            // Group permissions by module
            const permissionsByModule: Record<string, string[]> = {};

            role.permissions.forEach((rp) => {
                const module = rp.permission.module;
                if (!permissionsByModule[module]) {
                    permissionsByModule[module] = [];
                }
                permissionsByModule[module].push(rp.permission.action);
            });

            return {
                id: role.id,
                name: role.name,
                code: role.code,
                description: role.description,
                isSystem: role.isSystem,
                permissionCount: role.permissions.length,
                userCount: role.userRoles.length,
                permissions: permissionsByModule,
                users: role.userRoles.map((ur) => ({
                    id: ur.user.id,
                    email: ur.user.email,
                    username: ur.user.username,
                    name: `${ur.user.firstName || ''} ${ur.user.lastName || ''}`.trim() || ur.user.username,
                })),
            };
        });

        return NextResponse.json({ roles: rolesData });
    } catch (error) {
        console.error('Error fetching roles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch roles' },
            { status: 500 }
        );
    }
}
