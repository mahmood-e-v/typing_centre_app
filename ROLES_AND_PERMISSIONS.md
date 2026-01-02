# User Roles and Permissions Reference

## System Roles Overview

Your system has **7 predefined roles** with different access levels:

### 1. 🔴 Super Admin
**Description:** Full system access across all companies  
**Access Level:** Complete control

**Permissions:** ALL (56 permissions)
- Full access to everything in the system
- Can manage all companies, branches, users, and roles
- Complete financial and operational control

---

### 2. 👑 Owner
**Description:** Company owner with full access to their company  
**Access Level:** Full company control

**Key Permissions:**
- ✅ **Customers:** View, Create, Edit, Delete
- ✅ **Invoices:** View, Create, Edit, Delete, Print
- ✅ **Payments:** View, Receive, Refund
- ✅ **Accounts Receivable (AR):** View, Adjust
- ✅ **Accounts Payable (AP):** View, Adjust
- ✅ **Expenses:** View, Create, Edit, Delete
- ✅ **Vouchers:** View, Create, Edit, Delete, Approve
- ✅ **VAT:** View, Edit, Close Period
- ✅ **Reports:** View, Export, Profit & Loss
- ✅ **Ledger:** View, Edit
- ✅ **Dashboard:** View (All Branches)
- ✅ **Users:** View, Create, Edit, Delete, Assign Roles
- ✅ **Roles:** View
- ✅ **Company:** View, Edit
- ✅ **Branches:** View, Create, Edit
- ✅ **Financial Periods:** View, Close, Reopen
- ✅ **Audit Logs:** View
- ✅ **Approvals:** View, Approve, Reject

---

### 3. 🏢 Branch Manager
**Description:** Manages a specific branch  
**Access Level:** Branch-level management

**Key Permissions:**
- ✅ **Customers:** View, Create, Edit (❌ No Delete)
- ✅ **Invoices:** View, Create, Edit, Print (❌ No Delete)
- ✅ **Payments:** View, Receive (❌ No Refund)
- ✅ **AR/AP:** View only (❌ No Adjust)
- ✅ **Expenses:** View, Create, Edit (❌ No Delete)
- ✅ **Vouchers:** View, Create, Edit (❌ No Approve)
- ✅ **Reports:** View, Export (❌ No Profit & Loss)
- ✅ **Ledger:** View only (❌ No Edit)
- ✅ **Dashboard:** View (Own Branch)
- ✅ **Users:** View only
- ✅ **Financial Periods:** View only
- ✅ **Approvals:** View, Approve, Reject

**Restrictions:**
- ❌ Cannot delete customers or invoices
- ❌ Cannot adjust AR/AP balances
- ❌ Cannot approve vouchers
- ❌ Cannot manage users or roles
- ❌ Cannot close financial periods

---

### 4. 📊 Accountant
**Description:** Handles accounting and financial records  
**Access Level:** Financial operations

**Key Permissions:**
- ✅ **Customers:** View only
- ✅ **Invoices:** View, Print (❌ No Create/Edit/Delete)
- ✅ **Payments:** View, Receive
- ✅ **AR/AP:** View, Adjust (Full access)
- ✅ **Expenses:** View, Create, Edit
- ✅ **Vouchers:** View, Create, Edit, Approve
- ✅ **VAT:** View only
- ✅ **Reports:** View, Export, Profit & Loss
- ✅ **Ledger:** View, Edit
- ✅ **Dashboard:** View
- ✅ **Financial Periods:** View only

**Restrictions:**
- ❌ Cannot create/edit/delete invoices
- ❌ Cannot manage customers
- ❌ Cannot manage users or roles
- ❌ Cannot close financial periods

---

### 5. 💰 Cashier
**Description:** Handles daily transactions and payments  
**Access Level:** Transaction processing

**Key Permissions:**
- ✅ **Customers:** View, Create
- ✅ **Invoices:** View, Create, Print
- ✅ **Payments:** View, Receive
- ✅ **Dashboard:** View

**Restrictions:**
- ❌ No AR/AP access
- ❌ Cannot edit/delete invoices
- ❌ Cannot manage expenses
- ❌ Cannot view reports or ledger
- ❌ Cannot manage users
- ❌ No access to vouchers or financial periods

---

### 6. 📝 PRO / Typist
**Description:** Creates and manages service transactions  
**Access Level:** Service entry

**Key Permissions:**
- ✅ **Customers:** View, Create
- ✅ **Invoices:** View, Create, Print
- ✅ **Payments:** View only (❌ No Receive)
- ✅ **Dashboard:** View

