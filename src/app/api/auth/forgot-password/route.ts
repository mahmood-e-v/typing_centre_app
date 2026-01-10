import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import {
    generateResetToken,
    checkRateLimit,
    generateResetUrl,
} from '@/lib/password-reset';
import { sendMail } from '@/lib/mail';

export async function POST(request: NextRequest) {
    try {
        const { identifier } = await request.json();

        if (!identifier) {
            return NextResponse.json(
                { error: 'Email or Username is required' },
                { status: 400 }
            );
        }

        // Check rate limiting (using identifier as key)
        const rateLimit = await checkRateLimit(identifier);
        if (!rateLimit.allowed) {
            return NextResponse.json(
                {
                    error: 'Too many password reset requests. Please try again later.',
                    remainingAttempts: rateLimit.remainingAttempts,
                },
                { status: 429 }
            );
        }

        // Find user by email OR username
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: identifier },
                    { username: identifier }
                ]
            }
        });

        // Always return success to prevent enumeration
        if (!user) {
            console.log(`Password reset requested for non-existent identifier: ${identifier}`);
            return NextResponse.json({
                success: true,
                message: 'If an account exists with this email/username, a password reset link has been sent to the registered email.',
            });
        }

        // Check if user is active
        if (!user.isActive) {
            console.log(`Password reset requested for inactive user: ${identifier}`);
            return NextResponse.json({
                success: true,
                message: 'If an account exists with this email/username, a password reset link has been sent to the registered email.',
            });
        }

        // Generate reset token
        const token = generateResetToken();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Get IP and User Agent for security tracking
        const ipAddress = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';

        // Save token to database
        await prisma.passwordResetToken.create({
            data: {
                userId: user.id,
                token,
                expiresAt,
                ipAddress,
                userAgent,
            },
        });

        // Send Email
        const resetUrl = generateResetUrl(token, request.nextUrl.origin);

        await sendMail({
            to: user.email,
            subject: 'Reset Your Password - ServiceCenterPro',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #0284c7;">Password Reset Request</h2>
                    <p>Hello ${user.firstName || 'User'},</p>
                    <p>We received a request to reset the password for your account.</p>
                    <p>Please click the button below to reset your password. This link is valid for 15 minutes.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" style="background-color: #0284c7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
                    </div>
                    <p>If you didn't request this, you can safely ignore this email.</p>
                    <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
                        This is an automated message from ServiceCenterPro.
                    </p>
                </div>
            `,
            text: `Reset Your Password\n\nPlease visit the following URL to reset your password:\n${resetUrl}\n\nThis link is valid for 15 minutes.`
        });

        return NextResponse.json({
            success: true,
            message: 'If an account exists with this email, a password reset link has been sent.',
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json(
            { error: 'An error occurred while processing your request' },
            { status: 500 }
        );
    }
}
