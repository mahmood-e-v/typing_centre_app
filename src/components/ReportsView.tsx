"use client";

import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Download,
    Filter,
    Calendar
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import TransactionGrid from "./TransactionGrid";

export default function ReportsView() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Reports & Analytics</h1>
                    <p className="text-sm text-muted-foreground">Financial performance and projections</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center bg-white border rounded-lg px-3 py-1.5 focus-within:ring-2 ring-primary transition">
                        <Calendar className="h-4 w-4 text-slate-500 mr-2" />
                        <select className="bg-transparent border-none outline-none text-sm font-medium">
                            <option>Today</option>
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition text-sm font-medium">
                        <Download className="h-4 w-4" /> Export Report
                    </button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white p-6 rounded-2xl border shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-muted-foreground">Gross Revenue</p>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold">{formatCurrency(12450.50)}</h3>
                    <p className="text-xs text-emerald-600 font-medium mt-1">+12% from yesterday</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{formatCurrency(2840.40)}</h3>
                    <p className="text-xs text-primary font-medium mt-1">+8% from average</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-muted-foreground">Accounts Receivable</p>
                        <TrendingDown className="h-4 w-4 text-rose-500" />
                    </div>
                    <h3 className="text-2xl font-bold">{formatCurrency(4850.00)}</h3>
                    <p className="text-xs text-rose-600 font-medium mt-1">Due from 12 partners</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="bg-white p-6 rounded-2xl border shadow-sm h-80">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold">Daily Profit Tally</h3>
                        <BarChart3 className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="h-full flex items-center justify-center text-muted-foreground italic text-sm">
                        Revenue vs Cost Chart Visualization
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border shadow-sm">
                    <h3 className="font-bold mb-6">Partner Liabilities</h3>
                    <div className="space-y-4">
                        {[
                            { name: "Global PRO Services", amount: 1250, status: "Overdue" },
                            { name: "Al-Hammadi Group", amount: 840, status: "Pending" },
                            { name: "Quick Visa Co", amount: 2100, status: "Pending" },
                            { name: "Individual PROs", amount: 660, status: "Pending" },
                        ].map((partner) => (
                            <div key={partner.name} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                                <div>
                                    <p className="text-sm font-bold">{partner.name}</p>
                                    <p className={`text-[10px] uppercase font-black ${partner.status === 'Overdue' ? 'text-rose-600' : 'text-orange-600'}`}>
                                        {partner.status}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold">{formatCurrency(partner.amount)}</p>
                                    <button className="text-[10px] text-primary font-bold hover:underline">Settle Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <h3 className="font-bold mb-4">Full Transaction Log (All Activity)</h3>
                <div className="h-[600px]">
                    <TransactionGrid showAll={true} hideActions={true} />
                </div>
            </div>
        </div>
    );
}
