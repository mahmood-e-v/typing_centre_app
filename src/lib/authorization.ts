import { NextRequest, NextResponse } from "next/server";
import { getSession, hasPermission } from "./auth";

/**
 * Middleware to check if user has required permission(s)
 * Usage: export const GET = withPermission("invoice.view", async (req) => { ... });
 */
export function withPermission(
    permission: string | string[],
    handler: (req: NextRequest, context?: any) => Promise<NextResponse>
) {
    return async (req: NextRequest, context?: any) => {
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized - Please login" },
                { status: 401 }
            );
        }

        const permissions = Array.isArray(permission) ? permission : [permission];
        const hasAccess = permissions.some((perm) =>
            session.user.permissions.includes(perm)
        );

        if (!hasAccess) {
            return NextResponse.json(
                { error: "Forbidden - Insufficient permissions" },
                { status: 403 }
            );
        }

        return handler(req, context);
    };
}

/**
 * Middleware to check if user has ANY of the required permissions
 */
export function withAnyPermission(
    permissions: string[],
    handler: (req: NextRequest, context?: any) => Promise<NextResponse>
) {
    return async (req: NextRequest, context?: any) => {
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized - Please login" },
                { status: 401 }
            );
        }

        const hasAccess = permissions.some((perm) =>
            session.user.permissions.includes(perm)
        );

        if (!hasAccess) {
            return NextResponse.json(
                { error: "Forbidden - Insufficient permissions" },
                { status: 403 }
            );
        }

        return handler(req, context);
    };
}

/**
 * Middleware to check if user has ALL of the required permissions
 */
export function withAllPermissions(
    permissions: string[],
    handler: (req: NextRequest, context?: any) => Promise<NextResponse>
) {
    return async (req: NextRequest, context?: any) => {
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized - Please login" },
                { status: 401 }
            );
        }

        const hasAccess = permissions.every((perm) =>
            session.user.permissions.includes(perm)
        );

        if (!hasAccess) {
            return NextResponse.json(
                { error: "Forbidden - Insufficient permissions" },
                { status: 403 }
            );
        }

        return handler(req, context);
    };
}

/**
 * Middleware to check if user is authenticated (no permission check)
 */
export function withAuth(
    handler: (req: NextRequest, context?: any) => Promise<NextResponse>
) {
    return async (req: NextRequest, context?: any) => {
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized - Please login" },
                { status: 401 }
            );
        }

        return handler(req, context);
    };
}

/**
 * Middleware to enforce branch-level data isolation
 * Only allows access to data from user's branch (unless user has view_all_branches permission)
 */
export async function enforceBranchIsolation(
    session: any,
    requestedBranchId?: string
): Promise<boolean> {
    // Super Admin and Owner can view all branches
    if (session.user.permissions.includes("dashboard.view_all_branches")) {
        return true;
    }

    // If no specific branch requested, allow (will be filtered by user's branch)
    if (!requestedBranchId) {
        return true;
    }

    // Check if requested branch matches user's branch
    return session.user.branchId === requestedBranchId;
}

/**
 * Get query filter for company/branch isolation
 */
export function getDataFilter(session: any, includeBranch: boolean = true) {
    const filter: any = {
        companyId: session.user.companyId,
    };

    // Add branch filter if user doesn't have view_all_branches permission
    if (
        includeBranch &&
        !session.user.permissions.includes("dashboard.view_all_branches")
    ) {
        filter.branchId = session.user.branchId;
    }

    return filter;
}
