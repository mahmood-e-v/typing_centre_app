"use client";


import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
    ColDef,
    ICellRendererParams,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { formatCurrency } from '@/lib/utils';
import PaymentModal from './PaymentModal';
import * as XLSX from 'xlsx';
import { Filter, Calendar, Download, Banknote, Edit, Trash2, RefreshCw } from 'lucide-react';

// Types matching our Schema
interface TransactionRow {
    id?: string;
    invNo: string;
    invoiceId?: string; // For loading full invoice
    date: string | Date; // API might return string
    enteredBy: string; // Username
    customer: string;
    company: string;
    applicant: string;
    beneficiary: string;
    workDescription: string;
    quantity?: number;
    govFee: number;
    typingCharge: number;
    vat: number;
    discount: number;
    total: number;
    paymentMethod: 'CASH' | 'CARD' | 'ONLINE';
    advanceStatus: 'NONE' | 'PARTIAL' | 'FULL';
    advanceAmount: number;
    details: string;
    status: 'PAID' | 'NOT_PAID' | 'PARTIAL' | 'DRAFT' | 'CANCELLED';
    paidAmount?: number;
    balance?: number;
    govtFeePaidFrom?: string;
    govtFeeRef?: string;
    type: 'SERVICE' | 'PAYMENT' | 'EXPENSE' | 'RECEIPT';
    receiptNo?: string;
}

interface TransactionGridProps {
    onEdit?: (invoiceId: string) => void;
}

const VAT_RATE = 0.05;