**Restrictions:**
- ❌ No AR/AP access
- ❌ Cannot receive payments
- ❌ Cannot edit/delete invoices
- ❌ Cannot manage expenses
- ❌ Cannot view reports or ledger
- ❌ Cannot manage users
- ❌ No access to vouchers or financial periods

---

### 7. 🔍 Auditor
**Description:** Read-only access for auditing purposes  
**Access Level:** View-only

**Key Permissions:**
- ✅ **View Only:** Customers, Invoices, Payments, AR, AP, Expenses, Vouchers, VAT, Reports, Ledger, Dashboard, Financial Periods, Audit Logs

**Restrictions:**
- ❌ Cannot create, edit, or delete anything
- ❌ Cannot receive payments
- ❌ Cannot approve vouchers
- ❌ Cannot manage users
- ❌ Read-only access to everything

---

## Permission Categories

### Customer Management
- `customer.view` - View customers/beneficiaries
- `customer.create` - Create new customers
- `customer.edit` - Edit customer details
- `customer.delete` - Delete customers

### Invoice Management
- `invoice.view` - View invoices
- `invoice.create` - Create new invoices
- `invoice.edit` - Edit invoices
- `invoice.delete` - Delete invoices
- `invoice.print` - Print invoices

### Payment Management
- `payment.view` - View payments
- `payment.receive` - Receive payments
- `payment.refund` - Process refunds

### Accounts Receivable (AR)
- `ar.view` - View AR balances
- `ar.adjust` - Adjust AR balances

### Accounts Payable (AP)
- `ap.view` - View AP balances
- `ap.adjust` - Adjust AP balances

### Expense Management
- `expense.view` - View expenses
- `expense.create` - Create expenses
- `expense.edit` - Edit expenses
- `expense.delete` - Delete expenses

### Voucher Management
- `voucher.view` - View vouchers
- `voucher.create` - Create vouchers
- `voucher.edit` - Edit vouchers
- `voucher.delete` - Delete vouchers
- `voucher.approve` - Approve vouchers

### VAT Management
- `vat.view` - View VAT reports
- `vat.edit` - Edit VAT settings
- `vat.close_period` - Close VAT periods

### Reports
- `report.view` - View reports
- `report.export` - Export reports
- `report.profit_loss` - View Profit & Loss

### Ledger
- `ledger.view` - View ledger
- `ledger.edit` - Edit ledger entries

### Dashboard
- `dashboard.view` - View dashboard
- `dashboard.view_all_branches` - View all branches data

### User Management
- `user.view` - View users
- `user.create` - Create users
- `user.edit` - Edit users
- `user.delete` - Delete users
- `user.assign_roles` - Assign roles to users

### Role Management
- `role.view` - View roles
- `role.create` - Create roles
- `role.edit` - Edit roles
- `role.delete` - Delete roles

### Company/Branch Management
- `company.view` - View company settings
- `company.edit` - Edit company settings
- `branch.view` - View branches
- `branch.create` - Create branches
- `branch.edit` - Edit branches

### Financial Period Management
- `period.view` - View financial periods
- `period.close` - Close financial periods
- `period.reopen` - Reopen closed periods

### Audit Logs
- `audit.view` - View audit logs

### Approvals
- `approval.view` - View approval requests
- `approval.approve` - Approve requests
- `approval.reject` - Reject requests

---

## How to Check User Roles

### Method 1: Check Database Directly

Run this query in your database:

```sql
SELECT 
    u.email,
    u.username,
    r.name as role_name,
    r.code as role_code
FROM "User" u
JOIN "UserRole" ur ON u.id = ur."userId"
JOIN "Role" r ON ur."roleId" = r.id
ORDER BY u.email;
```

### Method 2: Check via API

Create an API endpoint to view roles (I can help you build this).

### Method 3: View in Seed File

Check `prisma/seed.ts` lines 126-248 for the complete role definitions.

---

## Quick Role Comparison

| Feature | Super Admin | Owner | Branch Mgr | Accountant | Cashier | PRO/Typist | Auditor |
|---------|-------------|-------|------------|------------|---------|------------|---------|
| **Full Access** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Create Invoices** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ |
| **Edit Invoices** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Delete Invoices** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Receive Payments** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Refund Payments** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Adjust AR/AP** | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Approve Vouchers** | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **View Reports** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| **Manage Users** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Close Periods** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## Need a Roles Management Page?

I can create a dashboard page where you can:
- View all roles and their permissions
- See which users have which roles
- Assign/remove roles from users
- Create custom roles

Would you like me to build this?
