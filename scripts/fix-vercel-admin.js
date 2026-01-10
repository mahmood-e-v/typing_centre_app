const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// Create a new client instance
// This will pick up DATABASE_URL from environment
const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Connecting to database...');

    // Default credentials
    const NEW_PASSWORD = 'admin123';
    const NEW_EMAIL = 'admin@typingcentre.ae'; // Ensure this matches your login email

    console.log(`🔐 Resetting password for user "admin" to: ${NEW_PASSWORD}`);
    console.log(`📧 Ensuring email is set to: ${NEW_EMAIL}`);

    const hashedPassword = await bcrypt.hash(NEW_PASSWORD, 10);

    try {
        const user = await prisma.user.upsert({
            where: { username: 'admin' },
            update: {
                password: hashedPassword,
                email: NEW_EMAIL,
                isActive: true,
                role: 'ADMIN', // Ensuring role is ADMIN
                lockedUntil: null, // Unlock if locked
                failedLoginAttempts: 0
            },
            create: {
                username: 'admin',
                email: NEW_EMAIL,
                password: hashedPassword,
                firstName: 'System',
                lastName: 'Admin',
                companyId: 'cmjx7o6yx00996g5pmtke708j', // Placeholder ID needed if creating fresh? Usually better to findFirst company
                role: 'ADMIN'
            }
        });

        console.log('\n✅ SUCCESS: Admin user updated successfully!');
        console.log('------------------------------------------------');
        console.log(`Username: ${user.username}`);
        console.log(`Email:    ${user.email}`);
        console.log(`Password: ${NEW_PASSWORD}`);
        console.log('------------------------------------------------');

    } catch (error) {
        console.error('❌ Error updating admin:', error);

        // Handling missing company ID edge case
        if (error.code === 'P2003') { // Foreign key constraint failed
            console.log('⚠️ It seems the "companyId" is missing or invalid. Attempting to fetch first available company...');
            const company = await prisma.company.findFirst();
            if (company) {
                console.log(`Found company: ${company.name} (${company.id}). Retrying...`);
                // Retry logic could go here, but for now let's keep it simple
            } else {
                console.error('❌ No companies found in database. Cannot create admin user.');
            }
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
