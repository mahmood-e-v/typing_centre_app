import crypto from 'crypto';
import { prisma } from '@/lib/db';

/**
 * Generate a cryptographically secure random token
 */
export function generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
}

/**
 * Validate password strength
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
export function validatePasswordStrength(password: string): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * Check rate limiting for password reset requests
 * Max 3 requests per hour per email
 */
export async function checkRateLimit(email: string): Promise<{
    allowed: boolean;
    remainingAttempts: number;
}> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            passwordResetTokens: {
                where: {
                    createdAt: {
                        gte: oneHourAgo,
                    },
                },
            },
        },
    });

    if (!user) {
        // Don't reveal if user exists, but allow the request
        return { allowed: true, remainingAttempts: 3 };
    }

    const requestCount = user.passwordResetTokens.length;
    const maxRequests = 3;

    return {
        allowed: requestCount < maxRequests,
        remainingAttempts: Math.max(0, maxRequests - requestCount),
    };
}

/**
 * Generate reset URL for console logging
 */
export function generateResetUrl(token: string, baseUrl?: string): string {
    const base = baseUrl || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return `${base}/reset-password?token=${token}`;
}

/**
 * Log reset token to console (for admin to share with user)
 */
export function logResetToken(email: string, token: string, expiresAt: Date) {
    const resetUrl = generateResetUrl(token);

    console.log('\n' + '='.repeat(80));
    console.log('🔐 PASSWORD RESET REQUEST');
    console.log('='.repeat(80));
    console.log(`📧 Email: ${email}`);
    console.log(`🔗 Reset URL: ${resetUrl}`);
    console.log(`⏰ Expires: ${expiresAt.toLocaleString()}`);
    console.log(`⏱️  Valid for: 15 minutes`);
    console.log('='.repeat(80));
    console.log('⚠️  Share this URL with the user to reset their password.');
    console.log('⚠️  This token can only be used once and will expire in 15 minutes.');
    console.log('='.repeat(80) + '\n');
}

/**
 * Clean up expired tokens (can be called periodically)
 */
export async function cleanupExpiredTokens(): Promise<number> {
    const result = await prisma.passwordResetToken.deleteMany({
        where: {
            expiresAt: {
                lt: new Date(),
            },
        },
    });

    return result.count;
}
