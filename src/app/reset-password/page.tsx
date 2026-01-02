"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { Suspense } from "react";

function ResetPasswordContent() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState(false);
    const [tokenValid, setTokenValid] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) {
            setError("Invalid reset link");
            setIsVerifying(false);
            return;
        }

        // Verify token on page load
        verifyToken();
    }, [token]);

    const verifyToken = async () => {
        try {
            const res = await fetch(`/api/auth/verify-reset-token?token=${token}`);
            const data = await res.json();

            if (res.ok && data.valid) {
                setTokenValid(true);
                setUserEmail(data.email);
            } else {
                setError(data.error || "Invalid or expired reset link");
            }
        } catch (err) {
            setError("Failed to verify reset link");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setValidationErrors([]);

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            } else {
                if (data.errors) {
                    setValidationErrors(data.errors);
                }
                setError(data.error || "Failed to reset password");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    // Loading state while verifying token
    if (isVerifying) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-white">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-sky-500" />
                    <p className="text-zinc-400">Verifying reset link...</p>
                </div>
            </div>
        );
    }

    // Success state
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-white p-4">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-[25%] -left-[25%] w-[50%] h-[50%] bg-green-500/10 blur-[120px] rounded-full" />
                    <div className="absolute -bottom-[25%] -right-[25%] w-[50%] h-[50%] bg-green-500/10 blur-[120px] rounded-full" />
                </div>

                <div className="w-full max-w-md space-y-8 relative">
                    <div className="text-center space-y-4">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Password Reset Successful!</h1>
                        <p className="text-zinc-400">
                            Your password has been updated. Redirecting to login...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Invalid token state
    if (!tokenValid) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-white p-4">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-[25%] -left-[25%] w-[50%] h-[50%] bg-red-500/10 blur-[120px] rounded-full" />
                    <div className="absolute -bottom-[25%] -right-[25%] w-[50%] h-[50%] bg-red-500/10 blur-[120px] rounded-full" />
                </div>

                <div className="w-full max-w-md space-y-8 relative">
                    <div className="text-center space-y-4">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
                                <AlertCircle className="w-10 h-10 text-red-500" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Invalid Reset Link</h1>
                        <p className="text-zinc-400">{error}</p>
                    </div>

                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4 shadow-2xl">
                        <p className="text-sm text-zinc-400 text-center">
                            The reset link may have expired or already been used. Please request a new password reset.
                        </p>
                        <Link
                            href="/forgot-password"
                            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2 group"
                        >
                            Request New Reset Link
                        </Link>
                        <Link
                            href="/login"
                            className="block text-center text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Password reset form
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-white p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[25%] -left-[25%] w-[50%] h-[50%] bg-sky-500/10 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[25%] -right-[25%] w-[50%] h-[50%] bg-violet-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-md space-y-8 relative">
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <Lock className="w-10 h-10 text-sky-500" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Reset Password</h1>
                    <p className="text-zinc-400">Enter your new password for {userEmail}</p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-12 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-zinc-600"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-12 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-zinc-600"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="text-xs text-zinc-400 space-y-1">
                            <p className="font-medium text-zinc-300">Password requirements:</p>
                            <ul className="list-disc list-inside space-y-0.5">
                                <li>At least 8 characters long</li>
                                <li>At least one uppercase letter</li>
                                <li>At least one lowercase letter</li>
                                <li>At least one number</li>
                            </ul>
                        </div>

                        {validationErrors.length > 0 && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm space-y-1">
                                {validationErrors.map((err, idx) => (
                                    <p key={idx}>• {err}</p>
                                ))}
                            </div>
                        )}

                        {error && !validationErrors.length && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Reset Password
                                    <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-white">
                <Loader2 className="w-10 h-10 animate-spin text-sky-500" />
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}
