
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Checking WorkTypes...");

    const types = await prisma.workType.findMany({
        include: { defaultDocumentType: true }
    });

    if (types.length === 0) {
        console.log("❌ No WorkTypes found!");
    } else {
        types.forEach(t => {
            // @ts-ignore
            console.log(`- ${t.description} | TracksExpiry: ${t.tracksExpiry} | DefDoc: ${t.defaultDocumentType?.name || 'None'}`);
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
