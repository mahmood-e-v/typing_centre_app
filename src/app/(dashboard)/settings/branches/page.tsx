
"use client";

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Shield, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function BranchesPage() {
    const [branches, setBranches] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBranch, setEditingBranch] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [brRes, usRes] = await Promise.all([
                fetch('/api/branches'),
                fetch('/api/users')
            ]);
            const brData = await brRes.json();
            const usData = await usRes.json();

            if (brRes.ok) setBranches(brData.branches || []);
            if (usRes.ok) setUsers(usData.users || []); // Assuming API returns { users: [] }

        } catch (error) {
            console.error(error);
            setError("Failed to load data");
        } finally {
            setIsLoading(false);
        }
    };

    const openAddModal = () => {
        setEditingBranch(null);
        setFormData({
            name: '', code: '', type: 'SUB',
            location: '', address: '', phone: '', email: '',
            managerId: '',
            cashCounterEnabled: true,
            openingCashBalance: 0,
            invoicePrefix: '', receiptPrefix: '',
            separateNumbering: true
        });
        setError(null);
        setIsModalOpen(true);
    };

    const openEditModal = (branch: any) => {
        setEditingBranch(branch);
        setFormData({
            ...branch,
            // openingCashBalance: branch.openingCashBalance // Can't edit usually
        });
        setError(null);
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!formData.name) return setError("Name is required");
        setIsSaving(true);
        setError(null);
        try {
            const method = editingBranch ? 'PATCH' : 'POST';
            const res = await fetch('/api/branches', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                setIsModalOpen(false);
                fetchData(); // Refresh
            } else {
                setError(data.error || "Operation failed");
            }
        } catch (error) {
            console.error(error);
            setError("Network error");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center text-slate-500">Loading Branches...</div>;

    return (
        <div className="space-y-6 max-w-6xl mx-auto pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1">Branch Management</h1>
                    <p className="text-slate-500">Manage operational units, prefixes, and assignments</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/settings" className="px-4 py-2 border rounded-md hover:bg-slate-50">Back</Link>
                    <button onClick={openAddModal} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Branch
                    </button>
                </div>
            </div>

            <div className="grid gap-6">
                {branches.map(branch => (
                    <div key={branch.id} className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row justify-between gap-6 hover:shadow-md transition">
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-bold text-slate-900">{branch.name}</h3>
                                <span className={`text-xs px-2 py-1 rounded font-mono border ${branch.type === 'MAIN' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-slate-100 text-slate-700'}`}>
                                    {branch.code}
                                </span>
                                {!branch.isActive && <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Inactive</span>}
                            </div>
                            <div className="text-sm text-slate-500 grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <span className="block text-xs font-bold uppercase text-slate-400">Location</span>
                                    {branch.location || 'N/A'}
                                </div>
                                <div>
                                    <span className="block text-xs font-bold uppercase text-slate-400">Manager</span>
                                    {branch.manager ?
                                        ((branch.manager.firstName || branch.manager.lastName) ?
                                            `${branch.manager.firstName || ''} ${branch.manager.lastName || ''}`.trim() :
                                            branch.manager.email)
                                        : 'Unassigned'}
                                </div>
                                <div>
                                    <span className="block text-xs font-bold uppercase text-slate-400">Prefixes</span>
                                    <span className="font-mono">{branch.invoicePrefix || '-'} / {branch.receiptPrefix || '-'}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold uppercase text-slate-400">Controls</span>
                                    {branch.separateNumbering ? 'Separate Numbering' : 'Shared'}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 border-l pl-6">
                            <button onClick={() => openEditModal(branch)} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                                <Edit className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                            <h3 className="text-xl font-bold">{editingBranch ? 'Edit Branch' : 'New Branch'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 text-2xl leading-none">&times;</button>
                        </div>

                        <div className="p-6 space-y-6">
                            {error && <div className="p-3 bg-red-50 text-red-700 rounded border border-red-200 text-sm">{error}</div>}

                            {/* Identity Section */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Branch Name</label>
                                    <input className="w-full border p-2 rounded" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Code (Auto if empty)</label>
                                    <input
                                        className="w-full border p-2 rounded bg-slate-50"
                                        value={formData.code || ''}
                                        onChange={e => setFormData({ ...formData, code: e.target.value })}
                                        disabled={!!editingBranch} // Code immutable usually
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Branch Type</label>
                                    <select className="w-full border p-2 rounded" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                        <option value="SUB">Sub Branch</option>
                                        <option value="MAIN">Main Branch</option>
                                    </select>
                                </div>
                            </div>

                            {/* Contact & Manager */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location / City</label>
                                    <input className="w-full border p-2 rounded" value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Manager</label>
                                    <select className="w-full border p-2 rounded" value={formData.managerId || ''} onChange={e => setFormData({ ...formData, managerId: e.target.value })}>
                                        <option value="">-- Select Manager --</option>
                                        {users.map((u: any) => (
                                            <option key={u.id} value={u.id}>{u.firstName} {u.lastName} ({u.email})</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Financial Settings */}
                            <div className="border-t pt-4">
                                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-purple-600" /> Financial Controls
                                </h4>
                                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border">
                                    {/* Opening Balance - Only for NEW branches or if strictly allowed? Logic says New. */}
                                    {!editingBranch && (
                                        <div className="col-span-2">
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Opening Cash Balance (AED)</label>
                                            <input
                                                type="number"
                                                className="w-full border p-2 rounded font-bold text-green-700"
                                                value={formData.openingCashBalance || 0}
                                                onChange={e => setFormData({ ...formData, openingCashBalance: parseFloat(e.target.value) })}
                                            />
                                            <p className="text-xs text-slate-400 mt-1">Immutably posted to ledger upon creation.</p>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Invoice Prefix</label>
                                        <input
                                            className={`w-full border p-2 rounded font-mono ${editingBranch && editingBranch._count?.invoices > 0 ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                            value={formData.invoicePrefix || ''}
                                            onChange={e => setFormData({ ...formData, invoicePrefix: e.target.value })}
                                            placeholder="INV-DXB-"
                                            disabled={editingBranch && editingBranch._count?.invoices > 0} // Locked if invoices exist
                                        />
                                        {editingBranch && editingBranch._count?.invoices > 0 && <span className="text-xs text-red-500">Locked: Invoices exist</span>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Receipt Prefix</label>
                                        <input
                                            className="w-full border p-2 rounded font-mono"
                                            value={formData.receiptPrefix || ''}
                                            onChange={e => setFormData({ ...formData, receiptPrefix: e.target.value })}
                                            placeholder="RCP-DXB-"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 mt-2">
                                        <input
                                            type="checkbox"
                                            id="sepNum"
                                            checked={formData.separateNumbering}
                                            onChange={e => setFormData({ ...formData, separateNumbering: e.target.checked })}
                                        />
                                        <label htmlFor="sepNum" className="text-sm font-medium">Separate Numbering Sequence</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded hover:bg-white text-slate-600">Cancel</button>
                            <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 disabled:opacity-50">
                                {isSaving ? 'Saving...' : (editingBranch ? 'Update Branch' : 'Create Branch')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
