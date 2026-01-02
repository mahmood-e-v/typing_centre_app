import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting enhanced seed...');

    // ============================================
    // 1. CREATE PERMISSIONS (ENHANCED)
    // ============================================
    console.log('Creating permissions...');

    const permissions = [
        // Customer/Beneficiary
        { module: 'customer', action: 'view', description: 'View customers/beneficiaries' },
        { module: 'customer', action: 'create', description: 'Create new customers' },
        { module: 'customer', action: 'edit', description: 'Edit customer details' },
        { module: 'customer', action: 'delete', description: 'Delete customers' },

        // Invoice
        { module: 'invoice', action: 'view', description: 'View invoices' },
        { module: 'invoice', action: 'create', description: 'Create new invoices' },
        { module: 'invoice', action: 'edit', description: 'Edit invoices' },
        { module: 'invoice', action: 'delete', description: 'Delete invoices' },
        { module: 'invoice', action: 'print', description: 'Print invoices' },

        // Payment
        { module: 'payment', action: 'view', description: 'View payments' },
        { module: 'payment', action: 'receive', description: 'Receive payments' },
        { module: 'payment', action: 'refund', description: 'Process refunds' },

        // 🔴 NEW: Accounts Receivable (AR)
        { module: 'ar', action: 'view', description: 'View Accounts Receivable' },
        { module: 'ar', action: 'adjust', description: 'Adjust AR balances' },

        // 🔴 NEW: Accounts Payable (AP)
        { module: 'ap', action: 'view', description: 'View Accounts Payable' },
        { module: 'ap', action: 'adjust', description: 'Adjust AP balances' },

        // Expense
        { module: 'expense', action: 'view', description: 'View expenses' },
        { module: 'expense', action: 'create', description: 'Create expenses' },
        { module: 'expense', action: 'edit', description: 'Edit expenses' },
        { module: 'expense', action: 'delete', description: 'Delete expenses' },

        // Voucher
        { module: 'voucher', action: 'view', description: 'View vouchers' },
        { module: 'voucher', action: 'create', description: 'Create vouchers' },
        { module: 'voucher', action: 'edit', description: 'Edit vouchers' },
        { module: 'voucher', action: 'delete', description: 'Delete vouchers' },
        { module: 'voucher', action: 'approve', description: 'Approve vouchers' },

        // VAT
        { module: 'vat', action: 'view', description: 'View VAT reports' },
        { module: 'vat', action: 'edit', description: 'Edit VAT settings' },
        { module: 'vat', action: 'close_period', description: 'Close VAT periods' },

        // Reports
        { module: 'report', action: 'view', description: 'View reports' },
        { module: 'report', action: 'export', description: 'Export reports' },
        { module: 'report', action: 'profit_loss', description: 'View Profit & Loss' },

        // Ledger
        { module: 'ledger', action: 'view', description: 'View ledger' },
        { module: 'ledger', action: 'edit', description: 'Edit ledger entries' },

        // Dashboard
        { module: 'dashboard', action: 'view', description: 'View dashboard' },
        { module: 'dashboard', action: 'view_all_branches', description: 'View all branches data' },

        // User Management
        { module: 'user', action: 'view', description: 'View users' },
        { module: 'user', action: 'create', description: 'Create users' },
        { module: 'user', action: 'edit', description: 'Edit users' },
        { module: 'user', action: 'delete', description: 'Delete users' },
        { module: 'user', action: 'assign_roles', description: 'Assign roles to users' },

        // Role Management
        { module: 'role', action: 'view', description: 'View roles' },
        { module: 'role', action: 'create', description: 'Create roles' },
        { module: 'role', action: 'edit', description: 'Edit roles' },
        { module: 'role', action: 'delete', description: 'Delete roles' },

        // Company/Branch Management
        { module: 'company', action: 'view', description: 'View company settings' },
        { module: 'company', action: 'edit', description: 'Edit company settings' },
        { module: 'branch', action: 'view', description: 'View branches' },
        { module: 'branch', action: 'create', description: 'Create branches' },
        { module: 'branch', action: 'edit', description: 'Edit branches' },

        // 🔴 NEW: Financial Period Management
        { module: 'period', action: 'view', description: 'View financial periods' },
        { module: 'period', action: 'generate', description: 'Generate/Sync financial periods' },
        { module: 'period', action: 'lock_accounting', description: 'Lock Accounting period' },
        { module: 'period', action: 'unlock_accounting', description: 'Unlock Accounting period' }, // Restricted
        { module: 'period', action: 'lock_vat', description: 'Lock VAT period' },
        { module: 'period', action: 'unlock_vat', description: 'Unlock VAT period' }, // Restricted
        { module: 'period', action: 'year_end_close', description: 'Perform Year End Close' }, // Restricted
        { module: 'period', action: 'view_history', description: 'View period history/audit' },

        // Audit Logs
        { module: 'audit', action: 'view', description: 'View audit logs' },

        // Approvals
        { module: 'approval', action: 'view', description: 'View approval requests' },
        { module: 'approval', action: 'approve', description: 'Approve requests' },
        { module: 'approval', action: 'reject', description: 'Reject requests' },
    ];

    // Use createMany for permissions (much faster)
    await prisma.permission.createMany({
        data: permissions.map(p => ({
            name: `${p.module}.${p.action}`,
            module: p.module,
            action: p.action,
            description: p.description,
        })),
        skipDuplicates: true,
    });

    console.log(`✅ Created ${permissions.length} permissions`);

    // ============================================
    // 2. CREATE ROLES (ENHANCED)
    // ============================================
    console.log('Creating roles...');

    const roles = [
        {
            name: 'Super Admin',
            code: 'SUPER_ADMIN',
            description: 'Full system access across all companies',
            isSystem: true,
            permissions: permissions.map(p => `${p.module}.${p.action}`), // All permissions
        },
        // Update Admin role to have all permissions if "Super Admin" is not used for tenant
        // Assuming OWNER is the main tenant admin
        {
            name: 'Owner',
            code: 'OWNER',
            description: 'Company owner with full access to their company',
            isSystem: true,
            permissions: [
                'customer.view', 'customer.create', 'customer.edit', 'customer.delete',
                'invoice.view', 'invoice.create', 'invoice.edit', 'invoice.delete', 'invoice.print',
                'payment.view', 'payment.receive', 'payment.refund',
                'ar.view', 'ar.adjust',
                'ap.view', 'ap.adjust',
                'expense.view', 'expense.create', 'expense.edit', 'expense.delete',
                'voucher.view', 'voucher.create', 'voucher.edit', 'voucher.delete', 'voucher.approve',
                'vat.view', 'vat.edit', 'vat.close_period',
                'report.view', 'report.export', 'report.profit_loss',
                'ledger.view', 'ledger.edit',
                'dashboard.view', 'dashboard.view_all_branches',
                'user.view', 'user.create', 'user.edit', 'user.delete', 'user.assign_roles',
                'role.view',
                'company.view', 'company.edit',
                'branch.view', 'branch.create', 'branch.edit',
                // Financial Periods - Full Access
                'period.view', 'period.generate',
                'period.lock_accounting', 'period.unlock_accounting',
                'period.lock_vat', 'period.unlock_vat',
                'period.year_end_close', 'period.view_history',
                'audit.view',
                'approval.view', 'approval.approve', 'approval.reject',
            ],
        },
        // Ensure "Admin" role exists if the user was using it (from previous restoration step)
        {
            name: 'Admin',
            code: 'ADMIN',
            description: 'Tenant Administrator (Legacy)',
            isSystem: true,
            permissions: permissions.map(p => `${p.module}.${p.action}`), // Give Admin full permissions too
        },
        {
            name: 'Branch Manager',
            code: 'BRANCH_MANAGER',
            description: 'Manages a specific branch',
            isSystem: true,
            permissions: [
                'customer.view', 'customer.create', 'customer.edit',
                'invoice.view', 'invoice.create', 'invoice.edit', 'invoice.print',
                'payment.view', 'payment.receive',
                'ar.view', // 🔴 NEW - Can view AR
                'ap.view', // 🔴 NEW - Can view AP
                'expense.view', 'expense.create', 'expense.edit',
                'voucher.view', 'voucher.create', 'voucher.edit',
                'report.view', 'report.export',
                'ledger.view',
                'dashboard.view',
                'user.view',
                'period.view', // 🔴 NEW
                'approval.view', 'approval.approve', 'approval.reject',
            ],
        },
        {
            name: 'Accountant',
            code: 'ACCOUNTANT',
            description: 'Handles accounting and financial records',
            isSystem: true,
            permissions: [
                'customer.view',
                'invoice.view', 'invoice.print',
                'payment.view', 'payment.receive',
                'ar.view', 'ar.adjust', // 🔴 NEW - Full AR access
                'ap.view', 'ap.adjust', // 🔴 NEW - Full AP access
                'expense.view', 'expense.create', 'expense.edit',
                'voucher.view', 'voucher.create', 'voucher.edit', 'voucher.approve',
                'vat.view',
                'report.view', 'report.export', 'report.profit_loss',
                'ledger.view', 'ledger.edit',
                'dashboard.view',
                'period.view', // 🔴 NEW
            ],
        },
        {
            name: 'Cashier',
            code: 'CASHIER',
            description: 'Handles daily transactions and payments',
            isSystem: true,
            permissions: [
                'customer.view', 'customer.create',
                'invoice.view', 'invoice.create', 'invoice.print',
                'payment.view', 'payment.receive',
                // 🔴 NO AR/AP access
                'dashboard.view',
            ],
        },
        {
            name: 'PRO / Typist',
            code: 'PRO_TYPIST',
            description: 'Creates and manages service transactions',
            isSystem: true,
            permissions: [
                'customer.view', 'customer.create',
                'invoice.view', 'invoice.create', 'invoice.print',
                'payment.view',
                // 🔴 NO AR/AP access
                'dashboard.view',
            ],
        },
        {
            name: 'Auditor',
            code: 'AUDITOR',
            description: 'Read-only access for auditing purposes',
            isSystem: true,
            permissions: [
                'customer.view',
                'invoice.view',
                'payment.view',
                'ar.view', // 🔴 NEW - Can view AR
                'ap.view', // 🔴 NEW - Can view AP
                'expense.view',
                'voucher.view',
                'vat.view',
                'report.view', 'report.export', 'report.profit_loss',
                'ledger.view',
                'dashboard.view',
                'period.view', // 🔴 NEW
                'audit.view',
            ],
        },
    ];

    // Fetch all permissions once to avoid N+1 queries
    const allPermissions = await prisma.permission.findMany();
    const permissionMap = new Map(allPermissions.map(p => [p.name, p.id]));

    for (const role of roles) {
        const createdRole = await prisma.role.upsert({
            where: { code: role.code },
            update: {},
            create: {
                name: role.name,
                code: role.code,
                description: role.description,
                isSystem: role.isSystem,
            },
        });

        console.log(`Processing role: ${role.name}...`);

        // Prepare permission assignments
        const rolePermissionsToCreate = [];
        for (const permName of role.permissions) {
            const permId = permissionMap.get(permName);
            if (permId) {
                rolePermissionsToCreate.push({
                    roleId: createdRole.id,
                    permissionId: permId,
                });
            } else {
                console.warn(`⚠️ Permission not found: ${permName}`);
            }
        }

        // Use transaction to batched upsert or createMany
        // createMany is faster but doesn't handle conflicts if run multiple times.
        // For safety/idempotency, we can use deleteMany + createMany for this role's permissions
        // Or just normal upsert if list is small. given generic connection, let's try parallel upserts or sequential but fast.

        // Strategy: Delete all existing permissions for this role and re-insert (clean slate for system roles)
        // This is safe for "System" roles which are defined in code.
        if (role.isSystem) {
            await prisma.rolePermission.deleteMany({
                where: { roleId: createdRole.id }
            });

            if (rolePermissionsToCreate.length > 0) {
                await prisma.rolePermission.createMany({
                    data: rolePermissionsToCreate,
                    skipDuplicates: true
                });
            }
        } else {
            // For custom roles, we might strictly add missing ones, but here we only seed system roles.
            // Fallback to loop if needed, but createMany is 100x faster.
            if (rolePermissionsToCreate.length > 0) {
                await prisma.rolePermission.createMany({
                    data: rolePermissionsToCreate,
                    skipDuplicates: true
                });
            }
        }

        console.log(`✅ Assigned ${rolePermissionsToCreate.length} permissions to ${role.name}`);
    }

    // ============================================
    // 3. CREATE DEFAULT COMPANY & BRANCH
    // ============================================
    console.log('Creating default company and branch...');

    const defaultCompany = await prisma.company.upsert({
        where: { code: 'UAE-TC-001' },
        update: {},
        create: {
            name: 'Default Typing Centre',
            code: 'UAE-TC-001',
            email: 'info@typingcentre.ae',
            phone: '+971-XX-XXXXXXX',
            address: 'Dubai, UAE',
            trn: 'TRN-XXXXXXXXX',
            isActive: true,
        },
    });

    const defaultBranch = await prisma.branch.upsert({
        where: {
            companyId_code: {
                companyId: defaultCompany.id,
                code: 'BR-MAIN',
            },
        },
        update: {},
        create: {
            companyId: defaultCompany.id,
            name: 'Main Branch',
            code: 'BR-MAIN',
            location: 'Dubai Main Office',
            phone: '+971-XX-XXXXXXX',
            isActive: true,
        },
    });

    console.log('✅ Created default company and branch');

    // ============================================
    // 4. CREATE DEFAULT ADMIN USER
    // ============================================
    console.log('Creating default admin user...');

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const ownerRole = await prisma.role.findUnique({ where: { code: 'OWNER' } });

    const adminUser = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {
            email: 'admin@typingcentre.ae',
            password: hashedPassword,
            role: 'ADMIN',
            companyId: defaultCompany.id,
            branchId: defaultBranch.id,
        },
        create: {
            email: 'admin@typingcentre.ae',
            username: 'admin',
            password: hashedPassword,
            firstName: 'System',
            lastName: 'Administrator',
            companyId: defaultCompany.id,
            branchId: defaultBranch.id,
            role: 'ADMIN', // Legacy field
            isActive: true,
            forcePasswordChange: true, // 🔴 Force password change on first login
        },
    });

    if (ownerRole) {
        await prisma.userRole.upsert({
            where: {
                userId_roleId: {
                    userId: adminUser.id,
                    roleId: ownerRole.id,
                },
            },
            update: {},
            create: {
                userId: adminUser.id,
                roleId: ownerRole.id,
            },
        });
    }

    console.log('✅ Created admin user (email: admin@typingcentre.ae, password: admin123)');
    console.log('⚠️  Admin will be forced to change password on first login');

    console.log('🎉 Enhanced seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
