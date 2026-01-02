"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Shield, User, Loader2, MoreVertical } from "lucide-react";
import UserForm from "@/components/UserForm";

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [openMenuUserId, setOpenMenuUserId] = useState<string | null>(null);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/users");
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users || []);
            }
        } catch (err) {
            console.error("Failed to fetch users");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setOpenMenuUserId(null);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    const handleEdit = (user: any) => {
        setEditingUser(user);
        setIsFormOpen(true);
        setOpenMenuUserId(null);
    };

    const handleAdd = () => {
        setEditingUser(null);
        setIsFormOpen(true);
    };

    const filteredUsers = users.filter((u) =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 space-y-6 p-8 pt-6 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
                    <p className="text-zinc-500 text-sm">Create and manage access for your team</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-xl transition flex items-center gap-2 shadow-lg shadow-sky-600/20"
                >
                    <Plus className="w-4 h-4" />
                    Add User
                </button>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search by username..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent pl-10 pr-4 py-2 outline-none text-sm"
                    />
                </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-zinc-500">User</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-zinc-500">Role</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-zinc-500">Branch</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-zinc-500">Joined</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-zinc-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center">
                                    <div className="flex justify-center flex-col items-center gap-2">
                                        <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
                                        <span className="text-zinc-500 text-sm">Loading users...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => {
                                const displayRole = user.userRoles?.[0]?.role?.name || user.role;
                                const isMenuOpen = openMenuUserId === user.id;

                                return (
                                    <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center">
                                                    <User className="w-5 h-5 text-sky-500" />
                                                </div>
                                                <span className="font-medium">{user.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${displayRole === 'ADMIN'
                                                ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                                                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                }`}>
                                                <Shield className="w-3 h-3" />
                                                {displayRole}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500 text-sm italic">
                                            {user.branch?.name || "-"}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500 text-sm">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenMenuUserId(isMenuOpen ? null : user.id);
                                                }}
                                                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
                                            >
                                                <MoreVertical className="w-4 h-4 text-zinc-400" />
                                            </button>

                                            {isMenuOpen && (
                                                <div className="absolute right-8 top-8 z-10 w-32 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl text-left overflow-hidden">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEdit(user);
                                                        }}
                                                        className="w-full px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition text-left"
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-lg">
                        <UserForm
                            initialData={editingUser}
                            onSuccess={() => {
                                setIsFormOpen(false);
                                fetchUsers();
                            }}
                            onCancel={() => setIsFormOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
