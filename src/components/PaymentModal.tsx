"use client";

import { useState, useEffect } from 'react';
import { X, DollarSign, Wallet, CreditCard, Landmark } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    invoice: {
        id: string;
        invoiceNo: string;
        customerName: string;
        balance: number;
    } | null;
}

export default function PaymentModal({ isOpen, onClose, onSuccess, invoice }: PaymentModalProps) {
    const [amount, setAmount] = useState(0);
    const [method, setMethod] = useState('');
    const [ref, setRef] = useState('');
    const [otherInvoices, setOtherInvoices] = useState<any[]>([]);
    const [selectedInvoiceIds, setSelectedInvoiceIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && invoice) {
            setAmount(invoice.balance || 0);
            setSelectedInvoiceIds([invoice.id]);
            fetchOtherPending(invoice);
        }
    }, [isOpen, invoice]);

    const fetchOtherPending = async (baseInv: any) => {
        try {
            const invRes = await fetch(`/api/invoices?id=${baseInv.id}`);
            if (!invRes.ok) return;
            const fullInv = await invRes.json();

            if (!fullInv) {
                console.warn("Invoice not found or deleted");
                return;
            }

            let url = `/api/invoices?pending=true`;
            if (fullInv.customerId) {
                url += `&partnerId=${fullInv.customerId}`;
            }

            if (fullInv.customerName) {
                url += `&customerName=${encodeURIComponent(fullInv.customerName.trim())}`;
            }

            if (!fullInv.customerId && !fullInv.customerName) {
                console.log("No customerId or customerName for grouping");
                return;
            }

            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                // Filter out the current one
                setOtherInvoices(data.filter((i: any) => i.id !== baseInv.id));
            }
        } catch (e) { console.error("Error in fetchOtherPending:", e); }
    };

    const handleSave = async () => {

        if (!invoice || amount <= 0) {
            alert("Please provide amount.");
            return;
        }

        if (!method) {
            alert("Please select a payment method.");
            return;
        }

        // Logic for distributing amount across selected invoices
        // For simplicity, we'll apply it sequentially to selected invoices
        let remaining = amount;
        const payments = [];

        // 1. Current selected invoices
        const allPending = [
            { id: invoice.id, balance: invoice.balance, invoiceNo: invoice.invoiceNo },
            ...otherInvoices
        ].filter(i => selectedInvoiceIds.includes(i.id));

        for (const inv of allPending) {
            if (remaining <= 0) break;
            const payAmount = Math.min(remaining, inv.balance);
            payments.push({ invoiceId: inv.id, paymentAmount: payAmount });
            remaining -= payAmount;
        }

        if (remaining > 0) {
            if (!confirm(`An extra amount of ${formatCurrency(remaining)} will be unallocated or overpaid to the first invoice. Proceed?`)) return;
            // Add the remainder to the first payment
            if (payments.length > 0) payments[0].paymentAmount += remaining;
            else payments.push({ invoiceId: invoice.id, paymentAmount: remaining });
        }

        setLoading(true);
        try {
            const res = await fetch('/api/invoices', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    payments,
                    paymentMethod: method,
                    paymentRef: ref
                })
            });

            if (res.ok) {
                alert("Payment recorded successfully!");
                onSuccess();
                onClose();
            } else {
                const err = await res.json();
                alert(err.error || "Failed to record payment");
            }
        } catch (e) {
            console.error(e);
            alert("Error saving payment");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !invoice) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm no-print">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col scale-in">
                <div className="p-6 border-b flex justify-between items-center bg-emerald-700 text-white font-bold">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        <h3>Collect Payment</h3>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="p-4 bg-slate-50 rounded-lg border flex justify-between items-center">
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Customer</p>
                            <p className="font-bold text-slate-800">{invoice.customerName}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{invoice.invoiceNo}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-rose-500 uppercase font-bold">Due Balance</p>
                            <p className="text-xl font-black text-rose-600 font-mono">{formatCurrency(invoice.balance)}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Collection Amount</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="number"
                                    className="w-full border-2 border-emerald-100 rounded-lg p-3 pl-10 text-xl font-bold focus:border-emerald-500 outline-none transition-colors"
                                    value={amount}
                                    onChange={e => setAmount(parseFloat(e.target.value) || 0)}
                                    autoFocus
                                />
                            </div>
                        </div>

                        {otherInvoices.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-xs font-bold text-slate-600 uppercase">Other Pending Invoices</label>
                                    <button
                                        onClick={() => {
                                            const allIds = [invoice.id, ...otherInvoices.map(i => i.id)];
                                            const alreadySelected = allIds.every(id => selectedInvoiceIds.includes(id));
                                            if (alreadySelected) {
                                                setSelectedInvoiceIds([invoice.id]);
                                                setAmount(invoice.balance);
                                            } else {
                                                setSelectedInvoiceIds(allIds);
                                                const totalBal = [invoice.balance, ...otherInvoices.map(i => i.balance)].reduce((a, b) => Number(a) + Number(b), 0);
                                                setAmount(totalBal);
                                            }
                                        }}
                                        className="text-[10px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200 hover:bg-slate-200 font-bold"
                                    >
                                        {[invoice.id, ...otherInvoices.map(i => i.id)].every(id => selectedInvoiceIds.includes(id)) ? 'Deselect All' : 'Select All'}
                                    </button>
                                </div>
                                <div className="max-h-40 overflow-y-auto border rounded-xl divide-y bg-slate-50/50 shadow-inner">
                                    {otherInvoices.map(inv => (
                                        <div key={inv.id} className="p-3 flex items-center justify-between hover:bg-white transition-colors cursor-pointer group" onClick={() => {
                                            const isSelected = selectedInvoiceIds.includes(inv.id);
                                            if (isSelected) {
                                                setSelectedInvoiceIds(prev => prev.filter(id => id !== inv.id));
                                                setAmount(prev => Math.max(0, prev - Number(inv.balance)));
                                            } else {
                                                setSelectedInvoiceIds(prev => [...prev, inv.id]);
                                                setAmount(prev => prev + Number(inv.balance));
                                            }
                                        }}>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedInvoiceIds.includes(inv.id)}
                                                    readOnly
                                                    className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 pointer-events-none"
                                                />
                                                <div>
                                                    <p className="text-xs font-bold text-slate-800">{inv.invoiceNo}</p>
                                                    <p className="text-[10px] text-slate-500">{new Date(inv.date).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <p className="text-xs font-mono font-bold text-rose-600 group-hover:scale-110 transition-transform">{formatCurrency(inv.balance)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-3 gap-2">
                            {['CASH', 'CARD', 'ONLINE'].map(m => (
                                <button
                                    key={m}
                                    onClick={() => setMethod(m)}
                                    className={`py-2 px-3 border rounded-lg flex flex-col items-center gap-1 transition-all ${method === m ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-bold shadow-sm ring-1 ring-emerald-600' : 'hover:bg-slate-50 opacity-70'}`}
                                >
                                    {m === 'CASH' && <Wallet className="w-4 h-4" />}
                                    {m === 'CARD' && <CreditCard className="w-4 h-4" />}
                                    {m === 'ONLINE' && <Landmark className="w-4 h-4" />}
                                    <span className="text-[10px]">{m}</span>
                                </button>
                            ))}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                                {method === 'CARD' ? 'Approval Code' : method === 'ONLINE' ? 'Transaction ID' : 'Reference / Notes'}
                            </label>
                            <input
                                type="text"
                                placeholder={method === 'CARD' ? 'Enter Approval Code...' : method === 'ONLINE' ? 'Enter Transaction ID...' : 'Ref Number, Notes...'}
                                className="w-full border rounded-lg p-2.5 text-sm"
                                value={ref}
                                onChange={e => setRef(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-slate-50 border-t flex justify-end gap-3">
                    <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-emerald-700/20 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Collect Payment'}
                    </button>
                </div>
            </div>
        </div>
    );
}
