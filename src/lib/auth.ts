import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./db";
import { encrypt, decrypt } from "./token";

// Re-export for backward compatibility if needed, or use directly
export { encrypt, decrypt };

// Session configuration
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 60 minutes (1 hour)
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

// ============================================
// PASSWORD HASHING
// ============================================

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
}

// ============================================
// SESSION MANAGEMENT
// ============================================

export async function createSession(
    userId: string,
    ipAddress?: string,
    userAgent?: string
): Promise<string> {
    const token = await encrypt({ userId });
    const expiresAt = new Date(Date.now() + SESSION_DURATION);

    await prisma.session.create({
        data: {
            userId,
            token,
            ipAddress,
            userAgent,
            expiresAt,
            lastActivity: new Date(),
        },
    });

    return token;
}

export async function getSession() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) return null;

    try {
        // Verify JWT
        const payload = await decrypt(sessionToken);
        if (!payload) return null;

        // Check session in database
        const session = await prisma.session.findUnique({
            where: { token: sessionToken },
            include: {
                user: {
                    include: {
                        company: true,
                        branch: true,
                        userRoles: {
                            include: {
                                role: {
                                    include: {
                                        permissions: {
                                            include: {
                                                permission: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!session) return null;

        // Check if session expired
        if (new Date() > session.expiresAt) {
            await prisma.session.delete({ where: { id: session.id } }).catch(() => { });
            return null;
        }

        // Check inactivity timeout
        const inactiveTime = Date.now() - session.lastActivity.getTime();
        if (inactiveTime > INACTIVITY_TIMEOUT) {
            await prisma.session.delete({ where: { id: session.id } }).catch(() => { });
            return null;
        }

        // Update last activity
        await prisma.session.update({
            where: { id: session.id },
            data: { lastActivity: new Date() },
        });

        // Build permissions array
        const permissions = session.user.userRoles.flatMap((ur) =>
            ur.role.permissions.map((rp) => rp.permission.name)
        );

        // Get primary role (first role or legacy role)
        const primaryRole = session.user.userRoles[0]?.role.code || session.user.role;

        return {
            user: {
                id: session.user.id,
                email: session.user.email,
                username: session.user.username,
                firstName: session.user.firstName,
                lastName: session.user.lastName,
                role: primaryRole,
                companyId: session.user.companyId,
                branchId: session.user.branchId,
                company: session.user.company,
                branch: session.user.branch,
                permissions,
                forcePasswordChange: session.user.forcePasswordChange,
            },
            sessionId: session.id,
        };
    } catch (error) {
        console.error("Session error:", error);
        return null;
    }
}

export async function updateSession(request: NextRequest) {
    const sessionToken = request.cookies.get("session")?.value;
    if (!sessionToken) return;

    try {
        const session = await prisma.session.findUnique({
            where: { token: sessionToken },
        });

        if (!session || new Date() > session.expiresAt) {
            return;
        }

        // Update last activity
        await prisma.session.update({
            where: { id: session.id },
            data: { lastActivity: new Date() },
        });

        // Refresh cookie
        const res = NextResponse.next();
        res.cookies.set({
            name: "session",
            value: sessionToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: session.expiresAt,
        });
        return res;
    } catch (error) {
        console.error("Update session error:", error);
    }
}

export async function destroySession(sessionId?: string) {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (sessionId) {
        // Destroy specific session
        await prisma.session.delete({ where: { id: sessionId } }).catch(() => { });
    } else if (sessionToken) {
        // Destroy current session
        await prisma.session.delete({ where: { token: sessionToken } }).catch(() => { });
    }

    // Clear cookie
    cookieStore.delete("session");
}

export async function destroyAllUserSessions(userId: string) {
    await prisma.session.deleteMany({
        where: { userId },
    });
}

// ============================================
// LOGIN THROTTLING
// ============================================

export async function checkLoginAttempts(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { failedLoginAttempts: true, lockedUntil: true },
    });

    if (!user) return false;

    // Check if account is locked
    if (user.lockedUntil && new Date() < user.lockedUntil) {
        return false; // Account is locked
    }

    // Reset lock if expired
    if (user.lockedUntil && new Date() >= user.lockedUntil) {
        await prisma.user.update({
            where: { id: userId },
            data: { failedLoginAttempts: 0, lockedUntil: null },
        });
    }

    return true; // Account is not locked
}

export async function recordFailedLogin(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { failedLoginAttempts: true },
    });

    if (!user) return;

    const newAttempts = user.failedLoginAttempts + 1;
    const updateData: any = { failedLoginAttempts: newAttempts };

    // Lock account if max attempts reached
    if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        updateData.lockedUntil = new Date(Date.now() + LOCKOUT_DURATION);
    }

    await prisma.user.update({
        where: { id: userId },
        data: updateData,
    });
}

export async function resetLoginAttempts(userId: string) {
    await prisma.user.update({
        where: { id: userId },
        data: { failedLoginAttempts: 0, lockedUntil: null },
    });
}

// ============================================
// AUDIT LOGGING
// ============================================

export async function createAuditLog(params: {
    companyId: string;
    userId?: string;
    action: string;
    module: string;
    recordId?: string;
    recordType?: string;
    oldValue?: any;
    newValue?: any;
    ipAddress?: string;
    userAgent?: string;
}) {
    try {
        await prisma.auditLog.create({
            data: {
                companyId: params.companyId,
                userId: params.userId,
                action: params.action,
                module: params.module,
                recordId: params.recordId,
                recordType: params.recordType,
                oldValue: params.oldValue ? JSON.stringify(params.oldValue) : null,
                newValue: params.newValue ? JSON.stringify(params.newValue) : null,
                ipAddress: params.ipAddress,
                userAgent: params.userAgent,
            },
        });
    } catch (error) {
        console.error("Audit log error:", error);
        // Don't throw - audit logging should not break the application
    }
}

// ============================================
// PERMISSION CHECKING
// ============================================

export async function hasPermission(
    userId: string,
    permissionName: string
): Promise<boolean> {
    const userRoles = await prisma.userRole.findMany({
        where: { userId },
        include: {
            role: {
                include: {
                    permissions: {
                        include: {
                            permission: true,
                        },
                    },
                },
            },
        },
    });

    for (const userRole of userRoles) {
        const hasPermission = userRole.role.permissions.some(
            (rp) => rp.permission.name === permissionName
        );
        if (hasPermission) return true;
    }

    return false;
}

export async function hasAnyPermission(
    userId: string,
    permissionNames: string[]
): Promise<boolean> {
    for (const permName of permissionNames) {
        if (await hasPermission(userId, permName)) {
            return true;
        }
    }
    return false;
}

export async function hasAllPermissions(
    userId: string,
    permissionNames: string[]
): Promise<boolean> {
    for (const permName of permissionNames) {
        if (!(await hasPermission(userId, permName))) {
            return false;
        }
    }
    return true;
}

// ============================================
// AUTHORIZATION HELPERS
// ============================================

export function getClientIp(request: NextRequest): string {
    return (
        request.headers.get("x-forwarded-for")?.split(",")[0] ||
        request.headers.get("x-real-ip") ||
        "unknown"
    );
}

export function getUserAgent(request: NextRequest): string {
    return request.headers.get("user-agent") || "unknown";
}

// ============================================
// FINANCIAL PERIOD LOCKING
// ============================================

// logic moved to @/lib/financial-periods.ts

// ============================================
// APPROVAL WORKFLOW
// ============================================

/**
 * Check if user can bypass approval workflow
 * Only Owner and Super Admin can bypass
 */
export async function canBypassApproval(userId: string): Promise<boolean> {
    const userRoles = await prisma.userRole.findMany({
        where: { userId },
        include: {
            role: true,
        },
    });

    // Check if user has Owner or Super Admin role
    return userRoles.some(
        (ur) => ur.role.code === "OWNER" || ur.role.code === "SUPER_ADMIN"
    );
}

/**
 * Create an approval request with mandatory reason
 */
export async function createApprovalRequest(params: {
    requesterId: string;
    module: string;
    action: string;
    recordId: string;
    recordType: string;
    reason: string;
}): Promise<any> {
    // Validate reason is provided
    if (!params.reason || params.reason.trim().length === 0) {
        throw new Error("Reason is mandatory for approval requests");
    }

    if (params.reason.trim().length < 10) {
        throw new Error("Reason must be at least 10 characters long");
    }

    return await prisma.approvalRequest.create({
        data: {
            requesterId: params.requesterId,
            module: params.module,
            action: params.action,
            recordId: params.recordId,
            recordType: params.recordType,
            reason: params.reason.trim(),
            status: "PENDING",
        },
    });
}

/**
 * Approve an approval request
 */
export async function approveRequest(
    requestId: string,
    approverId: string,
    comments?: string
): Promise<void> {
    await prisma.approvalRequest.update({
        where: { id: requestId },
        data: {
            status: "APPROVED",
            approverId,
            approvedAt: new Date(),
            comments,
        },
    });
}

/**
 * Reject an approval request
 */
export async function rejectRequest(
    requestId: string,
    approverId: string,
    comments: string
): Promise<void> {
    if (!comments || comments.trim().length === 0) {
        throw new Error("Comments are required when rejecting a request");
    }

    await prisma.approvalRequest.update({
        where: { id: requestId },
        data: {
            status: "REJECTED",
            approverId,
            rejectedAt: new Date(),
            comments,
        },
    });
}

// ============================================
// SESSION SECURITY VALIDATION
// ============================================

/**
 * Validate session security by checking IP and User Agent
 * Invalidates session if mismatch detected (potential hijack)
 */
export async function validateSessionSecurity(
    sessionId: string,
    currentIp: string,
    currentUA: string
): Promise<boolean> {
    try {
        const session = await prisma.session.findUnique({
            where: { id: sessionId },
            include: { user: true },
        });

        if (!session || !session.isValid) {
            return false;
        }

        // Check IP address mismatch
        const ipMismatch = session.ipAddress && session.ipAddress !== currentIp;

        // Check User Agent mismatch
        const uaMismatch = session.userAgent && session.userAgent !== currentUA;

        // If both IP and UA changed, likely session hijack
        if (ipMismatch && uaMismatch) {
            // Invalidate session
            await prisma.session.update({
                where: { id: sessionId },
                data: { isValid: false },
            });

            // Create audit log
            await createAuditLog({
                companyId: session.user.companyId,
                userId: session.userId,
                action: "SESSION_HIJACK_DETECTED",
                module: "security",
                recordId: sessionId,
                recordType: "Session",
                oldValue: {
                    ip: session.ipAddress,
                    ua: session.userAgent,
                },
                newValue: {
                    ip: currentIp,
                    ua: currentUA,
                },
                ipAddress: currentIp,
                userAgent: currentUA,
            });

            return false;
        }

        // If only IP changed (user might be on mobile/VPN), update but allow
        if (ipMismatch && !uaMismatch) {
            await prisma.session.update({
                where: { id: sessionId },
                data: { ipAddress: currentIp },
            });
        }

        return true;
    } catch (error) {
        console.error("Session security validation error:", error);
        return false;
    }
}

/**
 * Force password change for a user
 */
export async function forcePasswordChange(userId: string): Promise<void> {
    await prisma.user.update({
        where: { id: userId },
        data: { forcePasswordChange: true },
    });
}

/**
 * Change user password
 */
export async function changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
): Promise<{ success: boolean; error?: string }> {
    try {
        // Get user
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return { success: false, error: "User not found" };
        }

        // Verify old password
        const isValid = await comparePassword(oldPassword, user.password);
        if (!isValid) {
            return { success: false, error: "Current password is incorrect" };
        }

        // Validate new password
        if (newPassword.length < 8) {
            return { success: false, error: "New password must be at least 8 characters long" };
        }

        // Hash new password
        const hashedPassword = await hashPassword(newPassword);

        // Update password and clear force change flag
        await prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword,
                forcePasswordChange: false,
                passwordChangedAt: new Date(),
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Password change error:", error);
        return { success: false, error: "Failed to change password" };
    }
}
