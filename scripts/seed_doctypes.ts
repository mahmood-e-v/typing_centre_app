
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding Document Types...");

    const types = [
        { name: 'Passport', description: 'Standard International Passport' },
        { name: 'Residence Visa', description: 'UAE Residence Visa' },
        { name: 'Emirates ID', description: 'National Identity Card' },
        { name: 'Trade License', description: 'Company Trade License' },
        { name: 'Establishment Card', description: 'Immigration Establishment Card' },
        { name: 'Labor Card', description: 'MOHRE Labor Card' },
        { name: 'Tenancy Contract', description: 'Ejari / Tenancy Contract' },
        { name: 'Medical Insurance', description: 'Health Insurance Policy' },
        { name: 'Vehicle Registration', description: 'Mulkiya' },
        { name: 'Driving License', description: 'UAE Driving License' }
    ];

    const companies = await prisma.company.findMany();

    if (companies.length === 0) {
        console.log("No companies found. Create a company first.");
        return;
    }

    for (const company of companies) {
        console.log(`Seeding for Company: ${company.name} (${company.id})`);

        for (const t of types) {
            const existing = await prisma.documentType.findUnique({
                where: {
                    companyId_name: {
                        companyId: company.id,
                        name: t.name
                    }
                }
            });

            if (!existing) {
                await prisma.documentType.create({
                    data: {
                        ...t,
                        companyId: company.id
                    }
                });
                console.log(`  Created: ${t.name}`);
            } else {
                console.log(`  Skipped: ${t.name}`);
            }
        }
    }

    console.log("Seeding Complete.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
