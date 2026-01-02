# RBAC Implementation Examples

This document provides examples of how to update existing API routes to use the new RBAC system.

## Example 1: Adding Permission Checks to Invoice API

### Before (Old Code):
```typescript
export async function GET() {
  const invoices = await prisma.invoice.findMany();
  return NextResponse.json(invoices);
}
```

### After (With RBAC):
```typescript
import { withPermission } from "@/lib/authorization";
import { getSession, createAuditLog, getClientIp, getUserAgent } from "@/lib/auth";
import { getDataFilter } from "@/lib/authorization";

export const GET = withPermission("invoice.view", async (req: NextRequest) => {
  const session = await getSession();
  
  // Apply company/branch filtering
  const filter = getDataFilter(session, true);
  
  const invoices = await prisma.invoice.findMany({
    where: filter,
    orderBy: { createdAt: "desc" },
  });
  
  return NextResponse.json(invoices);
});
```

## Example 2: Adding Audit Logging to Create Operations

### Before:
```typescript
export async function POST(req: Request) {
  const data = await req.json();
  const invoice = await prisma.invoice.create({ data });
  return NextResponse.json(invoice);
}
```

### After:
```typescript
export const POST = withPermission("invoice.create", async (req: NextRequest) => {
  const session = await getSession();
  const data = await req.json();
  
  // Add company and branch IDs
  const invoice = await prisma.invoice.create({
    data: {
      ...data,
      companyId: session.user.companyId,
      branchId: session.user.branchId,
    },
  });
  
  // Create audit log
  await createAuditLog({
    companyId: session.user.companyId,
    userId: session.user.id,
    action: "CREATE",
    module: "invoice",
    recordId: invoice.id,
    recordType: "Invoice",
    newValue: data,
    ipAddress: getClientIp(req),
    userAgent: getUserAgent(req),
  });
  
  return NextResponse.json(invoice);
});
```

## Example 3: Role-Based Data Visibility

### Restrict Financial Reports to Accountants and Above:
```typescript
export const GET = withAnyPermission(
  ["report.profit_loss", "report.view"],
  async (req: NextRequest) => {
    const session = await getSession();
    
    // Check if user has permission to see profit/loss
    const canSeeProfitLoss = session.user.permissions.includes("report.profit_loss");
    
    const report = await generateReport(session.user.companyId);
    
    if (!canSeeProfitLoss) {
      // Hide sensitive financial data
      delete report.profitLoss;
      delete report.netIncome;
    }
    
    return NextResponse.json(report);
  }
);
```

## Example 4: Approval Workflow for Delete Operations

```typescript
export const DELETE = withPermission("invoice.delete", async (req: NextRequest) => {
  const session = await getSession();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  
  // Check if user is Owner/Super Admin
  const isOwner = session.user.permissions.includes("dashboard.view_all_branches");
  
  if (!isOwner) {
    // Create approval request instead of deleting
    await prisma.approvalRequest.create({
      data: {
        requesterId: session.user.id,
        module: "invoice",
        action: "delete",
        recordId: id,
        recordType: "Invoice",
        reason: "Delete invoice request",
        status: "PENDING",
      },
    });
    
    return NextResponse.json({
      message: "Delete request submitted for approval",
      requiresApproval: true,
    });
  }
  
  // Owner can delete directly
  await prisma.invoice.update({
    where: { id },
    data: { status: "CANCELLED" },
  });
  
  await createAuditLog({
    companyId: session.user.companyId,
    userId: session.user.id,
    action: "DELETE",
    module: "invoice",
    recordId: id,
    recordType: "Invoice",
    ipAddress: getClientIp(req),
    userAgent: getUserAgent(req),
  });
  
  return NextResponse.json({ success: true });
});
```

## Example 5: Branch-Level Isolation

```typescript
export const GET = withPermission("expense.view", async (req: NextRequest) => {
  const session = await getSession();
  const { searchParams } = new URL(req.url);
  const branchId = searchParams.get("branchId");
  
  // Build filter with branch isolation
  const filter: any = {
    companyId: session.user.companyId,
  };
  
  // Only Owner/Super Admin can view all branches
  if (!session.user.permissions.includes("dashboard.view_all_branches")) {
    filter.branchId = session.user.branchId;
  } else if (branchId) {
    filter.branchId = branchId;
  }
  
  const expenses = await prisma.expense.findMany({
    where: filter,
    orderBy: { date: "desc" },
  });
  
  return NextResponse.json(expenses);
});
```

## Quick Migration Checklist

For each existing API route:

1. ✅ Import `withPermission` from `@/lib/authorization`
2. ✅ Wrap handler with appropriate permission check
3. ✅ Add `companyId` and `branchId` to all queries
4. ✅ Use `getDataFilter()` for automatic filtering
5. ✅ Add audit logging for sensitive operations (CREATE, UPDATE, DELETE)
6. ✅ Add approval workflows where required
7. ✅ Test with different user roles
