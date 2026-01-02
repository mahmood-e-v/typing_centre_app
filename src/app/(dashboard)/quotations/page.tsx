"use client";

import { useState } from 'react';
import QuotationGrid from '@/components/QuotationGrid';
import QuotationForm from '@/components/QuotationForm';
import { FileText, Plus } from 'lucide-react';

export default function QuotationsPage() {
    const [view, setView] = useState<'LIST' | 'FORM'>('LIST');
    const [editId, setEditId] = useState<string | undefined>(undefined);

    const handleCreate = () => {
        setEditId(undefined);
        setView('FORM');
    };

    const handleEdit = (id: string) => {
        setEditId(id);
        setView('FORM');
    };

    const handleBack = () => {
        setView('LIST');
        setEditId(undefined);
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto py-4">
            {view === 'LIST' && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-[calc(100vh-100px)] flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                <FileText className="w-10 h-10 text-blue-600" />
                                QUOTATIONS
                            </h1>
                            <p className="text-slate-500 font-medium italic">Create, manage, and convert quotations.</p>
                        </div>
                        <button
                            onClick={handleCreate}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-bold shadow-lg shadow-blue-200"
                        >
                            <Plus className="w-5 h-5" /> New Quotation
                        </button>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <QuotationGrid onEdit={handleEdit} />
                    </div>
                </div>
            )}

            {view === 'FORM' && (
                <QuotationForm quotationId={editId} onBack={handleBack} />
            )}
        </div>
    );
}
