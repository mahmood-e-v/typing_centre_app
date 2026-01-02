
import { PrismaClient } from '../src/generated/client_v2';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function restoreAdmin() {
    try {
        console.log("Checking database...");

        // 1. Ensure Company Exists
        let company = await prisma.company.findFirst();
        if (!company) {
            console.log("No company found. Creating default company...");
            company = await prisma.company.create({
                data: {
                    name: "Typing Centre",
                    code: "UAE-TC-001",
                    startDate: new Date(),
                    fiscalYearStart: 1
                }
            });
            console.log("Company created:", company.id);
        } else {
            console.log("Company exists:", company.id);
        }

        // 2. Ensure Role Exists (if using dynamic roles)
        // Check if we need to link user to a role via UserRole or legacy 'role' field
        // Schema checks: User has 'role' field (legacy) but also UserRole relation.
        // Let's rely on the legacy field 'ADMIN' for now if possible, or check Role model.

        let adminRole = await prisma.role.findUnique({ where: { name: 'Admin' } });
        if (!adminRole) {
            adminRole = await prisma.role.findUnique({ where: { code: 'ADMIN' } });
        }

        if (!adminRole) {
            console.log("Creating Admin Role...");
            adminRole = await prisma.role.create({
                data: {
                    name: 'Admin',
                    code: 'ADMIN',
                    description: 'System Administrator',
                    isSystem: true
                }
            });
        }

        // 3. Create or Update Admin User
        const hashedPassword = await bcrypt.hash("password123", 12);
        const email = "admin@typing.local";
        const username = "admin";

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if (existingUser) {
            console.log("Admin user exists. Resetting password...");
            await prisma.user.update({
                where: { id: existingUser.id },
                data: {
                    password: hashedPassword,
                    companyId: company.id,
                    role: 'ADMIN', // specific for legacy enum
                    isActive: true,
                    lockedUntil: null,
                    failedLoginAttempts: 0
                }
            });

            // Ensure UserRole relation exists
            const existingRoleLink = await prisma.userRole.findFirst({
                where: { userId: existingUser.id, roleId: adminRole.id }
            });

            if (!existingRoleLink) {
                await prisma.userRole.create({
                    data: { userId: existingUser.id, roleId: adminRole.id }
                });
            }

            console.log("Admin password reset to 'password123'");
        } else {
            console.log("Creating new admin user...");
            const newUser = await prisma.user.create({
                data: {
                    email,
                    username,
                    password: hashedPassword,
                    firstName: "System",
                    lastName: "Admin",
                    companyId: company.id,
                    role: 'ADMIN',
                    userRoles: {
                        create: {
                            roleId: adminRole.id
                        }
                    }
                }
            });
            console.log("Admin user created.");
        }

    } catch (error) {
        console.error("Error restoring admin:", error);
    } finally {
        await prisma.$disconnect();
    }
}

restoreAdmin();
