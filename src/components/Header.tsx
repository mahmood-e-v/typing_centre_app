"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, LogOut, User as UserIcon, Loader2, AlertTriangle } from "lucide-react";

const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hour in milliseconds
const WARNING_TIME = 5 * 60 * 1000; // Show warning 5 minutes before logout

export default function Header() {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showInactivityWarning, setShowInactivityWarning] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const router = useRouter();

    const lastActivityRef = useRef<number>(Date.now());
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
    const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
    const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetch("/api/session")
            .then(async res => {
                if (res.status === 401) {
                    // Session invalid: Ensure cookie is cleared before redirecting
                    await fetch("/api/logout", { method: "POST" });
                    router.push("/login");
                    return null;
                }
                if (!res.ok) throw new Error("Session check failed");
                return res.json();
            })
            .then(data => {
                if (data && data.user) {
                    setUser(data.user);
                    lastActivityRef.current = Date.now();
                } else if (data !== null) {
                    // Unexpected format
                    console.error("Invalid session data");
                }
            })
            .catch((e) => {
                console.error("Session check error:", e);
                // Do NOT redirect on transient network errors to avoid loops
                // Only redirect if explicitly unauthorized (handled above)
            })
            .finally(() => setIsLoading(false));
    }, [router]);

    const logout = async () => {
        clearTimers();
        try {
            const res = await fetch("/api/logout", { method: "POST" });
            if (res.ok) {
                router.push("/login");
            }
        } catch (error) {
            console.error("Logout failed:", error);
            // Fallback: redirects to login even if server logout fails
            router.push("/login");
        }
    };

    const clearTimers = () => {
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };

    const resetInactivityTimer = useCallback(() => {
        if (!user) return;

        clearTimers();
        lastActivityRef.current = Date.now();
        setShowInactivityWarning(false);

        // Set warning timer (5 minutes before logout)
        warningTimerRef.current = setTimeout(() => {
            setShowInactivityWarning(true);
            setTimeRemaining(WARNING_TIME);

            // Start countdown
            countdownIntervalRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1000) {
                        clearInterval(countdownIntervalRef.current!);
                        return 0;
                    }
                    return prev - 1000;
                });
            }, 1000);
        }, INACTIVITY_TIMEOUT - WARNING_TIME);

        // Set logout timer (1 hour)
        inactivityTimerRef.current = setTimeout(() => {
            logout();
        }, INACTIVITY_TIMEOUT);
    }, [user]);

    const continueSession = () => {
        setShowInactivityWarning(false);
        resetInactivityTimer();
    };

    // Track user activity
    useEffect(() => {
        if (!user) return;

        const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];

        activityEvents.forEach(event => {
            window.addEventListener(event, resetInactivityTimer);
        });

        // Initial timer setup
        resetInactivityTimer();

        return () => {
            activityEvents.forEach(event => {
                window.removeEventListener(event, resetInactivityTimer);
            });
            clearTimers();
        };
    }, [user, resetInactivityTimer]);

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <div className="flex items-center p-4 border-b bg-white justify-between">
                <div className="flex items-center bg-slate-100 rounded-md px-3 py-1 w-96">
                    <Search className="h-4 w-4 text-slate-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="bg-transparent border-none outline-none text-sm w-full"
                    />
                </div>
                <div className="flex items-center gap-x-4">
                    <button className="p-2 hover:bg-slate-100 rounded-full transition">
                        <Bell className="h-5 w-5 text-slate-600" />
                    </button>

                    {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                    ) : user ? (
                        <>
                            {/* Visible Logout Button */}
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Logout"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>

                            <div className="flex items-center gap-x-3">
                                <div className="flex flex-col items-end mr-1">
                                    <span className="text-xs font-bold text-slate-900">{user.username}</span>
                                    <span className="text-[10px] text-slate-500 uppercase">{user.role}</span>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white">
                                    {user.username.substring(0, 2).toUpperCase()}
                                </div>
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={() => router.push("/login")}
                            className="text-sm text-sky-600 font-medium"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>

            {/* Inactivity Warning Modal */}
            {showInactivityWarning && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                                <AlertTriangle className="h-6 w-6 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Session Timeout Warning</h3>
                                <p className="text-sm text-slate-500">You will be logged out due to inactivity</p>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4 mb-4">
                            <p className="text-sm text-slate-700 mb-2">
                                Your session will expire in:
                            </p>
                            <div className="text-3xl font-bold text-amber-600 text-center">
                                {formatTime(timeRemaining)}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={continueSession}
                                className="flex-1 px-4 py-2.5 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-colors"
                            >
                                Continue Session
                            </button>
                            <button
                                onClick={logout}
                                className="px-4 py-2.5 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
                            >
                                Logout Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
