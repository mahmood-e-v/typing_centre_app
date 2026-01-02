
import { prisma } from '../src/lib/db';

async function main() {
    console.log('Listing all users in the database...');

    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
            role: true,
            isActive: true,
        }
    });

    if (users.length === 0) {
        console.log('No users found in the database.');
    } else {
        console.log(`Found ${users.length} users:`);
        users.forEach(u => {
            console.log(`- ${u.email} (Username: ${u.username}, Role: ${u.role}, ID: ${u.id})`);
        });
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
