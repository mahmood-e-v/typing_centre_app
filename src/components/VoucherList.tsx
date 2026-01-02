
"use client";

import { useState, useMemo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Download, Search, RefreshCw, Eye, Receipt, X, Banknote } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import * as XLSX from 'xlsx';

export default function VoucherList({ refreshKey, type }: { refreshKey?: number, type?: 'PAYMENT' | 'RECEIPT' }) {
    const [rowData, setRowData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<any>(null);

    const [payAmount, setPayAmount] = useState(0);
    const [payMethod, setPayMethod] = useState('CASH');
    const [payAccountId, setPayAccountId] = useState('');
    const [accounts, setAccounts] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
        fetch('/api/accounts').then(r => r.json()).then(setAccounts).catch(console.error);
    }, [refreshKey, type]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const url = type ? `/api/vouchers?type=${type}` : '/api/vouchers';
            const res = await fetch(url);
            if (res.ok) {
                setRowData(await res.json());
            }
        } catch (error) {
            console.error("Failed to fetch vouchers", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredRows = useMemo(() => {
        let data = [...rowData];
        if (searchTerm) {
            const s = searchTerm.toLowerCase();
            data = data.filter(r =>
                r.voucherNo.toLowerCase().includes(s) ||
                (r.vendorName || r.vendor?.name || "").toLowerCase().includes(s) ||
                (r.description || "").toLowerCase().includes(s)
            );
        }
        if (fromDate) data = data.filter(r => new Date(r.date) >= new Date(fromDate));
        if (toDate) {
            const end = new Date(toDate);
            end.setHours(23, 59, 59, 999);
            data = data.filter(r => new Date(r.date) <= end);
        }
        return data;
    }, [rowData, searchTerm, fromDate, toDate]);

    const handleProcessPayment = async () => {
        if (!selectedVoucher || payAmount <= 0) return;

        try {
            const res = await fetch('/api/vouchers', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    voucherId: selectedVoucher.id,
                    paymentAmount: payAmount,
                    paymentMethod: payMethod,
                    accountId: payAccountId
                })
            });

            if (res.ok) {
                alert("Payment Recorded Successfully");
                setShowDetailModal(false);
                fetchData();
            } else {
                const data = await res.json();
                alert(data.error || "Failed to process payment");
            }
        } catch (error) {
            alert("Error processing payment");
        }
    };

    const columnDefs = useMemo<ColDef[]>(() => [
        { field: 'date', headerName: 'Date', width: 120, valueFormatter: p => new Date(p.value).toLocaleDateString() },
        { field: 'voucherNo', headerName: 'Voucher No', width: 150, cellClass: 'font-mono font-bold' },
        {
            headerName: 'Type',
            width: 100,
            valueGetter: p => p.data.type || 'PAYMENT', // Use actual type from backend
            cellRenderer: (p: ICellRendererParams) => {
                const isReceipt = p.value === 'RECEIPT';
                return <span className={`px-2 py-1 rounded text-[10px] font-bold ${isReceipt ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{p.value}</span>;
            }
        },
        {
            headerName: 'Party',
            width: 200,
            valueGetter: p => p.data.vendorName || p.data.vendor?.name || 'Manual'
        },
        { field: 'description', headerName: 'Description', width: 250 },
        { field: 'total', headerName: 'Total', width: 120, valueFormatter: p => formatCurrency(p.value), cellClass: 'font-bold' },
        { field: 'paidAmount', headerName: 'Paid', width: 120, valueFormatter: p => formatCurrency(p.value), cellStyle: { color: 'green' } },
        {
            field: 'balance',
            headerName: 'Balance',
            width: 120,
            valueFormatter: p => formatCurrency(p.value),
            cellStyle: (p: any) => (p.value > 0 ? { color: 'red', fontWeight: 'bold' } : { color: 'green' }) as any
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            cellRenderer: (p: ICellRendererParams) => {
                const s = p.value;
                let cls = 'bg-slate-100 text-slate-700';
                if (s === 'PAID') cls = 'bg-emerald-100 text-emerald-700';
                else if (s === 'OPEN') cls = 'bg-orange-100 text-orange-700';
                return <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${cls}`}>{s}</span>;
            }
        },
        {
            headerName: 'Action',
            width: 100,
            pinned: 'right',
            cellRenderer: (p: ICellRendererParams) => (
                <div className="flex gap-2 items-center justify-center h-full">
                    <button
                        onClick={() => { setSelectedVoucher(p.data); setPayAmount(p.data.balance); setShowDetailModal(true); }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Details"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ], []);

    const exportToExcel = () => {
        const data = filteredRows.map(r => ({
            'Date': new Date(r.date).toLocaleDateString(),
            'Voucher No': r.voucherNo,
            'Vendor': r.vendorName || r.vendor?.name || '-',
            'Description': r.description,
            'Total': r.total,
            'Paid': r.paidAmount,
            'Balance': r.balance,
            'Status': r.status,
            'User': r.enteredBy?.username || '-'
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Expenses");
        XLSX.writeFile(wb, `Vouchers_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div className="space-y-4 h-full flex flex-col">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-end gap-4 justify-between">
                <div className="flex flex-wrap items-end gap-4">
                    <div className="relative w-64">
                        <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Search</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="No, Vendor, Desc..."
                                className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">From</label>
                        <input type="date" className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">To</label>
                        <input type="date" className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" value={toDate} onChange={e => setToDate(e.target.value)} />
                    </div>
                    <button onClick={fetchData} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition mb-1" title="Refresh">
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>

                <button
                    onClick={exportToExcel}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-emerald-700 transition"
                >
                    <Download className="w-4 h-4" /> Export Excel
                </button>
            </div>

            <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                <div className="ag-theme-alpine h-full w-full">
                    <AgGridReact
                        rowData={filteredRows}
                        columnDefs={columnDefs}
                        defaultColDef={{ sortable: true, filter: true, resizable: true }}
                        pagination={true}
                        paginationPageSize={20}
                    />
                </div>
            </div>

            {showDetailModal && selectedVoucher && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                        <div className="p-8 bg-slate-900 text-white flex justify-between items-start no-print">
                            <div>
                                <h3 className="text-2xl font-black">{selectedVoucher.voucherNo}</h3>
                                <p className="text-white/60 text-xs mt-1 uppercase tracking-widest font-bold">
                                    Voucher Detail • {new Date(selectedVoucher.date).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => window.print()} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition flex items-center gap-2 px-4 text-xs font-bold">
                                    <Receipt className="w-4 h-4 text-blue-400" /> Print Voucher
                                </button>
                                <button onClick={() => setShowDetailModal(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-8 space-y-8 overflow-y-auto print:p-0">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest block">Vendor</label>
                                    <div className="text-xl font-bold text-slate-800">{selectedVoucher.vendorName || selectedVoucher.vendor?.name || 'Manual'}</div>
                                </div>
                                <div className="space-y-1 text-right">
                                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest block text-right">Status</label>
                                    <div className={`text-xl font-black ${selectedVoucher.status === 'PAID' ? 'text-emerald-600' : 'text-orange-600'}`}>
                                        {selectedVoucher.status}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-slate-400 text-left font-black uppercase text-[10px] tracking-widest italic">
                                            <th className="py-2 px-1">Category</th>
                                            <th className="py-2 px-1">Description</th>
                                            <th className="py-2 px-1 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {selectedVoucher.items.map((item: any) => (
                                            <tr key={item.id} className="text-slate-700">
                                                <td className="py-4 px-1 font-bold">{item.category?.name}</td>
                                                <td className="py-4 px-1 text-slate-500">{item.description || '-'}</td>
                                                <td className="py-4 px-1 text-right font-black">{formatCurrency(item.amount)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Payment History Section */}
                            {selectedVoucher.payments && selectedVoucher.payments.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
                                        <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Payment History / Receipts</h4>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl border border-slate-100 divide-y">
                                        {selectedVoucher.payments.map((p: any) => (
                                            <div key={p.id} className="p-4 flex justify-between items-center group">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{p.receiptNo}</span>
                                                        <span className="text-xs text-slate-400 font-bold">{new Date(p.date).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                                        Method: {p.paymentMethod}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-black text-emerald-600">{formatCurrency(p.amount)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedVoucher.balance > 0 && (
                                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200 space-y-4 no-print">
                                    <h4 className="text-sm font-black text-orange-800 flex items-center gap-2">
                                        <Banknote className="w-4 h-4" /> RECORD PAYMENT (Settle Balance)
                                    </h4>
                                    <div className="flex flex-wrap gap-4 items-end">
                                        <div className="flex-1 min-w-[150px]">
                                            <label className="text-[10px] uppercase font-bold text-orange-600 mb-1 block">Amount to Pay</label>
                                            <input
                                                type="number"
                                                className="w-full bg-white border border-orange-200 rounded-xl px-4 py-2 font-bold focus:ring-2 focus:ring-orange-500 outline-none"
                                                value={payAmount}
                                                onChange={e => setPayAmount(parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="w-32">
                                            <label className="text-[10px] uppercase font-bold text-orange-600 mb-1 block">Method</label>
                                            <select
                                                className="w-full bg-white border border-orange-200 rounded-xl px-4 py-2 font-bold focus:ring-2 focus:ring-orange-500 outline-none"
                                                value={payMethod}
                                                onChange={e => setPayMethod(e.target.value)}
                                            >
                                                <option value="CASH">Cash</option>
                                                <option value="CARD">Bank</option>
                                            </select>
                                        </div>
                                        <div className="flex-1 min-w-[200px]">
                                            <label className="text-[10px] uppercase font-bold text-orange-600 mb-1 block">From Account</label>
                                            <select
                                                className="w-full bg-white border border-orange-200 rounded-xl px-4 py-2 font-bold focus:ring-2 focus:ring-orange-500 outline-none"
                                                value={payAccountId}
                                                onChange={e => setPayAccountId(e.target.value)}
                                            >
                                                <option value="">Select Account...</option>
                                                {accounts.map(acc => (
                                                    <option key={acc.id} value={acc.id}>{acc.name} ({formatCurrency(acc.balance)})</option>
                                                ))}
                                            </select>
                                        </div>
                                        <button
                                            onClick={handleProcessPayment}
                                            className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-200 h-[42px]"
                                        >
                                            Record
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end pt-4 border-t-2 border-slate-50">
                                <div className="w-64 space-y-3">
                                    <div className="flex justify-between items-center text-slate-500 font-bold">
                                        <span className="text-[10px] uppercase">Voucher Total</span>
                                        <span>{formatCurrency(selectedVoucher.total)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-emerald-600 font-bold">
                                        <span className="text-[10px] uppercase">Paid Amount</span>
                                        <span>{formatCurrency(selectedVoucher.paidAmount)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-2xl font-black text-slate-900 border-t pt-2">
                                        <span className="text-sm uppercase text-slate-400">Balance</span>
                                        <span className={selectedVoucher.balance > 0 ? 'text-rose-600' : 'text-emerald-600'}>
                                            {formatCurrency(selectedVoucher.balance)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
