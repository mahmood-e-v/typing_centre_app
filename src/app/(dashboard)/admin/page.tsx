"use client";

import { useEffect, useState } from "react";
import { Users, Shield, Activity, TrendingUp } from "lucide-react";

export default function AdminPage() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeSessions: 0,
        todayTransactions: 0,
        systemHealth: "Optimal",
    });

    useEffect(() => {
        // In a real app, fetch these stats from an API
        setStats({
            totalUsers: 5,
            activeSessions: 2,
            todayTransactions: 124,
            systemHealth: "Optimal",
        });
    }, []);

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Admin Overview</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-500" },
                    { label: "Active Sessions", value: stats.activeSessions, icon: Activity, color: "text-emerald-500" },
                    { label: "Today's Transactions", value: stats.todayTransactions, icon: TrendingUp, color: "text-violet-500" },
                    { label: "System Health", value: stats.systemHealth, icon: Shield, color: "text-sky-500" },
                ].map((item, i) => (
                    <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between space-x-4">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                                <p className="text-2xl font-bold">{item.value}</p>
                            </div>
                            <item.icon className={`h-8 w-8 ${item.color}`} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Recent System Logs</h3>
                    <div className="space-y-4">
                        {[
                            "User 'admin' logged in from 192.168.1.1",
                            "Database backup completed successfully",
                            "New user 'staff1' created by admin",
                            "Transaction record #1045 updated",
                        ].map((log, i) => (
                            <div key={i} className="flex items-center text-sm">
                                <div className="w-2 h-2 rounded-full bg-sky-500 mr-3" />
                                <span className="text-zinc-400">{new Date().toLocaleTimeString()}</span>
                                <span className="ml-4">{log}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-3 rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-2">
                        <button className="flex items-center p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-sm">
                            <Users className="w-4 h-4 mr-3" />
                            Manage Users
                        </button>
                        <button className="flex items-center p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-sm">
                            <Shield className="w-4 h-4 mr-3" />
                            Security Settings
                        </button>
                        <button className="flex items-center p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-sm">
                            <Activity className="w-4 h-4 mr-3" />
                            System Audit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