export default function TransactionGrid({ onEdit, showAll = false, hideActions = false }: { onEdit?: (id: string) => void, showAll?: boolean, hideActions?: boolean }) {
    const gridRef = useRef<AgGridReact>(null);
    const [rowData, setRowData] = useState<TransactionRow[]>([]);
    const [showPayModal, setShowPayModal] = useState(false);
    const [selectedInv, setSelectedInv] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState<any>(null);

    // Date Range & Filtering
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [filterCol, setFilterCol] = useState('customer'); // Default
    const [filterVal, setFilterVal] = useState('');

    // Fetch Data
    const fetchData = async () => {
        try {
            const txRes = await fetch('/api/transactions');
            if (txRes.ok) {
                const data = await txRes.json();
                if (showAll) {
                    setRowData(data);
                } else {
                    // Filter out Vouchers (Expense/Receipt) from this view as requested
                    const operationalTransactions = data.filter((t: any) => t.type !== 'EXPENSE' && t.type !== 'RECEIPT');
                    setRowData(operationalTransactions);
                }
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    };

    const filteredRows = useMemo(() => {
        let data = [...rowData];

        // 1. Unified Search
        if (searchTerm) {
            const s = searchTerm.toLowerCase();
            data = data.filter(r =>
                r.invNo.toLowerCase().includes(s) ||
                r.customer.toLowerCase().includes(s) ||
                r.company.toLowerCase().includes(s) ||
                (typeof r.date === 'string' ? r.date : r.date.toISOString()).includes(s) ||
                r.workDescription.toLowerCase().includes(s)
            );
        }

        // 2. Date Range Filter
        if (fromDate) {
            data = data.filter(r => new Date(r.date) >= new Date(fromDate));
        }
        if (toDate) {
            // End of day for toDate
            const end = new Date(toDate);
            end.setHours(23, 59, 59, 999);
            data = data.filter(r => new Date(r.date) <= end);
        }

        // 3. Column Specific Filter
        if (filterVal) {
            const v = filterVal.toLowerCase();
            data = data.filter((r: any) => (r[filterCol] || "").toString().toLowerCase().includes(v));
        }

        return data;
    }, [rowData, searchTerm, fromDate, toDate, filterCol, filterVal]);

    const exportToExcel = () => {
        const dataToExport = filteredRows.map(r => ({
            'Date': new Date(r.date).toLocaleDateString(),
            'Invoice No': r.invNo,
            'Receipt No': r.receiptNo || '-',
            'Customer': r.customer,
            'Company': r.company,
            'Description': r.workDescription,
            'Gov Fee': r.govFee,
            'Typing': r.typingCharge,
            'VAT': r.vat,
            'Discount': r.discount,
            'Total': r.total,
            'Paid': r.paidAmount ?? 0,
            'Balance': r.balance ?? 0,
            'Status': r.status,
            'Entered By': r.enteredBy
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Transactions");
        XLSX.writeFile(wb, `Transactions_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    useEffect(() => {
        fetchData();
        fetch("/api/session").then(r => r.json()).then(data => {
            if (data.user) setUser(data.user);
        });
    }, []);

    const handleDeleteInvoice = async (invoiceId: string, invoiceNo: string) => {
        const confirmMsg = `DELETE ENTIRE INVOICE: ${invoiceNo} \n\nThis will remove the invoice and ALL its services/payments.\n\nType "delete invoice ${invoiceNo}" to confirm:`;
        const input = prompt(confirmMsg);

        if (input === `delete invoice ${invoiceNo}`) {
            try {
                const res = await fetch(`/api/invoices?id=${invoiceId}`, { method: 'DELETE' });
                if (res.ok) {
                    alert('Invoice & All Transactions Deleted');
                    fetchData();
                } else {
                    const data = await res.json();
                    alert(data.error || 'Failed to delete invoice');
                }
            } catch (e) { console.error(e); alert("Error deleting"); }
        } else if (input !== null) {
            alert("Confirmation failed.");
        }
    };

    const handleDeleteTransaction = async (txId: string, description: string) => {
        const confirmMsg = `DELETE TRANSACTION: "${description}"\n\nThis will revert this specific record and update the invoice balance.\n\nType "delete transaction" to confirm:`;
        const input = prompt(confirmMsg);

        if (input === `delete transaction`) {
            try {
                const res = await fetch(`/api/transactions?id=${txId}`, { method: 'DELETE' });
                if (res.ok) {
                    alert('Transaction Deleted & Balance Updated');
                    fetchData();
                } else {
                    const data = await res.json();
                    alert(data.error || 'Failed to delete transaction');
                }
            } catch (e) { console.error(e); alert("Error deleting"); }
        } else if (input !== null) {
            alert("Confirmation failed.");
        }
    };

    const columnDefs = useMemo<ColDef[]>(() => [
        {
            field: 'date',
            headerName: 'Date',
            width: 110,
            valueFormatter: (p) => p.value ? new Date(p.value).toLocaleDateString() : ''
        },
        {
            field: 'invNo',
            headerName: 'Inv No',
            width: 130,
            cellRenderer: (p: ICellRendererParams) => (
                <span className="font-mono font-bold text-slate-700">{p.value}</span>
            )
        },
        {
            field: 'customer',
            headerName: 'Customer',
            width: 160,
            pinned: 'left',
            cellStyle: { backgroundColor: '#f8fafc', fontWeight: '500' } as any
        },
        {
            field: 'company',
            headerName: 'Company Name',
            width: 160,
            pinned: 'left',
            cellStyle: { backgroundColor: '#f8fafc' } as any
        },
        {
            field: 'workDescription',
            headerName: 'Service / Details',
            width: 250,
            cellRenderer: (p: ICellRendererParams) => {
                const isPayment = p.data.type === 'PAYMENT';
                const isExpense = p.data.type === 'EXPENSE';
                const isReceipt = p.data.type === 'RECEIPT';
                if (isExpense) return <span className="text-rose-600 font-bold italic">{p.value}</span>;
                if (isReceipt) return <span className="text-emerald-600 font-bold italic">{p.value}</span>;
                return <span className={isPayment ? "text-emerald-600 font-bold italic" : ""}>{p.value}</span>;
            }
        },
        {
            field: 'quantity',
            headerName: 'Qty',
            width: 70,
            valueFormatter: params => params.value ? params.value : '-',
            cellStyle: { textAlign: 'center' } as any
        },
        {
            field: 'receiptNo',
            headerName: 'Receipt No',
            width: 130,
            cellRenderer: (p: ICellRendererParams) => (
                <span className="font-mono text-emerald-700">{p.value || '-'}</span>
            )
        },
        // Financials
        {
            field: 'govFee',
            headerName: 'Gov Fee',
            width: 100,
            valueFormatter: params => formatCurrency(params.value),
        },
        {
            field: 'typingCharge',
            headerName: 'Typing',
            width: 100,
            valueFormatter: params => formatCurrency(params.value),
        },
        {
            field: 'vat',
            headerName: 'VAT',
            width: 80,
            valueFormatter: params => (params.data.type === 'SERVICE' || params.data.type === 'EXPENSE' || params.data.type === 'RECEIPT') ? formatCurrency(params.value) : '-',
            cellStyle: { color: '#64748b' } as any
        },
        {
            field: 'total',
            headerName: 'Amount',
            width: 110,
            valueFormatter: params => formatCurrency(params.value),
            cellStyle: { fontWeight: 'bold' } as any
        },
        {
            headerName: 'Collected',
            width: 110,
            valueGetter: (p) => (p.data.type === 'PAYMENT' || p.data.type === 'RECEIPT') ? p.data.total : 0,
            valueFormatter: p => p.value > 0 ? formatCurrency(p.value) : '-',
            cellStyle: { color: 'green', fontWeight: 'bold' } as any
        },
        {
            field: 'discount',
            headerName: 'Discount',
            width: 90,
            valueFormatter: params => formatCurrency(params.value || 0),
            cellStyle: { color: '#94a3b8' } as any
        },
        // Payment Status
        {
            field: 'paidAmount',
            headerName: 'Paid',
            width: 100,
            valueFormatter: params => params.value !== null ? formatCurrency(params.value) : '-',
            cellStyle: { color: 'green' } as any
        },
        {
            field: 'balance',
            headerName: 'Balance',
            width: 100,
            valueFormatter: params => params.value !== null ? formatCurrency(params.value) : '-',
            cellRenderer: (p: ICellRendererParams) => {
                const val = p.value;
                if (val === null) return <span>-</span>;
                const style = val > 0 ? "text-red-600 font-bold" : "text-green-600";
                return <span className={style}>{formatCurrency(val)}</span>;
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 110,
            cellRenderer: (params: ICellRendererParams) => {
                const val = params.value;
                let colorClass = 'bg-slate-100 text-slate-700';
                if (val === 'PAID') colorClass = 'bg-emerald-100 text-emerald-700';
                else if (val === 'PARTIAL') colorClass = 'bg-orange-100 text-orange-700';
                else if (val === 'NOT_PAID' || val === 'DRAFT') colorClass = 'bg-rose-100 text-rose-700';
                else if (val === 'CANCELLED') colorClass = 'bg-gray-200 text-gray-500 line-through';

                return (
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${colorClass}`}>
                        {val}
                    </span>
                );
            }
        },
        // Govt Fee Info
        {
            headerName: 'Govt Fee Paid From',
            field: 'govtFeePaidFrom',
            width: 150,
            cellStyle: { backgroundColor: '#fff7ed' } as any // Light orange hint
        },
        {
            headerName: 'Govt Ref/ID',
            field: 'govtFeeRef',
            width: 130,
            cellStyle: { backgroundColor: '#fff7ed' } as any,
            valueFormatter: p => p.data.type === 'SERVICE' ? p.value : '-'
        },
        {
            field: 'enteredBy',
            headerName: 'User',
            width: 90,
            cellStyle: { color: '#64748b', fontSize: '11px' } as any
        },
        {
            headerName: 'Action',
            width: 140,
            pinned: 'right',
            cellRenderer: (params: ICellRendererParams) => (
                <div className="flex gap-2 items-center justify-center h-full">
                    <button
                        onClick={() => {
                            setSelectedInv({
                                id: params.data.invoiceId,
                                invoiceNo: params.data.invNo,
                                customerName: params.data.customer,
                                balance: params.data.balance
                            });
                            setShowPayModal(true);
                        }}
                        title="Collect Payment"
                        className={`p-1.5 rounded-lg border transition ${params.data.balance > 0 ? 'text-emerald-600 border-emerald-100 hover:bg-emerald-50' : 'text-slate-300 border-slate-100 pointer-events-none'}`}
                    >
                        <Banknote className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onEdit?.(params.data.invoiceId || params.data.id)}
                        title="Edit Invoice"
                        className="p-1.5 rounded-lg border border-blue-100 text-blue-600 hover:bg-blue-50 transition"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    {user?.role === 'ADMIN' && (
                        <button
                            onClick={() => handleDeleteTransaction(params.data.id, params.data.workDescription)}
                            title="Delete This Row"
                            className="p-1.5 rounded-lg border border-rose-100 text-rose-600 hover:bg-rose-50 transition"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            )
        }
    ], []) as any[];

    // Removed onCellValueChanged as this is now largely read-only history. 
    // If editing is needed, we should load checks. For now user emphasized "VIEW".

    const addNewRow = () => {
        // Placeholder if user wants inline addition again (which is covered by Invoice Form now)
        alert("Please use the Invoice Form above to add new transactions.");
    };

    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex flex-wrap items-end gap-3">
                    {/* Date Filters */}
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> From Date
                        </label>
                        <input
                            type="date"
                            className="text-sm p-1.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-9"
                            value={fromDate}
                            onChange={e => setFromDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> To Date
                        </label>
                        <input
                            type="date"
                            className="text-sm p-1.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-9"
                            value={toDate}
                            onChange={e => setToDate(e.target.value)}
                        />
                    </div>

                    {/* Column Filter */}
                    <div className="flex items-end gap-0">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                                <Filter className="w-3 h-3" /> Column Filter
                            </label>
                            <select
                                className="text-sm p-1.5 border border-r-0 rounded-l-lg focus:ring-1 focus:ring-blue-500 outline-none h-9 bg-white"
                                value={filterCol}
                                onChange={e => setFilterCol(e.target.value)}
                            >
                                <option value="customer">Customer</option>
                                <option value="company">Company</option>
                                <option value="invNo">Inv No</option>
                                <option value="workDescription">Description</option>
                                <option value="enteredBy">User</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            placeholder="Filter value..."
                            className="text-sm p-1.5 border rounded-r-lg focus:ring-2 focus:ring-blue-500 outline-none h-9 w-40"
                            value={filterVal}
                            onChange={e => setFilterVal(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={() => { setFromDate(''); setToDate(''); setFilterVal(''); setSearchTerm(''); }}
                        className="text-xs text-slate-500 hover:text-slate-800 underline h-9 flex items-center"
                    >
                        Reset All
                    </button>
                </div>

                <button
                    onClick={exportToExcel}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-bold text-sm h-10 shadow-sm"
                >
                    <Download className="w-4 h-4" /> Export Excel
                </button>
            </div>

            <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold min-w-fit">Transaction History</h3>
                <div className="flex-1 max-w-md relative">
                    <input
                        type="text"
                        placeholder="Quick Global Search..."
                        className="w-full pl-3 pr-10 py-1.5 border rounded-lg text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>
                <button
                    onClick={fetchData}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 transition"
                    title="Refresh Data"
                >
                    <RefreshCw className="w-3.5 h-3.5" /> Refresh
                </button>
            </div>

            <div className="flex-1 min-h-[500px] w-full bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="ag-theme-alpine h-full w-full">
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
            </div>

            {/* Summary Footer */}
            <div className="flex justify-between items-center py-4 bg-slate-100 px-6 rounded-lg border">
                <div className="flex gap-12">
                    <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Total Revenue</p>
                        <p className="text-xl font-bold text-slate-800">
                            {formatCurrency(rowData.filter(r => r.type === 'SERVICE').reduce((acc, row) => acc + (row.total || 0), 0))}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Total Collected</p>
                        <p className="text-xl font-bold text-emerald-600">
                            {formatCurrency(rowData.filter(r => r.type === 'PAYMENT').reduce((acc, row) => acc + (row.total || 0), 0))}
                        </p>
                    </div>
                </div>
                <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider text-right">Net Receivables</p>
                    <p className="text-3xl font-black text-primary">
                        {formatCurrency(
                            rowData.filter(r => r.type === 'SERVICE').reduce((acc, row) => acc + (row.total || 0), 0) -
                            rowData.filter(r => r.type === 'PAYMENT').reduce((acc, row) => acc + (row.total || 0), 0)
                        )}
                    </p>
                </div>
            </div>

            <PaymentModal
                isOpen={showPayModal}
                onClose={() => setShowPayModal(false)}
                onSuccess={fetchData}
                invoice={selectedInv}
            />
        </div>
    );
}

