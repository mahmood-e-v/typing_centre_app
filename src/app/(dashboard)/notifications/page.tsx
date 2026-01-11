
"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Calendar, Clock, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

interface NotificationDoc {
    id: string;
    type: string;
    number: string;
    expiryDate: string;
    daysRemaining: number;
    status: 'EXPIRED' | 'EXPIRING_SOON';
    ownerName: string;
    phone: string;
    email: string;
}

import { NotificationModal } from "@/components/NotificationModal";
import { MessageCircle, Mail } from "lucide-react";

export default function NotificationsPage() {
    const [docs, setDocs] = useState<NotificationDoc[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'WHATSAPP' | 'EMAIL'>('WHATSAPP');
    const [selectedDoc, setSelectedDoc] = useState<{ doc: NotificationDoc, contact: string } | null>(null);

    useEffect(() => {
        fetch('/api/notifications/documents?days=30', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                if (data.documents) setDocs(data.documents);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const openAction = (doc: NotificationDoc, type: 'WHATSAPP' | 'EMAIL') => {
        const contact = type === 'WHATSAPP' ? doc.phone : doc.email;

        if (!contact || contact === 'N/A' || contact.length < 5) {
            alert(`No valid ${type === 'WHATSAPP' ? 'Phone Number' : 'Email Address'} available for this customer.`);
            return;
        }

        setSelectedDoc({ doc, contact });
        setModalType(type);
        setModalOpen(true);
    };

    const expiredCount = docs.filter(d => d.status === 'EXPIRED').length;
    const upcomingCount = docs.length - expiredCount;

    if (loading) return <div className="p-8 text-center animate-pulse">Loading notifications...</div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Modal */}
            {selectedDoc && (
                <NotificationModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    type={modalType}
                    data={{
                        customerName: selectedDoc.doc.ownerName,
                        contact: selectedDoc.contact,
                        docType: selectedDoc.doc.type,
                        docNumber: selectedDoc.doc.number,
                        expiryDate: selectedDoc.doc.expiryDate
                    }}
                />
            )}

            {/* Header Stats */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Notifications</h1>
                    <p className="text-slate-500 font-medium">Document expiry alerts and renewals</p>
                </div>

                <div className="flex gap-3">
                    <div className="bg-rose-50 border border-rose-100 px-4 py-2 rounded-xl flex items-center gap-3">
                        <div className="bg-rose-100 p-2 rounded-lg text-rose-600">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-rose-400 uppercase">Expired</p>
                            <p className="text-xl font-black text-rose-700">{expiredCount}</p>
                        </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 px-4 py-2 rounded-xl flex items-center gap-3">
                        <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-amber-400 uppercase">Expiring Soon</p>
                            <p className="text-xl font-black text-amber-700">{upcomingCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Customer / Beneficiary</th>
                                <th className="px-6 py-4">Document Type</th>
                                <th className="px-6 py-4 text-center">Expiry Date</th>
                                <th className="px-6 py-4 text-center">Days Remaining</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {docs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                                        No upcoming expiries found.
                                    </td>
                                </tr>
                            ) : (
                                docs.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            {doc.status === 'EXPIRED' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                                                    EXPIRED
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                                                    EXPIRING
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-900">{doc.ownerName}</p>
                                            <div className="flex flex-col gap-0.5 mt-1">
                                                <span className="text-xs text-slate-500 font-mono">{doc.phone}</span>
                                                {doc.email && doc.email !== 'N/A' && (
                                                    <span className="text-[10px] text-slate-400">{doc.email}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                                <FileText className="w-3 h-3 text-slate-400" />
                                                {doc.type}
                                            </p>
                                            {doc.number && <p className="text-[10px] text-slate-400 font-mono ml-5">{doc.number}</p>}
                                        </td>
                                        <td className="px-6 py-4 text-center font-mono text-sm text-slate-600">
                                            {new Date(doc.expiryDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`font-bold font-mono ${doc.daysRemaining < 0 ? 'text-rose-600' : 'text-amber-600'}`}>
                                                {doc.daysRemaining} Days
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                                            <button
                                                onClick={() => openAction(doc, 'WHATSAPP')}
                                                className="w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-colors"
                                                title="Send WhatsApp"
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => openAction(doc, 'EMAIL')}
                                                className="w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors"
                                                title="Send Email"
                                            >
                                                <Mail className="w-4 h-4" />
                                            </button>
                                            <Link href={`/dashboard?customer=${encodeURIComponent(doc.ownerName)}`} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-all">
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
