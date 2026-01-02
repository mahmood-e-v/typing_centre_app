"use client";

import { useState, useEffect } from "react";
import { User, Lock, Shield, Loader2, X, MapPin } from "lucide-react";

interface UserFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    initialData?: any;
}

interface Role {
    id: string;
    name: string;
    code: string;
    description: string | null;
    isSystem?: boolean;
}

export default function UserForm({ onSuccess, onCancel, initialData }: UserFormProps) {
    const [username, setUsername] = useState(initialData?.username || "");
    const [email, setEmail] = useState(initialData?.email || "");
    const [password, setPassword] = useState("");
    const [selectedRoleId, setSelectedRoleId] = useState("");
    const [selectedBranchId, setSelectedBranchId] = useState(initialData?.branchId || "");
    const [roles, setRoles] = useState<Role[]>([]);
    const [branches, setBranches] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [error, setError] = useState("");

    const isEditing = !!initialData;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingData(true);
            try {
                // Fetch Roles
                const rolesRes = await fetch('/api/roles');
                if (rolesRes.ok) {
                    const rolesData = await rolesRes.json();
                    setRoles(rolesData.roles || []);
                }

                // Fetch Branches
                const branchesRes = await fetch('/api/branches');
                if (branchesRes.ok) {
                    const branchesData = await branchesRes.json();
                    setBranches(branchesData.branches || []);
                }
            } catch (err) {
                console.error("Error fetching form data:", err);
                setError("Failed to load roles or branches. Please try again.");
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchData();
    }, []);

    // Sync initial role if editing
    useEffect(() => {
        if (initialData && roles.length > 0) {
            // Find the user's role ID based on the initialData
            // initialData.userRoles might be an array of objects
            if (initialData.userRoles && initialData.userRoles.length > 0) {
                // Assuming the first role is the primary one for now, or matching by logic
                // The backend returns userRoles: { role: { ... } } or similar structure
                // Adjust based on specific initialData structure passed from parent
                // For now, let's look at how UserList passes data. Often it's the raw user object.
                // If getting from /api/users, structure is userRoles: [{ role: { name, code } }]
                // But we need the role ID. GET /api/users usually returns role ID or we need to find it.
                // Let's assume initialData might have 'role' (string code) or 'userRoles'.

                // If we have direct roleId link in DB (some systems do), otherwise via relation.
                // Let's check if we can find the role by code if ID isn't obvious, OR if initialData has it.
                // Ideally, we just check if any of the user's roles match loaded roles.
                const userRoleIds = initialData.userRoles.map((ur: any) => ur.roleId || ur.role?.id);
                const foundRole = roles.find(r => userRoleIds.includes(r.id));
                if (foundRole) {
                    setSelectedRoleId(foundRole.id);
                }
            } else if (initialData.role) {
                // Legacy or simple role string match?
                // If 'role' is a string like 'ADMIN', find that role in roles list
                const foundRole = roles.find(r => r.code === initialData.role || r.name === initialData.role);
                if (foundRole) setSelectedRoleId(foundRole.id);
            }
        }
    }, [initialData, roles]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const url = isEditing ? `/api/users/${initialData.id}` : "/api/users";
            const method = isEditing ? "PATCH" : "POST";

            const payload: any = {
                branchId: selectedBranchId,
                roleIds: [selectedRoleId],
                email: email
            };

            if (isEditing) {
                if (username !== initialData.username) payload.username = username;
                if (password) payload.password = password; // Only send if changed
                // Email is constantly updated via payload above
            } else {
                payload.username = username;
                payload.password = password;
            }

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                onSuccess();
            } else {
                const data = await res.json();
                setError(data.error || `Failed to ${isEditing ? 'update' : 'create'} user`);
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{isEditing ? "Edit User" : "Add New User"}</h3>
                <button onClick={onCancel} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Username</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                            placeholder="username"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                            placeholder="user@example.com"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Password {isEditing && <span className="text-xs font-normal text-zinc-500">(Leave blank to keep current)</span>}</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                            placeholder={isEditing ? "••••••••" : "••••••••"}
                            required={!isEditing}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <div className="relative">
                        <Shield className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                        {isLoadingData ? (
                            <div className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2 pl-10 pr-4 flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-sky-500" />
                                <span className="text-sm text-zinc-500">Loading roles...</span>
                            </div>
                        ) : (
                            <select
                                value={selectedRoleId}
                                onChange={(e) => setSelectedRoleId(e.target.value)}
                                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none"
                                required
                            >
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                        {role.description ? ` - ${role.description}` : ""}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Branch Assignment</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                        {isLoadingData ? (
                            <div className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2 pl-10 pr-4 flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-sky-500" />
                                <span className="text-sm text-zinc-500">Loading branches...</span>
                            </div>
                        ) : (
                            <select
                                value={selectedBranchId || ""}
                                onChange={(e) => setSelectedBranchId(e.target.value)}
                                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none"
                                required
                            >
                                <option value="">Select Branch</option>
                                {branches.map((branch) => (
                                    <option key={branch.id} value={branch.id}>
                                        {branch.name} ({branch.type})
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>

                {
                    error && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    )
                }

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isLoading || isLoadingData}
                        className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            isEditing ? "Update User" : "Create User"
                        )}
                    </button>
                </div>
            </form >
        </div >
    );
}
