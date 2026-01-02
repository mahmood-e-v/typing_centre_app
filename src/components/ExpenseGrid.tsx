"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, CellValueChangedEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Plus, Save, Download } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface ExpenseRow {
    id?: string;
    date: Date;
    category: string;
    description: string;
    amount: number;
    paymentMethod: 'CASH' | 'CARD' | 'BANK';
    status: 'PAID' | 'PENDING';
}

export default function ExpenseGrid() {
    const gridRef = useRef<AgGridReact>(null);
    const [rowData, setRowData] = useState<ExpenseRow[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/expense-categories')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCategories(data.map((c: any) => c.name));
            });

        // Initial Row
        setRowData([{
            date: new Date(),
            category: '',
            description: '',
            amount: 0,
            paymentMethod: 'CASH',
            status: 'PAID'
        }]);
    }, []);

    const columnDefs = useMemo<ColDef[]>(() => [
        {
            field: 'date',
            headerName: 'Date',
            width: 120,
            valueFormatter: (p) => p.value ? new Date(p.value).toLocaleDateString() : ''
        },
        {
            field: 'category',
            headerName: 'Category',
            editable: true,
            width: 180,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: categories
            }
        },
        { field: 'description', headerName: 'Description / Remarks', editable: true, flex: 1 },
        {
            field: 'amount',
            headerName: 'Amount',
            editable: true,
            width: 130,
            valueParser: params => Number(params.newValue),
            cellStyle: { fontWeight: 'bold', color: '#ef4444' }, // Red for expense
            valueFormatter: params => formatCurrency(params.value)
        },
        {
            field: 'paymentMethod',
            headerName: 'Paid By',
            editable: true,
            width: 130,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: { values: ['CASH', 'CARD', 'BANK'] }
        },
        {
            field: 'status',
            headerName: 'Status',
            editable: true,
            width: 110,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: { values: ['PAID', 'PENDING'] },
            cellRenderer: (params: any) => {
                const color = params.value === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700';
                return `<span class="px-2 py-1 rounded-full text-[10px] font-bold ${color}">${params.value}</span>`;
            }
        }
    ], [categories]);

    const addNewRow = () => {
        setRowData([...rowData, {
            date: new Date(),
            category: categories[0] || '',
            description: '',
            amount: 0,
            paymentMethod: 'CASH',
            status: 'PAID'
        }]);
    };

    const handleSave = async () => {
        // In a real app, filtering for new/modified rows would happen here
        // For now, we just log to console or mock save
        console.log("Saving Expenses...", rowData);
        alert("Expenses Saved (Mock)!");
    };

    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Expense Entry</h1>
                    <p className="text-sm text-muted-foreground">Record daily office expenses</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={addNewRow} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
                        <Plus className="h-4 w-4" /> Add Row
                    </button>
                    <button onClick={handleSave} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
                        <Save className="h-4 w-4" /> Save
                    </button>
                </div>
            </div>

            <div className="flex-1 min-h-[500px] w-full bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="ag-theme-alpine h-full w-full">
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
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

            <div className="flex justify-end items-center py-4 bg-slate-100 px-6 rounded-lg border">
                <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider text-right">Total Expenses</p>
                    <p className="text-3xl font-black text-rose-600">{formatCurrency(rowData.reduce((acc, row) => acc + (row.amount || 0), 0))}</p>
                </div>
            </div>
        </div>
    );
}
