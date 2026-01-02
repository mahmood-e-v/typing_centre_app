# Database Migration Guide

## ⚠️ IMPORTANT - READ BEFORE MIGRATING

This migration adds comprehensive RBAC (Role-Based Access Control) and multi-tenancy support to your database. **This is a breaking change** that requires careful execution.

## Pre-Migration Checklist

- [ ] **Backup your database** - This is critical!
- [ ] Review the schema changes in `prisma/schema.prisma`
- [ ] Ensure you have a maintenance window (estimated 10-30 minutes depending on data size)
- [ ] Test migration on a development/staging database first
- [ ] Notify all users that the system will be temporarily unavailable

## Migration Steps

### Step 1: Backup Database

```powershell
# For PostgreSQL (adjust connection details)
pg_dump -h your-host -U your-user -d your-database > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Step 2: Generate Migration

```powershell
cd d:\typing_centre_app
npx prisma migrate dev --name add_rbac_and_multi_tenancy
```

This will:
- Create migration SQL files
- Apply the migration to your database
- Regenerate Prisma Client

### Step 3: Run Seed Data

```powershell
npx ts-node prisma/seed.ts
```

This will create:
- 60+ permissions
- 7 default roles (Super Admin, Owner, Branch Manager, Accountant, Cashier, PRO/Typist, Auditor)
- Default company ("Default Typing Centre")
- Default branch ("Main Branch")
- Admin user (email: admin@typingcentre.ae, password: admin123)

### Step 4: Migrate Existing Users

After seeding, you need to migrate your existing users to the new system:

```typescript
// Run this script to migrate existing users
import { PrismaClient } from './src/generated/client_v2';

const prisma = new PrismaClient();

async function migrateUsers() {
  // Get default company and branch
  const company = await prisma.company.findFirst();
  const branch = await prisma.branch.findFirst();
  const cashierRole = await prisma.role.findUnique({ where: { code: 'CASHIER' } });
  
  if (!company || !branch || !cashierRole) {
    throw new Error('Default company, branch, or cashier role not found. Run seed first.');
  }

  // Get all users without companyId
  const users = await prisma.user.findMany({
    where: { companyId: null },
  });

  for (const user of users) {
    // Update user with company and branch
    await prisma.user.update({
      where: { id: user.id },
      data: {
        companyId: company.id,
        branchId: branch.id,
        email: user.email || `${user.username}@typingcentre.ae`,
      },
    });

    // Assign default role (Cashier) if no roles assigned
    const existingRoles = await prisma.userRole.findMany({
      where: { userId: user.id },
    });

    if (existingRoles.length === 0) {
      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: cashierRole.id,
        },
      });
    }
  }

  console.log(`✅ Migrated ${users.length} users`);
}

migrateUsers()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### Step 5: Migrate Existing Data

All existing records need `companyId` and `branchId`:

```typescript
// migrate-data.ts
import { PrismaClient } from './src/generated/client_v2';

const prisma = new PrismaClient();

async function migrateData() {
  const company = await prisma.company.findFirst();
  const branch = await prisma.branch.findFirst();
  
  if (!company || !branch) {
    throw new Error('Default company or branch not found');
  }

  console.log('Migrating invoices...');
  await prisma.invoice.updateMany({
    where: { companyId: null },
    data: { companyId: company.id, branchId: branch.id },
  });

  console.log('Migrating transactions...');
  await prisma.transaction.updateMany({
    where: { companyId: null },
    data: { companyId: company.id, branchId: branch.id },
  });

  console.log('Migrating expenses...');
  await prisma.expense.updateMany({
    where: { companyId: null },
    data: { companyId: company.id, branchId: branch.id },
  });

  console.log('Migrating vouchers...');
  await prisma.voucher.updateMany({
    where: { companyId: null },
    data: { companyId: company.id, branchId: branch.id },
  });

  console.log('Migrating partners...');
  await prisma.partner.updateMany({
    where: { companyId: null },
    data: { companyId: company.id },
  });

  console.log('Migrating beneficiaries...');
  await prisma.beneficiary.updateMany({
    where: { companyId: null },
    data: { companyId: company.id },
  });

  console.log('Migrating work types...');
  await prisma.workType.updateMany({
    where: { companyId: null },
    data: { companyId: company.id },
  });

  console.log('Migrating expense categories...');
  await prisma.expenseCategory.updateMany({
    where: { companyId: null },
    data: { companyId: company.id },
  });

  console.log('Migrating accounts...');
  await prisma.account.updateMany({
    where: { companyId: null },
    data: { companyId: company.id },
  });

  console.log('Migrating vendors...');
  await prisma.vendor.updateMany({
    where: { companyId: null },
    data: { companyId: company.id },
  });

  console.log('✅ Data migration complete!');
}

migrateData()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### Step 6: Verify Migration

```powershell
# Check that all data has been migrated
npx prisma studio
```

Verify:
- All users have `companyId` and `branchId`
- All users have at least one role assigned
- All invoices, transactions, expenses have `companyId`
- Default admin user can login

### Step 7: Update Environment Variables

Add to `.env`:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### Step 8: Test Authentication

1. Navigate to `/login`
2. Login with:
   - Email: `admin@typingcentre.ae`
   - Password: `admin123`
3. Verify you can access the dashboard
4. **IMPORTANT**: Change the admin password immediately!

## Post-Migration Tasks

1. **Change Default Password**: Login as admin and change password
2. **Create User Accounts**: Create accounts for all your staff with appropriate roles
3. **Assign Permissions**: Review and adjust role permissions as needed
4. **Test Permissions**: Login with different user roles and verify access controls
5. **Update API Calls**: Gradually update existing API routes to use new permission system (see `RBAC_EXAMPLES.md`)

## Rollback Plan

If something goes wrong:

```powershell
# Restore from backup
psql -h your-host -U your-user -d your-database < backup_YYYYMMDD_HHMMSS.sql

# Reset Prisma migrations
npx prisma migrate reset
```

## Common Issues

### Issue: Migration fails with "column already exists"

**Solution**: The migration might have partially applied. Check your database schema and manually drop conflicting columns, then retry.

### Issue: "Cannot add NOT NULL column without default"

**Solution**: This shouldn't happen with our migration, but if it does, you need to:
1. Add the column as nullable first
2. Populate it with data
3. Make it NOT NULL

### Issue: Existing users can't login

**Solution**: Ensure users have been migrated with:
- Valid `email` field
- `companyId` and `branchId` set
- At least one role assigned via `UserRole` table

## Need Help?

If you encounter issues during migration:
1. Check the error message carefully
2. Verify your backup is intact
3. Review the migration SQL in `prisma/migrations/`
4. Consider rolling back and trying again

## Security Reminders

- ✅ Change default admin password immediately
- ✅ Use strong JWT_SECRET in production
- ✅ Review and customize role permissions for your business
- ✅ Enable HTTPS in production
- ✅ Regularly review audit logs
- ✅ Implement regular database backups
