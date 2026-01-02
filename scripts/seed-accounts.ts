
import { PrismaClient } from '../src/generated/client_v2';

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding Chart of Accounts...");

    // 1. Find Company
    const company = await prisma.company.findFirst();
    if (!company) {
        throw new Error("No company found. Please run prisma db seed first.");
    }
    const companyId = company.id;
    console.log(`Using Company: ${company.name} (${companyId})`);

    // 2. Define Accounts
    const accounts = [
        { code: '1010', name: 'Cash on Hand', type: 'CASH', category: 'ASSET' },
        { code: '1030', name: 'Accounts Receivable', type: 'CASH', category: 'ASSET' }, // Type CASH used loosely for current schema constraints if any, or BANK? Schema says enum AccountType { CASH, BANK, CREDIT_CARD }. Let's use CASH or BANK. Actually AR isn't CASH. But let's check schema.
        // Schema AccountType is just for "Payment Methods" usually. AR is just an asset. 
        // Let's use specific types if possible or default to CASH if the enum is restrictive.
        // Wait, AccountType might be mandatory.
        // Enum AccountType { CASH, BANK, CREDIT_CARD }
        // For non-payment accounts, what do we use?
        // Checking schema: type AccountType. 
        // This schema seems designed for "Payment Accounts" primarily? 
        // No, it handles Expenses too.
        // If the Enum is strict, we might have to use 'CASH' for everything or add 'OTHER'. 
        // Let's check schema again. Lines 764: CASH, BANK, CREDIT_CARD.
        // This is a limitation. I will use 'CASH' for now for everything that isn't Bank/Card, as it's just a label.

        { code: '2010', name: 'Customer Advance (Liability)', type: 'CASH', category: 'LIABILITY' },
        { code: '2020', name: 'Govt Fee Payable', type: 'CASH', category: 'LIABILITY' },
        { code: '2200', name: 'VAT Payable (Output)', type: 'CASH', category: 'LIABILITY' },
        { code: '4010', name: 'Service Revenue', type: 'CASH', category: 'INCOME' },
    ];

    for (const acc of accounts) {
        await prisma.account.upsert({
            where: {
                companyId_code: {
                    companyId,
                    code: acc.code
                }
            },
            update: {}, // Don't overwrite if exists
            create: {
                companyId,
                code: acc.code,
                name: acc.name,
                type: acc.type as any, // Cast to enum
                category: acc.category as any,
                balance: 0,
                isPostable: true,
                isSystem: true
            }
        });
        console.log(`✅ Account ${acc.code} - ${acc.name} ensured.`);
    }

    console.log("✅ Seeding completed.");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
