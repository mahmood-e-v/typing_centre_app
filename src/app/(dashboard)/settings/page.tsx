"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, CreditCard, Building2, Store, Pencil, CalendarClock } from 'lucide-react';

interface DocumentType {
    id: string;
    name: string;
}

interface WorkType {
    id: string;
    description: string;
    presetGovFee: number;
    presetTypingCharge: number;
    tracksExpiry?: boolean;
    defaultDocumentTypeId?: string;
    defaultReminderDays?: number;
    defaultDocumentType?: DocumentType;
}

export default function SettingsPage() {
    const [services, setServices] = useState<WorkType[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [cards, setCards] = useState<any[]>([]);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [newAccount, setNewAccount] = useState<{
        name: string;
        type: string;
        issuingBank?: string;
        last4Digits?: string;
        creditLimit?: number;
        balance?: number;
        openingBalance?: string;
    }>({
        name: '',
        type: 'CREDIT',
        issuingBank: '',
        last4Digits: '',
        creditLimit: 0,
        openingBalance: ''
    });

    const [repayModal, setRepayModal] = useState<{
        isOpen: boolean;
        cardId: string;
        cardName: string;
        currentBalance: number;
        amount?: string;
        sourceAccountId?: string;
    }>({
        isOpen: false,
        cardId: '',
        cardName: '',
        currentBalance: 0,
        amount: '',
        sourceAccountId: ''
    });

    // Edit Modal State
    const [editModal, setEditModal] = useState<{
        isOpen: boolean;
        cardId: string;
        name: string;
        issuingBank: string;
        last4Digits: string;
        creditLimit: number;
        type: string;
    }>({
        isOpen: false,
        cardId: '',
        name: '',
        issuingBank: '',
        last4Digits: '',
        creditLimit: 0,
        type: ''
    });

    // New Service Form State
    const [newService, setNewService] = useState<{
        description: string;
        presetGovFee: number;
        presetTypingCharge: number;
        tracksExpiry: boolean;
        defaultDocumentTypeId: string;
        defaultReminderDays: number;
    }>({
        description: '',
        presetGovFee: 0,
        presetTypingCharge: 0,
        tracksExpiry: false,
        defaultDocumentTypeId: '',
        defaultReminderDays: 30
    });

    // New Category Form State
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchServices();
        fetchCategories();
        fetchCards();
        fetchAccounts();
        fetchDocumentTypes();
    }, []);

    const fetchCards = async () => {
        try {
            const res = await fetch('/api/cards');
            const data = await res.json();
            if (data.cards && Array.isArray(data.cards)) setCards(data.cards);
        } catch (e) { console.error(e); }
    };

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/work-types');
            const data = await res.json();
            if (Array.isArray(data)) setServices(data);
            else setServices([]);
        } catch (error) {
            console.error("Fetch services error:", error);
            setServices([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDocumentTypes = async () => {
        try {
            const res = await fetch('/api/document-types');
            const data = await res.json();
            if (Array.isArray(data)) setDocumentTypes(data);
        } catch (e) { console.error(e); }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/expense-categories');
            const data = await res.json();
            if (Array.isArray(data)) setCategories(data);
            else setCategories([]);
        } catch (error) {
            console.error("Fetch categories error:", error);
            setCategories([]);
        }
    };

    const handleAddService = async () => {
        if (!newService.description) return;
        try {
            const res = await fetch('/api/work-types', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newService)
            });
            if (res.ok) {
                await fetchServices();
                setNewService({
                    description: '',
                    presetGovFee: 0,
                    presetTypingCharge: 0,
                    tracksExpiry: false,
                    defaultDocumentTypeId: '',
                    defaultReminderDays: 30
                });
                alert("Service added successfully!");
            } else {
                alert("Failed to add service. Please check your inputs.");
            }
        } catch (error) {
            console.error(error);
            alert("Error adding service.");
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.name) return;
        try {
            const res = await fetch('/api/expense-categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCategory)
            });
            if (res.ok) {
                await fetchCategories();
                setNewCategory({ name: '', description: '' });
                alert("Category added successfully!");
            } else {
                alert("Failed to add category.");
            }
        } catch (error) {
            console.error(error);
            alert("Error adding category.");
        }
    };

    const handleAddCard = async () => {
        if (!newAccount.name || !newAccount.issuingBank) return alert("Name and Bank are required");

        try {
            const res = await fetch('/api/cards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAccount)
            });

            if (res.ok) {
                alert("Card Added Successfully");
                fetchCards();
                setNewAccount({ name: '', type: 'CREDIT', issuingBank: '', last4Digits: '', creditLimit: 0 });
            } else {
                const err = await res.json();
                alert("Failed to add card: " + err.error);
            }
        } catch (error) {
            console.error(error);
            alert("Error adding card");
        }
    };

    const handleUpdateCard = async () => {
        if (!editModal.name || !editModal.issuingBank) return alert("Name and Bank are required");

        try {
            const res = await fetch(`/api/cards/${editModal.cardId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: editModal.name,
                    issuingBank: editModal.issuingBank,
                    last4Digits: editModal.last4Digits,
                    creditLimit: editModal.creditLimit,
                    type: editModal.type
                })
            });

            if (res.ok) {
                alert("Card Updated Successfully");
                setEditModal({ ...editModal, isOpen: false });
                fetchCards();
            } else {
                const err = await res.json();
                alert("Failed to update card: " + err.error);
            }
        } catch (error) {
            console.error("Update Card Error:", error);
            alert("Error updating card");
        }
    };

    const fetchAccounts = async () => {
        try {
            const res = await fetch('/api/accounts');
            const data = await res.json();
            if (Array.isArray(data)) {
                const payingAccounts = data.filter((a: any) => a.type === 'CASH' || a.type === 'BANK');
                setAccounts(payingAccounts);
            }
        } catch (e) { console.error(e); }
    };

    const handleRepayCard = async () => {
        if (!repayModal.amount || !repayModal.sourceAccountId) {
            alert("Please select a source account and enter an amount.");
            return;
        }

        try {
            const res = await fetch('/api/cards/repay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cardId: repayModal.cardId,
                    amount: parseFloat(repayModal.amount),
                    sourceAccountId: repayModal.sourceAccountId
                })
            });

            if (res.ok) {
                alert("Repayment successful!");
                setRepayModal({ ...repayModal, isOpen: false, amount: '', sourceAccountId: '' });
                fetchCards();
                fetchAccounts();
            } else {
                const err = await res.json();
                alert("Repayment failed: " + err.error);
            }
        } catch (error) {
            console.error("Repayment Error:", error);
            alert("An error occurred during repayment.");
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

            {/* Quick Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/settings/company" className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition flex items-start gap-4 group">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                        <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-900">Company Profile</h3>
                        <p className="text-sm text-slate-500">Manage legal entity, VAT, and basic configuration</p>
                    </div>
                </Link>

                <Link href="/settings/branches" className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition flex items-start gap-4 group">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition">
                        <Store className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-900">Branch Management</h3>
                        <p className="text-sm text-slate-500">Manage branches, prefixes, and managers</p>
                    </div>
                </Link>

                <Link href="/financial-periods" className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition flex items-start gap-4 group">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition">
                        <CalendarClock className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-900">Financial Periods</h3>
                        <p className="text-sm text-slate-500">Manage fiscal years, locks, and closing</p>
                    </div>
                </Link>
            </div>

            {/* Cards Management */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    Office Cards (Credit & Debit)
                </h2>

                <div className="flex flex-wrap gap-4 mb-6 items-end bg-slate-50 p-4 rounded-lg border">
                    <div className="w-40">
                        <label className="text-xs font-bold text-slate-500 uppercase">Card Type</label>
                        <select
                            className="w-full border p-2 rounded"
                            value={newAccount.type}
                            onChange={e => setNewAccount({ ...newAccount, type: e.target.value })}
                        >
                            <option value="CREDIT">Credit Card</option>
                            <option value="DEBIT">Debit Card</option>
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="text-xs font-bold text-slate-500 uppercase">Card Name</label>
                        <input className="w-full border p-2 rounded" placeholder="e.g. ADCB Platinum" value={newAccount.name} onChange={e => setNewAccount({ ...newAccount, name: e.target.value })} />
                    </div>
                    <div className="w-48">
                        <label className="text-xs font-bold text-slate-500 uppercase">Issuing Bank</label>
                        <input className="w-full border p-2 rounded" placeholder="e.g. ADCB" value={newAccount.issuingBank || ''} onChange={e => setNewAccount({ ...newAccount, issuingBank: e.target.value })} />
                    </div>
                    <div className="w-32">
                        <label className="text-xs font-bold text-slate-500 uppercase">Last 4 Digits</label>
                        <input className="w-full border p-2 rounded" maxLength={4} placeholder="1234" value={newAccount.last4Digits || ''} onChange={e => setNewAccount({ ...newAccount, last4Digits: e.target.value })} />
                    </div>
                    {newAccount.type === 'CREDIT' && (
                        <div className="w-32">
                            <label className="text-xs font-bold text-slate-500 uppercase">Credit Limit</label>
                            <input type="number" className="w-full border p-2 rounded" value={newAccount.creditLimit || ''} onChange={e => setNewAccount({ ...newAccount, creditLimit: parseFloat(e.target.value) || 0 })} />
                        </div>
                    )}
                    <div className="w-32">
                        <label className="text-xs font-bold text-slate-500 uppercase">Opening Bal</label>
                        <input type="number" className="w-full border p-2 rounded" placeholder="0.00" value={newAccount.openingBalance || ''} onChange={e => setNewAccount({ ...newAccount, openingBalance: e.target.value })} />
                    </div>
                    <button onClick={handleAddCard} className="bg-purple-600 text-white px-4 py-2 rounded font-bold hover:bg-purple-700 h-10 self-end">Add Card</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cards.map((card: any) => {
                        const balance = parseFloat(card.ledgerAccount?.balance || '0');
                        const limit = parseFloat(card.creditLimit || '0');
                        const available = limit + balance;
                        return (
                            <div key={card.id} className="p-4 border rounded bg-white hover:shadow-md transition flex flex-col gap-2 relative">
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <button
                                        onClick={() => setEditModal({
                                            isOpen: true,
                                            cardId: card.id,
                                            name: card.name,
                                            issuingBank: card.issuingBank,
                                            last4Digits: card.last4Digits,
                                            creditLimit: parseFloat(card.creditLimit || '0'),
                                            type: card.type
                                        })}
                                        className="p-1 text-slate-400 hover:text-blue-600 rounded hover:bg-slate-100"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="flex justify-between items-start pr-8">
                                    <div>
                                        <h4 className="font-bold text-slate-900">{card.name}</h4>
                                        <p className="text-xs text-slate-500">{card.issuingBank} •••• {card.last4Digits}</p>
                                    </div>
                                    <span className={`text-[10px] px-2 py-1 rounded font-bold border ${card.type === 'CREDIT' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                                        {card.type}
                                    </span>
                                </div>
                                <div className="pt-2 border-t mt-1 space-y-1">
                                    {card.type === 'CREDIT' ? (
                                        <>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-slate-500">Credit Limit:</span>
                                                <span className="font-mono font-medium">{limit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-slate-500">Current Balance:</span>
                                                <span className="font-mono font-medium text-red-600">{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-slate-500">Available:</span>
                                                <span className={`font-mono font-bold ${available < 0 ? 'text-red-600' : 'text-emerald-600'}`}>{available.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <button
                                                onClick={() => setRepayModal({ cardId: card.id, cardName: card.name, currentBalance: balance, isOpen: true })}
                                                className="w-full mt-2 bg-slate-100 text-slate-600 text-xs font-bold py-2 rounded hover:bg-slate-200"
                                            >
                                                Repay Card
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500">Linked Account:</span>
                                            <span className="font-mono font-medium">
                                                {card.ledgerAccount?.name || 'N/A'}
                                                <span className="text-slate-400 text-xs ml-1">({parseFloat(card.ledgerAccount?.balance || '0').toLocaleString()} AED)</span>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    {cards.length === 0 && (
                        <div className="col-span-full text-center text-slate-400 py-4 italic">No cards added yet.</div>
                    )}
                </div>
            </div>

            {/* Edit Card Modal */}
            {editModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Edit Card</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Card Name</label>
                                <input
                                    className="w-full border p-2 rounded"
                                    value={editModal.name}
                                    onChange={e => setEditModal({ ...editModal, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Issuing Bank</label>
                                <input
                                    className="w-full border p-2 rounded"
                                    value={editModal.issuingBank}
                                    onChange={e => setEditModal({ ...editModal, issuingBank: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Last 4 Digits</label>
                                <input
                                    className="w-full border p-2 rounded"
                                    maxLength={4}
                                    value={editModal.last4Digits}
                                    onChange={e => setEditModal({ ...editModal, last4Digits: e.target.value })}
                                />
                            </div>
                            {editModal.type === 'CREDIT' && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Credit Limit</label>
                                    <input
                                        type="number"
                                        className="w-full border p-2 rounded"
                                        value={editModal.creditLimit}
                                        onChange={e => setEditModal({ ...editModal, creditLimit: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3 justify-end mt-6">
                            <button
                                onClick={() => setEditModal({ ...editModal, isOpen: false })}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateCard}
                                className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
                            >
                                Update Card
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Repayment Modal */}
            {repayModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Repay {repayModal.cardName}</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Current Balance Due</label>
                                <div className="p-2 bg-red-50 text-red-700 font-mono font-bold rounded border border-red-100">
                                    {repayModal.currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })} AED
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Payment Amount</label>
                                <input
                                    type="number"
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="Enter amount..."
                                    value={repayModal.amount}
                                    onChange={e => setRepayModal({ ...repayModal, amount: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Pay From Account</label>
                                <select
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                                    value={repayModal.sourceAccountId}
                                    onChange={e => setRepayModal({ ...repayModal, sourceAccountId: e.target.value })}
                                >
                                    <option value="">-- Select Source --</option>
                                    {accounts.map((acc: any) => (
                                        <option key={acc.id} value={acc.id}>
                                            {acc.name} (Bal: {Number(acc.balance).toLocaleString()} AED)
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end mt-6">
                            <button
                                onClick={() => setRepayModal({ ...repayModal, isOpen: false })}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRepayCard}
                                className="px-4 py-2 bg-purple-600 text-white font-bold rounded hover:bg-purple-700"
                            >
                                Confirm Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid gap-6">

                {/* 1. Service & Fees Section */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Service & Fee Configuration</h2>
                    <p className="text-sm text-slate-500 mb-6">Manage the services available in the Transaction Grid and their default fees.</p>

                    {/* Add New Service Form */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-slate-50 p-4 rounded-lg border">
                        <div className="md:col-span-2">
                            <label className="text-xs font-semibold uppercase text-slate-500">Service Name</label>
                            <input
                                type="text"
                                placeholder="e.g., Visa Stamping"
                                className="w-full mt-1 p-2 border rounded-md"
                                value={newService.description}
                                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase text-slate-500">Govt Fee</label>
                            <input
                                type="number"
                                className="w-full mt-1 p-2 border rounded-md"
                                value={newService.presetGovFee}
                                onChange={(e) => setNewService({ ...newService, presetGovFee: parseFloat(e.target.value) || 0 })}
                            />
                        </div>
                        <div className="flex items-end gap-2">
                            <div className="flex-1">
                                <label className="text-xs font-semibold uppercase text-slate-500">Typing Charge</label>
                                <input
                                    type="number"
                                    className="w-full mt-1 p-2 border rounded-md"
                                    value={newService.presetTypingCharge}
                                    onChange={(e) => setNewService({ ...newService, presetTypingCharge: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                        </div>

                        {/* Document Expiry Config */}
                        <div className="md:col-span-4 border-t pt-2 mt-2">
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded border border-slate-200 hover:bg-slate-50">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 rounded"
                                        checked={newService.tracksExpiry}
                                        onChange={e => setNewService({ ...newService, tracksExpiry: e.target.checked })}
                                    />
                                    <span className="text-sm font-medium text-slate-700">Monitor Expiry</span>
                                </label>

                                {newService.tracksExpiry && (
                                    <>
                                        <div className="flex-1">
                                            <select
                                                className="w-full p-2 border rounded-md text-sm"
                                                value={newService.defaultDocumentTypeId}
                                                onChange={e => setNewService({ ...newService, defaultDocumentTypeId: e.target.value })}
                                            >
                                                <option value="">-- Select Doc Type --</option>
                                                {documentTypes.map(d => (
                                                    <option key={d.id} value={d.id}>{d.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="w-32 flex items-center gap-2" title="Days before expiry to check">
                                            <input
                                                type="number"
                                                className="w-16 p-2 border rounded-md text-sm text-center"
                                                value={newService.defaultReminderDays}
                                                onChange={e => setNewService({ ...newService, defaultReminderDays: parseInt(e.target.value) || 30 })}
                                            />
                                            <span className="text-xs text-slate-500">days notice</span>
                                        </div>
                                    </>
                                )}

                                <button
                                    onClick={handleAddService}
                                    className="ml-auto p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2 px-4"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>Add Service</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Services List Table */}
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-500">
                            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3">Service Name</th>
                                    <th className="px-6 py-3">Govt Fee</th>
                                    <th className="px-6 py-3">Typing Charge</th>
                                    <th className="px-6 py-3">Total</th>
                                    <th className="px-6 py-3">Expiry Tracking</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service) => (
                                    <tr key={service.id} className="bg-white border-b hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">{service.description}</td>
                                        <td className="px-6 py-4">{Number(service.presetGovFee || 0).toFixed(2)}</td>
                                        <td className="px-6 py-4">{Number(service.presetTypingCharge || 0).toFixed(2)}</td>
                                        <td className="px-6 py-4 font-bold">{(Number(service.presetGovFee || 0) + Number(service.presetTypingCharge || 0)).toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            {service.tracksExpiry ? (
                                                <div className="flex flex-col">
                                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded w-fit font-bold">Enabled</span>
                                                    {service.defaultDocumentType && (
                                                        <span className="text-[10px] text-slate-500 mt-1">{service.defaultDocumentType.name}</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-300">Disabled</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-red-500 hover:text-red-700">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {services.length === 0 && !isLoading && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                                            No services added yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 2. Expense Categories Section */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Expense Categories</h2>
                    <p className="text-sm text-slate-500 mb-6">Define categories for your daily expenses (e.g., Rent, Salary, Office Supplies).</p>

                    {/* Add Category Form */}
                    <div className="flex gap-4 mb-6 bg-slate-50 p-4 rounded-lg border items-end">
                        <div className="flex-1">
                            <label className="text-xs font-semibold uppercase text-slate-500">Category Name</label>
                            <input
                                type="text"
                                placeholder="e.g., Office Rent"
                                className="w-full mt-1 p-2 border rounded-md"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            />
                        </div>
                        <div className="flex-[2]">
                            <label className="text-xs font-semibold uppercase text-slate-500">Description</label>
                            <input
                                type="text"
                                placeholder="Optional description..."
                                className="w-full mt-1 p-2 border rounded-md"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            />
                        </div>
                        <button onClick={handleAddCategory} className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {categories.map((cat) => (
                            <div key={cat.id} className="p-4 border rounded-lg bg-slate-50 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-slate-900">{cat.name}</p>
                                    <p className="text-xs text-slate-500">{cat.description}</p>
                                </div>
                                <button className="text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        ))}
                        {categories.length === 0 && (
                            <div className="col-span-3 text-center text-slate-400 py-4">No categories created yet.</div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
