"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { formatCurrency } from '@/lib/utils';
import * as XLSX from 'xlsx';
import { Filter, Calendar, Download, RefreshCw, FileText, ArrowRightCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QuotationRow {
    id: string;
    quotationNo: string;
    date: string;
    validUntil: string;
    partner: { name: string; phone?: string };
    beneficiaryName?: string;
    salesperson: { username: string };
    status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'EXPIRED' | 'CANCELLED' | 'CONVERTED' | 'PARTIALLY_INVOICED';
    grandTotal: number;
    invoices: { invoiceNo: string }[];
    approvedBy?: { username: string };
}

export default function QuotationGrid({ onEdit }: { onEdit?: (id: string) => void }) {
    const gridRef = useRef<AgGridReact>(null);
    const [rowData, setRowData] = useState<QuotationRow[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    // Filters
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const fetchData = async () => {
        try {
            const res = await fetch('/api/quotations');
            if (res.ok) {
                const data = await res.json();
                setRowData(data);
            }
        } catch (error) {
            console.error("Failed to fetch quotations", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredRows = useMemo(() => {
        let data = [...rowData];

        if (searchTerm) {
            const s = searchTerm.toLowerCase();
            data = data.filter(r =>
                r.quotationNo.toLowerCase().includes(s) ||
                (r.partner?.name || "").toLowerCase().includes(s) ||
                (r.beneficiaryName || "").toLowerCase().includes(s)
            );
        }

        if (fromDate) {
            data = data.filter(r => new Date(r.date) >= new Date(fromDate));
        }
        if (toDate) {
            const end = new Date(toDate);
            end.setHours(23, 59, 59, 999);
            data = data.filter(r => new Date(r.date) <= end);
        }

        if (statusFilter) {
            data = data.filter(r => r.status === statusFilter);
        }

        return data;
    }, [rowData, searchTerm, fromDate, toDate, statusFilter]);

    const exportToExcel = () => {
        const dataToExport = filteredRows.map(r => ({
            'Date': new Date(r.date).toLocaleDateString(),
            'Quotation No': r.quotationNo,
            'Customer': r.partner?.name || r.beneficiaryName || 'Unknown',
            'Status': r.status,
            'Valid Until': new Date(r.validUntil).toLocaleDateString(),
            'Total': r.grandTotal,
            'Converted To': r.invoices.map(i => i.invoiceNo).join(', ')
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Quotations");
        XLSX.writeFile(wb, `Quotations_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const columnDefs = useMemo<ColDef[]>(() => [
        {
            field: 'date',
            headerName: 'Date',
            width: 110,
            valueFormatter: (p) => p.value ? new Date(p.value).toLocaleDateString() : ''
        },
        {
            field: 'quotationNo',
            headerName: 'Ref No',
            width: 140,
            cellRenderer: (p: ICellRendererParams) => (
                <span className="font-mono font-bold text-slate-700">{p.value}</span>
            )
        },
        {
            field: 'partner.name',
            headerName: 'Customer',
            width: 200,
            valueGetter: (p) => p.data.partner?.name || p.data.beneficiaryName || '-',
            cellStyle: { fontWeight: '500' } as any
        },
        {
            field: 'grandTotal',
            headerName: 'Total',
            width: 120,
            valueFormatter: params => formatCurrency(params.value),
            cellStyle: { fontWeight: 'bold' } as any
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            cellRenderer: (params: ICellRendererParams) => {
                const val = params.value;
                let colorClass = 'bg-slate-100 text-slate-700';
                if (val === 'ACCEPTED') colorClass = 'bg-emerald-100 text-emerald-700';
                else if (val === 'SENT') colorClass = 'bg-blue-100 text-blue-700';
                else if (val === 'DRAFT') colorClass = 'bg-gray-100 text-gray-700';
                else if (val === 'CONVERTED') colorClass = 'bg-purple-100 text-purple-700';
                else if (val === 'CANCELLED' || val === 'EXPIRED') colorClass = 'bg-rose-100 text-rose-700';

                // Add Approval Indicator if applicable
                const isApproved = params.data.status === 'ACCEPTED' || params.data.approvedBy;

                return (
                    <div className="flex flex-col items-start gap-1">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${colorClass}`}>
                            {val}
                        </span>
                        {isApproved && params.data.approvedBy && (
                            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
                                ✓ {params.data.approvedBy.username}
                            </span>
                        )}
                    </div>
                );
            }
        },
        {
            field: 'validUntil',
            headerName: 'Valid Until',
            width: 110,
            valueFormatter: (p) => p.value ? new Date(p.value).toLocaleDateString() : '',
            cellStyle: { color: '#64748b', fontSize: '11px' } as any
        },
        {
            headerName: 'Action',
            width: 120,
            pinned: 'right',
            cellRenderer: (params: ICellRendererParams) => (
                <div className="flex gap-2 items-center justify-center">
                    <button
                        onClick={() => onEdit?.(params.data.id)}
                        className="p-1.5 rounded-lg border border-blue-100 text-blue-600 hover:bg-blue-50 transition"
                        title="View / Edit"
                    >
                        <FileText className="w-4 h-4" />
                    </button>
                    {(params.data.status === 'ACCEPTED' || params.data.status === 'SENT') && params.data.status !== 'CONVERTED' && (
                        <button
                            onClick={() => onEdit?.(params.data.id)} // For now open edit, convert button inside
                            className="p-1.5 rounded-lg border border-purple-100 text-purple-600 hover:bg-purple-50 transition"
                            title="Convert to Invoice"
                        >
                            <ArrowRightCircle className="w-4 h-4" />
                        </button>
                    )}
                </div>
            )
        }
    ], [onEdit]);

    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex flex-wrap items-end gap-3">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> From
                        </label>
                        <input
                            type="date"
                            className="text-sm p-1.5 border rounded-lg outline-none h-9"
                            value={fromDate}
                            onChange={e => setFromDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> To
                        </label>
                        <input
                            type="date"
                            className="text-sm p-1.5 border rounded-lg outline-none h-9"
                            value={toDate}
                            onChange={e => setToDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                            <Filter className="w-3 h-3" /> Status
                        </label>
                        <select
                            className="text-sm p-1.5 border rounded-lg outline-none h-9 bg-white w-32"
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="DRAFT">Draft</option>
                            <option value="SENT">Sent</option>
                            <option value="ACCEPTED">Accepted</option>
                            <option value="CONVERTED">Converted</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>

                    <button
                        onClick={() => { setFromDate(''); setToDate(''); setStatusFilter(''); setSearchTerm(''); }}
                        className="text-xs text-slate-500 hover:text-slate-800 underline h-9 flex items-center"
                    >
                        Reset
                    </button>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={fetchData}
                        className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg border border-blue-200"
                    >
                        <RefreshCw className="w-3.5 h-3.5" /> Refresh
                    </button>
                    <button
                        onClick={exportToExcel}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-bold text-sm h-9 shadow-sm"
                    >
                        <Download className="w-4 h-4" /> Export
                    </button>
                </div>
            </div>

            <div className="flex max-w-md relative">
                <input
                    type="text"
                    placeholder="Search Quotations..."
                    className="w-full pl-3 pr-10 py-1.5 border rounded-lg text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex-1 min-h-[500px] w-full bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="ag-theme-alpine h-full w-full">
                    <AgGridReact
                        ref={gridRef}
                        rowData={filteredRows}
                        columnDefs={columnDefs}
                        defaultColDef={{ sortable: true, filter: true, resizable: true }}
                        animateRows={true}
                        headerHeight={48}
                        rowHeight={48}
                    />
                </div>
            </div>
        </div>
    );
}
