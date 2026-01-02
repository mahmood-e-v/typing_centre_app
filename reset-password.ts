import { PrismaClient } from './src/generated/client_v2/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function resetPassword() {
    console.log('🔐 Resetting admin password...');

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Update the admin user
        const updatedUser = await prisma.user.update({
            where: { email: 'admin@typingcentre.ae' },
            data: {
                password: hashedPassword,
                forcePasswordChange: false, // Allow login without forcing password change
                failedLoginAttempts: 0,
                lockedUntil: null,
            },
        });

        console.log('✅ Password reset successfully!');
        console.log('📧 Email: admin@typingcentre.ae');
        console.log('🔑 Password: admin123');
        console.log('');
        console.log('⚠️  Please change this password after logging in!');
    } catch (error) {
        console.error('❌ Error resetting password:', error);
        process.exit(1);
    }
}

resetPassword()
    .catch((e) => {
        console.error('❌ Failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
