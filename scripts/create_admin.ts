
import { prisma } from '../src/lib/db';
import bcrypt from 'bcryptjs';

async function main() {
    const email = 'mahmoodev@gmail.com';
    const password = 'admin123';

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        console.log(`User ${email} already exists. Updating credentials...`);
    } else {
        console.log(`Creating new user: ${email}...`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const defaultCompany = await prisma.company.findFirst();
    if (!defaultCompany) throw new Error('No company found. Run seed first.');

    const adminRole = await prisma.role.findFirst({ where: { code: 'ADMIN' } });
    if (!adminRole) throw new Error('Admin role not found in database.');

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            companyId: defaultCompany.id,
            isActive: true,
            role: 'ADMIN', // Ensuring legacy role is also set
        },
        create: {
            email,
            username: 'mahmoodev',
            password: hashedPassword,
            firstName: 'Mahmood',
            lastName: 'Admin',
            companyId: defaultCompany.id,
            role: 'ADMIN',
            isActive: true,
        },
    });

    // Assign UserRole
    await prisma.userRole.upsert({
        where: {
            userId_roleId: {
                userId: user.id,
                roleId: adminRole.id
            }
        },
        create: {
            userId: user.id,
            roleId: adminRole.id
        },
        update: {}
    });

    console.log(`✅ Success! User details:`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Role: ADMIN`);
    console.log(`   Company: ${defaultCompany.name}`);
}

main()
    .catch(e => {
        console.error('Error creating admin user:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
