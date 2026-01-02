
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("🔍 Debugging Ledger...");

    const company = await prisma.company.findFirst();
    if (!company) throw new Error("No company found");

    console.log(`Company: ${company.name} (${company.id})`);

    // 1. Find Accounts
    const accounts = await prisma.account.findMany({
        where: { companyId: company.id, code: { in: ["1030", "2010"] } }
    });
    console.log("Accounts:", accounts.map(a => `${a.code}: ${a.id}`));

    // 2. Find Partners
    const dealers = await prisma.partner.findMany({
        where: {
            companyId: company.id,
            name: { in: ["GVIS", "DARUL HUDA", "Darul Huda", "gvis"] } // Try loose match
        }
    });

    // Also try finding by Beneficiary Name "Anees" to find his partner
    const anees = await prisma.beneficiary.findFirst({
        where: { name: { contains: "Anees", mode: 'insensitive' } },
        include: { partner: true }
    });

    if (anees && anees.partner) {
        console.log(`Found Anees linked to Partner: ${anees.partner.name} (${anees.partner.id})`);
        if (!dealers.find(d => d.id === anees.partnerId)) {
            dealers.push(anees.partner);
        }
    }

    console.log(`Found ${dealers.length} Partners to check.`);

    for (const partner of dealers) {
        console.log(`\n--- Checking Partner: ${partner.name} (${partner.id}) ---`);

        // Check Ledger Transactions
        const txs = await prisma.ledgerTransaction.findMany({
            where: {
                partnerId: partner.id,
                accountId: { in: accounts.map(a => a.id) }
            },
            include: { account: true }
        });

        console.log(`Found ${txs.length} Ledger Transactions.`);

        // Check Invoices
        const invoices = await prisma.invoice.findMany({
            where: { customerId: partner.id },
            select: { invoiceNo: true, balance: true }
        });
        const invBalance = invoices.reduce((sum, inv) => sum + parseFloat(inv.balance.toString()), 0);
        console.log(`Found ${invoices.length} Invoices. Total Balance: ${invBalance}`);

        let receivable = 0; // 1030
        let advance = 0;    // 2010

        txs.forEach(t => {
            console.log(`   [${t.account.code}] Debit: ${t.debit}, Credit: ${t.credit}`);
            const d = parseFloat(t.debit.toString());
            const c = parseFloat(t.credit.toString());

            if (t.account.code === "1030") receivable += (d - c);
            if (t.account.code === "2010") advance += (c - d);
        });

        console.log(`   CALCULATED -> Receivable (1030): ${receivable}`);
        console.log(`   CALCULATED -> Advance (2010):    ${advance}`);
    }
}

main()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
