
import { prisma } from '../src/lib/db';
import { Decimal } from "@prisma/client/runtime/library";

async function main() {
    console.log('🧪 Testing Voucher Creation with Quantity...');

    const user = await prisma.user.findUnique({ where: { email: 'mahmoodev@gmail.com' } });
    if (!user) throw new Error("Admin user not found");

    // Get a category
    let cat = await prisma.expenseCategory.findFirst();
    if (!cat) {
        cat = await prisma.expenseCategory.create({
            data: { companyId: user.companyId, name: 'Test Category' }
        });
    }

    // Prepare payload mimicking API
    const items = [
        {
            categoryId: cat.id,
            description: 'Item 1 (Qty 5)',
            amount: 100,
            quantity: 5 // Should result in 500 total
        },
        {
            categoryId: cat.id,
            description: 'Item 2 (Qty 1)',
            amount: 50,
            quantity: 1 // Should result in 50 total
        }
    ];

    const totalAmount = items.reduce((sum, item) => sum + (item.amount * item.quantity), 0);
    console.log(`Expected Total: ${totalAmount}`);

    // Create Voucher directly via Prisma to verify schema support + logic
    // (Simulating the API logic briefly here to ensure DB accepts it)

    const voucher = await prisma.voucher.create({
        data: {
            companyId: user.companyId,
            voucherNo: `TEST-${Date.now()}`,
            vendorName: 'Test Vendor',
            total: new Decimal(totalAmount),
            paidAmount: new Decimal(0),
            balance: new Decimal(totalAmount), // 550
            enteredById: user.id,
            items: {
                create: items.map(item => ({
                    categoryId: item.categoryId,
                    description: item.description,
                    amount: new Decimal(item.amount),
                    quantity: item.quantity
                }))
            }
        },
        include: { items: true }
    });

    console.log(`✅ Voucher Created: ${voucher.id}`);
    console.log(`   Total: ${voucher.total}`);

    voucher.items.forEach(item => {
        console.log(`   - ${item.description}: Amount ${item.amount} x Qty ${item.quantity}`);
    });

    if (voucher.items.some(i => i.quantity !== 5 && i.quantity !== 1)) {
        console.error('❌ Mismatch in quantity persistence!');
        process.exit(1);
    }

    // cleanup
    await prisma.voucher.delete({ where: { id: voucher.id } });
    console.log('🧹 Cleanup done.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
