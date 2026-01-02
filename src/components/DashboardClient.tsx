"use client";

import React, { useEffect, useState } from 'react';
import {
    Wallet,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    ShoppingBag,
    AlertCircle,
    Building2,
    Calendar,
    ChevronRight,
    Search
} from 'lucide-react';
import { RevenueTrendChart } from './RevenueTrendChart';
import { ServiceDistributionChart } from './ServiceDistributionChart';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export function DashboardClient() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/dashboard');
                if (!res.ok) throw new Error("Failed to load dashboard data");
                const json = await res.ok ? await res.json() : null;
                setData(json);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // Optional: Poll every 60 seconds
        const timer = setInterval(fetchData, 60000);
        return () => clearInterval(timer);
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    if (error) return (
        <div className="p-4 bg-rose-50 text-rose-600 rounded-lg border border-rose-200 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
        </div>
    );

    const kpis = [
        { label: "Cash on Hand", value: data.kpis.totalCash, icon: Wallet, color: "bg-blue-500", detail: "Branch Counter" },
        { label: "Bank Balance", value: data.kpis.totalBank, icon: Building2, color: "bg-indigo-500", detail: "All Accounts" },
        { label: "Receivables (AR)", value: data.kpis.accountsReceivable, icon: Clock, color: "bg-orange-500", detail: "Customer Owed" },
        { label: "Payables (AP)", value: data.kpis.accountsPayable, icon: ShoppingBag, color: "bg-rose-500", detail: "Vendor Owed" },
        { label: "Card Payables", value: data.kpis.creditCardPayable, icon: Wallet, color: "bg-amber-500", detail: "Credit Cards" },
        { label: "Revenue Today", value: data.kpis.netRevenueToday, icon: TrendingUp, color: "bg-emerald-500", detail: "Typing Income" },
        { label: "Daily Profit", value: data.kpis.dailyProfit, icon: ArrowUpRight, color: "bg-violet-500", detail: "Net Gains" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* KPI Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                        <div className={`absolute top-0 right-0 w-24 h-24 ${kpi.color} opacity-[0.03] rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform`}></div>
                        <div className="flex items-start justify-between relative z-10">
                            <div className={`${kpi.color} p-2.5 rounded-xl text-white shadow-lg shadow-${kpi.color.split('-')[1]}-500/20`}>
                                <kpi.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                {kpi.detail}
                            </span>
                        </div>
                        <div className="mt-4 relative z-10">
                            <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">
                                {formatCurrency(kpi.value)}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Performance Trend</h3>
                            <p className="text-sm text-slate-500">Revenue vs Operating Expenses (Last 7 Days)</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border">
                            <Calendar className="w-3 h-3" />
                            Rolling 7 Days
                        </div>
                    </div>
                    <RevenueTrendChart data={data.trends} />
                </div>

                <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-slate-900">Service Mix</h3>
                        <p className="text-sm text-slate-500">Revenue distribution by work type</p>
                    </div>
                    <ServiceDistributionChart data={data.services} />

                    <div className="mt-6 space-y-3">
                        {data.services.slice(0, 3).map((s: any, i: number) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${['bg-sky-500', 'bg-indigo-500', 'bg-violet-500'][i]}`}></div>
                                    <span className="text-xs font-medium text-slate-700">{s.name}</span>
                                </div>
                                <span className="text-xs font-bold text-slate-900">{formatCurrency(s.value)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row: Recent & Compliance */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Recent Invoices */}
                <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">Recent Invoices</h3>
                        <Link href="/transactions" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                            View All <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Invoice No</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.recentInvoices.map((inv: any) => (
                                    <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-slate-900">{inv.invoiceNo}</span>
                                            <p className="text-[10px] text-slate-400">{new Date(inv.date).toLocaleDateString()}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600">{inv.customerName}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-slate-900">{formatCurrency(inv.total)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${inv.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' :
                                                inv.status === 'PARTIAL' ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-600'
                                                }`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-slate-400 hover:text-primary group-hover:scale-110 transition-transform">
                                                <Search className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* VAT Compliance Card */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between border border-slate-800">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 blur-3xl rounded-full"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">VAT Compliance</h3>
                        <p className="text-slate-400 text-sm mt-1">Real-time FTA recovery status</p>

                        <div className="mt-10 space-y-6">
                            <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Output VAT (Sales)</p>
                                    <p className="text-xl font-bold mt-1 text-emerald-400">+{formatCurrency(data.vats.output)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Input VAT (Credit)</p>
                                    <p className="text-xl font-bold mt-1 text-sky-400">-{formatCurrency(data.vats.input)}</p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <p className="text-sm font-medium text-slate-400">Estimated Net Payable</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <h2 className="text-4xl font-black">{formatCurrency(data.vats.net)}</h2>
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">UAE 5% Standard</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 p-4 bg-white/5 rounded-2xl border border-white/10 relative z-10">
                        <p className="text-[10px] text-slate-400 leading-relaxed italic">
                            "Calculated per-line on taxable Typing Charges and approved business expenses for the current date."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
