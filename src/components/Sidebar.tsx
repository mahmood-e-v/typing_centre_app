"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    TableProperties,
    Users,
    CreditCard,
    Settings,
    BarChart3,
    FileText,
    Shield,
    Banknote
} from "lucide-react";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Transactions",
        icon: TableProperties,
        href: "/transactions",
        color: "text-violet-500",
    },
    {
        label: "Beneficiaries",
        icon: Users,
        href: "/beneficiaries",
        color: "text-pink-700",
    },
    {
        label: "Accounts",
        icon: CreditCard,
        href: "/accounts",
        color: "text-orange-700",
    },
    {
        label: "Advance Payments",
        icon: Banknote,
        href: "/advances",
        color: "text-emerald-500",
    },
    {
        label: "Expenses",
        icon: FileText,
        href: "/expenses",
        color: "text-red-500",
    },
    {
        label: "Reports",
        icon: BarChart3,
        href: "/reports",
        color: "text-emerald-500",
    },
    {
        label: "Users",
        icon: Users,
        href: "/users",
        color: "text-indigo-500",
    },
    {
        label: "Roles & Permissions",
        icon: Shield,
        href: "/roles",
        color: "text-purple-500",
    },
    {
        label: "Admin",
        icon: Shield,
        href: "/admin",
        color: "text-amber-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <h1 className="text-2xl font-bold">
                        ServiceCenter<span className="text-primary italic">Pro</span>
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
