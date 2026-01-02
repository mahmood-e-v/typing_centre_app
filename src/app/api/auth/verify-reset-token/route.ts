import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json(
                { error: 'Token is required' },
                { status: 400 }
            );
        }

        // Find token in database
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
            include: {
                user: {
                    select: {
                        email: true,
                        isActive: true,
                    },
                },
            },
        });

        // Check if token exists
        if (!resetToken) {
            return NextResponse.json(
                {
                    valid: false,
                    error: 'Invalid reset token',
                },
                { status: 404 }
            );
        }

        // Check if token has expired
        if (resetToken.expiresAt < new Date()) {
            return NextResponse.json(
                {
                    valid: false,
                    error: 'Reset token has expired',
                },
                { status: 400 }
            );
        }

        // Check if token has already been used
        if (resetToken.usedAt) {
            return NextResponse.json(
                {
                    valid: false,
                    error: 'Reset token has already been used',
                },
                { status: 400 }
            );
        }

        // Check if user is active
        if (!resetToken.user.isActive) {
            return NextResponse.json(
                {
                    valid: false,
                    error: 'User account is inactive',
                },
                { status: 400 }
            );
        }

        // Token is valid
        return NextResponse.json({
            valid: true,
            email: resetToken.user.email,
        });
    } catch (error) {
        console.error('Verify reset token error:', error);
        return NextResponse.json(
            { error: 'An error occurred while verifying the token' },
            { status: 500 }
        );
    }
}
