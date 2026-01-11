"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Trash2, Users, Building2, RefreshCw, Mail, Phone, Info, Edit } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function BeneficiaryList() {
    const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
    const [partners, setPartners] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedPartnerForDetail, setSelectedPartnerForDetail] = useState<any>(null);
    const [partnerInvoices, setPartnerInvoices] = useState<any[]>([]);
    const [loadingInvoices, setLoadingInvoices] = useState(false);

    // Form state
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newDetails, setNewDetails] = useState("");
    const [selectedPartnerId, setSelectedPartnerId] = useState("");
    const [isNewPartner, setIsNewPartner] = useState(false);
    const [newPartnerName, setNewPartnerName] = useState("");
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
        fetch("/api/session").then(r => r.json()).then(data => {
            if (data.user) setCurrentUser(data.user);
        });
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [benRes, ptrRes] = await Promise.all([
                fetch('/api/beneficiaries'),
                fetch('/api/partners')
            ]);
            if (benRes.ok) setBeneficiaries(await benRes.json());
            if (ptrRes.ok) setPartners(await ptrRes.json());
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPartnerInvoices = async (partner: any) => {
        if (!partner?.id) return;
        setSelectedPartnerForDetail(partner);
        setShowDetailModal(true);
        setLoadingInvoices(true);
        try {
            const res = await fetch(`/api/partners?id=${partner.id}&invoices=true`);
            if (res.ok) setPartnerInvoices(await res.json());
        } catch (error) {
            console.error("Failed to fetch invoices", error);
        } finally {
            setLoadingInvoices(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Delete Customer: ${name}?\nThis will unlink all associated transactions.`)) return;

        try {
            const res = await fetch(`/api/beneficiaries?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchData();
            } else {
                const err = await res.json();
                alert(err.error || `Failed to delete customer`);
            }
        } catch (e) { console.error(e); }
    };

    const handleEdit = (b: any) => {
        setNewName(b.name);
        setNewPhone(b.phone || "");
        setNewEmail(b.email || "");
        setNewDetails(b.details || "");
        setSelectedPartnerId(b.partnerId || "");
        setEditingId(b.id);
        setShowAddModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName) return;
        setSaving(true);
        try {
            let finalPartnerId = selectedPartnerId;

            // 1. Create New Company if requested (Only in Create Mode usually, but let's allow on Edit too if logic supports)
            if (isNewPartner && newPartnerName.trim()) {
                const pRes = await fetch('/api/partners', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newPartnerName })
                });
                if (pRes.ok) {
                    const newPartner = await pRes.json();
                    finalPartnerId = newPartner.id;
                } else {
                    alert("Failed to create new company. Please try again.");
                    setSaving(false);
                    return;
                }
            }

            const url = editingId ? '/api/beneficiaries' : '/api/beneficiaries';
            const method = editingId ? 'PUT' : 'POST';
            const payload = {
                id: editingId, // Ignored on POST
                name: newName,
                phone: newPhone,
                email: newEmail,
                details: newDetails,
                partnerId: finalPartnerId || null
            };

            // 2. Create or Update Beneficiary
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setShowAddModal(false);
                setNewName("");
                setNewPhone("");
                setNewEmail("");
                setNewDetails("");
                setSelectedPartnerId("");
                setIsNewPartner(false);
                setNewPartnerName("");
                setEditingId(null);
                fetchData();
            } else {
                alert("Failed to save customer");
            }
        } catch (e) { console.error(e); }
        finally { setSaving(false); }
    };

    const filtered = beneficiaries.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.partner?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.phone || "").includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Customer Master List</h1>
                    <p className="text-sm text-muted-foreground">Manage all representatives, personal customers, and walk-ins.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchData} className="p-2 border rounded-lg hover:bg-slate-50 transition" title="Refresh">
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition font-bold text-sm"
                    >
                        <Plus className="h-4 w-4" /> Add New Customer
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center bg-slate-100 rounded-md px-3 py-1 w-96">
                        <Search className="h-4 w-4 text-slate-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search Name, Company, or Phone..."
                            className="bg-transparent border-none outline-none text-sm w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                        Showing {filtered.length} of {beneficiaries.length} records
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Customer Name</th>
                                <th className="px-6 py-4 font-semibold">Company / Entity</th>
                                <th className="px-6 py-4 font-semibold">Contact Info</th>
                                <th className="px-6 py-4 font-semibold">Dues / Pending</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading data...</td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No records found.</td>
                                </tr>
                            ) : filtered.map((b) => (
                                <tr key={b.id} className="hover:bg-slate-50 transition group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900">{b.name}</div>
                                        {b.details && <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5"><Info className="h-3 w-3" /> {b.details}</div>}
                                    </td>
                                    <td className="px-6 py-4">
                                        {b.partner ? (
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-700">{b.partner.name}</span>
                                                <span className="text-[10px] text-slate-400 uppercase font-bold">{b.partner.type}</span>
                                            </div>
                                        ) : (
                                            <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded font-bold">INDIVIDUAL</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 space-y-1">
                                        {b.phone && <div className="flex items-center gap-2 text-slate-600"><Phone className="h-3 w-3" /> {b.phone}</div>}
                                        {b.email && <div className="flex items-center gap-2 text-slate-400 text-xs"><Mail className="h-3 w-3" /> {b.email}</div>}
                                        {!b.phone && !b.email && <span className="text-slate-300">-</span>}
                                    </td>
                                    <td className="px-6 py-4">
                                        {b.partner ? (
                                            <div className="flex flex-col gap-1">
                                                {/* PENDING DUES (Receivables) */}
                                                {(b.partner.liabilities || 0) > 0 && (
                                                    <button
                                                        onClick={() => fetchPartnerInvoices(b.partner)}
                                                        className="font-bold text-rose-600 hover:underline text-left text-xs"
                                                        title="Pending Payment"
                                                    >
                                                        Due: {formatCurrency(b.partner.liabilities)}
                                                    </button>
                                                )}

                                                {/* WALLET BALANCE (Advance) */}
                                                {(b.partner.dues || 0) > 0.01 && (
                                                    <span className="font-bold text-emerald-600 text-xs" title="Available Wallet Balance">
                                                        Wallet: {formatCurrency(b.partner.dues)}
                                                    </span>
                                                )}

                                                {/* No Activity */}
                                                {!(b.partner.liabilities > 0) && !(b.partner.dues > 0.01) && (
                                                    <span className="text-slate-300">-</span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-slate-300">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {currentUser?.role === 'ADMIN' && (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(b)}
                                                    className="p-1.5 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition mr-2"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(b.id, b.name)}
                                                    className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="p-6 bg-slate-900 text-white flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold">{editingId ? 'Edit Customer' : 'New Customer Entry'}</h3>
                                <p className="text-white/70 text-xs mt-1">{editingId ? 'Update details' : 'Register a new representative, individual, or walk-in.'}</p>
                            </div>
                            <button onClick={() => setShowAddModal(false)} className="text-white/50 hover:text-white">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name *</label>
                                    <input
                                        className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                                        placeholder="e.g. John Doe"
                                        value={newName}
                                        onChange={e => setNewName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mobile / Phone</label>
                                    <input
                                        className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                                        placeholder="+971..."
                                        value={newPhone}
                                        onChange={e => setNewPhone(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email (Optional)</label>
                                    <input
                                        className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                                        placeholder="john@example.com"
                                        value={newEmail}
                                        onChange={e => setNewEmail(e.target.value)}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-xs font-bold text-slate-500 uppercase">Link to Company (Optional)</label>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsNewPartner(!isNewPartner);
                                                setNewPartnerName("");
                                                setSelectedPartnerId("");
                                            }}
                                            className="text-xs text-rose-600 font-bold hover:underline flex items-center gap-1"
                                        >
                                            {isNewPartner ? "Select Existing" : "+ New Company"}
                                        </button>
                                    </div>

                                    {isNewPartner ? (
                                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                            <input
                                                className="w-full border-2 border-rose-100 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none bg-rose-50/30"
                                                placeholder="Enter New Company Name..."
                                                value={newPartnerName}
                                                onChange={e => setNewPartnerName(e.target.value)}
                                                autoFocus
                                            />
                                            <p className="text-[10px] text-rose-500 mt-1 font-medium">New company will be created automatically.</p>
                                        </div>
                                    ) : (
                                        <select
                                            className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none bg-white"
                                            value={selectedPartnerId}
                                            onChange={e => setSelectedPartnerId(e.target.value)}
                                        >
                                            <option value="">Individual (No Company Link)</option>
                                            {partners.map(p => (
                                                <option key={p.id} value={p.id}>{p.name} ({p.type})</option>
                                            ))}
                                        </select>
                                    )}
                                    {!isNewPartner && (
                                        <p className="text-[10px] text-slate-400 mt-1 italic">Selecting a company allows tracking receivables for that entity.</p>
                                    )}
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Extra Details / Notes</label>
                                    <textarea
                                        className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                                        placeholder="Identification, visa details, or specific instructions..."
                                        rows={2}
                                        value={newDetails}
                                        onChange={e => setNewDetails(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-4 py-2 border rounded-lg text-sm font-bold hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving || (isNewPartner && !newPartnerName)}
                                    className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700 disabled:opacity-50"
                                >
                                    {saving ? 'Saving...' : (editingId ? 'Update Customer' : 'Add to Master List')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Detail / Dues Modal */}
            {showDetailModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
                        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold">Outstanding Invoices</h3>
                                <p className="text-white/70 text-xs mt-1">
                                    Detail for <span className="text-white font-bold underline">{selectedPartnerForDetail?.name}</span>
                                </p>
                            </div>
                            <button onClick={() => setShowDetailModal(false)} className="text-white/50 hover:text-white">✕</button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {loadingInvoices ? (
                                <div className="text-center py-12 text-slate-400">Loading invoice details...</div>
                            ) : partnerInvoices.length === 0 ? (
                                <div className="text-center py-12 text-slate-400">No pending invoices found for this entity.</div>
                            ) : (
                                <table className="w-full text-sm">
                                    <thead className="text-xs text-slate-500 uppercase border-b">
                                        <tr>
                                            <th className="px-4 py-2 text-left">Invoice No</th>
                                            <th className="px-4 py-2 text-left">Date</th>
                                            <th className="px-4 py-2 text-right">Grand Total</th>
                                            <th className="px-4 py-2 text-right text-rose-600">Balance Due</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {partnerInvoices.map((inv) => (
                                            <tr key={inv.id} className="hover:bg-slate-50">
                                                <td className="px-4 py-3 font-medium text-slate-900">{inv.invoiceNo}</td>
                                                <td className="px-4 py-3 text-slate-500">{new Date(inv.date).toLocaleDateString()}</td>
                                                <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(inv.total)}</td>
                                                <td className="px-4 py-3 text-right font-bold text-rose-600">{formatCurrency(inv.balance)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-slate-50 font-bold border-t">
                                        <tr>
                                            <td colSpan={3} className="px-4 py-3 text-right">Total Outstanding:</td>
                                            <td className="px-4 py-3 text-right text-rose-600">
                                                {formatCurrency(partnerInvoices.reduce((sum, inv) => sum + inv.balance, 0))}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            )}
                        </div>

                        <div className="p-4 border-t bg-slate-50 text-right">
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="bg-slate-800 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-900 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
