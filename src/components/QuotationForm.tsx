"use client";

import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Printer, UserPlus, Search, ArrowRightCircle, XCircle, Send, CheckCircle, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface QuotationItem {
    id: string;
    workTypeId?: string;
    description: string;
    quantity: number;
    govFee: number;
    typingCharge: number;
    taxRate: number;
    taxAmount: number;
    total: number;
    isVatApplicable: boolean;
}

interface QuotationHeader {
    id?: string;
    quotationNo: string;
    date: string;
    validUntil: string;
    partnerId?: string;
    partnerName: string;
    partnerPhone?: string;
    beneficiaryName: string;
    salespersonName: string;
    status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'EXPIRED' | 'CANCELLED' | 'CONVERTED' | 'PARTIALLY_INVOICED';
    notes: string;
    approvedBy?: string;
    approvedAt?: string;
}

export default function QuotationForm({ quotationId, onBack }: { quotationId?: string, onBack: () => void }) {
    const router = useRouter();
    const [header, setHeader] = useState<QuotationHeader>({
        quotationNo: 'NEW',
        date: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        partnerName: '',
        beneficiaryName: '',
        salespersonName: 'Loading...',
        status: 'DRAFT',
        notes: ''
    });

    const [items, setItems] = useState<QuotationItem[]>([]);
    const [saving, setSaving] = useState(false);
    const [services, setServices] = useState<any[]>([]);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [partners, setPartners] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);

    // Totals
    const subtotal = items.reduce((sum, item) => sum + Number(item.typingCharge || 0), 0);
    const totalGovFee = items.reduce((sum, item) => sum + Number(item.govFee || 0), 0);
    const totalTax = items.reduce((sum, item) => sum + Number(item.taxAmount || 0), 0);
    const grandTotal = subtotal + totalGovFee + totalTax;

    const isReadOnly = header.status === 'CONVERTED' || header.status === 'CANCELLED' || (header.status === 'ACCEPTED' && !currentUser?.role?.includes('ADMIN'));

    // Permission Checks
    const canApprove = currentUser && ['ADMIN', 'BRANCH_MANAGER', 'OWNER', 'SUPER_ADMIN'].includes(currentUser.role);

    useEffect(() => {
        const loadData = async () => {
            const [svcRes, ptrRes, sessRes] = await Promise.all([
                fetch('/api/work-types'),
                fetch('/api/partners'),
                fetch('/api/session')
            ]);

            if (svcRes.ok) setServices(await svcRes.json());
            if (ptrRes.ok) setPartners(await ptrRes.json());
            if (sessRes.ok) {
                const sess = await sessRes.json();
                setCurrentUser(sess.user);
                if (!quotationId) {
                    setHeader(prev => ({ ...prev, salespersonName: sess.user.username }));
                }
            }

            if (quotationId) {
                const qRes = await fetch(`/api/quotations/${quotationId}`);
                if (qRes.ok) {
                    const q = await qRes.json();
                    setHeader({
                        id: q.id,
                        quotationNo: q.quotationNo,
                        date: new Date(q.date).toISOString().split('T')[0],
                        validUntil: new Date(q.validUntil).toISOString().split('T')[0],
                        partnerId: q.partnerId,
                        partnerName: q.partner?.name || 'Unknown',
                        partnerPhone: q.partner?.phone,
                        beneficiaryName: q.beneficiaryName || '',
                        salespersonName: q.salesperson?.username || 'Unknown',
                        status: q.status,
                        notes: q.notes || '',
                        approvedBy: q.approvedBy?.username,
                        approvedAt: q.approvedAt
                    });
                    setItems(q.items.map((i: any) => ({
                        id: i.id,
                        workTypeId: i.workTypeId,
                        description: i.description,
                        govFee: Number(i.govFee),
                        typingCharge: Number(i.typingCharge),
                        taxRate: Number(i.taxRate),
                        taxAmount: Number(i.taxAmount),
                        total: Number(i.total),
                        isVatApplicable: i.isVatApplicable ?? true
                    })));
                } else if (qRes.status === 410) {
                    alert("This quotation has been deleted.");
                    onBack();
                }
            }
        };
        loadData();
    }, [quotationId]);

    const handleSearch = (term: string) => {
        setHeader(prev => ({ ...prev, partnerName: term }));
        if (term.length > 1) {
            const filtered = partners.filter(p => p.name.toLowerCase().includes(term.toLowerCase()));
            setSearchResults(filtered);
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    };

    const selectPartner = (p: any) => {
        setHeader(prev => ({
            ...prev,
            partnerId: p.id,
            partnerName: p.name,
            partnerPhone: p.phone,
            beneficiaryName: prev.beneficiaryName || p.name
        }));
        setShowResults(false);
    };

    const addItem = () => {
        setItems(prev => [...prev, {
            id: Math.random().toString(36),
            description: '',
            quantity: 1,
            govFee: 0,
            typingCharge: 0,
            taxRate: 5,
            taxAmount: 0,
            total: 0,
            isVatApplicable: true
        }]);
    };

    const updateItem = (id: string, field: keyof QuotationItem, value: any) => {
        if (isReadOnly) return;
        setItems(prev => prev.map(item => {
            if (item.id !== id) return item;

            const newItem = { ...item, [field]: value };

            if (field === 'description') {
                const svc = services.find(s => s.description === value || s.description === newItem.description);
                if (svc) {
                    newItem.workTypeId = svc.id;
                    newItem.govFee = Number(svc.presetGovFee);
                    newItem.typingCharge = Number(svc.presetTypingCharge);
                    newItem.taxRate = Number(svc.vatRate);
                }
            }

            // Recalc
            if (['govFee', 'typingCharge', 'taxRate', 'isVatApplicable'].includes(field as string) || field === 'description') {
                const gf = Number(newItem.govFee) || 0;
                const tc = Number(newItem.typingCharge) || 0;
                const rate = newItem.isVatApplicable ? (Number(newItem.taxRate) || 0) : 0;
                const tax = tc * (rate / 100);
                newItem.taxAmount = parseFloat(tax.toFixed(2));
                newItem.total = gf + tc + newItem.taxAmount;
            }

            return newItem;
        }));
    };

    const removeItem = (id: string) => {
        if (isReadOnly) return;
        setItems(prev => prev.filter(i => i.id !== id));
    };

    const handleSave = async (targetStatus?: string) => {
        if (!header.partnerName) return alert("Please select a customer");
        if (items.length === 0) return alert("Please add at least one item");

        setSaving(true);
        try {
            const payload = {
                header: {
                    ...header,
                    status: targetStatus || header.status
                },
                items
            };

            if (header.id) {
                if (targetStatus && targetStatus !== header.status) {
                    await fetch(`/api/quotations/${header.id}`, {
                        method: 'PATCH',
                        body: JSON.stringify({ action: 'UPDATE_STATUS', status: targetStatus })
                    });
                }
                setSaving(false);
                onBack();
                return;
            }

            const res = await fetch('/api/quotations', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const data = await res.json();
                if (targetStatus && targetStatus !== 'DRAFT') {
                    await fetch(`/api/quotations/${data.id}`, {
                        method: 'PATCH',
                        body: JSON.stringify({ action: 'UPDATE_STATUS', status: targetStatus })
                    });
                }
                onBack();
            } else {
                const err = await res.json();
                alert(err.error || "Failed to save");
            }
        } catch (error) {
            console.error(error);
            alert("Error saving quotation");
        }
        setSaving(false);
    };

    const handleApprove = async () => {
        if (!confirm("Approve this quotation? This will make it eligible for conversion.")) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/quotations/${header.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ action: 'APPROVE' })
            });
            if (res.ok) {
                const updated = await res.json();
                setHeader(prev => ({
                    ...prev,
                    status: updated.status,
                    approvedBy: currentUser?.username,
                    approvedAt: new Date().toISOString()
                }));
                alert("Quotation Approved!");
            } else {
                alert("Failed to approve");
            }
        } catch (e) { console.error(e); }
        setSaving(false);
    };

    const handleConvert = async () => {
        if (header.status !== 'ACCEPTED') return alert("Quotation must be ACCEPTED (Approved) before conversion.");

        if (!confirm("Are you sure you want to convert this quotation to an INVOICE?\n\n- Ledger entries will be created.\n- Invoice number will be generated.\n- Action is irreversible.")) return;

        setSaving(true);
        try {
            const res = await fetch(`/api/quotations/${header.id}/convert`, { method: 'POST', body: JSON.stringify({}) });
            if (res.ok) {
                alert("Quotation Converted Successfully!");
                onBack();
            } else {
                const err = await res.json();
                alert(err.error || "Conversion failed");
            }
        } catch (e) {
            console.error(e);
            alert("Error converting");
        }
        setSaving(false);
    };

    const handleDelete = async () => {
        if (!confirm("DELETE this quotation? This sends it to trash (recoverable by admin).")) return;
        setSaving(true);
        await fetch(`/api/quotations/${header.id}`, { method: 'DELETE' });
        setSaving(false);
        onBack();
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Header / Actions */}
            <div className="flex justify-between items-start">
                <div>
                    <button onClick={onBack} className="text-xs text-slate-500 hover:text-slate-900 mb-2">← Back to Grid</button>
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        {header.id ? `QUOTATION: ${header.quotationNo}` : 'NEW QUOTATION'}
                        {header.status && (
                            <span className={`text-[10px] px-2 py-1 rounded-full ${header.status === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-700' :
                                header.status === 'CONVERTED' ? 'bg-purple-100 text-purple-700' :
                                    header.status === 'DRAFT' ? 'bg-gray-100 text-gray-700' :
                                        'bg-blue-100 text-blue-700'
                                }`}>
                                {header.status}
                            </span>
                        )}
                    </h2>
                    {header.approvedBy && (
                        <div className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Approved by {header.approvedBy} on {new Date(header.approvedAt!).toLocaleDateString()}
                        </div>
                    )}
                </div>
                <div className="flex gap-2">
                    {!header.id && (
                        <>
                            <button onClick={() => handleSave('DRAFT')} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold text-slate-700 transition">
                                <Save className="w-4 h-4" /> Save Draft
                            </button>
                            <button onClick={() => handleSave('SENT')} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold transition shadow-sm">
                                <Send className="w-4 h-4" /> Save & Send
                            </button>
                        </>
                    )}

                    {header.id && (
                        <>
                            {header.status === 'DRAFT' && (
                                <button onClick={() => handleSave('SENT')} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold transition">
                                    <Send className="w-4 h-4" /> Mark Sent
                                </button>
                            )}

                            {/* APPROVE BUTTON (For Admins/Managers) */}
                            {header.status === 'SENT' && canApprove && (
                                <button onClick={handleApprove} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-bold transition shadow-sm">
                                    <ShieldCheck className="w-4 h-4" /> Approve
                                </button>
                            )}

                            {header.status === 'ACCEPTED' && (
                                <button onClick={handleConvert} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 font-bold transition shadow-sm" title="Convert to Invoice">
                                    <ArrowRightCircle className="w-4 h-4" /> Convert to Invoice
                                </button>
                            )}

                            {!isReadOnly && (
                                <button onClick={handleDelete} className="p-2 rounded-lg border border-rose-100 text-rose-600 hover:bg-rose-50" title="Delete Quote">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                        </>
                    )}
                    {header.id && (
                        <button className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50" title="Print">
                            <Printer className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Form Fields - Same as before ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="relative">
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1">Customer / Partner</label>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search Customer..."
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-semibold"
                            value={header.partnerName}
                            onChange={e => handleSearch(e.target.value)}
                            disabled={!!header.id}
                        />
                        {showResults && (
                            <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                                {searchResults.map(p => (
                                    <div key={p.id} className="p-3 hover:bg-slate-50 cursor-pointer border-b last:border-0" onClick={() => selectPartner(p)}>
                                        <div className="font-bold text-slate-800 text-sm">{p.name}</div>
                                        <div className="text-xs text-slate-500">{p.phone}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1">Beneficiary Name</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm font-semibold" value={header.beneficiaryName} onChange={e => setHeader(h => ({ ...h, beneficiaryName: e.target.value }))} disabled={!!header.id} />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                    <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm font-semibold" value={header.date} onChange={e => setHeader(h => ({ ...h, date: e.target.value }))} disabled={!!header.id} />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1">Valid Until</label>
                    <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm font-semibold" value={header.validUntil} onChange={e => setHeader(h => ({ ...h, validUntil: e.target.value }))} disabled={!!header.id} />
                </div>
            </div>

            {/* Items Grid */}
            <div>
                <table className="w-full">
                    <thead>
                        <tr className="text-xs font-bold text-slate-400 uppercase border-b text-left">
                            <th className="py-2 w-[30%]">Service / Description</th>
                            <th className="py-2 w-[8%] text-center">Qty</th>
                            <th className="py-2 w-[15%] text-right">Gov Fee</th>
                            <th className="py-2 w-[15%] text-right">Typing</th>
                            <th className="py-2 w-[5%] text-center">VAT?</th>
                            <th className="py-2 w-[10%] text-right">VAT</th>
                            <th className="py-2 w-[15%] text-right">Total</th>
                            <th className="py-2 w-[5%]"></th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {items.map((item, idx) => (
                            <tr key={item.id} className="border-b last:border-0 hover:bg-slate-50 group transition">
                                <td className="py-2 pr-2">
                                    <input type="text" list="services-list" className="w-full p-2 bg-transparent border border-transparent hover:border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-300 font-medium" placeholder="Select or type..." value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} disabled={isReadOnly} />
                                    <datalist id="services-list">{services.map(s => <option key={s.id} value={s.description} />)}</datalist>
                                </td>
                                <td className="py-2">
                                    <input type="number" min="1" className="w-full p-2 text-center bg-transparent border border-transparent hover:border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-300 font-mono" value={item.quantity} onChange={e => updateItem(item.id, 'quantity', e.target.value)} disabled={isReadOnly} />
                                </td>
                                <td className="py-2"><input type="number" className="w-full p-2 text-right bg-transparent border border-transparent hover:border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-300 font-mono" value={item.govFee === 0 ? '' : item.govFee} onChange={e => updateItem(item.id, 'govFee', e.target.value)} disabled={isReadOnly} /></td>
                                <td className="py-2"><input type="number" className="w-full p-2 text-right bg-transparent border border-transparent hover:border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-300 font-mono" value={item.typingCharge === 0 ? '' : item.typingCharge} onChange={e => updateItem(item.id, 'typingCharge', e.target.value)} disabled={isReadOnly} /></td>
                                <td className="py-2 text-center">
                                    <input type="checkbox" checked={item.isVatApplicable} onChange={e => updateItem(item.id, 'isVatApplicable', e.target.checked)} disabled={isReadOnly} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                </td>
                                <td className="py-2 text-right font-mono text-slate-500">{formatCurrency(item.taxAmount)}</td>
                                <td className="py-2 text-right font-bold font-mono text-slate-700">{formatCurrency(item.total)}</td>
                                <td className="py-2 text-center">
                                    {!isReadOnly && (<button onClick={() => removeItem(item.id)} className="p-1.5 text-slate-300 hover:text-rose-500 transition opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!isReadOnly && (<button onClick={addItem} className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition"><Plus className="w-4 h-4" /> Add Item</button>)}
            </div>

            <div className="flex justify-end pt-4 border-t">
                <div className="w-64 space-y-3">
                    <div className="flex justify-between text-sm text-slate-500"><span>Subtotal (Typing)</span><span>{formatCurrency(subtotal)}</span></div>
                    <div className="flex justify-between text-sm text-slate-500"><span>Total Govt Fees</span><span>{formatCurrency(totalGovFee)}</span></div>
                    <div className="flex justify-between text-sm text-slate-500"><span>Total VAT (5%)</span><span>{formatCurrency(totalTax)}</span></div>
                    <div className="flex justify-between text-lg font-black text-slate-900 pt-3 border-t"><span>Grand Total</span><span>{formatCurrency(grandTotal)}</span></div>
                </div>
            </div>

            <div className="pt-4 border-t">
                <label className="text-xs font-bold text-slate-500 uppercase mb-1">Notes / Terms</label>
                <textarea className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm min-h-[100px]" value={header.notes} onChange={e => setHeader(h => ({ ...h, notes: e.target.value }))} disabled={isReadOnly} placeholder="Additional terms..." />
            </div>
        </div>
    );
}
