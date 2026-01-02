"use client";

import { useState } from 'react';
import VoucherForm from '@/components/VoucherForm';
import VoucherList from '@/components/VoucherList';
import VoucherGrid from '@/components/VoucherGrid';
import { Wallet, ListTree, Table } from 'lucide-react';

export default function AdvancesPage() {
    const [refreshGrid, setRefreshGrid] = useState(0);
    const [historyTab, setHistoryTab] = useState<'vouchers' | 'items'>('items');

    const handleOnSave = () => {
        setRefreshGrid(prev => prev + 1);
    };

    return (
        <div className="space-y-12 max-w-[1600px] mx-auto py-4">
            {/* Page Header */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 no-print">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <Wallet className="w-10 h-10 text-emerald-600" />
                        ADVANCE PAYMENTS
                    </h1>
                    <p className="text-slate-500 font-medium italic">Record advance receipts from customers and manage deposit liabilities.</p>
                </div>
            </div>

            {/* Entry Form Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 px-2 no-print">
                    <div className="w-1 h-6 bg-emerald-600 rounded-full"></div>
                    <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">New Advance Receipt</h2>
                </div>
                <VoucherForm key="RECEIPT" onSave={handleOnSave} initialType="RECEIPT" fixedType={true} />
            </div>

            {/* History Section */}
            <div className="space-y-4 no-print">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-6 bg-emerald-600 rounded-full"></div>
                        <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Transaction History</h2>
                    </div>

                    <div className="flex bg-slate-100 p-1 rounded-xl border">
                        <button
                            onClick={() => setHistoryTab('items')}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${historyTab === 'items' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                                }`}
                        >
                            <Table className="w-3.5 h-3.5" /> Flat View (Excel)
                        </button>
                        <button
                            onClick={() => setHistoryTab('vouchers')}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${historyTab === 'vouchers' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                                }`}
                        >
                            <ListTree className="w-3.5 h-3.5" /> Voucher List
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden h-[700px]">
                    {historyTab === 'items' ? (
                        <VoucherGrid refreshKey={refreshGrid} type="RECEIPT" />
                    ) : (
                        <VoucherList refreshKey={refreshGrid} type="RECEIPT" />
                    )}
                </div>
            </div>
        </div>
    );
}
