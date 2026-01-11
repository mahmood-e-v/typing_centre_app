
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Checking CustomerDocument items...");

    const docs = await prisma.customerDocument.findMany({
        include: {
            documentType: true,
            partner: { select: { name: true } },
            beneficiary: { select: { name: true } }
        }
    });

    if (docs.length === 0) {
        console.log("❌ No documents found in database!");
    } else {
        console.log(`✅ Found ${docs.length} documents:`);
        docs.forEach(d => {
            console.log(`- [${d.status}] ${d.documentType.name} | DocNo: ${d.documentNumber} | Expiry: ${d.expiryDate?.toISOString()} | Assigned To: ${d.partner?.name || d.beneficiary?.name}`);
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
