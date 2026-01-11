
"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Mail, X, Copy, ExternalLink, Send } from "lucide-react";

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'WHATSAPP' | 'EMAIL';
    data: {
        customerName: string;
        contact: string; // Phone or Email
        docType: string;
        docNumber: string;
        expiryDate: Date | string;
    };
}

export function NotificationModal({ isOpen, onClose, type, data }: NotificationModalProps) {
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState(""); // Only for Email

    // Generate Template on Open
    useEffect(() => {
        if (!isOpen) return;

        const dateStr = new Date(data.expiryDate).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        });

        if (type === 'WHATSAPP') {
            const template = `Dear ${data.customerName},\nThis is a gentle reminder that your ${data.docType} (No: ${data.docNumber || 'N/A'}) is expiring on ${dateStr}.\nPlease contact us to arrange for renewal.\n\nBest Regards,\nTyping Centre`;
            setMessage(template);
        } else {
            setSubject(`Document Renewal Reminder - ${data.docType}`);
            const template = `Dear ${data.customerName},\n\nWe hope this email finds you well.\n\nThis is a gentle reminder that your *${data.docType}* (Document No: ${data.docNumber || 'N/A'}) is set to expire on *${dateStr}*.\n\nWe recommend initiating the renewal process soon to avoid any fines or service interruptions.\n\nPlease feel free to contact us conveniently to proceed.\n\nBest Regards,\nService Team`;
            setMessage(template);
        }
    }, [isOpen, type, data]);

    // Generate URLs dynamically
    const getActionUrl = () => {
        if (type === 'WHATSAPP') {
            let phone = data.contact.replace(/\D/g, '');
            // Heuristic for UAE numbers: 05x -> 9715x
            if (phone.startsWith('05') && phone.length === 10) {
                phone = '971' + phone.substring(1);
            }
            const encodedMsg = encodeURIComponent(message);
            // Direct web link is better for desktop to avoid "Continue to Chat" landing page
            return `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMsg}`;
        } else {
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(message);
            return `mailto:${data.contact}?subject=${encodedSubject}&body=${encodedBody}`;
        }
    };

    const actionUrl = getActionUrl();



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${type === 'WHATSAPP' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                            {type === 'WHATSAPP' ? <MessageCircle className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">
                                Send {type === 'WHATSAPP' ? 'WhatsApp' : 'Email'}
                            </h3>
                            <p className="text-sm text-slate-500 font-medium">To: {data.contact}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    {type === 'EMAIL' && (
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subject</label>
                            <input
                                type="text"
                                className="w-full border rounded-lg p-3 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100 border-slate-200"
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Message Preview</label>
                        <textarea
                            rows={type === 'WHATSAPP' ? 6 : 10}
                            className="w-full border rounded-lg p-3 text-sm font-medium outline-none focus:ring-2 focus:ring-opacity-50 border-slate-200 resize-none font-sans"
                            style={{ borderColor: type === 'WHATSAPP' ? '#d1fae5' : '#dbeafe' }}
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    {/* Copy Button (Always Visible) */}
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(message);
                            alert("Message copied to clipboard!");
                        }}
                        className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
                        title="Copy Message"
                    >
                        <Copy className="h-5 w-5" />
                    </button>

                    {type === 'WHATSAPP' ? (
                        <button
                            onClick={() => { window.open(actionUrl, '_blank'); onClose(); }}
                            className="flex-1 px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg shadow-opacity-20 flex items-center justify-center gap-2 transition-transform active:scale-95 bg-[#25D366] shadow-emerald-500/20 hover:bg-[#128C7E]"
                        >
                            <Send className="w-4 h-4" />
                            Open WhatsApp
                        </button>
                    ) : (
                        <>
                            {/* Gmail Fallback for Web Users */}
                            <a
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.contact}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}
                                target="_blank"
                                onClick={onClose}
                                className="px-5 py-2.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl font-bold text-sm hover:bg-rose-100 transition-colors flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Gmail
                            </a>

                            {/* Standard Mail App */}
                            <a
                                href={actionUrl}
                                className="flex-1 px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg shadow-opacity-20 flex items-center justify-center gap-2 transition-transform active:scale-95 bg-blue-600 shadow-blue-500/20 hover:bg-blue-700"
                            >
                                <Send className="w-4 h-4" />
                                Mail App
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
