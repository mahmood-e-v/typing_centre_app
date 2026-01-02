import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { validatePasswordStrength } from '@/lib/password-reset';

export async function POST(request: NextRequest) {
    try {
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json(
                { error: 'Token and password are required' },
                { status: 400 }
            );
        }

        // Validate password strength
        const passwordValidation = validatePasswordStrength(password);
        if (!passwordValidation.isValid) {
            return NextResponse.json(
                {
                    error: 'Password does not meet requirements',
                    errors: passwordValidation.errors,
                },
                { status: 400 }
            );
        }

        // Find token in database
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
            include: {
                user: true,
            },
        });

        // Check if token exists
        if (!resetToken) {
            return NextResponse.json(
                { error: 'Invalid reset token' },
                { status: 404 }
            );
        }

        // Check if token has expired
        if (resetToken.expiresAt < new Date()) {
            return NextResponse.json(
                { error: 'Reset token has expired' },
                { status: 400 }
            );
        }

        // Check if token has already been used
        if (resetToken.usedAt) {
            return NextResponse.json(
                { error: 'Reset token has already been used' },
                { status: 400 }
            );
        }

        // Check if user is active
        if (!resetToken.user.isActive) {
            return NextResponse.json(
                { error: 'User account is inactive' },
                { status: 400 }
            );
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user password and mark token as used in a transaction
        await prisma.$transaction([
            // Update user password
            prisma.user.update({
                where: { id: resetToken.userId },
                data: {
                    password: hashedPassword,
                    passwordChangedAt: new Date(),
                    forcePasswordChange: false,
                    failedLoginAttempts: 0,
                    lockedUntil: null,
                },
            }),
            // Mark token as used
            prisma.passwordResetToken.update({
                where: { id: resetToken.id },
                data: {
                    usedAt: new Date(),
                },
            }),
            // Invalidate all existing sessions for security
            prisma.session.updateMany({
                where: { userId: resetToken.userId },
                data: {
                    isValid: false,
                },
            }),
        ]);

        console.log(`✅ Password successfully reset for user: ${resetToken.user.email}`);

        return NextResponse.json({
            success: true,
            message: 'Password has been reset successfully. Please login with your new password.',
        });
    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json(
            { error: 'An error occurred while resetting your password' },
            { status: 500 }
        );
    }
}
