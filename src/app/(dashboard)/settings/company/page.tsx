
"use client";

import { useEffect, useState } from 'react';
import { Save, Building2, Globe, FileText, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function CompanyProfilePage() {
    const [company, setCompany] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        fetchCompany();
    }, []);

    const fetchCompany = async () => {
        try {
            const res = await fetch('/api/company');
            const data = await res.json();
            if (res.ok) {
                setCompany(data.company);
            } else {
                setMessage({ text: data.error || 'Failed to fetch company', type: 'error' });
            }
        } catch (error) {
            console.error(error);
            setMessage({ text: 'Error loading company data', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            const res = await fetch('/api/company', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(company)
            });
            const data = await res.json();
            if (res.ok) {
                setCompany(data.company);
                setMessage({ text: 'Company Profile Updated Successfully', type: 'success' });
            } else {
                setMessage({ text: data.error || 'Failed to update', type: 'error' });
            }
        } catch (error) {
            console.error(error);
            setMessage({ text: 'Error updating profile', type: 'error' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center text-slate-500">Loading Company Profile...</div>;
    if (!company) return <div className="p-8 text-center text-red-500">Company Not Found</div>;

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1">Company Profile</h1>
                    <p className="text-slate-500">Manage your legal entity details and VAT configuration</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/settings" className="px-4 py-2 border rounded-md hover:bg-slate-50">Back</Link>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {message && (
                <div className={`p-4 rounded-md border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* 1. Identity & Contact */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-slate-400" />
                            Identity & Contact
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company Name (English)</label>
                                <input
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-primary/20 outline-none"
                                    value={company.name || ''}
                                    onChange={e => setCompany({ ...company, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company Name (Arabic)</label>
                                <input
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-primary/20 outline-none text-right font-arabic"
                                    value={company.nameAr || ''}
                                    onChange={e => setCompany({ ...company, nameAr: e.target.value })}
                                    placeholder="اسم الشركة"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                                <input
                                    className="w-full border p-2 rounded"
                                    value={company.email || ''}
                                    onChange={e => setCompany({ ...company, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone</label>
                                <input
                                    className="w-full border p-2 rounded"
                                    value={company.phone || ''}
                                    onChange={e => setCompany({ ...company, phone: e.target.value })}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Address</label>
                                <textarea
                                    className="w-full border p-2 rounded h-20"
                                    value={company.address || ''}
                                    onChange={e => setCompany({ ...company, address: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Website</label>
                                <input
                                    className="w-full border p-2 rounded"
                                    value={company.website || ''}
                                    onChange={e => setCompany({ ...company, website: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 2. Legal & Branding */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <FileText className="w-5 h-5 text-slate-400" />
                            Legal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Legal Type</label>
                                <select
                                    className="w-full border p-2 rounded"
                                    value={company.legalType || 'SOLE_ESTABLISHMENT'}
                                    onChange={e => setCompany({ ...company, legalType: e.target.value })}
                                >
                                    <option value="SOLE_ESTABLISHMENT">Sole Establishment</option>
                                    <option value="LLC">LLC</option>
                                    <option value="CIVIL_COMPANY">Civil Company</option>
                                    <option value="FREEZONE_ENTITY">Freezone Entity</option>
                                    <option value="BRANCH_OF_FOREIGN">Branch of Foreign Company</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Trade License No.</label>
                                <input
                                    className="w-full border p-2 rounded"
                                    value={company.tradeLicense || ''}
                                    onChange={e => setCompany({ ...company, tradeLicense: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. VAT & Accounting (Side Panel) */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4 border-l-4 border-l-purple-500">
                        <h2 className="text-lg font-semibold flex items-center gap-2 text-purple-700">
                            <Globe className="w-5 h-5" />
                            VAT Configuration
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border">
                                <input
                                    type="checkbox"
                                    id="vatReg"
                                    className="w-5 h-5 text-purple-600 rounded"
                                    checked={company.vatRegistered || false}
                                    onChange={e => setCompany({ ...company, vatRegistered: e.target.checked })}
                                />
                                <label htmlFor="vatReg" className="font-medium text-sm">VAT Registered</label>
                            </div>

                            {company.vatRegistered && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">TRN (Tax Registration Number)</label>
                                        <input
                                            className="w-full border p-2 rounded font-mono bg-yellow-50 border-yellow-200"
                                            value={company.trn || ''}
                                            onChange={e => setCompany({ ...company, trn: e.target.value })}
                                            placeholder="100xxxxxxxxxxxxx"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Rate (%)</label>
                                            <input
                                                type="number"
                                                className="w-full border p-2 rounded"
                                                value={company.vatRate || 5}
                                                onChange={e => setCompany({ ...company, vatRate: parseFloat(e.target.value) })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Frequency</label>
                                            <select
                                                className="w-full border p-2 rounded"
                                                value={company.vatReturnFreq || 'QUARTERLY'}
                                                onChange={e => setCompany({ ...company, vatReturnFreq: e.target.value })}
                                            >
                                                <option value="QUARTERLY">Quarterly</option>
                                                <option value="MONTHLY">Monthly</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded flex gap-2">
                                        <AlertTriangle className="w-4 h-4 shrink-0" />
                                        <span>Changes to VAT settings are audit-logged and strictly monitored.</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            Accounting Model
                        </h2>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Selected Model</label>
                            <div className="p-3 bg-slate-100 border rounded font-mono text-sm font-bold text-slate-700">
                                {company.accountingModel?.replace('_', ' ')}
                            </div>
                            <p className="text-xs text-slate-400 mt-2">
                                This setting is locked to ensure audit compliance.
                            </p>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Base Currency</label>
                            <div className="p-2 border rounded bg-slate-50 text-slate-500">{company.baseCurrency}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
