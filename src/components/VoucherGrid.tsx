"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Download, Search, RefreshCw } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import * as XLSX from 'xlsx';
import { Banknote } from 'lucide-react';
import VoucherPaymentModal from './VoucherPaymentModal';

export default function VoucherGrid({ refreshKey, type }: { refreshKey?: number, type?: 'PAYMENT' | 'RECEIPT' }) {
    const gridRef = useRef<AgGridReact>(null);
    const [rowData, setRowData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVoucher, setSelectedVoucher] = useState<any>(null);
    const [showPayModal, setShowPayModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, [refreshKey, type]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const url = type ? `/api/vouchers?type=${type}` : '/api/vouchers';
            const res = await fetch(url);
            if (res.ok) {
                const vouchers = await res.json();
                // Flatten vouchers into items
                const items: any[] = [];
                vouchers.forEach((v: any) => {
                    let hasItems = false;

                    // 1. Add Service Items
                    if (v.items && v.items.length > 0) {
                        hasItems = true;
                        v.items.forEach((item: any) => {
                            items.push({
                                id: item.id,
                                voucherId: v.id,
                                date: v.date,
                                voucherNo: v.voucherNo,
                                vendor: v.vendorName || v.vendor?.name || '-',
                                category: item.category?.name || '-',
                                description: item.description,
                                amount: item.amount,
                                status: v.status,
                                balance: v.balance,
                                user: v.enteredBy?.username || '-',
                                type: 'SERVICE',
                                receiptNo: '-'
                            });
                        });
                    } else if (v.type === 'RECEIPT') {
                        // 1.5 Handle Receipt (Advance) which has no items
                        // We show it as a single line item
                        items.push({
                            id: v.id, // Use voucher ID as row ID
                            voucherId: v.id,
                            date: v.date,
                            voucherNo: v.voucherNo,
                            vendor: v.vendorName || v.vendor?.name || '-', // vendorName holds Customer Name
                            category: 'ADVANCE',
                            description: v.description || 'Customer Advance',
                            amount: v.total, // Total amount is the advance amount
                            status: v.status,
                            balance: v.balance, // Should be 0 if fully paid
                            user: v.enteredBy?.username || '-',
                            type: 'RECEIPT',
                            receiptNo: '-' // Or maybe we can't link to a receipt no unless we generated one? Logic says we generated Journal but not VoucherPayment.
                        });
                    }

                    // 2. Add Payment Items
                    if (v.payments) {
                        v.payments.forEach((p: any) => {
                            items.push({
                                id: p.id,
                                voucherId: v.id,
                                date: p.date,
                                voucherNo: v.voucherNo,
                                vendor: v.vendorName || v.vendor?.name || '-',
                                category: 'PAYMENT-IN',
                                description: `Payment against ${v.voucherNo}`,
                                amount: p.amount,
                                status: 'PAID',
                                balance: 0,
                                user: v.enteredBy?.username || '-',
                                type: 'PAYMENT',
                                receiptNo: p.receiptNo
                            });
                        });
                    }
                });
                setRowData(items);
            }
        } catch (error) {
            console.error("Failed to fetch expenses", error);
        } finally {
            setLoading(false);
        }
    };

    const columnDefs = useMemo<ColDef[]>(() => [
        { field: 'date', headerName: 'Date', width: 120, valueFormatter: p => new Date(p.value).toLocaleDateString() },
        { field: 'voucherNo', headerName: 'Voucher No', width: 150, cellStyle: { fontWeight: 'bold' } as any },
        { field: 'receiptNo', headerName: 'Receipt No', width: 150, cellStyle: p => p.value !== '-' ? { color: '#2563eb', fontWeight: 'bold' } : {} },
        { field: 'vendor', headerName: 'Vendor / Paid To', width: 200 },
        { field: 'category', headerName: 'Category', width: 130 },
        { field: 'description', headerName: 'Description', flex: 1 },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 130,
            cellStyle: p => {
                const isPayment = p.data.type === 'PAYMENT';
                return { fontWeight: 'black', color: isPayment ? '#059669' : '#e11d48' } as any;
            },
            valueFormatter: p => formatCurrency(p.value)
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 110,
            cellRenderer: (p: any) => {
                const s = p.value;
                const cls = s === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700';
                return <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${cls}`}>{s}</span>;
            }
        },
        { field: 'user', headerName: 'User', width: 120 },
        {
            headerName: 'Action',
            width: 100,
            pinned: 'right',
            cellRenderer: (p: any) => {
                if (p.data.type === 'PAYMENT' || p.data.status === 'PAID') return null;
                // Only show Pay button if balance > 0
                if (p.data.balance <= 0) return null;

                // Dedupe: If we have multiple lines for same voucher, user might get confused.
                // ideally we only show action on the first line or grouping. 
                // But for now, let's allow paying from any line of that voucher (it opens the voucher modal).

                return (
                    <button
                        onClick={() => {
                            setSelectedVoucher({
                                id: p.data.voucherId,
                                voucherNo: p.data.voucherNo,
                                vendorName: p.data.vendor,
                                balance: p.data.balance,
                                total: p.data.amount // This is row amount, might be misleading but we need full voucher total? 
                                // Actually modal uses balance.
                            });
                            setShowPayModal(true);
                        }}
                        className="p-1.5 rounded-lg border border-emerald-100 text-emerald-600 hover:bg-emerald-50 transition"
                        title="Pay Voucher"
                    >
                        <Banknote className="w-4 h-4" />
                    </button>
                );
            }
        }
    ], []);

    const filteredRows = useMemo(() => {
        if (!searchTerm) return rowData;
        const s = searchTerm.toLowerCase();
        return rowData.filter(r =>
            r.voucherNo.toLowerCase().includes(s) ||
            r.vendor.toLowerCase().includes(s) ||
            r.description.toLowerCase().includes(s) ||
            r.category.toLowerCase().includes(s)
        );
    }, [rowData, searchTerm]);

    const exportToExcel = () => {
        const data = filteredRows.map(r => ({
            'Date': new Date(r.date).toLocaleDateString(),
            'Voucher No': r.voucherNo,
            'Receipt No': r.receiptNo,
            'Vendor': r.vendor,
            'Category': r.category,
            'Description': r.description,
            'Amount': r.amount,
            'Status': r.status,
            'User': r.user
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Expenses");
        XLSX.writeFile(wb, `Expenses_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50 no-print">
                <div className="relative w-72">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search expenses..."
                        className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-500"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchData} className="p-2 hover:bg-slate-200 rounded-lg transition text-slate-600">
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button onClick={exportToExcel} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-sm transition">
                        <Download className="w-4 h-4" /> Export Excel
                    </button>
                </div>
            </div>
            <div className="flex-1 ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    rowData={filteredRows}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        sortable: true,
                        filter: true,
                        resizable: true,
                    }}
                    animateRows={true}
                    headerHeight={48}
                    rowHeight={48}
                />
            </div>

            <VoucherPaymentModal
                isOpen={showPayModal}
                onClose={() => setShowPayModal(false)}
                onSuccess={fetchData}
                voucher={selectedVoucher}
            />
        </div >
    );
}
