const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.user.findMany({ take: 1 });
        console.log("Connection successful, found users:", users.length);
        console.log("Columns in User table:", Object.keys(users[0] || {}));
    } catch (e) {
        console.error("Error:", e.message);
        if (e.message.includes("password")) {
            console.log("Confirmed: password column is missing.");
        }
    } finally {
        await prisma.$disconnect();
    }
}

main();
