"use client";

import { useState, useEffect } from "react";
import { Shield, Users, Key, ChevronDown, ChevronUp, Search, Loader2 } from "lucide-react";

interface User {
    id: string;
    email: string;
    username: string;
    name: string;
}

interface Role {
    id: string;
    name: string;
    code: string;
    description: string;
    isSystem: boolean;
    permissionCount: number;
    userCount: number;
    permissions: Record<string, string[]>;
    users: User[];
}

export default function RolesPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedRoles, setExpandedRoles] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const res = await fetch("/api/roles");
            const data = await res.json();
            setRoles(data.roles || []);
        } catch (error) {
            console.error("Error fetching roles:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleRole = (roleId: string) => {
        const newExpanded = new Set(expandedRoles);
        if (newExpanded.has(roleId)) {
            newExpanded.delete(roleId);
        } else {
            newExpanded.add(roleId);
        }
        setExpandedRoles(newExpanded);
    };

    const filteredRoles = roles.filter(
        (role) =>
            role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleBadgeColor = (code: string) => {
        const colors: Record<string, string> = {
            SUPER_ADMIN: "bg-red-500/10 text-red-500 border-red-500/20",
            OWNER: "bg-purple-500/10 text-purple-500 border-purple-500/20",
            BRANCH_MANAGER: "bg-blue-500/10 text-blue-500 border-blue-500/20",
            ACCOUNTANT: "bg-green-500/10 text-green-500 border-green-500/20",
            CASHIER: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
            PRO_TYPIST: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
            AUDITOR: "bg-gray-500/10 text-gray-500 border-gray-500/20",
        };
        return colors[code] || "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
    };

    const getModuleIcon = (module: string) => {
        const icons: Record<string, string> = {
            customer: "👥",
            invoice: "📄",
            payment: "💰",
            ar: "📊",
            ap: "📈",
            expense: "💸",
            voucher: "🎫",
            vat: "🧾",
            report: "📊",
            ledger: "📖",
            dashboard: "📱",
            user: "👤",
            role: "🔐",
            company: "🏢",
            branch: "🏪",
            period: "📅",
            audit: "🔍",
            approval: "✅",
        };
        return icons[module] || "📋";
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Shield className="w-8 h-8 text-sky-500" />
                        Roles & Permissions
                    </h1>
                    <p className="text-zinc-400 mt-1">
                        View system roles and their access permissions
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="text-2xl font-bold text-sky-500">{roles.length}</div>
                        <div className="text-sm text-zinc-400">Total Roles</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="text-2xl font-bold text-green-500">
                            {roles.reduce((sum, r) => sum + r.userCount, 0)}
                        </div>
                        <div className="text-sm text-zinc-400">Total Users</div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search roles..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-zinc-600"
                />
            </div>

            {/* Roles Grid */}
            <div className="grid gap-4">
                {filteredRoles.map((role) => {
                    const isExpanded = expandedRoles.has(role.id);
                    return (
                        <div
                            key={role.id}
                            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
                        >
                            {/* Role Header */}
                            <div
                                className="p-6 cursor-pointer"
                                onClick={() => toggleRole(role.id)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold">{role.name}</h3>
                                            <span
                                                className={`px-2 py-1 rounded-lg text-xs font-medium border ${getRoleBadgeColor(
                                                    role.code
                                                )}`}
                                            >
                                                {role.code}
                                            </span>
                                            {role.isSystem && (
                                                <span className="px-2 py-1 rounded-lg text-xs font-medium bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
                                                    System Role
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-zinc-400 text-sm mb-4">
                                            {role.description}
                                        </p>
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Key className="w-4 h-4 text-sky-500" />
                                                <span className="text-zinc-400">
                                                    {role.permissionCount} permissions
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Users className="w-4 h-4 text-green-500" />
                                                <span className="text-zinc-400">
                                                    {role.userCount} users
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                        {isExpanded ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <div className="border-t border-white/10 p-6 bg-black/20">
                                    {/* Permissions by Module */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-zinc-300 mb-3">
                                            Permissions by Module
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {Object.entries(role.permissions).map(
                                                ([module, actions]) => (
                                                    <div
                                                        key={module}
                                                        className="bg-white/5 border border-white/10 rounded-lg p-3"
                                                    >
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-lg">
                                                                {getModuleIcon(module)}
                                                            </span>
                                                            <span className="font-medium text-sm capitalize">
                                                                {module}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {actions.map((action) => (
                                                                <span
                                                                    key={action}
                                                                    className="px-2 py-0.5 bg-sky-500/10 text-sky-400 rounded text-xs border border-sky-500/20"
                                                                >
                                                                    {action}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Users with this Role */}
                                    {role.users.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-zinc-300 mb-3">
                                                Users with this Role ({role.users.length})
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                                {role.users.map((user) => (
                                                    <div
                                                        key={user.id}
                                                        className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3"
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 font-semibold text-sm">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-medium text-sm truncate">
                                                                {user.name}
                                                            </div>
                                                            <div className="text-xs text-zinc-400 truncate">
                                                                {user.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {role.users.length === 0 && (
                                        <div className="text-center py-4 text-zinc-500 text-sm">
                                            No users assigned to this role
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {filteredRoles.length === 0 && (
                <div className="text-center py-12 text-zinc-500">
                    No roles found matching your search
                </div>
            )}
        </div>
    );
}
