import { DashboardClient } from "@/components/DashboardClient";

export default function DashboardPage() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900">Command Center</h2>
                    <p className="text-slate-500 font-medium">
                        Real-time operational intelligence and financial status.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Live System Feed</span>
                </div>
            </div>

            <DashboardClient />
        </div>
    );
}
