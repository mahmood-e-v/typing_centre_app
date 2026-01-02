
import { PrismaClient } from '../src/generated/client_v2';

const prisma = new PrismaClient();

async function checkAccounts() {
    const requiredCodes = ["1010", "1030", "2010", "2020", "2200", "4010"];
    console.log("Checking for required accounts...");

    const accounts = await prisma.account.findMany({
        where: {
            code: { in: requiredCodes }
        },
        select: { code: true, name: true, companyId: true }
    });

    const foundCodes = accounts.map((a: any) => a.code);
    const missing = requiredCodes.filter(c => !foundCodes.includes(c));

    console.log("Found Accounts:", accounts);
    if (missing.length > 0) {
        console.error("CRITICAL: Missing Accounts:", missing);
    } else {
        console.log("All required accounts exist.");
    }
}

checkAccounts()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
