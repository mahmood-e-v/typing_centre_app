"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, User, Lock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: username, password }),
            });

            if (res.ok) {
                // Check if user needs to change password
                const sessionRes = await fetch("/api/session");
                
                if (sessionRes.ok) {
                    const sessionData = await sessionRes.json();

                    if (sessionData.user?.forcePasswordChange) {
                        router.push("/change-password");
                    } else if (sessionData.user) {
                        router.push("/dashboard");
                    } else {
                        // This case handles { user: null } or similar unexpectedly valid but empty responses
                        console.error("Login successful but no user in session");
                        setError("Session verification failed. Please try again.");
                    }
                } else {
                    console.error("Session API returned error:", sessionRes.status);
                    setError("Login successful but session creation failed. Please check your browser cookie settings.");
                }
            } else {
                const data = await res.json();
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

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
                            <LogIn className="w-10 h-10 text-sky-500" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        ServiceCenter<span className="text-sky-500 italic">Pro</span>
                    </h1>
                    <p className="text-zinc-400">Enter your credentials to access your dashboard</p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6 shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="off"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-zinc-600"
                                    placeholder="admin"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-zinc-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <a
                                    href="/forgot-password"
                                    className="text-xs text-sky-500 hover:text-sky-400 transition-colors"
                                >
                                    Forgot Password?
                                </a>
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
                                    Sign in
                                    <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-zinc-500">
                    Secure, Enterprise-Grade Service Management
                </p>
            </div>
        </div>
    );
}
