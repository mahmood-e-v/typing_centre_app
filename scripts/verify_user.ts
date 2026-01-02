
import { prisma } from '../src/lib/db';

async function main() {
    const email = 'mahmoodev@gmail.com';
    console.log(`Checking for user with email: ${email}`);

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (user) {
        console.log('User found:');
        console.log(`ID: ${user.id}`);
        console.log(`Email: ${user.email}`);
        console.log(`Name: ${user.firstName} ${user.lastName}`);
        console.log(`Role: ${user.role}`);
        console.log(`Is Active: ${user.isActive}`);
    } else {
        console.log('User NOT found.');
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
