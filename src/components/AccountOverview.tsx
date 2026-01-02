"use client";

import { CreditCard, Wallet, Banknote, Landmark, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const accounts = [
    { id: "1", name: "Cash on Hand", type: "CASH", balance: 4520.50, color: "bg-emerald-500" },
    { id: "2", name: "Ajman Bank - Main", type: "BANK", balance: 125400.00, color: "bg-blue-600" },
    { id: "3", name: "Emirates NBD", type: "BANK", balance: 8520.00, color: "bg-sky-500" },
    { id: "4", name: "Credit Card - Card 1", type: "CREDIT_CARD", balance: -2450.00, color: "bg-rose-500" },
    { id: "5", name: "POS Terminal", type: "CASH", balance: 1240.25, color: "bg-orange-500" },
];

export default function AccountOverview() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Accounts & Balances</h1>
                    <p className="text-sm text-muted-foreground">Real-time status of all bank and cash accounts</p>
                </div>
                <div className="flex bg-white border rounded-lg overflow-hidden shadow-sm">
                    <div className="px-6 py-2 border-r">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Total Liquidity</p>
                        <p className="text-lg font-bold text-emerald-600">{formatCurrency(137230.75)}</p>
                    </div>
                    <div className="px-6 py-2">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Total credit dues</p>
                        <p className="text-lg font-bold text-rose-600">{formatCurrency(2450.00)}</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {accounts.map((acc) => (
                    <div key={acc.id} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition group overflow-hidden relative">
                        <div className={`absolute top-0 right-0 w-32 h-32 ${acc.color} opacity-[0.03] rounded-bl-full -mr-8 -mt-8 transition group-hover:scale-110`} />
                        <div className="flex items-start justify-between mb-6">
                            <div className={`${acc.color} p-3 rounded-xl text-white shadow-lg`}>
                                {acc.type === 'CASH' && <Wallet className="h-6 w-6" />}
                                {acc.type === 'BANK' && <Landmark className="h-6 w-6" />}
                                {acc.type === 'CREDIT_CARD' && <CreditCard className="h-6 w-6" />}
                            </div>
                            <button className="text-slate-400 hover:text-primary transition">
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">{acc.name}</p>
                            <h3 className={`text-2xl font-bold ${acc.balance < 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                                {formatCurrency(acc.balance)}
                            </h3>
                        </div>
                        <div className="mt-6 flex gap-2">
                            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-bold text-slate-500">{acc.type}</span>
                            <span className="text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full font-bold text-emerald-600">Active</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                    <h3 className="font-bold">Recent Account Movements</h3>
                </div>
                <div className="divide-y">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                                    <Banknote className="h-5 w-5 text-slate-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Transfer to Ajman Bank</p>
                                    <p className="text-xs text-muted-foreground">From POS Terminal • Today, 10:45 AM</p>
                                </div>
                            </div>
                            <p className="text-sm font-bold text-slate-900">{formatCurrency(1200)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
