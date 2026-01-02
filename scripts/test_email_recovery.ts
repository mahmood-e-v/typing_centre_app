
import { prisma } from '../src/lib/db';
import { generateResetToken, generateResetUrl } from '../src/lib/password-reset';

async function main() {
    console.log('🧪 Testing Email Recovery & Password Reset...');

    const testEmail = 'recovery_test@example.com';
    const testUsername = 'recovery_user';

    // 1. Clean up potential previous run
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await prisma.user.deleteMany({ where: { username: testUsername } });

    // 2. Create User with Email
    const user = await prisma.user.create({
        data: {
            email: testEmail,
            username: testUsername,
            password: 'password123',
            firstName: 'Recovery',
            lastName: 'Test',
            companyId: (await prisma.company.findFirstOrThrow()).id,
            isActive: true
        }
    });

    console.log(`✅ User created: ${user.username} (${user.email})`);

    // 3. Simulate API Logic for Forgot Password (Username Lookup)
    console.log('🔄 Testing lookup by USERNAME...');
    const userByUsername = await prisma.user.findFirst({
        where: {
            OR: [
                { email: testUsername },
                { username: testUsername }
            ]
        }
    });

    if (!userByUsername || userByUsername.id !== user.id) {
        throw new Error("❌ Failed to find user by username!");
    }
    console.log('✅ Found user by username');

    // 4. Simulate API Logic for Forgot Password (Email Lookup)
    console.log('🔄 Testing lookup by EMAIL...');
    const userByEmail = await prisma.user.findFirst({
        where: {
            OR: [
                { email: testEmail },
                { username: testEmail }
            ]
        }
    });

    if (!userByEmail || userByEmail.id !== user.id) {
        throw new Error("❌ Failed to find user by email!");
    }
    console.log('✅ Found user by email');

    // 5. Create Token (Simulate API)
    const token = await prisma.passwordResetToken.create({
        data: {
            userId: user.id,
            token: generateResetToken(),
            expiresAt: new Date(Date.now() + 15 * 60 * 1000),
            ipAddress: '127.0.0.1',
            userAgent: 'Test Script'
        }
    });

    console.log(`✅ Reset Token Created: ${token.token}`);

    // Clean up
    await prisma.user.delete({ where: { id: user.id } });
    console.log('🧹 Cleanup done.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
