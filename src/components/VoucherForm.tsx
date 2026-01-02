"use client";

import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X, Search, Calendar, CreditCard, Wallet, Receipt, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { PartnerType, PaymentMethod, VoucherStatus } from '@/generated/client_v2';

interface VoucherItem {
    id: string;
    categoryId: string;
    quantity: number;
    amount: number;
    description: string;
}

interface VoucherHeader {
    date: string;
    vendorId: string;
    vendorName: string; // Keeps holding the ID, but for Receipt it's PartnerId
    description: string;
    paidAmount: number;
    adjustment: number;
    paymentMethod: PaymentMethod | string; // Relaxed type to avoid enum issues
    accountId: string;
    type: 'PAYMENT' | 'RECEIPT';
    isPaid: boolean;
    billUrl?: string;
}

const INITIAL_HEADER: VoucherHeader = {
    date: new Date().toISOString().split('T')[0],
    vendorId: '',
    vendorName: '',
    description: '',
    paidAmount: 0,
    adjustment: 0,
    paymentMethod: 'CASH',
    accountId: '',
    type: 'PAYMENT',
    isPaid: true,
    billUrl: ''
};

export default function VoucherForm({ onSave, initialType = 'PAYMENT', fixedType = false }: { onSave?: () => void, initialType?: 'PAYMENT' | 'RECEIPT', fixedType?: boolean }) {
    const [header, setHeader] = useState<VoucherHeader>({ ...INITIAL_HEADER, type: initialType });

    useEffect(() => {
        setHeader(prev => ({ ...prev, type: initialType }));
    }, [initialType]);

    // ... items state ...

    const [items, setItems] = useState<VoucherItem[]>([
        { id: Math.random().toString(), categoryId: '', quantity: 1, amount: 0, description: '' }
    ]);


    const [categories, setCategories] = useState<any[]>([]);
    const [vendors, setVendors] = useState<any[]>([]);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showVendorSearch, setShowVendorSearch] = useState(false);
    const [vendorSearchQuery, setVendorSearchQuery] = useState('');

    const [showNewCatModal, setShowNewCatModal] = useState(false);
    const [newCatName, setNewCatName] = useState('');

    const [partners, setPartners] = useState<any[]>([]); // New state for partners (customers)

    useEffect(() => {
        fetchData();
    }, []);

    const addItem = () => {
        setItems([...items, { id: Math.random().toString(), categoryId: '', quantity: 1, amount: 0, description: '' }]);
    };

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter(i => i.id !== id));
        }
    };

    // Reset State when switching Type
    const switchType = (newType: 'PAYMENT' | 'RECEIPT') => {
        if (newType === header.type) return;

        setHeader({
            ...INITIAL_HEADER,
            type: newType,
            date: header.date // Keep the date
        });

        // Reset items
        setItems([{ id: Math.random().toString(), categoryId: '', quantity: 1, amount: 0, description: '' }]);
        setVendorSearchQuery('');
    };

    const updateItem = (id: string, field: keyof VoucherItem, value: any) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const subtotal = items.reduce((acc, item) => acc + (parseFloat(item.amount.toString()) || 0), 0);
    const total = subtotal - (header.adjustment || 0);
    const balance = total - header.paidAmount;

    // Auto-update paid amount if "Mark as Fully Paid" is on
    useEffect(() => {
        if (header.isPaid && header.type === 'PAYMENT') {
            setHeader(prev => ({ ...prev, paidAmount: Math.max(0, subtotal - (prev.adjustment || 0)) }));
        }
    }, [subtotal, header.adjustment, header.isPaid, header.type]);

    // ... existing fetch ...
    const fetchData = async () => {
        try {
            const [catRes, venRes, accRes, ptrRes] = await Promise.all([
                fetch('/api/expense-categories'),
                fetch('/api/vendors'),
                fetch('/api/accounts'),
                fetch('/api/partners') // Fetch partners for Receipt
            ]);
            if (catRes.ok) setCategories(await catRes.json());
            if (venRes.ok) setVendors(await venRes.json());
            if (accRes.ok) setAccounts(await accRes.json());
            if (ptrRes.ok) setPartners(await ptrRes.json());
        } catch (error) {
            console.error("Failed to fetch form data", error);
        }
    };

    // ... existing helpers ...

    const handleSave = async () => {
        if (!header.vendorName && !header.vendorId) {
            alert(header.type === 'RECEIPT' ? "Please select a Customer." : "Please specify a vendor.");
            return;
        }

        // Check if Account is selected ONLY if paidAmount > 0
        if (header.paidAmount > 0 && !header.accountId) {
            alert(header.type === 'RECEIPT' ? "Please select a Deposit Account." : "Please select a Payment Account.");
            return;
        }

        if (header.type === 'PAYMENT' && total <= 0) {
            alert("Net Total must be greater than zero. Please add items or reduce adjustment.");
            return;
        }

        // ... items validation ...

        setLoading(true);
        try {
            // Prepare payload
            const finalItems = [...items];
            // Add Adjustment Item if exists
            if (header.adjustment > 0) {
                const adjCat = categories.find(c => c.name.toLowerCase().includes('discount') || c.name.toLowerCase().includes('adjustment')) || categories[0];
                if (adjCat) {
                    finalItems.push({
                        id: 'adj_item',
                        categoryId: adjCat.id,
                        quantity: 1,
                        amount: -header.adjustment,
                        description: 'Adjustment / Discount'
                    });
                }
            }

            const payload = { header, items: finalItems };

            const res = await fetch('/api/vouchers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert("Voucher created successfully!");
                // Reset form
                setHeader({ ...INITIAL_HEADER, type: header.type }); // Keep current type
                setItems([{ id: Math.random().toString(), categoryId: '', description: '', quantity: 1, amount: 0 }]);
                setVendorSearchQuery('');
                if (onSave) onSave();
            } else {
                const errData = await res.json();
                alert(`Error: ${errData.error || "Failed to create voucher"}`);
            }
        } catch (error) {
            console.error("Failed to create voucher", error);
            alert("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        if (confirm("Are you sure you want to clear the form?")) {
            setHeader({ ...INITIAL_HEADER, type: header.type });
            setItems([{ id: Math.random().toString(), categoryId: '', description: '', quantity: 1, amount: 0 }]);
            setVendorSearchQuery('');
        }
    };

    // ... existing add category ...

    // Filter Logic
    const filteredVendors = header.type === 'PAYMENT'
        ? vendors.filter(v => v.name.toLowerCase().includes(vendorSearchQuery.toLowerCase()))
        : partners.filter(p => p.name.toLowerCase().includes(vendorSearchQuery.toLowerCase())); // Filter Partners for Receipt

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Header Section */}
            <div className={`p-8 text-white transition-colors duration-500 ${header.type === 'PAYMENT' ? 'bg-slate-900' : 'bg-emerald-900'}`}>
                <div className="flex flex-wrap justify-between items-start gap-8">
                    <div className="space-y-4 flex-1 min-w-[300px]">
                        {!fixedType && (
                            <div className="flex gap-4 mb-4 bg-white/10 p-1 rounded-lg w-fit">
                                <button
                                    onClick={() => switchType('PAYMENT')}
                                    className={`px-4 py-2 rounded-md font-bold text-xs flex items-center gap-2 transition ${header.type === 'PAYMENT' ? 'bg-white text-slate-900 shadow' : 'text-slate-300 hover:text-white'}`}
                                >
                                    <ArrowUpRight className="w-4 h-4" /> EXPENSE (Payment)
                                </button>
                                <button
                                    onClick={() => switchType('RECEIPT')}
                                    className={`px-4 py-2 rounded-md font-bold text-xs flex items-center gap-2 transition ${header.type === 'RECEIPT' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-200 hover:text-white'}`}
                                >
                                    <ArrowDownLeft className="w-4 h-4" /> ADVANCE RECEIVED
                                </button>
                            </div>
                        )}

                        <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                            {header.type === 'PAYMENT' ? <Receipt className="w-8 h-8 text-blue-400" /> : <Wallet className="w-8 h-8 text-emerald-400" />}
                            {header.type === 'PAYMENT' ? 'EXPENSE VOUCHER' : 'ADVANCE RECEIPT'}
                        </h2>

                        <div className="relative group">
                            <label className="text-[10px] uppercase font-bold text-white/50 mb-1 block">
                                {header.type === 'PAYMENT' ? 'Vendor / Paid To' : 'Received From (Customer)'}
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder={header.type === 'PAYMENT' ? "Type vendor name..." : "Search Company/Customer..."}
                                        className="w-full bg-white/10 border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/30 focus:bg-white/20 focus:outline-none transition"
                                        value={header.vendorName}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setHeader({ ...header, vendorName: val, vendorId: '' });
                                            setVendorSearchQuery(val);
                                            setShowVendorSearch(true);
                                        }}
                                        onFocus={() => setShowVendorSearch(true)}
                                    />
                                    {/* ... updated search dropdown logic ... */}
                                    {showVendorSearch && (
                                        <div className="absolute top-full left-0 w-full mt-2 bg-white text-slate-900 rounded-xl shadow-2xl z-50 border max-h-60 overflow-y-auto overflow-x-hidden">
                                            {filteredVendors.map(v => (
                                                <button
                                                    key={v.id}
                                                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition flex justify-between items-center group/item border-b border-slate-50 last:border-0"
                                                    onClick={() => {
                                                        setHeader({ ...header, vendorName: v.name, vendorId: v.id });
                                                        setShowVendorSearch(false);
                                                    }}
                                                >
                                                    <div>
                                                        <div className="font-bold text-slate-800">{v.name}</div>
                                                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">{header.type === 'PAYMENT' ? v.type : (v.company ? 'BENEFICIARY' : v.type)}</div>
                                                    </div>
                                                    <Plus className="w-4 h-4 text-white opacity-0 group-hover/item:opacity-100 bg-blue-600 rounded p-0.5 transition" />
                                                </button>
                                            ))}

                                            {/* Create New Vendor Option */}
                                            {vendorSearchQuery && !filteredVendors.find(v => v.name.toLowerCase() === vendorSearchQuery.toLowerCase()) && (
                                                <button
                                                    className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 transition flex justify-between items-center group/item border-t border-blue-100"
                                                    onClick={async () => {
                                                        // Quick create vendor
                                                        try {
                                                            const res = await fetch('/api/vendors', {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({ name: vendorSearchQuery })
                                                            });
                                                            if (res.ok) {
                                                                const newVendor = await res.json();
                                                                setVendors([...vendors, newVendor]);
                                                                setHeader({ ...header, vendorName: newVendor.name, vendorId: newVendor.id });
                                                                setShowVendorSearch(false);
                                                            }
                                                        } catch (err) {
                                                            console.error("Failed to create vendor", err);
                                                        }
                                                    }}
                                                >
                                                    <div>
                                                        <div className="font-bold text-blue-700">Add "{vendorSearchQuery}"</div>
                                                        <div className="text-[10px] text-blue-400 uppercase tracking-wider">Create New Vendor</div>
                                                    </div>
                                                    <Plus className="w-5 h-5 text-blue-600" />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => setShowVendorSearch(!showVendorSearch)}
                                    className="px-3 bg-white/10 rounded-lg hover:bg-white/20"
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Date Input (Same) */}
                    <div className="flex flex-wrap gap-4 items-end">
                        <div>
                            <label className="text-[10px] uppercase font-bold text-white/50 mb-1 block">Date</label>
                            <input
                                type="date"
                                className="bg-white/10 border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none"
                                value={header.date}
                                onChange={(e) => setHeader({ ...header, date: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <div className="p-8">
                {header.type === 'PAYMENT' ? (
                    /* Standard Expense Items logic */
                    <table className="w-full mb-8">
                        <thead>
                            <tr className="text-left border-b border-slate-100">
                                <th className="pb-4 pl-4 font-bold text-xs text-slate-400 uppercase tracking-wider w-[30%]">Expense Category</th>
                                <th className="pb-4 font-bold text-xs text-slate-400 uppercase tracking-wider">Description</th>
                                {/* QTY REMOVED */}
                                <th className="pb-4 font-bold text-xs text-slate-400 uppercase tracking-wider w-[20%]">Amount</th>
                                <th className="pb-4 pr-4 w-[50px]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {items.map((item, index) => (
                                <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                                    <td className="p-4 align-top">
                                        <select
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                            value={item.categoryId}
                                            onChange={(e) => {
                                                if (e.target.value === 'NEW') {
                                                    setShowNewCatModal(true);
                                                    return;
                                                }
                                                updateItem(item.id, 'categoryId', e.target.value);
                                            }}
                                            autoFocus={index === items.length - 1 && !item.categoryId}
                                        >
                                            <option value="">Select Category...</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                            <option value="NEW" className="font-bold text-blue-600">+ Create New Category</option>
                                        </select>
                                    </td>
                                    <td className="p-4 align-top">
                                        <input
                                            type="text"
                                            placeholder="Description or remarks..."
                                            className="w-full bg-transparent border-b border-transparent hover:border-slate-200 focus:border-blue-500 focus:bg-white px-0 py-2 text-sm text-slate-600 outline-none transition-all placeholder:text-slate-300"
                                            value={item.description}
                                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                        />
                                    </td>
                                    {/* QTY INPUT REMOVED */}
                                    <td className="p-4 align-top">
                                        <div className="relative">
                                            <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">AED</span>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-right"
                                                value={item.amount || ''}
                                                onChange={(e) => updateItem(item.id, 'amount', e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && index === items.length - 1) {
                                                        addItem();
                                                    }
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4 align-top text-right">
                                        {items.length > 1 && (
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                title="Remove Line"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    /* Receipt Logic: Simpler, usually just ONE line: "Advance Deposit" */
                    <div className="mb-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
                        <div className="flex gap-4 items-end">
                            <div className="flex-1">
                                <label className="text-xs font-bold text-emerald-800 uppercase mb-2 block">Deposit Amount</label>
                                <input
                                    type="number"
                                    className="w-full text-3xl font-black text-emerald-600 bg-white border border-emerald-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                                    placeholder="0.00"
                                    value={header.paidAmount} // For Receipt, Paid Amount IS the Total
                                    onChange={e => setHeader({ ...header, paidAmount: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs font-bold text-emerald-800 uppercase mb-2 block">Deposit Into</label>
                                <div className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-4 font-bold text-slate-500 cursor-not-allowed">
                                    Customer Advance (Liability)
                                </div>
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-emerald-600 font-medium">
                            * This amount will be credited to the customer's wallet balance.
                        </p>
                    </div>
                )}

                {/* Generic Add Item / Table End (Only for Payment) */}
                {header.type === 'PAYMENT' && (
                    // ... add item button ...
                    <button onClick={addItem} className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:bg-blue-50 px-4 py-2 rounded-lg transition">
                        <Plus className="w-4 h-4" /> Add Another Item
                    </button>
                )}


                {/* Footer / Summary */}
                <div className="mt-12 pt-8 border-t-2 border-slate-100 flex flex-wrap justify-between gap-12">

                    {/* Payment Details */}
                    <div className="flex-1 max-w-md space-y-6">
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Wallet className="w-4 h-4" /> {header.type === 'PAYMENT' ? 'Payment Details' : 'Receipt Details'}
                            </h3>

                            {/* ... Amount / Method / Account inputs adjusted for context ...  */}
                            <div className="space-y-4">
                                {/* Bill Upload Field */}
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Attach Bill / Receipt</label>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="file"
                                            className="hidden"
                                            id="bill-upload"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                try {
                                                    const formData = new FormData();
                                                    formData.append('file', file);

                                                    const res = await fetch('/api/upload', {
                                                        method: 'POST',
                                                        body: formData
                                                    });

                                                    if (res.ok) {
                                                        const data = await res.json();
                                                        setHeader({ ...header, billUrl: data.url });
                                                        alert("File uploaded successfully!");
                                                    } else {
                                                        alert("Upload failed");
                                                    }
                                                } catch (err) {
                                                    console.error(err);
                                                    alert("Upload error");
                                                }
                                            }}
                                        />
                                        <label
                                            htmlFor="bill-upload"
                                            className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 cursor-pointer flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                            {header.billUrl ? "Change File" : "Upload File"}
                                        </label>
                                        {header.billUrl && (
                                            <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                                                ✓ Attached
                                                <a href={header.billUrl} target="_blank" rel="noopener noreferrer" className="underline ml-1">View</a>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    {/* For Payment: Paid Amount Input is now readonly here as it's controlled in Summary */}
                                    {header.type === 'PAYMENT' && (
                                        <div className="flex-1 transition-opacity duration-200">
                                            <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Payment Amount</label>
                                            <div className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-500 cursor-not-allowed">
                                                {formatCurrency(header.paidAmount)}
                                            </div>
                                        </div>
                                    )}

                                    <div className="w-1/2">
                                        <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Method</label>
                                        <select
                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={header.paymentMethod}
                                            onChange={(e) => setHeader({ ...header, paymentMethod: e.target.value as any })}
                                        >
                                            <option value="CASH">Cash</option>
                                            <option value="CARD">Bank Transfer / Card</option>
                                            <option value="ONLINE">Online Wallet</option>
                                            <option value="CHEQUE">Cheque</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Paid From Account - Only show if paidAmount > 0 */}
                                {header.paidAmount > 0 && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">
                                            {header.type === 'PAYMENT' ? 'Paid From Account' : 'Deposit To (Bank/Cash)'}
                                        </label>
                                        <select
                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-600 focus:ring-2 focus:ring-blue-500 outline-none border-blue-200"
                                            value={header.accountId}
                                            onChange={(e) => setHeader({ ...header, accountId: e.target.value })}
                                        >
                                            <option value="">Select Account...</option>
                                            {accounts.map(acc => (
                                                <option key={acc.id} value={acc.id}>{acc.name} ({formatCurrency(acc.balance)})</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Total Summary */}
                    <div className="w-72 space-y-4">
                        {header.type === 'PAYMENT' ? (
                            <>
                                <div className="flex justify-between items-center text-slate-500">
                                    <span className="text-xs uppercase font-bold">Subtotal</span>
                                    <span className="font-bold">{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-500">
                                    <span className="text-xs uppercase font-bold text-emerald-600">Adjustment (-)</span>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-24 text-right bg-emerald-50 border border-emerald-100 rounded px-2 py-1 text-sm font-bold text-emerald-600 outline-none focus:ring-1 focus:ring-emerald-500"
                                        value={header.adjustment || ''}
                                        onChange={e => setHeader({ ...header, adjustment: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="flex justify-between items-center text-2xl font-black text-slate-900 pt-2 border-t border-slate-100">
                                    <span>NET TOTAL</span>
                                    <span className="text-blue-600">{formatCurrency(total)}</span>
                                </div>

                                {/* Payment Toggle */}
                                <div className="py-2 flex items-center justify-between border-t border-slate-100 mt-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Mark as Paid</label>
                                    <button
                                        onClick={() => setHeader(prev => ({ ...prev, isPaid: !prev.isPaid, paidAmount: !prev.isPaid ? total : 0 }))}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${header.isPaid ? 'bg-blue-600' : 'bg-slate-200'}`}
                                    >
                                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${header.isPaid ? 'translate-x-6' : ''}`}></div>
                                    </button>
                                </div>

                                <div className="flex justify-between items-center text-slate-500">
                                    <span className="text-xs uppercase font-bold">Paid Amount</span>
                                    <input
                                        type="number"
                                        min="0"
                                        max={total}
                                        className={`w-28 text-right border rounded px-2 py-1 text-lg font-bold outline-none focus:ring-2 ${header.isPaid ? 'bg-slate-50 text-slate-800 border-slate-200' : 'bg-white border-blue-200 text-blue-600 focus:ring-blue-500'}`}
                                        value={header.paidAmount || ''}
                                        onChange={e => {
                                            const val = parseFloat(e.target.value) || 0;
                                            // Auto-update isPaid status based on amount
                                            // If amount >= total, it's fully paid.
                                            // Note: using a small epsilon for float comparison safety or just simple >= if precise enough for 2 decimals
                                            setHeader({
                                                ...header,
                                                paidAmount: val,
                                                isPaid: val >= total
                                            });
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold text-slate-400 pt-1">
                                    <span>Balance Due</span>
                                    <span className={balance > 0 ? 'text-red-500' : 'text-slate-400'}>{formatCurrency(balance)}</span>
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-between items-center text-2xl font-black text-emerald-900 pt-2 border-t border-emerald-100">
                                <span>TOTAL RECEIPT</span>
                                <span className="text-emerald-600">{formatCurrency(header.paidAmount)}</span>
                            </div>
                        )}


                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${loading ? 'bg-slate-100 text-slate-400' : (header.type === 'PAYMENT' ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200')
                                }`}
                        >
                            {loading ? 'SAVING...' : (header.type === 'PAYMENT' ? 'SAVE VOUCHER' : 'PROCESS RECEIPT')}
                        </button>

                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></svg>
                            REFRESH / NEW VOUCHER
                        </button>
                    </div>
                </div>
            </div>

            {showVendorSearch && <div className="fixed inset-0 z-40" onClick={() => setShowVendorSearch(false)}></div>}

            {/* New Category Modal (Only for Payment) */}
            {header.type === 'PAYMENT' && showNewCatModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">New Expense Category</h3>
                        <p className="text-xs text-slate-500 mb-4">Add a new category for expense tracking.</p>

                        <input
                            type="text"
                            placeholder="Category Name"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none mb-4"
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                            autoFocus
                        />

                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => { setShowNewCatModal(false); setNewCatName(''); }}
                                className="px-4 py-2 rounded-lg font-bold text-slate-500 hover:bg-slate-50 text-xs"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    if (!newCatName.trim()) return;
                                    try {
                                        const res = await fetch('/api/expense-categories', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ name: newCatName })
                                        });
                                        if (res.ok) {
                                            const newCat = await res.json();
                                            setCategories([...categories, newCat]);

                                            // Auto-select in the last empty item or currently focused
                                            // Implementation detail: for now just close, user selects it from list
                                            setShowNewCatModal(false);
                                            setNewCatName('');
                                        }
                                    } catch (err) {
                                        console.error("Failed to create category", err);
                                    }
                                }}
                                className="px-4 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 text-xs flex items-center gap-2"
                            >
                                <Plus className="w-3 h-3" /> Create Category
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
