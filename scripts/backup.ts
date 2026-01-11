
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    console.log("Starting Backup...");

    const backupDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = path.join(backupDir, `backup_${timestamp}.json`);

    const data: any = {};

    // List of models to backup
    const models = [
        'user',
        'company',
        'branch',
        'partner',
        'beneficiary',
        'invoice',
        'transaction',
        'workType',
        'account',
        'expense',
        'expenseCategory',
        'voucher',
        'voucherItem',
        'voucherPayment',
        'vendor',
        'journalEntry',
        'ledgerTransaction',
        'role',
        'permission',
        'userRole'
    ];

    for (const model of models) {
        console.log(`Backing up ${model}...`);
        try {
            // @ts-ignore
            data[model] = await prisma[model].findMany();
        } catch (e) {
            console.error(`Failed to backup ${model}:`, e);
        }
    }

    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`Backup saved to ${filename}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
