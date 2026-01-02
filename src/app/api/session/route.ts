import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const session = await getSession();

        if (!session) {
            // Clear the invalid cookie
            const cookieStore = await cookies();
            cookieStore.delete("session");

            return NextResponse.json({ user: null }, { status: 401 });
        }

        return NextResponse.json({
            user: {
                ...session.user,
                forcePasswordChange: session.user.forcePasswordChange || false,
            },
            lastActivity: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Session error:", error);

        // Clear the cookie on error too
        const cookieStore = await cookies();
        cookieStore.delete("session");

        return NextResponse.json({ user: null }, { status: 500 });
    }
}
