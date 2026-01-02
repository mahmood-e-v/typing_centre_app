"use client";

import { useState, useEffect } from "react";
import { Lock, Unlock, AlertTriangle, ShieldCheck, RefreshCw } from "lucide-react";

interface FinancialPeriod {
    id: string;
    year: number;
    month: number;
    periodStart: string;
    periodEnd: string;

    accountingLocked: boolean;
    accountingLockedAt: string | null;
    accountingLockedBy: { username: string } | null;

    vatLocked: boolean;
    vatLockedAt: string | null;
    vatLockedBy: { username: string } | null;

    isYearEndClosed: boolean;
}

export default function FinancialPeriodsPage() {
    const [periods, setPeriods] = useState<FinancialPeriod[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    // Modal State
    const [unlockModal, setUnlockModal] = useState<{
        isOpen: boolean;
        year: number;
        month: number;
        type: "ACCOUNTING" | "VAT";
    } | null>(null);
    const [unlockReason, setUnlockReason] = useState("");

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        fetchPeriods();
    }, []);

    const fetchPeriods = async () => {
        try {
            const res = await fetch("/api/financial-periods");
            const data = await res.json();

            if (res.ok) {
                setPeriods(data.periods || []);
            } else {
                setError(data.error || "Failed to fetch periods");
            }
        } catch (err) {
            setError("An error occurred while fetching periods");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            await fetch("/api/financial-periods/generate", { method: "POST" });
            await fetchPeriods();
        } catch (err) {
            setError("Failed to generate periods");
        } finally {
            setLoading(false);
        }
    };

    const handleLock = async (year: number, month: number, type: "ACCOUNTING" | "VAT") => {
        const periodKey = `${year}-${month}-${type}`;
        setActionLoading(periodKey);
        setError("");

        try {
            const res = await fetch("/api/financial-periods/lock", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ year, month, lockType: type }),
            });

            const data = await res.json();

            if (res.ok) {
                await fetchPeriods();
            } else {
                setError(data.error || "Failed to lock period");
            }
        } catch (err) {
            setError("An error occurred while locking period");
        } finally {
            setActionLoading(null);
        }
    };

    const initiateUnlock = (year: number, month: number, type: "ACCOUNTING" | "VAT") => {
        setUnlockModal({ isOpen: true, year, month, type });
        setUnlockReason("");
    };

    const handleUnlockSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!unlockModal) return;

        const { year, month, type } = unlockModal;
        const periodKey = `${year}-${month}-${type}`;
        setActionLoading(periodKey);
        setError(""); // Clear previous errors
        setUnlockModal(null); // Close modal immediately

        try {
            const res = await fetch("/api/financial-periods/unlock", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ year, month, lockType: type, reason: unlockReason }),
            });

            const data = await res.json();

            if (res.ok) {
                await fetchPeriods();
            } else {
                setError(data.error || "Failed to unlock period");
            }
        } catch (err) {
            setError("An error occurred while unlocking period");
        } finally {
            setActionLoading(null);
        }
    };

    const [yearEndModal, setYearEndModal] = useState<{ isOpen: boolean; year: number } | null>(null);

    const handleYearEndCloseCall = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!yearEndModal) return;

        const { year } = yearEndModal;
        setActionLoading(`year-close-${year}`);
        setError("");
        setYearEndModal(null);

        try {
            const res = await fetch("/api/financial-periods/year-end-close", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ year }),
            });

            const data = await res.json();

            if (res.ok) {
                await fetchPeriods();
            } else {
                setError(data.error || "Failed to close financial year");
            }
        } catch (err) {
            setError("An error occurred while closing financial year");
        } finally {
            setActionLoading(null);
        }
    };

    // Group periods by year to find available years for closing
    const years = Array.from(new Set(periods.map(p => p.year))).sort((a, b) => b - a);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg animate-pulse text-sky-600">Loading periods...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <ShieldCheck className="w-8 h-8 text-sky-600" />
                        Financial Period Management
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage Audit & VAT locks. Unlocking requires Owner authorization.
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="relative group">
                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm text-sm font-medium transition-colors"
                        >
                            Year End Close
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 hidden group-hover:block z-10">
                            {years.map(year => (
                                <button
                                    key={year}
                                    onClick={() => setYearEndModal({ isOpen: true, year })}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Close Year {year}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Sync Periods
                    </button>
                </div>
            </div>

            {error && (
                <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                        <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                </div>
            )}

            <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Period
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-1/3">
                                Accounting Lock
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-1/3">
                                VAT Lock
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {periods.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                    No periods found. Click "Sync Periods" to start.
                                </td>
                            </tr>
                        ) : periods.map((period) => (
                            <tr key={period.id} className={`hover:bg-gray-50 transition-colors ${period.isYearEndClosed ? 'bg-gray-50' : ''}`}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <div className="text-sm font-bold text-gray-900">
                                            {monthNames[period.month - 1]} {period.year}
                                        </div>
                                        {period.isYearEndClosed && (
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-800 text-white uppercase">Year Closed</span>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {new Date(period.periodStart).toLocaleDateString()} - {new Date(period.periodEnd).toLocaleDateString()}
                                    </div>
                                </td>

                                {/* Accounting Lock Cell */}
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        {period.accountingLocked ? (
                                            <>
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                                                    <Lock className="w-3 h-3" /> Locked
                                                </span>
                                                <div className="text-xs text-gray-500">
                                                    by {period.accountingLockedBy?.username || "Admin"}
                                                </div>
                                                <button
                                                    onClick={() => initiateUnlock(period.year, period.month, "ACCOUNTING")}
                                                    disabled={!!actionLoading || period.isYearEndClosed} // Harder to unlock if year closed? Or strict warning?
                                                    className="text-xs text-sky-600 hover:text-sky-800 font-medium underline disabled:opacity-50 disabled:no-underline disabled:text-gray-400"
                                                    title={period.isYearEndClosed ? "Year is closed" : ""}
                                                >
                                                    {actionLoading === `${period.year}-${period.month}-ACCOUNTING` ? "..." : "Unlock"}
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                                                    <Unlock className="w-3 h-3" /> Open
                                                </span>
                                                <button
                                                    onClick={() => handleLock(period.year, period.month, "ACCOUNTING")}
                                                    disabled={!!actionLoading || period.isYearEndClosed}
                                                    className="text-xs text-red-600 hover:text-red-800 font-medium hover:underline mt-1 disabled:opacity-50"
                                                >
                                                    {actionLoading === `${period.year}-${period.month}-ACCOUNTING` ? "..." : "Lock"}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>

                                {/* VAT Lock Cell */}
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        {period.vatLocked ? (
                                            <>
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                                                    <Lock className="w-3 h-3" /> Locked
                                                </span>
                                                <div className="text-xs text-gray-500">
                                                    by {period.vatLockedBy?.username || "Admin"}
                                                </div>
                                                <button
                                                    onClick={() => initiateUnlock(period.year, period.month, "VAT")}
                                                    disabled={!!actionLoading || period.isYearEndClosed}
                                                    className="text-xs text-sky-600 hover:text-sky-800 font-medium underline disabled:opacity-50 disabled:no-underline disabled:text-gray-400"
                                                    title={period.isYearEndClosed ? "Year is closed" : ""}
                                                >
                                                    {actionLoading === `${period.year}-${period.month}-VAT` ? "..." : "Unlock"}
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                                                    <Unlock className="w-3 h-3" /> Open
                                                </span>
                                                <button
                                                    onClick={() => handleLock(period.year, period.month, "VAT")}
                                                    disabled={!!actionLoading || period.isYearEndClosed}
                                                    className="text-xs text-red-600 hover:text-red-800 font-medium hover:underline mt-1 disabled:opacity-50"
                                                >
                                                    {actionLoading === `${period.year}-${period.month}-VAT` ? "..." : "Lock"}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Unlock Reason Modal */}
            {unlockModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform scale-100 transition-all">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-900">
                                Unlock {unlockModal.type} Period
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                {monthNames[unlockModal.month - 1]} {unlockModal.year}
                            </p>
                            <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-800">
                                <p className="font-semibold flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" />
                                    Audit Warning
                                </p>
                                This action will be permanently logged. Only Owners can perform this action.
                            </div>
                        </div>
                        <form onSubmit={handleUnlockSubmit}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Reason for Unlocking (Required)
                            </label>
                            <textarea
                                value={unlockReason}
                                onChange={(e) => setUnlockReason(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-sm min-h-[100px]"
                                placeholder="Describe why you need to modify this closed period..."
                                required
                                minLength={20}
                            />
                            <p className="text-xs text-gray-500 mt-1 text-right">
                                {unlockReason.length}/20 characters minimum
                            </p>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setUnlockModal(null)}
                                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={unlockReason.length < 20}
                                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Confirm Unlock
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Year End Close Modal */}
            {yearEndModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform scale-100 transition-all">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <ShieldCheck className="w-6 h-6 text-indigo-600" />
                                Year End Close: {yearEndModal.year}
                            </h3>
                            <p className="text-sm text-gray-600 mt-2">
                                You are about to close the financial year <b>{yearEndModal.year}</b>.
                            </p>

                            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100 text-sm text-red-800">
                                <p className="font-semibold flex items-center gap-2 mb-1">
                                    <AlertTriangle className="w-4 h-4" />
                                    Irreversible Action
                                </p>
                                <ul className="list-disc ml-4 space-y-1">
                                    <li>All periods in {yearEndModal.year} will be <b>LOCKED</b> (Accounting & VAT).</li>
                                    <li>This action prevents further edits.</li>
                                    <li>Re-opening requires Super Admin intervention.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                type="button"
                                onClick={() => setYearEndModal(null)}
                                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleYearEndCloseCall}
                                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Confirm Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
