"use client";

import InvoiceForm from "@/components/InvoiceForm";
import TransactionGrid from "@/components/TransactionGrid";
import { FileText, Wallet, Receipt, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TransactionsPage() {
    return (
        <div className="space-y-8 max-w-[1600px] mx-auto py-4">
            {/* Header & Tabs */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <FileText className="w-10 h-10 text-blue-600" />
                            TRANSACTIONS
                        </h1>
                        <p className="text-slate-500 font-medium italic">Create invoices, manage receipts, and track all financial activities.</p>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl w-fit">
                    {/* Active Tab: Invoices */}
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-blue-600 font-black text-sm shadow-sm">
                        <FileText className="w-4 h-4" /> INVOICES
                    </button>

                    {/* Link Tab: Advance Payments */}
                    <Link
                        href="/advances"
                        className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 font-bold text-sm transition-all"
                    >
                        <Wallet className="w-4 h-4" /> ADVANCE PAYMENTS
                    </Link>

                    {/* Link Tab: Expenses */}
                    <Link
                        href="/expenses"
                        className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 font-bold text-sm transition-all"
                    >
                        <Receipt className="w-4 h-4" /> EXPENSES
                    </Link>

                    {/* Link Tab: Quotations */}
                    <Link
                        href="/quotations"
                        className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 font-bold text-sm transition-all"
                    >
                        <FileText className="w-4 h-4" /> QUOTATIONS
                    </Link>
                </div>
            </div>

            {/* Invoices Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <InvoiceForm />
            </div>
        </div>
    );
}
