
import { prisma } from '../src/lib/db';
import { getAccountByCode, getPartnerBalance } from '../src/lib/accounting-service';

async function verifyWalletFlow() {
    console.log("🚀 Starting Wallet Verification...");

    try {
        const company = await prisma.company.findFirst();
        if (!company) throw new Error("No company found");
        const COMPANY_ID = company.id;
        console.log(`🏢 Using Company: ${COMPANY_ID}`);

        // 0. Ensure Accounts Exist (Seed if missing)
        console.log("🌱 Checking Chart of Accounts...");
        const requiredAccounts = [
            { code: "1010", name: "Cash on Hand", category: "ASSET", type: "CASH" },
            { code: "1030", name: "Accounts Receivable", category: "ASSET", type: "CASH" },
            { code: "2010", name: "Customer Advance", category: "LIABILITY", type: "CASH" },
            { code: "4010", name: "Service Revenue", category: "INCOME", type: "CASH" }
        ];

        for (const acc of requiredAccounts) {
            const exists = await prisma.account.findUnique({
                where: { companyId_code: { companyId: COMPANY_ID, code: acc.code } }
            });
            if (!exists) {
                console.log(`   Creating missing account: ${acc.code} - ${acc.name}`);
                await prisma.account.create({
                    data: {
                        companyId: COMPANY_ID,
                        code: acc.code,
                        name: acc.name,
                        category: acc.category as any,
                        type: acc.type as any,
                        balance: 0,
                        isPostable: true
                    }
                });
            }
        }

        // 1. Cleanup Test Partner
        console.log("🧹 Cleaning up old test data...");
        await prisma.partner.deleteMany({
            where: { name: "TEST_WALLET_USER" }
        });

        // 2. Create Test Partner
        console.log("👤 Creating Test Partner...");
        const partner = await prisma.partner.create({
            data: {
                companyId: COMPANY_ID,
                name: "TEST_WALLET_USER",
                type: "INDIVIDUAL"
            }
        });
        console.log(`✅ Partner Created: ${partner.id}`);

        // 3. Simulate Receipt (Deposit 500)
        console.log("💰 Simulating Deposit of 500...");
        const advanceAcc = await getAccountByCode(COMPANY_ID, "2010");
        const bankAcc = await getAccountByCode(COMPANY_ID, "1010");

        if (!advanceAcc || !bankAcc) throw new Error("Missing Accounts 2010 or 1010");

        await prisma.journalEntry.create({
            data: {
                companyId: COMPANY_ID,
                type: "PAYMENT", // Receipt
                description: "Test Deposit",
                transactions: {
                    create: [
                        { accountId: bankAcc.id, debit: 500, credit: 0, companyId: COMPANY_ID },
                        { accountId: advanceAcc.id, debit: 0, credit: 500, partnerId: partner.id, companyId: COMPANY_ID }
                    ]
                }
            }
        });
        console.log("✅ Deposit Recorded (Balance should be -500).");

        // 4. Simulate Invoice Creation of 200 (Create AR)
        console.log("📄 Simulating Invoice Creation (Charge 200)...");
        const arAcc = await getAccountByCode(COMPANY_ID, "1030");
        const revAcc = await getAccountByCode(COMPANY_ID, "4010");
        if (!arAcc) throw new Error("Missing AR Account 1030");

        await prisma.journalEntry.create({
            data: {
                companyId: COMPANY_ID,
                type: "INVOICE",
                description: "Test Invoice",
                transactions: {
                    create: [
                        { accountId: arAcc.id, debit: 200, credit: 0, partnerId: partner.id, companyId: COMPANY_ID }, // Increase AR
                        { accountId: revAcc ? revAcc.id : arAcc.id, debit: 0, credit: 200, companyId: COMPANY_ID } // Increase Revenue
                    ]
                }
            }
        });
        console.log("✅ Invoice Created. (Net Dues = -500 + 200 = -300) [WAIT NO, Payment pending]");

        // Check Interim
        let interim = await getPartnerBalance(COMPANY_ID, partner.id);
        console.log(`📊 Interim Balance (Advance -500 + AR 200): ${interim.toNumber()}`);
        if (interim.toNumber() !== -300) console.warn("⚠️ Interim balance unexpected (Depends on if I consider AR part of 'Wallet Dues'). Yes, standard Dues = AR - Advance.");

        // 5. Simulate Invoice Payment (Spend 200 via Wallet)
        // Debit Advance (200), Credit AR (200)
        console.log("🛍️ Simulating Invoice Payment of 200 via Wallet...");

        await prisma.journalEntry.create({
            data: {
                companyId: COMPANY_ID,
                type: "PAYMENT",
                description: "Test Wallet Payment",
                transactions: {
                    create: [
                        { accountId: advanceAcc.id, debit: 200, credit: 0, partnerId: partner.id, companyId: COMPANY_ID }, // Reduce Liability (Debit)
                        { accountId: arAcc.id, debit: 0, credit: 200, partnerId: partner.id, companyId: COMPANY_ID } // Reduce AR (Credit)
                    ]
                }
            }
        });

        // 6. Verify New Balance
        // Net result: 
        // Advance: -500 + 200 = -300
        // AR: 200 - 200 = 0
        // Total Dues = -300 + 0 = -300
        const finalBalance = await getPartnerBalance(COMPANY_ID, partner.id);
        console.log(`📊 Final Partner Balance: ${finalBalance}`);
        if (finalBalance.toNumber() !== -300) throw new Error(`Expected -300, got ${finalBalance}`);
        console.log("✅ Balance Udpated Correctly (500 Deposit - 200 Spent = 300 Balance)");

        console.log("🎉 ALL CHECKS PASSED!");

    } catch (e) {
        console.error("❌ Verification Failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

verifyWalletFlow();
