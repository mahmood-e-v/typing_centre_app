
import { prisma } from '../src/lib/db';

async function main() {
    console.log('Checking for companies...');
    const companies = await prisma.company.findMany();

    if (companies.length === 0) {
        console.log('No companies found.');
    } else {
        console.log(`Found ${companies.length} companies.`);
        companies.forEach(c => console.log(`- ${c.name} (${c.id})`));
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
