import { PrismaClient } from '@prisma/client';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const CONFIRMATION_PHRASE = "DELETE-EVERYTHING-PROD";

async function main() {
    console.log('\n⚠️  DANGER ZONE: DATABASE RESET ⚠️');
    console.log('========================================');
    console.log('This script will PERMANENTLY DELETE all transactional data:');
    console.log('- Invoices, Receipts, Transactions');
    console.log('- Customers, Beneficiaries, Vendors');
    console.log('- Quotations, Expenses, Vouchers');
    console.log('- Journal Entries, Ledger Transactions');
    console.log('- Document records, Audit Logs');
    console.log('\nIt will PRESERVE:');
    console.log('- Users, Roles, Permissions');
    console.log('- Company & Branch settings');
    console.log('- Chart of Accounts, Work Types, Document Types');
    console.log('========================================');

    // Check if we are connected to a database
    try {
        await prisma.$connect();
        console.log('✅ Connected to database.');
    } catch (e) {
        console.error('❌ Could not connect to database. Check your DATABASE_URL.');
        process.exit(1);
    }

    // Confirmation prompt
    await new Promise<void>((resolve, reject) => {
        rl.question(`\nType "${CONFIRMATION_PHRASE}" to confirm: `, (answer) => {
            if (answer === CONFIRMATION_PHRASE) {
                resolve();
            } else {
                console.log('❌ Incorrect confirmation phrase. Aborting.');
                process.exit(0);
            }
        });
    });

    console.log('\n🚀 Starting cleanup...');

    try {
        // 1. Delete dependent child records first
        console.log('Deleting DocumentNotificationSchedules...');
        await prisma.documentNotificationSchedule.deleteMany();

        console.log('Deleting CustomerDocuments...');
        await prisma.customerDocument.deleteMany();

        console.log('Deleting LedgerTransactions...');
        await prisma.ledgerTransaction.deleteMany();

        console.log('Deleting JournalEntries...');
        await prisma.journalEntry.deleteMany();

        console.log('Deleting VoucherPayments...');
        await prisma.voucherPayment.deleteMany();

        console.log('Deleting VoucherItems...');
        await prisma.voucherItem.deleteMany();

        // 2. Delete main transactional records
        console.log('Deleting Vouchers...');
        await prisma.voucher.deleteMany();

        console.log('Deleting Transactions...');
        await prisma.transaction.deleteMany();

        console.log('Deleting Invoices...');
        await prisma.invoice.deleteMany();

        console.log('Deleting QuotationItems...');
        await prisma.quotationItem.deleteMany();

        console.log('Deleting Quotations...');
        await prisma.quotation.deleteMany();

        console.log('Deleting Expenses...');
        await prisma.expense.deleteMany();

        console.log('Deleting DailyClosings...');
        await prisma.dailyClosing.deleteMany();

        // 3. Delete master data (Customers/Vendors)
        console.log('Deleting Beneficiaries...');
        await prisma.beneficiary.deleteMany();

        console.log('Deleting Partners (Customers)...');
        await prisma.partner.deleteMany();

        console.log('Deleting Vendors...');
        await prisma.vendor.deleteMany();

        // 4. Delete Logs and other clutter
        console.log('Deleting AuditLogs...');
        await prisma.auditLog.deleteMany();

        console.log('Deleting ApprovalRequests...');
        await prisma.approvalRequest.deleteMany();

        console.log('Deleting BusinessCards...');
        await prisma.businessCard.deleteMany();

        // 5. Reset Counters
        console.log('Resetting Branch Invoice Counters...');
        await prisma.branch.updateMany({
            data: {
                nextInvoiceNumber: 1,
                // Add other counters if they exist in your schema and need resetting
                // e.g. receiptPrefix indices if managed manually
            }
        });

        console.log('\n✅ DATABASE CLEANUP COMPLETE.');
        console.log('Your application is now ready for a fresh start.');

    } catch (error) {
        console.error('\n❌ Error during cleanup:', error);
    } finally {
        rl.close();
        await prisma.$disconnect();
    }
}

main();
