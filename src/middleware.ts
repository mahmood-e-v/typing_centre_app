import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

// Public routes that don't require authentication
const publicRoutes = ["/login", "/api/login", "/"];

// Protected route patterns
const protectedPatterns = [
    "/dashboard",
    "/admin",
    "/users",
    "/settings",
    "/financial-periods",
    "/change-password",
    "/transactions",
    "/vouchers",
    "/reports",
    "/beneficiaries",
    "/accounts"
];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Check if route is public
    const isPublicRoute = publicRoutes.includes(path);

    // Check if route is protected
    const isProtectedRoute = protectedPatterns.some(pattern => path.startsWith(pattern));

    // Get session from cookie
    const cookie = req.cookies.get("session")?.value;
    const session = cookie ? await decrypt(cookie).catch(() => null) : null;

    // Log for debugging (remove in production)
    if (process.env.NODE_ENV === "development") {
        console.log(`[Middleware] ${path} - Session: ${session ? "✓" : "✗"} - Protected: ${isProtectedRoute}`);
    }

    // Redirect to login if accessing protected route without session
    if (isProtectedRoute && !session) {
        console.log(`[Middleware] Redirecting to login: ${path}`);
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Redirect to dashboard if accessing login with valid session
    if (path === "/login" && session) {
        if (process.env.NODE_ENV === "development") {
            console.log(`[Middleware] Already logged in, redirecting to dashboard`);
        }
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    // Match all routes except static files, images, and API routes
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp)$).*)",
    ],
};
