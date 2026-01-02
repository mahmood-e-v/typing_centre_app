
import { prisma } from "../src/lib/db";

async function main() {
    console.log("Checking WorkTypes...");
    const count = await prisma.workType.count();
    console.log(`Total WorkTypes found: ${count}`);

    if (count > 0) {
        const list = await prisma.workType.findMany({ take: 5 });
        console.log("Sample:", list);
    } else {
        console.log("Table is empty!");
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
