import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
    comparePassword,
    createSession,
    checkLoginAttempts,
    recordFailedLogin,
    resetLoginAttempts,
    createAuditLog,
    getClientIp,
    getUserAgent,
} from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        console.log(`[Login] Attempt for email: ${email}`);

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Find user by email or username
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username: email }],
            },
            include: {
                company: true,
                branch: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Check if user is active
        if (!user.isActive) {
            return NextResponse.json(
                { error: "Account is disabled. Contact administrator." },
                { status: 403 }
            );
        }

        // Check if account is locked due to failed login attempts
        const canLogin = await checkLoginAttempts(user.id);
        if (!canLogin) {
            return NextResponse.json(
                {
                    error:
                        "Account is temporarily locked due to multiple failed login attempts. Please try again in 15 minutes.",
                },
                { status: 429 }
            );
        }

        // Verify password
        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            // Record failed login attempt
            await recordFailedLogin(user.id);

            // Create audit log
            await createAuditLog({
                companyId: user.companyId,
                userId: user.id,
                action: "LOGIN_FAILED",
                module: "auth",
                ipAddress: getClientIp(req),
                userAgent: getUserAgent(req),
            });

            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Reset failed login attempts on successful login
        await resetLoginAttempts(user.id);

        // Create session
        const ipAddress = getClientIp(req);
        const userAgent = getUserAgent(req);
        const sessionToken = await createSession(user.id, ipAddress, userAgent);

        // Update last login info
        await prisma.user.update({
            where: { id: user.id },
            data: {
                lastLoginAt: new Date(),
                lastLoginIp: ipAddress,
            },
        });

        // Create audit log
        await createAuditLog({
            companyId: user.companyId,
            userId: user.id,
            action: "LOGIN_SUCCESS",
            module: "auth",
            ipAddress,
            userAgent,
        });

        // Set session cookie
        const cookieStore = await cookies();

        // Determine if we should use secure cookies
        // If we are on localhost, we might not have HTTPS even in production mode (e.g. testing build locally)
        const isProduction = process.env.NODE_ENV === "production";
        const host = req.headers.get("host") || "";
        const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1");
        const useSecureCookie = isProduction && !isLocalhost;

        console.log(`[Login] Setting cookie - Secure: ${useSecureCookie}, SameSite: lax, Production: ${isProduction}, Host: ${host}`);

        cookieStore.set({
            name: "session",
            value: sessionToken,
            httpOnly: true,
            secure: useSecureCookie,
            sameSite: "lax",
            maxAge: 24 * 60 * 60, // 24 hours
        });

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                company: user.company.name,
                branch: user.branch?.name,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "An error occurred during login" },
            { status: 500 }
        );
    }
}
