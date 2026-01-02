import Link from "next/link";
import { LogIn } from "lucide-react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-slate-50 to-slate-100">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    ServiceCenter-Pro&nbsp;
                    <code className="font-bold">v1.0</code>
                </p>
            </div>

            <div className="flex flex-col items-center mt-20">
                <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 sm:text-7xl mb-6">
                    Accounting <span className="text-primary">Evolved</span>.
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl text-center mb-10">
                    High-velocity data entry for UAE Typing & Service centers.
                    Manage transactions, beneficiaries, and payments with Excel-like speed.
                </p>
                <div className="flex gap-4">
                    <Link href="/dashboard">
                        <button className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                            Go to Dashboard
                        </button>
                    </Link>
                    <Link href="/login">
                        <button className="px-8 py-3 bg-white text-slate-900 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
                            <LogIn className="w-4 h-4" /> Login
                        </button>
                    </Link>
                    <Link href="/transactions">
                        <button className="px-8 py-3 bg-slate-100 text-slate-600 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                            Quick Entry
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
