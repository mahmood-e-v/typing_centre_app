const { PrismaClient } = require('../src/generated/client_v2');
const bcrypt = require('bcryptjs');

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

        // Accounts Receivable (AR)
        { module: 'ar', action: 'view', description: 'View Accounts Receivable' },
        { module: 'ar', action: 'adjust', description: 'Adjust AR balances' },

        // Accounts Payable (AP)
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

        // Financial Period Management
        { module: 'period', action: 'view', description: 'View financial periods' },
        { module: 'period', action: 'close', description: 'Close financial periods' },
        { module: 'period', action: 'reopen', description: 'Reopen closed periods' },

        // Audit Logs
        { module: 'audit', action: 'view', description: 'View audit logs' },

        // Approvals
        { module: 'approval', action: 'view', description: 'View approval requests' },
        { module: 'approval', action: 'approve', description: 'Approve requests' },
        { module: 'approval', action: 'reject', description: 'Reject requests' },
    ];

    for (const perm of permissions) {
        await prisma.permission.upsert({
            where: { name: `${perm.module}.${perm.action}` },
            update: {},
            create: {
                name: `${perm.module}.${perm.action}`,
                module: perm.module,
                action: perm.action,
                description: perm.description,
            },
        });
    }

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
            permissions: permissions.map(p => `${p.module}.${p.action}`),
        },
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
                'period.view', 'period.close', 'period.reopen',
                'audit.view',
                'approval.view', 'approval.approve', 'approval.reject',
            ],
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
                'ar.view',
                'ap.view',
                'expense.view', 'expense.create', 'expense.edit',
                'voucher.view', 'voucher.create', 'voucher.edit',
                'report.view', 'report.export',
                'ledger.view',
                'dashboard.view',
                'user.view',
                'period.view',
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
                'ar.view', 'ar.adjust',
                'ap.view', 'ap.adjust',
                'expense.view', 'expense.create', 'expense.edit',
                'voucher.view', 'voucher.create', 'voucher.edit', 'voucher.approve',
                'vat.view',
                'report.view', 'report.export', 'report.profit_loss',
                'ledger.view', 'ledger.edit',
                'dashboard.view',
                'period.view',
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
                'ar.view',
                'ap.view',
                'expense.view',
                'voucher.view',
                'vat.view',
                'report.view', 'report.export', 'report.profit_loss',
                'ledger.view',
                'dashboard.view',
                'period.view',
                'audit.view',
            ],
        },
    ];

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

        // Assign permissions to role
        for (const permName of role.permissions) {
            const permission = await prisma.permission.findUnique({
                where: { name: permName },
            });

            if (permission) {
                await prisma.rolePermission.upsert({
                    where: {
                        roleId_permissionId: {
                            roleId: createdRole.id,
                            permissionId: permission.id,
                        },
                    },
                    update: {},
                    create: {
                        roleId: createdRole.id,
                        permissionId: permission.id,
                    },
                });
            }
        }

        console.log(`✅ Created role: ${role.name} with ${role.permissions.length} permissions`);
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
        where: { email: 'admin@typingcentre.ae' },
        update: {},
        create: {
            email: 'admin@typingcentre.ae',
            username: 'admin',
            password: hashedPassword,
            firstName: 'System',
            lastName: 'Administrator',
            companyId: defaultCompany.id,
            branchId: defaultBranch.id,
            role: 'ADMIN',
            isActive: true,
            forcePasswordChange: true,
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
