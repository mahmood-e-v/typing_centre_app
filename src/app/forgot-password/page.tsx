"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [identifier, setIdentifier] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
            } else {
                setError(data.error || "Failed to process request");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-white p-4">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-[25%] -left-[25%] w-[50%] h-[50%] bg-sky-500/10 blur-[120px] rounded-full" />
                    <div className="absolute -bottom-[25%] -right-[25%] w-[50%] h-[50%] bg-violet-500/10 blur-[120px] rounded-full" />
                </div>

                <div className="w-full max-w-md space-y-8 relative">
                    <div className="text-center space-y-4">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Check Server Console</h1>
                        <p className="text-zinc-400">
                            A password reset link has been generated. Please contact your administrator or check the server console for the reset link.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4 shadow-2xl">
                        <div className="space-y-2">
                            <p className="text-sm text-zinc-400">
                                <strong className="text-white">For Administrators:</strong>
                            </p>
                            <p className="text-sm text-zinc-400">
                                The reset link has been logged to the server console. Share this link with the user to complete the password reset process.
                            </p>
                            <p className="text-sm text-zinc-400 mt-4">
                                The reset link will expire in <strong className="text-white">15 minutes</strong> and can only be used once.
                            </p>
                        </div>

                        <Link
                            href="/login"
                            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

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
                            <Mail className="w-10 h-10 text-sky-500" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Forgot Password?</h1>
                    <p className="text-zinc-400">
                        Enter your email or username and we'll generate a password reset link
                    </p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Email or Username</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                                <input
                                    type="email"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-zinc-600"
                                    placeholder="username or email@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
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
                                    Request Reset Link
                                    <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-4 border-t border-white/10">
                        <Link
                            href="/login"
                            className="flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
