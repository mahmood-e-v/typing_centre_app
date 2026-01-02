
import { prisma } from '../src/lib/db';
import { initializeCompanyCOA, getAccountByCode } from '../src/lib/accounting-service';

async function main() {
    const user = await prisma.user.findFirst();
    if (!user) {
        console.error("No user found");
        return;
    }
    const companyId = user.companyId;

    console.log(`Checking COA for company: ${companyId}`);

    const start = Date.now();
    await initializeCompanyCOA(companyId);
    const end = Date.now();

    console.log(`Initialization took ${end - start}ms`);

    const acc = await getAccountByCode(companyId, "4010");
    if (acc) {
        console.log("Account 4010 found:", acc.name);
    } else {
        console.error("Account 4010 NOT found");
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
