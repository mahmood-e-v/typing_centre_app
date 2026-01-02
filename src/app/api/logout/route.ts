import { NextRequest, NextResponse } from "next/server";
import { getSession, destroySession, destroyAllUserSessions, createAuditLog, getClientIp, getUserAgent } from "@/lib/auth";

// Re-use logic for GET requests (e.g. redirected from Layout)
export async function GET(req: NextRequest) {
    // 1. Destroy session logic (simplified copy of POST)
    try {
        const session = await getSession();
        if (session) {
            await destroySession(session.sessionId);
        }
    } catch (e) { console.error(e); }

    // 2. Redirect to Login and Clear Cookie
    const response = NextResponse.redirect(new URL("/login", req.nextUrl));
    response.cookies.delete("session");
    return response;
}

/**
 * Logout from current session
 */
export async function POST(req: NextRequest) {
    try {
        const session = await getSession();

        if (session) {
            // Create audit log
            await createAuditLog({
                companyId: session.user.companyId,
                userId: session.user.id,
                action: "LOGOUT",
                module: "auth",
                ipAddress: getClientIp(req),
                userAgent: getUserAgent(req),
            });

            // Destroy session
            await destroySession(session.sessionId);
        }

        const response = NextResponse.json({ success: true });
        response.cookies.delete("session");
        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { error: "An error occurred during logout" },
            { status: 500 }
        );
    }
}

/**
 * Logout from all devices
 */
export async function DELETE(req: NextRequest) {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Create audit log
        await createAuditLog({
            companyId: session.user.companyId,
            userId: session.user.id,
            action: "LOGOUT_ALL_DEVICES",
            module: "auth",
            ipAddress: getClientIp(req),
            userAgent: getUserAgent(req),
        });

        // Destroy all user sessions
        await destroyAllUserSessions(session.user.id);

        const response = NextResponse.json({ success: true });
        response.cookies.delete("session");
        return response;
    } catch (error) {
        console.error("Logout all error:", error);
        return NextResponse.json(
            { error: "An error occurred during logout" },
            { status: 500 }
        );
    }
}
