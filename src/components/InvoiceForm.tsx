"use client";

import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Save, Printer, UserPlus, Search, Edit2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils';
import TransactionGrid from './TransactionGrid';

interface InvoiceItem {
    id: string;
    service: string;
    particulars: string;
    quantity: number;
    govFee: number;
    typingCharge: number;
    tax: number;
    total: number;
    isGovtFeeExempt?: boolean;
    documentData?: {
        documentTypeId: string;
        expiryDate: string;
        documentNumber: string;
        reminderDays: number;
    };
}

interface InvoiceHeader {
    invoiceNo: string;
    date: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    companyName: string; // Linked Partner
    agentName: string;
    customerType?: 'WALKIN' | 'INDIVIDUAL' | 'COMPANY';
    customerId?: string;
}

export default function InvoiceForm() {
    // States at the top
    const [header, setHeader] = useState<InvoiceHeader>({
        invoiceNo: 'INV-NEW',
        date: new Date().toISOString().split('T')[0],
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        companyName: '',
        agentName: 'Loading...'
    });

    const [items, setItems] = useState<InvoiceItem[]>([]);

    const [payment, setPayment] = useState({
        discount: 0,
        paidAmount: 0,
        method: '',
        bankName: '',
        refNumber: '',
        govtFeeAccountId: '',
        govtFeeRef: '',
    });

    const [saving, setSaving] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [services, setServices] = useState<any[]>([]);
    const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
    const [partners, setPartners] = useState<any[]>([]);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [documentTypes, setDocumentTypes] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [refreshGrid, setRefreshGrid] = useState(0);

    // Search & Autocomplete
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<any>(null);

    const [showNewBeneficiary, setShowNewBeneficiary] = useState(false);
    const [newBenName, setNewBenName] = useState('');
    const [showNewCompany, setShowNewCompany] = useState(false);
    const [newCompanyName, setNewCompanyName] = useState('');
    const [showManageModal, setShowManageModal] = useState(false);
    const [manageType, setManageType] = useState<'BEN' | 'PTR'>('BEN');
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingItem, setEditingItem] = useState<{ id: string, name: string, type: 'BEN' | 'PTR' } | null>(null);

    // Derived Totals
    // Customer Types
    type CustomerType = 'WALKIN' | 'INDIVIDUAL' | 'COMPANY';
    const [customerType, setCustomerType] = useState<CustomerType>('WALKIN');

    // ... existing derived totals ...
    const govTotal = items.reduce((acc, item) => acc + (item.govFee * item.quantity), 0);
    const subtotal = items.reduce((acc, item) => acc + ((item.govFee + item.typingCharge) * item.quantity), 0);
    const taxTotal = items.reduce((acc, item) => acc + item.tax, 0);
    const grandTotal = (subtotal + taxTotal) - (payment.discount || 0);
    const balance = grandTotal - (payment.paidAmount || 0);

    // Effect to reset fields when type changes
    useEffect(() => {
        if (isLocked) return;

        setHeader(prev => ({
            ...prev,
            customerName: '',
            customerPhone: '',
            customerEmail: '',
            companyName: ''
        }));
        setSelectedPartner(null);
        setSearchQuery('');
        setSearchResults([]);
    }, [customerType]);

    // ... existing useEffects ...

    const fetchData = async () => {
        console.log("Starting Resilient Fetch...");

        // Helper to safely fetch
        const safeFetch = async (url: string, name: string) => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    console.error(`${name} fetch failed: ${res.status}`);
                    return [];
                }
                return await res.json();
            } catch (e) {
                console.error(`${name} fetch error:`, e);
                return [];
            }
        };

        const safeSession = async () => {
            try {
                const res = await fetch('/api/session');
                return res.ok ? await res.json() : null;
            } catch (e) { console.error("Session Error", e); return null; }
        };

        // Execute in parallel but safely
        const [svc, ben, ptr, acc, dtypes, usr] = await Promise.all([
            safeFetch('/api/work-types', 'Services'),
            safeFetch('/api/beneficiaries', 'Beneficiaries'),
            safeFetch('/api/partners', 'Partners'),
            safeFetch('/api/accounts', 'Accounts'),
            safeFetch('/api/document-types', 'Document Types'),
            safeSession()
        ]);

        console.log("Fetch Complete. Services:", svc.length, "Accounts:", acc.length);

        if (Array.isArray(svc)) setServices(svc);
        if (Array.isArray(ben)) setBeneficiaries(ben);
        if (Array.isArray(ptr)) setPartners(ptr);
        if (Array.isArray(acc)) setAccounts(acc);
        if (Array.isArray(dtypes)) setDocumentTypes(dtypes);

        if (usr && usr.user) {
            setCurrentUser(usr.user);
            setHeader(prev => ({ ...prev, agentName: usr.user.username }));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Restored Helper Functions
    const addItemRow = () => {
        const newRow: InvoiceItem = {
            id: Math.random().toString(36).substr(2, 9),
            service: '',
            particulars: header.customerName || '',
            quantity: 1,
            govFee: 0,
            typingCharge: 0,
            tax: 0,
            total: 0,
            isGovtFeeExempt: false
        };
        setItems(prev => [...prev, newRow]);
    };

    const deleteItemRow = (id: string) => {
        if (isLocked) return;
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
        if (isLocked) return;
        setItems(prev => prev.map(item => {
            if (item.id !== id) return item;

            // 1. Force numeric conversion
            let processedValue = value;
            if (['govFee', 'typingCharge', 'quantity'].includes(field)) {
                processedValue = parseFloat(value) || 0;
            }

            const updatedItem = { ...item };

            // 1. Generic Update (Skip special fields handled below if needed)
            if (field !== 'documentData') {
                // @ts-ignore
                updatedItem[field] = processedValue;
            }

            // Logic for Checkbox
            if (field === 'isGovtFeeExempt') {
                if (value === true) {
                    updatedItem.govFee = 0; // Clear Fee
                }
            }

            if (field === 'service') {
                const svc = services.find(s => s.description === value);
                if (svc) {
                    updatedItem.govFee = updatedItem.isGovtFeeExempt ? 0 : (Number(svc.presetGovFee) || 0);
                    updatedItem.typingCharge = Number(svc.presetTypingCharge) || 0;

                    // Trigger Expiry Tracking if Service allows
                    if (svc.tracksExpiry) {
                        updatedItem.documentData = {
                            documentTypeId: svc.defaultDocumentTypeId || '',
                            expiryDate: '',
                            documentNumber: '',
                            reminderDays: svc.defaultReminderDays || 30
                        };
                    } else {
                        delete updatedItem.documentData;
                    }
                }
            }

            // Document Data Update Logic - Merge with existing
            if (field === 'documentData' && typeof value === 'object') {
                updatedItem.documentData = {
                    ...(item.documentData || {}), // Use original item's data
                    ...value
                } as any;
            }

            // Enforce Exemption if Checked
            if (updatedItem.isGovtFeeExempt) {
                updatedItem.govFee = 0;
            }

            // Re-calculate derived fields
            const qty = Number(updatedItem.quantity) || 1;
            const labor = Number(updatedItem.typingCharge) || 0;
            const govt = Number(updatedItem.govFee) || 0;

            updatedItem.tax = (labor * qty) * 0.05;
            updatedItem.total = (govt * qty) + (labor * qty) + updatedItem.tax;

            return updatedItem;
        }));
    };

    // ... existing row functions ...

    // OPTIMIZED: Debounced Search to prevent DB Connection Exhaustion
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (customerType === 'WALKIN' || !searchQuery || searchQuery.length < 1) {
                setSearchResults([]);
                setShowResults(false);
                return;
            }

            setIsSearching(true);
            try {
                let url = `/api/customers/search?q=${encodeURIComponent(searchQuery)}`;

                if (customerType === 'COMPANY') {
                    if (selectedPartner) {
                        url += `&companyId=${selectedPartner.id}`;
                    }
                } else if (customerType === 'INDIVIDUAL') {
                    url += `&type=INDIVIDUAL`;
                }

                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    setSearchResults(data);
                    setShowResults(data.length > 0);
                }
            } catch (e) {
                console.error("Search failed", e);
            } finally {
                setIsSearching(false);
            }
        }, 600); // 600ms debounce

        return () => clearTimeout(timer);
    }, [searchQuery, customerType, selectedPartner]);

    const handleSearch = (val: string) => {
        if (isLocked) return;
        setHeader(prev => ({ ...prev, customerName: val }));
        setSearchQuery(val);
    };

    const handleSelectResult = (result: any) => {
        if (customerType === 'INDIVIDUAL') {
            // result is a Partner
            setHeader(prev => ({
                ...prev,
                customerName: result.name, // Partner Name
                customerPhone: result.phone || prev.customerPhone,
                customerEmail: result.email || prev.customerEmail,
                customerId: result.id, // Explicit ID
            }));
            setSelectedPartner(result); // The individual IS the partner
        } else if (customerType === 'COMPANY') {
            // result is a Beneficiary
            setHeader(prev => ({
                ...prev,
                customerName: result.name,
                customerPhone: result.phone || prev.customerPhone,
                customerEmail: result.email || prev.customerEmail,
                customerId: result.company?.id // The Partner ID is the Company
            }));
            if (result.company && !header.companyName) {
                setHeader(prev => ({ ...prev, companyName: result.company.name }));
                setSelectedPartner(result.company);
            }
        }


        setShowResults(false);
        setSearchQuery(result.name);
    };

    const handleCompanySelect = (name: string) => {
        if (isLocked) return;
        const partner = partners.find(p => p.name === name);
        setHeader(prev => ({ ...prev, companyName: name, customerId: partner?.id }));
        setSelectedPartner(partner);
    };

    const handleAddBeneficiary = async () => {
        if (!newBenName) return;

        const payload: any = { name: newBenName };
        if (customerType === 'COMPANY' && selectedPartner) {
            payload.partnerId = selectedPartner.id;
        }

        const res = await fetch('/api/beneficiaries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            fetchData();
            handleCustomerSelect(newBenName);
            setShowNewBeneficiary(false);
            setNewBenName('');
        }
    };

    const handleCustomerSelect = (name: string) => { // Needed by handleAddBeneficiary
        if (isLocked) return;
        setHeader(prev => ({ ...prev, customerName: name }));
    };

    const handleAddCompany = async () => {
        if (!newCompanyName) return;
        const res = await fetch('/api/partners', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newCompanyName, type: 'CORPORATE' })
        });
        if (res.ok) {
            fetchData();
            const partner = await res.json();
            setHeader(prev => ({ ...prev, companyName: partner.name, customerId: partner.id })); // Set ID explicitly
            setSelectedPartner(partner); // CRITICAL FIX: Select the object
            setShowNewCompany(false);
            setNewCompanyName('');
        }
    };

    const handleDeleteBeneficiary = async (id: string, name: string) => {
        const session = await (await fetch('/api/session')).json();
        if (session?.user?.role !== 'ADMIN') {
            toast.error("Only admins can delete customers.");
            return;
        }
        const input = prompt(`DELETE BENEFICIARY: ${name}\n\nType "DELETE ${name}" to confirm.`);
        if (input === `DELETE ${name}`) {
            const res = await fetch(`/api/beneficiaries?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Deleted successfully");
                fetchData();
            } else {
                const err = await res.json();
                toast.error(err.error || "Failed to delete");
            }
        }
    };

    const handleEditClick = (item: any, type: 'BEN' | 'PTR') => {
        setEditingItem({ id: item.id, name: item.name, type });
        setShowEditModal(true);
    };

    const handleUpdateItem = async () => {
        if (!editingItem || !editingItem.name) return;

        const endpoint = editingItem.type === 'BEN' ? '/api/beneficiaries' : '/api/partners';
        const res = await fetch(endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: editingItem.id, name: editingItem.name })
        });

        if (res.ok) {
            toast.success("Updated Successfully");
            fetchData();
            setShowEditModal(false);
            setEditingItem(null);
        } else {
            toast.error("Failed to update");
        }
    };

    const handleDeletePartner = async (id: string, name: string) => {
        const session = await (await fetch('/api/session')).json();
        if (session?.user?.role !== 'ADMIN') {
            toast.error("Only admins can delete companies.");
            return;
        }
        const input = prompt(`DELETE COMPANY: ${name}\n\nType "DELETE ${name}" to confirm.`);
        if (input === `DELETE ${name}`) {
            const res = await fetch(`/api/partners?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Deleted successfully");
                fetchData();
            } else {
                const err = await res.json();
                toast.error(err.error || "Failed to delete");
            }
        }
    };

    const handleBulkClear = async () => {
        const confirmCode = prompt('DANGER: This will clear ALL Beneficiaries and Companies. Type "CONFIRM CLEAR ALL" to proceed.');
        if (confirmCode === 'CONFIRM CLEAR ALL') {
            const res = await fetch('/api/partners?bulk=true', { method: 'DELETE' });
            if (res.ok) {
                toast.success("Data cleared");
                fetchData();
            }
        }
    };

    const handleLoadInvoice = async (id: string) => {
        if (!id) return;
        try {
            const res = await fetch(`/api/invoices?id=${id}`);
            if (res.ok) {
                const inv = await res.json();
                if (!inv) {
                    toast.error("Invoice not found");
                    return;
                }

                // Determine logic based on data
                // If partner type INDIVIDUAL -> Individual Mode
                // If partner type CORPORATE -> Company Mode
                // If no partner -> Walkin

                let loadedType: CustomerType = 'WALKIN';
                let loadedPartner = inv.partner;

                // Fetch full partner details if needed to check type? 
                // Assumes inv.partner is included in response

                if (inv.customerId) {
                    // Check type from search or passed object ? 
                    // Since we don't have full object here easily without lookup
                    // We can infer or default. 
                    // Ideally API should return Partner Type.
                }

                setHeader({
                    invoiceNo: inv.invoiceNo,
                    date: new Date(inv.date).toISOString().split('T')[0],
                    customerName: inv.customerName,
                    customerPhone: inv.customerPhone || '',
                    customerEmail: inv.customerEmail || '',
                    companyName: inv.partner?.name || '',
                    agentName: header.agentName,
                    customerId: inv.customerId,
                    customerType: 'WALKIN' // Default, will update below if logic allows
                });

                const loadedItems = inv.transactions.map((tx: any) => ({
                    id: tx.id,
                    service: tx.workType?.description || 'Custom Service',
                    particulars: tx.applicantName || '',
                    govFee: Number(tx.govFee),
                    typingCharge: Number(tx.typingCharge),
                    tax: Number(tx.vat),
                    total: Number(tx.total)
                }));
                setItems(loadedItems);

                setPayment({
                    discount: inv.discount,
                    paidAmount: inv.paidAmount,
                    method: inv.paymentMethod || 'CASH',
                    bankName: inv.bankName || '',
                    refNumber: inv.paymentRef || '',
                    govtFeeAccountId: inv.govtFeeAccountId || '',
                    govtFeeRef: inv.govtFeeRef || ''
                });

                setIsLocked(true);
            } else {
                toast.error("Invoice Not Found in Records");
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to load invoice");
        }
    };

    // ... existing handlers ...

    const handleSave = async () => {
        if (isLocked) return true;

        // 1. Strict Validation
        const errors: string[] = [];
        if (!header.customerName?.trim()) errors.push("Customer Name");
        if (customerType !== 'WALKIN' && !header.customerPhone?.trim()) errors.push("Mobile Number"); // Mandatory for tracked
        if (!header.date) errors.push("Invoice Date");
        if (payment.paidAmount > 0 && !payment.method) errors.push("Payment Method");

        // Walk-in MUST pay full
        if (customerType === 'WALKIN' && balance > 0) {
            errors.push("Walk-in customers cannot have pending dues. Full payment required.");
        }

        if (customerType === 'COMPANY' && !selectedPartner) {
            errors.push("Please select a Company.");
        }

        if (items.length === 0) errors.push("At least one item");

        const totalGovtFee = items.reduce((sum, item) => sum + (item.govFee || 0), 0);
        if (totalGovtFee > 0 && !payment.govtFeeAccountId) {
            errors.push("Govt Fee Payment Account Required (since Govt Fees > 0)");
        }

        if (errors.length > 0) {
            toast.error("CANNOT SAVE - Missing Information", { description: errors.join("\n• ") });
            return false;
        }

        setSaving(true);

        try {
            const processedItems = items.map(item => ({
                ...item,
                particulars: item.particulars || header.customerName
            }));

            const payload = {
                header: {
                    ...header,
                    agentId: currentUser?.id,
                    customerType: customerType, // SEND TYPE
                    customerId: selectedPartner?.id // Explicit Link
                },
                items: processedItems,
                payment: {
                    ...payment,
                    amount: payment.paidAmount,
                    balance: balance,
                    subtotal, tax: taxTotal, total: grandTotal,
                },
                financials: { subtotal, tax: taxTotal, total: grandTotal }
            };

            const res = await fetch('/api/invoices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const saved = await res.json();
                // ... same success logic ...
                toast.success(`Invoice ${saved.invoiceNo} Saved Successfully!`);
                setIsLocked(true);
                setHeader(prev => ({ ...prev, invoiceNo: saved.invoiceNo }));
                setRefreshGrid(prev => prev + 1);
                return true;
            } else {
                const err = await res.json();
                toast.error("Error: " + (err.error || "Failed to save"));
                return false;
            }
        } catch (e) {
            console.error(e);
            toast.error("Connection Error");
            return false;
        } finally {
            setSaving(false);
        }
    };

    // ... handleNewInvoice update ...
    const handleNewInvoice = () => {
        setIsLocked(false);
        setCustomerType('WALKIN'); // Reset to Walkin
        setItems([]);
        addItemRow();
        setHeader(prev => ({
            ...prev,
            invoiceNo: 'INV-NEW',
            date: new Date().toISOString().split('T')[0],
            customerName: '',
            customerPhone: '',
            customerEmail: '',
            companyName: '',
            customerId: undefined
        }));
        // ... rest of reset
        setSearchQuery('');
        setSelectedPartner(null);
        setPayment({
            discount: 0,
            paidAmount: 0,
            method: '',
            bankName: '',
            refNumber: '',
            govtFeeAccountId: '',
            govtFeeRef: '',
        });
    };

    return (
        <div className="flex flex-col gap-8 h-full bg-slate-50 p-6 min-h-screen">
            {/* Main Form Container */}
            <div className={`flex flex-col gap-4 invoice-container rounded-xl border shadow-sm ${isLocked ? 'pointer-events-none opacity-90' : ''}`}>
                <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
                    <div className="flex justify-between items-center border-b pb-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold text-rose-800">New Invoice</h2>
                            {!isLocked && (
                                <div className="flex bg-slate-100 p-1 rounded-lg gap-1 mt-1 no-print">
                                    <button
                                        onClick={() => setCustomerType('WALKIN')}
                                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${customerType === 'WALKIN' ? 'bg-white shadow text-rose-700' : 'text-slate-500 hover:text-slate-800'}`}
                                    >
                                        Walk-in
                                    </button>
                                    <button
                                        onClick={() => setCustomerType('INDIVIDUAL')}
                                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${customerType === 'INDIVIDUAL' ? 'bg-white shadow text-rose-700' : 'text-slate-500 hover:text-slate-800'}`}
                                    >
                                        Individual
                                    </button>
                                    <button
                                        onClick={() => setCustomerType('COMPANY')}
                                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${customerType === 'COMPANY' ? 'bg-white shadow text-rose-700' : 'text-slate-500 hover:text-slate-800'}`}
                                    >
                                        Company
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 no-print pointer-events-auto">
                            <button onClick={() => setShowManageModal(true)} className="bg-slate-200 text-slate-800 px-3 py-1 rounded text-xs font-bold hover:bg-slate-300 flex items-center gap-1">
                                <Search className="w-3 h-3" /> Manage Lists
                            </button>
                            <button onClick={handleNewInvoice} className="bg-blue-600 text-white px-4 py-1 rounded text-xs font-bold hover:bg-blue-700 flex items-center gap-1">
                                <Plus className="w-3 h-3" /> New Invoice
                            </button>
                        </div>
                        <div className="flex gap-8">
                            {/* ... same agent/inv info ... */}
                            <div>
                                <p className="text-xs text-slate-500 uppercase">Agent</p>
                                <p className="font-bold">{header.agentName}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500 uppercase">Invoice Code</p>
                                <p className="font-mono font-bold text-lg">{header.invoiceNo}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                            <input
                                type="date"
                                value={header.date}
                                onChange={e => setHeader({ ...header, date: e.target.value })}
                                className="w-full border rounded p-2 text-sm"
                                disabled={isLocked}
                            />
                        </div>

                        {/* DYNAMIC FIELDS START */}

                        {/* COMPANY FIELD - Only for COMPANY type */}
                        {customerType === 'COMPANY' && (
                            <div className="md:col-span-1">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company / Entity</label>
                                <div className="flex gap-2">
                                    <input
                                        list="partner-list"
                                        type="text"
                                        placeholder="Search Company..."
                                        className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-rose-200"
                                        value={header.companyName}
                                        onChange={e => handleCompanySelect(e.target.value)}
                                        disabled={isLocked}
                                    />
                                    <datalist id="partner-list">
                                        {partners.filter(p => p.type !== 'INDIVIDUAL').map(p => <option key={p.id} value={p.name} />)}
                                    </datalist>
                                    <button disabled={isLocked} onClick={() => setShowNewCompany(true)} className="p-2 bg-slate-200 hover:bg-slate-300 rounded text-slate-700 flex items-center justify-center no-print" title="Add New Company">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* CUSTOMER NAME FIELD - Variant depends on Type */}
                        <div className={`relative ${customerType === 'WALKIN' ? 'md:col-span-2' : 'md:col-span-1'}`}>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                {customerType === 'COMPANY' ? 'Employee / Customer Name' : 'Customer Name'}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder={customerType === 'WALKIN' ? "Enter Customer Name" : "Search..."}
                                        className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-rose-200"
                                        value={header.customerName}
                                        onChange={e => handleSearch(e.target.value)}
                                        onFocus={() => header.customerName.length > 0 && customerType !== 'WALKIN' && setShowResults(true)}
                                        disabled={isLocked}
                                    />
                                    {showResults && searchResults.length > 0 && (
                                        <div className="absolute z-[60] mt-1 w-full bg-white border rounded-lg shadow-2xl max-h-64 overflow-y-auto pointer-events-auto no-print">
                                            {searchResults.map(res => (
                                                <div
                                                    key={res.id}
                                                    onClick={() => handleSelectResult(res)}
                                                    className="p-3 hover:bg-slate-50 cursor-pointer border-b last:border-0 flex flex-col"
                                                >
                                                    <span className="font-bold text-slate-800">{res.name}</span>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <span className="text-[10px] text-slate-500 uppercase font-medium">
                                                            {res.email || res.phone || (res.company ? res.company.name : 'N/A')}
                                                        </span>
                                                        {/* Show Dues/Wallet if applicable */}
                                                        <div className="flex flex-col items-end">
                                                            {(res.liabilities || res.company?.liabilities || 0) > 0 && (
                                                                <span className="text-[10px] text-rose-600 font-bold">
                                                                    Due: {formatCurrency(res.liabilities || res.company?.liabilities || 0)}
                                                                </span>
                                                            )}
                                                            {(res.dues || res.company?.dues || 0) > 0.01 && (
                                                                <span className="text-[10px] text-emerald-600 font-bold">
                                                                    Wallet: {formatCurrency(res.dues || res.company?.dues || 0)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {customerType !== 'WALKIN' && (
                                    <button disabled={isLocked} onClick={() => setShowNewBeneficiary(true)} className="p-2 bg-slate-200 hover:bg-slate-300 rounded text-slate-700 flex items-center justify-center no-print" title={`Create New ${customerType === 'INDIVIDUAL' ? 'Individual' : 'Beneficiary'}`}>
                                        <Plus className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* PHONE NUMBER FIELD */}
                        <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                Mobile Number
                                {customerType !== 'WALKIN' && <span className="text-red-500">*</span>}
                            </label>
                            <input
                                type="text"
                                placeholder="050xxxxxxx"
                                className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-rose-200"
                                value={header.customerPhone}
                                onChange={e => setHeader({ ...header, customerPhone: e.target.value })}
                                disabled={isLocked}
                            />
                        </div>

                        {/* EMAIL FIELD */}
                        <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
                            </label>
                            <input
                                type="email"
                                placeholder="customer@example.com"
                                className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-rose-200"
                                value={header.customerEmail}
                                onChange={e => setHeader({ ...header, customerEmail: e.target.value })}
                                disabled={isLocked}
                            />
                        </div>

                        <div className="md:col-span-1 flex flex-col justify-center gap-2">
                            {selectedPartner && (
                                <>
                                    {/* Received from API: liabilities = Receivables, dues = Advances */}

                                    {/* 1. Show Pending Dues if any */}
                                    {(Number(selectedPartner.liabilities) || 0) > 0 && (
                                        <div className="bg-rose-50 p-2 rounded border border-rose-100">
                                            <p className="text-[10px] text-rose-500 uppercase font-bold tracking-wider">
                                                Outstanding Due
                                            </p>
                                            <p className="text-lg font-black text-rose-600">
                                                {formatCurrency(Number(selectedPartner.liabilities) || 0)}
                                            </p>
                                        </div>
                                    )}

                                    {/* 2. Show Wallet Balance if any */}
                                    {(Number(selectedPartner.dues) || 0) > 0.01 && (
                                        <div className="bg-emerald-50 p-2 rounded border border-emerald-100">
                                            <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-wider">
                                                Wallet Balance
                                            </p>
                                            <p className="text-lg font-black text-emerald-600">
                                                {formatCurrency(Number(selectedPartner.dues) || 0)}
                                            </p>
                                        </div>
                                    )}

                                    {/* 3. Show 'No Dues' only if neither exists */}
                                    {!(Number(selectedPartner.liabilities) > 0) && !(Number(selectedPartner.dues) > 0.01) && (
                                        <div className="bg-slate-50 p-2 rounded border border-slate-200 opacity-50">
                                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                                Balance
                                            </p>
                                            <p className="text-lg font-black text-slate-400">
                                                AED 0.00
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* DYNAMIC FIELDS END */}

                    </div>
                </div>

                {/* NOTE: Rest of the table and functionality is generic */}


                <datalist id="services-list">
                    {services.map(s => (
                        <option key={s.id} value={s.description}>
                            {s.description} | Govt: {s.presetGovFee} | Typing: {s.presetTypingCharge}
                        </option>
                    ))}
                </datalist>

                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-rose-900 text-white uppercase text-xs">
                            <tr>
                                <th className="p-3 text-left w-[50%]">Service Details</th>
                                <th className="p-3 text-center w-[8%]">Qty</th>
                                <th className="p-3 text-right w-[10%]">Govt Fee</th>
                                <th className="p-3 text-right w-[10%]">Typing</th>
                                <th className="p-3 text-right w-[8%]">VAT</th>
                                <th className="p-3 text-right w-[10%]">Total</th>
                                <th className="p-3 text-center w-[4%]"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={item.id} className="border-b last:border-0 hover:bg-rose-50/30 transition-colors">
                                    <td className="p-3">
                                        <input
                                            list="services-list"
                                            type="text"
                                            placeholder="Select Transaction Type"
                                            className="w-full bg-transparent outline-none font-medium text-slate-700 placeholder:text-slate-300"
                                            value={item.service}
                                            onChange={e => updateItem(item.id, 'service', e.target.value)}
                                            disabled={isLocked}
                                        />
                                        {/* EXPIRY SECTION */}
                                        {item.documentData && (
                                            <div className="mt-2 text-xs flex flex-wrap items-center gap-2 animate-in slide-in-from-top-2 p-2 bg-blue-50/50 rounded border border-blue-100">
                                                <span className="font-bold text-blue-600 uppercase tracking-wider text-[10px] whitespace-nowrap">Document Expiry</span>
                                                <select
                                                    className="border rounded p-1 bg-white outline-none focus:ring-2 focus:ring-blue-100 h-8"
                                                    value={item.documentData.documentTypeId}
                                                    onChange={e => updateItem(item.id, 'documentData', { documentTypeId: e.target.value })}
                                                    disabled={isLocked}
                                                >
                                                    <option value="">Select Type</option>
                                                    {documentTypes.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                                </select>
                                                <input
                                                    type="date"
                                                    className="border rounded p-1 outline-none focus:ring-2 focus:ring-blue-100 h-8"
                                                    value={item.documentData.expiryDate ? new Date(item.documentData.expiryDate).toISOString().split('T')[0] : ''}
                                                    onChange={e => updateItem(item.id, 'documentData', { expiryDate: e.target.value })}
                                                    disabled={isLocked}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Doc No. (Opt)"
                                                    className="border rounded p-1 w-32 outline-none focus:ring-2 focus:ring-blue-100 h-8"
                                                    value={item.documentData.documentNumber || ''}
                                                    onChange={e => updateItem(item.id, 'documentData', { documentNumber: e.target.value })}
                                                    disabled={isLocked}
                                                />
                                            </div>
                                        )}
                                    </td>

                                    <td className="p-3">
                                        <input
                                            type="number"
                                            min="1"
                                            className="w-full text-center bg-transparent outline-none font-mono text-slate-600 focus:bg-white focus:ring-2 focus:ring-rose-100 rounded"
                                            value={item.quantity}
                                            onChange={e => updateItem(item.id, 'quantity', e.target.value)}
                                            disabled={isLocked}
                                        />
                                    </td>
                                    <td className="p-3 relative group">
                                        <input
                                            type="number"
                                            className={`w-full text-right bg-transparent outline-none font-mono ${item.govFee === 0 ? 'text-slate-300' : 'text-slate-600'} ${item.isGovtFeeExempt ? 'line-through opacity-50' : ''}`}
                                            value={item.govFee === 0 ? '' : item.govFee}
                                            onChange={e => updateItem(item.id, 'govFee', e.target.value)}
                                            disabled={isLocked || item.isGovtFeeExempt}
                                        />
                                        {/* Checkbox for Exemption */}
                                        {!isLocked && (
                                            <div className="absolute -top-1 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm border rounded px-1 flex items-center gap-1 text-[9px] pointer-events-auto">
                                                <input
                                                    type="checkbox"
                                                    checked={item.isGovtFeeExempt || false}
                                                    onChange={(e) => updateItem(item.id, 'isGovtFeeExempt', e.target.checked)}
                                                />
                                                <span>Exempt</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-3">
                                        <input
                                            type="number"
                                            className={`w-full text-right bg-transparent outline-none font-mono ${item.typingCharge === 0 ? 'text-slate-300' : 'text-slate-600'}`}
                                            value={item.typingCharge === 0 ? '' : item.typingCharge}
                                            onChange={e => updateItem(item.id, 'typingCharge', e.target.value)}
                                            disabled={isLocked}
                                        />
                                    </td>
                                    <td className="p-3 text-right font-mono text-slate-500 text-sm">
                                        {formatCurrency(item.tax)}
                                    </td>
                                    <td className="p-3 text-right font-bold font-mono text-slate-800 text-sm">
                                        {formatCurrency(item.total)}
                                    </td>
                                    <td className="p-3 text-center">
                                        {!isLocked && (
                                            <button onClick={() => deleteItemRow(item.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            <tr className="no-print">
                                <td colSpan={8} className="px-4 py-3 bg-slate-50">
                                    <button onClick={addItemRow} className="flex items-center gap-1 text-rose-700 font-bold text-xs hover:underline" disabled={isLocked}><Plus className="w-4 h-4" /> Add Item</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg border">
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded border">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Payment Method</label>
                            <div className="flex gap-4 mb-2 flex-wrap">
                                {['CASH', 'CARD', 'ONLINE', 'WALLET'].map(m => {
                                    const isWallet = m === 'WALLET';
                                    // API returns positive value for Account 2010 (Liability/Advance) if Customer has balance
                                    const walletBalance = selectedPartner?.dues || 0;
                                    const isDisabled = isWallet && (walletBalance <= 0.01 || customerType === 'WALKIN');

                                    return (
                                        <label key={m} className={`flex items-center gap-2 text-sm cursor-pointer ${isDisabled ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}>
                                            <input
                                                type="radio"
                                                value={m}
                                                name="paymethod"
                                                checked={payment.method === m}
                                                onChange={() => setPayment({ ...payment, method: m })}
                                                disabled={isLocked || isDisabled}
                                            />
                                            {m} {isWallet && walletBalance > 0 && <span className="text-xs font-bold text-emerald-600">({formatCurrency(walletBalance)})</span>}
                                        </label>
                                    );
                                })}
                            </div>
                            {payment.method === 'CARD' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                    <input placeholder="Bank Name" className="border p-1 text-sm rounded" value={payment.bankName} onChange={e => setPayment({ ...payment, bankName: e.target.value })} disabled={isLocked} />
                                    <input placeholder="Approval Code" className="border p-1 text-sm rounded" value={payment.refNumber} onChange={e => setPayment({ ...payment, refNumber: e.target.value })} disabled={isLocked} />
                                </div>
                            )}
                            {payment.method === 'ONLINE' && (
                                <div className="mt-2">
                                    <input placeholder="Transaction ID" className="w-full border p-1 text-sm rounded" value={payment.refNumber} onChange={e => setPayment({ ...payment, refNumber: e.target.value })} disabled={isLocked} />
                                </div>
                            )}
                            {payment.method === 'WALLET' && (
                                <div className="mt-2 text-xs text-slate-500 bg-emerald-50 p-2 rounded border border-emerald-100 italic">
                                    Deducting from Customer Advance Balance.
                                </div>
                            )}
                        </div>

                        <div className="no-print space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Remarks</label>
                                <textarea className="w-full border rounded p-2 text-sm h-16" placeholder="Notes..." disabled={isLocked}></textarea>
                            </div>

                            <div className="p-4 bg-orange-50 rounded border border-orange-100">
                                <label className="block text-xs font-bold text-orange-800 uppercase mb-2">Govt Fee Payment (Outflow)</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-[10px] text-slate-500 uppercase">Paid From</label>
                                        <select
                                            className="w-full border rounded p-2 text-sm bg-white"
                                            value={payment.govtFeeAccountId || ''}
                                            onChange={e => setPayment({ ...payment, govtFeeAccountId: e.target.value })}
                                            disabled={isLocked}
                                        >
                                            <option value="">Select Account/Card...</option>
                                            {accounts.map(a => <option key={a.id} value={a.id}>{a.name} ({a.type})</option>)}
                                        </select>

                                        {/* Display Available Credit for selected Card */}
                                        {(() => {
                                            const selAcc = accounts.find(a => a.id === payment.govtFeeAccountId);
                                            const card = selAcc?.businessCards?.[0]; // Access the first linked card

                                            // Only show for Credit Cards with a limit
                                            if (card && card.type === 'CREDIT' && card.creditLimit) {
                                                const limit = parseFloat(card.creditLimit);
                                                const balance = parseFloat(selAcc.balance);
                                                // Available = Limit + Balance (e.g. 5000 + (-100) = 4900)
                                                const available = limit + balance;

                                                return (
                                                    <div className="mt-1 flex justify-between items-center text-[10px] font-bold px-1">
                                                        <span className="text-slate-500">Available:</span>
                                                        <span className={available < 0 ? 'text-red-600' : 'text-emerald-700'}>
                                                            {available.toLocaleString(undefined, { minimumFractionDigits: 2 })} AED
                                                        </span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })()}
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-slate-500 uppercase">Ref / Auth Code</label>
                                        <input
                                            className="w-full border rounded p-2 text-sm bg-white"
                                            placeholder="Govt Trans ID..."
                                            value={payment.govtFeeRef || ''}
                                            onChange={e => setPayment({ ...payment, govtFeeRef: e.target.value })}
                                            disabled={isLocked}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 border-b">
                            <span>Subtotal (Govt + Typing)</span>
                            <span className="font-medium">{Number(subtotal).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between p-2 border-b">
                            <span>Tax (VAT 5%)</span>
                            <span className="font-medium">{Number(taxTotal).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between p-2 border-b text-rose-700 items-center">
                            <span>Discount</span>
                            <input type="number" className="w-20 text-right border rounded p-1" value={payment.discount} onChange={e => setPayment({ ...payment, discount: parseFloat(e.target.value) || 0 })} disabled={isLocked} />
                        </div>
                        <div className="flex justify-between p-2 pt-4 text-xl font-bold">
                            <span>Grand Total</span>
                            <span>{Number(grandTotal).toFixed(2)}</span>
                        </div>
                        <div className="bg-emerald-50 p-2 rounded border border-emerald-100 space-y-2">
                            <div className="flex justify-between items-center text-emerald-800 font-bold">
                                <span>Paid Amount</span>
                                <div className="flex flex-col items-end gap-1">
                                    <input type="number" className="w-32 text-right border rounded p-1 bg-white text-lg" value={payment.paidAmount} onChange={e => setPayment({ ...payment, paidAmount: parseFloat(e.target.value) || 0 })} disabled={isLocked} />
                                </div>
                            </div>
                            <div className="flex justify-between text-red-600 font-bold text-sm">
                                <span>Balance</span>
                                <span>{Number(balance).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden print:flex justify-between mt-12 pt-8 border-t">
                    <div className="text-center">
                        <p className="font-bold border-t px-8 py-2">Customer Signature</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold border-t px-8 py-2">Accountant: {currentUser?.username || 'Admin'}</p>
                    </div>
                </div>

                <div className="flex gap-4 justify-end no-print pointer-events-auto p-4 border-t bg-slate-50">
                    <button onClick={handleNewInvoice} className="px-4 py-2 border rounded hover:bg-white bg-white">Clear / New</button>
                    {/* NEW / UNLOCKED: Show Save & Print */}
                    {!isLocked && (
                        <>
                            <button
                                onClick={() => handleSave()}
                                disabled={saving}
                                className={`bg-rose-600 text-white px-8 py-2 rounded font-bold shadow-sm transition-all ${saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-rose-700'}`}
                            >
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                onClick={async () => {
                                    const success = await handleSave();
                                    if (success) {
                                        setTimeout(window.print, 500);
                                    }
                                }}
                                disabled={saving}
                                className={`bg-slate-800 text-white px-8 py-2 rounded font-bold shadow-sm flex items-center gap-2 transition-all ${saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-700'}`}
                            >
                                <Printer className="w-4 h-4" /> {saving ? 'Processing...' : 'Save & Print'}
                            </button>
                        </>
                    )}

                    {/* LOCKED RECORD: Show Print + Restricted Edit */}
                    {isLocked && (
                        <>
                            <button onClick={() => window.print()} className="bg-slate-800 text-white px-8 py-2 rounded font-bold hover:bg-slate-700 shadow-sm flex items-center gap-2">
                                <Printer className="w-4 h-4" /> Print Invoice
                            </button>

                            {['ADMIN', 'BRANCH_MANAGER', 'OWNER', 'SUPER_ADMIN'].includes(currentUser?.role) ? (
                                <button
                                    onClick={() => {
                                        if (confirm("WARNING: You are about to unlock a saved invoice. Changes will affect financial records. Continue to Unlock?")) {
                                            const code = prompt("Type 'UNLOCK' to confirm access:");
                                            if (code === 'UNLOCK') {
                                                setIsLocked(false);
                                            } else {
                                                toast.error("Incorrect code. Access Denied.");
                                            }
                                        }
                                    }}
                                    className="bg-amber-500 text-white px-4 py-2 rounded text-xs font-bold hover:bg-amber-600"
                                >
                                    Admin/Manager: Unlock to Edit
                                </button>
                            ) : (
                                <p className="text-[10px] text-slate-400 font-medium italic italic self-center">Locked: Admin/Manager access required to edit</p>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* History Section */}
            <div className="h-[600px] bg-white rounded-xl shadow-sm border p-4 no-print">
                <h3 className="text-lg font-bold mb-4">Transaction History</h3>
                <TransactionGrid key={refreshGrid} onEdit={handleLoadInvoice} />
            </div>

            {/* New Beneficiary Modal */}
            {showNewBeneficiary && (
                <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm no-print">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                        <h3 className="font-bold text-lg mb-4">Add New Customer</h3>
                        <input
                            autoFocus
                            className="w-full border p-2 rounded mb-4"
                            placeholder="Customer Name"
                            value={newBenName}
                            onChange={e => setNewBenName(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowNewBeneficiary(false)} className="px-4 py-2 text-slate-500">Cancel</button>
                            <button onClick={handleAddBeneficiary} className="px-4 py-2 bg-rose-600 text-white rounded font-bold">Add</button>
                        </div>
                    </div>
                </div>
            )}

            {/* New Company Modal */}
            {showNewCompany && (
                <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm no-print">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                        <h3 className="font-bold text-lg mb-4">Add New Company</h3>
                        <input
                            autoFocus
                            className="w-full border p-2 rounded mb-4"
                            placeholder="Company Name"
                            value={newCompanyName}
                            onChange={e => setNewCompanyName(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowNewCompany(false)} className="px-4 py-2 text-slate-500">Cancel</button>
                            <button onClick={handleAddCompany} className="px-4 py-2 bg-blue-600 text-white rounded font-bold">Add</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Manage Lists Modal */}
            {showManageModal && (
                <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm no-print">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b flex justify-between items-center bg-rose-900 text-white">
                            <h3 className="text-lg font-bold">Manage Beneficiaries & Companies</h3>
                            <button onClick={() => setShowManageModal(false)} className="p-1 hover:bg-white/20 rounded">✕</button>
                        </div>

                        <div className="flex border-b bg-slate-50">
                            <button
                                onClick={() => setManageType('BEN')}
                                className={`flex-1 py-3 text-sm font-bold ${manageType === 'BEN' ? 'bg-white border-b-2 border-rose-600 text-rose-600' : 'text-slate-500'}`}
                            >
                                Customers / Beneficiaries
                            </button>
                            <button
                                onClick={() => setManageType('PTR')}
                                className={`flex-1 py-3 text-sm font-bold ${manageType === 'PTR' ? 'bg-white border-b-2 border-rose-600 text-rose-600' : 'text-slate-500'}`}
                            >
                                Companies / Partners
                            </button>
                        </div>

                        <div className="bg-slate-50 px-4 py-2 border-b flex justify-end">
                            <a href="/beneficiaries" target="_blank" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                Open Full Management Page <Edit2 className="w-3 h-3" />
                            </a>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            <table className="w-full text-sm">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Name</th>
                                        {manageType === 'PTR' && <th className="px-4 py-2 text-right">Liability</th>}
                                        <th className="px-4 py-2 text-center w-24">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {manageType === 'BEN' ? (
                                        beneficiaries.map(b => (
                                            <tr key={b.id} className="hover:bg-slate-50">
                                                <td className="px-4 py-3">{b.name}</td>
                                                <td className="px-4 py-3 text-center flex justify-center gap-2">
                                                    <button onClick={() => handleEditClick(b, 'BEN')} className="text-blue-500 hover:text-blue-700">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDeleteBeneficiary(b.id, b.name)} className="text-red-500 hover:text-red-700">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        partners.map(p => (
                                            <tr key={p.id} className="hover:bg-slate-50">
                                                <td className="px-4 py-3">{p.name}</td>
                                                <td className="px-4 py-3 text-right">{p.liabilities?.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-center flex justify-center gap-2">
                                                    <button onClick={() => handleEditClick(p, 'PTR')} className="text-blue-500 hover:text-blue-700">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDeletePartner(p.id, p.name)} className="text-red-500 hover:text-red-700">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Edit Modal */}
                        {showEditModal && editingItem && (
                            <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center p-6">
                                <h3 className="font-bold text-lg mb-4">Edit {editingItem.type === 'BEN' ? 'Customer' : 'Company'} Name</h3>
                                <input
                                    className="w-full max-w-sm border p-2 rounded mb-4"
                                    value={editingItem.name}
                                    onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                                />
                                <div className="flex gap-2">
                                    <button onClick={() => setShowEditModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                                    <button onClick={handleUpdateItem} className="px-4 py-2 bg-blue-600 text-white rounded font-bold">Save Changes</button>
                                </div>
                            </div>
                        )}

                        <div className="p-4 border-t bg-slate-50 flex justify-between">
                            <button
                                onClick={handleBulkClear}
                                className="text-xs text-red-600 hover:underline font-bold"
                            >
                                Reset / Clear All Lists
                            </button>
                            <button
                                onClick={() => setShowManageModal(false)}
                                className="bg-slate-800 text-white px-6 py-2 rounded text-sm font-bold"
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
