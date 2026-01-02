"use client";

import { useState, useEffect } from 'react';
import { X, DollarSign, Wallet, CreditCard, Landmark } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface VoucherPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    voucher: {
        id: string;
        voucherNo: string;
        vendorName: string; // or vendor placeholder
        balance: number;
        total: number;
    } | null;
}

export default function VoucherPaymentModal({ isOpen, onClose, onSuccess, voucher }: VoucherPaymentModalProps) {
    const [amount, setAmount] = useState(0);
    const [method, setMethod] = useState('');
    const [ref, setRef] = useState('');
    const [bankAccountId, setBankAccountId] = useState('');
    const [bankAccounts, setBankAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && voucher) {
            setAmount(Number(voucher.balance) || 0); // Default to paying full balance
            fetchBanks();
        }
    }, [isOpen, voucher]);

    const fetchBanks = async () => {
        try {
            const res = await fetch('/api/accounting/accounts?type=BANK'); // Assuming this endpoint exists or similar
            // If not, we might need to fallback to hardcoded or general accounts fetch
            if (res.ok) {
                const data = await res.json();
                setBankAccounts(data);
            }
        } catch (e) { console.error("Error fetching banks", e); }
    };

    const handleSave = async () => {
        if (!voucher || amount <= 0) {
            alert("Please provide a valid amount.");
            return;
        }

        if (!method) {
            alert("Please select a payment method.");
            return;
        }

        // For Bank/Online, require account selection if possible (or default)
        // Ignoring strictly for now to match simplicity

        setLoading(true);
        try {
            const res = await fetch('/api/vouchers', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: voucher.id,
                    paymentAmount: amount,
                    paymentMethod: method,
                    reference: ref,
                    // If we had bank selection: bankAccountId 
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

    if (!isOpen || !voucher) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm no-print">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col scale-in">
                <div className="p-6 border-b flex justify-between items-center bg-rose-700 text-white font-bold">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        <h3>Pay Voucher</h3>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="p-4 bg-slate-50 rounded-lg border flex justify-between items-center">
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Vendor / Payee</p>
                            <p className="font-bold text-slate-800">{voucher.vendorName}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{voucher.voucherNo}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-rose-500 uppercase font-bold">Balance Due</p>
                            <p className="text-xl font-black text-rose-600 font-mono">{formatCurrency(voucher.balance)}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Payment Amount</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="number"
                                    className="w-full border-2 border-emerald-100 rounded-lg p-3 pl-10 text-xl font-bold focus:border-rose-500 outline-none transition-colors"
                                    value={amount}
                                    onChange={e => setAmount(parseFloat(e.target.value) || 0)}
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            {['CASH', 'CARD', 'ONLINE'].map(m => (
                                <button
                                    key={m}
                                    onClick={() => setMethod(m)}
                                    className={`py-2 px-3 border rounded-lg flex flex-col items-center gap-1 transition-all ${method === m ? 'border-rose-600 bg-rose-50 text-rose-700 font-bold shadow-sm ring-1 ring-rose-600' : 'hover:bg-slate-50 opacity-70'}`}
                                >
                                    {m === 'CASH' && <Wallet className="w-4 h-4" />}
                                    {m === 'CARD' && <CreditCard className="w-4 h-4" />}
                                    {m === 'ONLINE' && <Landmark className="w-4 h-4" />}
                                    <span className="text-[10px]">{m}</span>
                                </button>
                            ))}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Reference / Notes</label>
                            <input
                                type="text"
                                placeholder="Ref Number, Cheque No, Notes..."
                                className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-rose-500"
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
                        className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-rose-700/20 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Confirm Payment'}
                    </button>
                </div>
            </div>
        </div>
    );
}
