# Authentication & RBAC System - README

## 🎯 Overview

This system implements production-grade **Authentication** and **Role-Based Access Control (RBAC)** for a UAE Service/Typing Center CRM with comprehensive security features.

## ✨ Features

### Authentication
- ✅ Email/Username login with bcrypt password hashing
- ✅ JWT-based session management with database persistence
- ✅ Login throttling (5 attempts, 15-minute lockout)
- ✅ Auto-logout on inactivity (30 minutes)
- ✅ Logout from all devices
- ✅ IP address and user agent tracking
- ✅ Session expiration (24 hours)

### Authorization (RBAC)
- ✅ 7 default roles with granular permissions
- ✅ 60+ permissions across all modules
- ✅ Dynamic role and permission management
- ✅ Multi-role assignment per user
- ✅ Permission-based API route protection

### Multi-Tenancy
- ✅ Company-level data isolation
- ✅ Branch-level data filtering
- ✅ Automatic data scoping by company/branch
- ✅ Cross-branch visibility for Owner/Super Admin

### Audit Logging
- ✅ Immutable audit logs for all sensitive actions
- ✅ Tracks user, action, module, old/new values
- ✅ IP address and timestamp logging
- ✅ Searchable and filterable audit trail

### Approval Workflows
- ✅ Database schema for approval requests
- ✅ Support for invoice delete, refund, edit approvals
- ✅ Approval status tracking (PENDING, APPROVED, REJECTED)

## 📋 Default Roles & Permissions

| Role | Key Permissions | Description |
|------|----------------|-------------|
| **Super Admin** | All permissions | Full system access across all companies |
| **Owner** | All company permissions | Full access to their company, all branches |
| **Branch Manager** | Branch operations | Manages specific branch, approves requests |
| **Accountant** | Financial records | Handles accounting, VAT, ledger, reports |
| **Cashier** | Daily transactions | Creates invoices, receives payments |
| **PRO / Typist** | Service transactions | Creates invoices, limited payment access |
| **Auditor** | Read-only access | Views all data, no modifications |

## 🔐 Security Features

### Financial Security Rules
- ✅ Cashier/PRO cannot view Profit & Loss reports
- ✅ Cashier/PRO cannot view VAT reports
- ✅ Cashier/PRO cannot view Ledger
- ✅ Only Accountant+ can create/edit vouchers
- ✅ Only Owner/Super Admin can delete invoices
- ✅ Only Owner/Super Admin can close VAT periods

### Data Isolation
- ✅ Every table includes `companyId`
- ✅ Financial data restricted by `companyId` and `branchId`
- ✅ Users can only see their company's data
- ✅ Branch users can only see their branch data (unless Owner/Super Admin)

## 🚀 Quick Start

### 1. Install Dependencies
```powershell
npm install
```

### 2. Setup Environment
Add to `.env`:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this
DATABASE_URL=your-database-url
DIRECT_URL=your-direct-database-url
```

### 3. Run Migration
```powershell
npx prisma migrate dev --name add_rbac_and_multi_tenancy
```

### 4. Seed Database
```powershell
npx ts-node prisma/seed.ts
```

### 5. Login
- Email: `admin@typingcentre.ae`
- Password: `admin123`
- **⚠️ Change this password immediately!**

## 📚 Usage Examples

### Protect API Route with Permission
```typescript
import { withPermission } from "@/lib/authorization";

export const GET = withPermission("invoice.view", async (req) => {
  // Your code here
});
```

### Check Multiple Permissions
```typescript
import { withAnyPermission } from "@/lib/authorization";

export const GET = withAnyPermission(
  ["invoice.view", "invoice.edit"],
  async (req) => {
    // Your code here
  }
);
```

### Add Audit Logging
```typescript
import { createAuditLog, getClientIp, getUserAgent } from "@/lib/auth";

await createAuditLog({
  companyId: session.user.companyId,
  userId: session.user.id,
  action: "CREATE",
  module: "invoice",
  recordId: invoice.id,
  recordType: "Invoice",
  newValue: invoiceData,
  ipAddress: getClientIp(req),
  userAgent: getUserAgent(req),
});
```

### Apply Company/Branch Filtering
```typescript
import { getDataFilter } from "@/lib/authorization";

const session = await getSession();
const filter = getDataFilter(session, true); // true = include branch filter

const invoices = await prisma.invoice.findMany({
  where: filter,
});
```

## 📖 API Endpoints

### Authentication
- `POST /api/login` - Login
- `POST /api/logout` - Logout current session
- `DELETE /api/logout` - Logout from all devices
- `GET /api/session` - Get current session

### User Management
- `GET /api/users` - List users (requires `user.view`)
- `POST /api/users` - Create user (requires `user.create`)
- `PUT /api/users` - Update user (requires `user.edit`)
- `DELETE /api/users` - Delete user (requires `user.delete`)

### Role Management
- `GET /api/roles` - List roles (requires `role.view`)
- `POST /api/roles` - Create role (requires `role.create`)
- `PUT /api/roles` - Update role (requires `role.edit`)
- `DELETE /api/roles` - Delete role (requires `role.delete`)

### Permissions
- `GET /api/permissions` - List all permissions

### Audit Logs
- `GET /api/audit-logs` - View audit logs (requires `audit.view`)

## 🔧 Configuration

### Session Settings
Edit in `src/lib/auth.ts`:
```typescript
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
```

### Add New Permission
```typescript
await prisma.permission.create({
  data: {
    name: "module.action",
    module: "module",
    action: "action",
    description: "Description",
  },
});
```

### Assign Permission to Role
```typescript
await prisma.rolePermission.create({
  data: {
    roleId: "role-id",
    permissionId: "permission-id",
  },
});
```

## 📁 File Structure

```
src/
├── lib/
│   ├── auth.ts              # Authentication functions
│   ├── authorization.ts     # Authorization middleware
│   └── db.ts               # Prisma client
├── app/
│   └── api/
│       ├── login/          # Login endpoint
│       ├── logout/         # Logout endpoint
│       ├── session/        # Session endpoint
│       ├── users/          # User management
│       ├── roles/          # Role management
│       ├── permissions/    # Permissions list
│       └── audit-logs/     # Audit logs viewer
prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Seed data
```

## 🛠️ Troubleshooting

### Users can't login
- Verify user has `companyId` and `branchId`
- Ensure user has at least one role assigned
- Check if account is locked (failed login attempts)

### Permission denied errors
- Verify user has required permission
- Check role-permission assignments
- Review audit logs for details

### Session expires too quickly
- Adjust `INACTIVITY_TIMEOUT` in `auth.ts`
- Check if user is active (session updates on activity)

## 📝 Migration Guide

See `MIGRATION_GUIDE.md` for detailed migration instructions.

## 📖 Implementation Examples

See `RBAC_EXAMPLES.md` for code examples on updating existing APIs.

## 🔒 Security Best Practices

1. ✅ Always use HTTPS in production
2. ✅ Change default admin password immediately
3. ✅ Use strong, random JWT_SECRET
4. ✅ Regularly review audit logs
5. ✅ Implement regular database backups
6. ✅ Review and adjust permissions for your business needs
7. ✅ Test with different user roles before deployment
8. ✅ Enable rate limiting on login endpoint
9. ✅ Monitor failed login attempts
10. ✅ Regularly update dependencies

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review audit logs for detailed error information
3. Consult `MIGRATION_GUIDE.md` and `RBAC_EXAMPLES.md`

---

**Built with security and scalability in mind for UAE Service Centers** 🇦🇪
