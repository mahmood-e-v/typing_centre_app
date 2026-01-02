import { NextRequest, NextResponse } from "next/server";
import { getSession, changePassword, createAuditLog, getClientIp, getUserAgent } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized - Please login" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { oldPassword, newPassword, confirmPassword } = body;

        // Validate inputs
        if (!oldPassword || !newPassword || !confirmPassword) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        if (newPassword !== confirmPassword) {
            return NextResponse.json(
                { error: "New passwords do not match" },
                { status: 400 }
            );
        }

        // Change password
        const result = await changePassword(
            session.user.id,
            oldPassword,
            newPassword
        );

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 400 }
            );
        }

        // Create audit log
        await createAuditLog({
            companyId: session.user.companyId,
            userId: session.user.id,
            action: "PASSWORD_CHANGED",
            module: "user",
            recordId: session.user.id,
            recordType: "User",
            ipAddress: getClientIp(req),
            userAgent: getUserAgent(req),
        });

        return NextResponse.json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        console.error("Password change error:", error);
        return NextResponse.json(
            { error: "Failed to change password" },
            { status: 500 }
        );
    }
}
