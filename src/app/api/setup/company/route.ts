import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import * as bcrypt from 'bcryptjs';
import { initializeCompanyCOA } from '@/lib/accounting-service';

// Setup Wizard: Create Company + Main Branch + Owner + Defaults
export async function POST(request: Request) {
    try {
        const session = await getSession();
        // Allow unauthenticated for strict public signup? Or strict RBAC?
        // Let's assume Authenticated (Super Admin/Agent) or remove check if public.
        // For security, let's enforce session for now, assuming "Agent" creates tenants.
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized - Login required to create tenants' }, { status: 401 });
        }

        const body = await request.json();
        const {
            companyName, companyCode, companyNameAr, trn, legalType,
            accountingModel, vatRegistered, vatRate,
            ownerFirstName, ownerLastName, ownerEmail, ownerPassword, ownerPhone,
            mainBranchName, mainBranchLocation, openingCashBalance
        } = body;

        // Validation
        if (!companyName || !companyCode || !ownerEmail || !ownerPassword) {
            return NextResponse.json({ error: 'Missing Required Fields' }, { status: 400 });
        }
        if (!['BRANCH_WISE', 'CONSOLIDATED'].includes(accountingModel)) {
            return NextResponse.json({ error: 'Invalid Accounting Model' }, { status: 400 });
        }

        // Check Duplicates (Company Code, Owner Email)
        const existingCompany = await prisma.company.findUnique({ where: { code: companyCode } });
        if (existingCompany) return NextResponse.json({ error: 'Company Code already exists' }, { status: 400 });

        const existingUser = await prisma.user.findUnique({ where: { email: ownerEmail } });
        if (existingUser) return NextResponse.json({ error: 'Owner Email already registered' }, { status: 400 });

        const hashedPassword = await bcrypt.hash(ownerPassword, 10);

        // Find Owner Role
        const ownerRole = await prisma.role.findUnique({ where: { code: 'OWNER' } });
        if (!ownerRole) return NextResponse.json({ error: 'System Error: Role OWNER not found' }, { status: 500 });

        // TRANSACTION: Create Everything
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create Company
            const company = await tx.company.create({
                data: {
                    name: companyName,
                    nameAr: companyNameAr,
                    code: companyCode,
                    legalType: legalType || 'SOLE_ESTABLISHMENT',
                    trn,
                    vatRegistered: vatRegistered || false,
                    vatRate: vatRate || 5.0,
                    accountingModel, // LOCKED HERE
                    startDate: new Date(),
                    fiscalYearStart: 1, // Default Jan
                    isActive: true,
                    // createdById not in schema
                }
            });

            // 2. Generate Financial Periods (Current Year - 12 Months)
            // Hardcoded logic for safety in transaction
            const today = new Date();
            const year = today.getFullYear();
            const periodsData = [];
            for (let m = 1; m <= 12; m++) {
                periodsData.push({
                    companyId: company.id,
                    year,
                    month: m,
                    periodStart: new Date(year, m - 1, 1),
                    // Last day of month
                    periodEnd: new Date(year, m, 0, 23, 59, 59, 999),
                    accountingLocked: false,
                    vatLocked: false
                });
            }
            await tx.financialPeriod.createMany({ data: periodsData });

            // 3. Create Main Branch
            const branchCode = `BR-${companyCode.substring(0, 3).toUpperCase()}-MAIN`;
            const branch = await tx.branch.create({
                data: {
                    companyId: company.id,
                    name: mainBranchName || 'Main Branch',
                    code: branchCode,
                    type: 'MAIN',
                    location: mainBranchLocation,
                    cashCounterEnabled: true,
                    openingCashBalance: openingCashBalance || 0,
                    isActive: true
                }
            });

            // 4. Create Owner User
            const user = await tx.user.create({
                data: {
                    companyId: company.id,
                    branchId: branch.id, // Owner linked to Main Branch
                    email: ownerEmail,
                    username: ownerEmail.split('@')[0], // Simple username
                    password: hashedPassword,
                    firstName: ownerFirstName,
                    lastName: ownerLastName,
                    phone: ownerPhone,
                    role: 'ADMIN', // Legacy Field
                    isActive: true,
                }
            });

            // 5. Assign User Role (OWNER)
            await tx.userRole.create({
                data: {
                    userId: user.id,
                    roleId: ownerRole.id
                }
            });

            // 6. Initialize Chart of Accounts
            // Note: We'll initialize COA after transaction if it uses different prisma instance or just use a helper that takes 'tx'
            // For now, let's assume it runs after the transaction or we'll pass tx once we refactor initializeCompanyCOA
            return { company, user, branch };
        });

        // Initialize COA outside transaction to avoid nesting issues with createJournalEntry if needed
        // But better inside if we want Atomicity. Let's run it here for now.
        await initializeCompanyCOA(result.company.id);

        return NextResponse.json({
            success: true,
            companyId: result.company.id,
            ownerEmail: result.user.email
        });

    } catch (error) {
        console.error('Setup Wizard Error:', error);
        return NextResponse.json({ error: 'Setup Failed: ' + (error as any).message }, { status: 500 });
    }
}
