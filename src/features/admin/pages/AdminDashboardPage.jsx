import {
  AdminKpiStats,
  AdminGrowthChartCard,
  AdminNotificationsCard,
  AdminQuickActionsCard,
} from "../components";
import { useAdminDashboard, useRefreshAdminDashboard } from "@/hooks/admin";
import { RefreshCw } from "lucide-react";

export const AdminDashboardPage = () => {
  const { kpis, queriesGrowth, totalQueriesReceived, loading, refetch } = useAdminDashboard();
  const { mutate: refreshDashboard, isPending: isRefreshing } = useRefreshAdminDashboard({
    onSuccess: () => refetch(),
  });

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-8">
      {/* 1. Welcome Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Welcome back, Admin</span>
            <span className="inline-block animate-wiggle">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage your platform, users, classes, and content from one place.
          </p>
        </div>
        <button
          type="button"
          onClick={() => refreshDashboard()}
          disabled={isRefreshing || loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-2xs disabled:opacity-50 self-start sm:self-auto cursor-pointer"
          title="Refresh Dashboard Data"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing || loading ? "animate-spin text-[#0080f6]" : "text-slate-500"}`} />
          <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>

      {/* 2. Top 3 KPI Cards */}
      <AdminKpiStats kpis={kpis} loading={loading} />

      {/* 3. Middle Section: Total Queries Received Chart & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
        <div className="lg:col-span-7">
          <AdminGrowthChartCard
            queriesGrowth={queriesGrowth}
            totalQueries={totalQueriesReceived}
            loading={loading}
            onRefresh={() => refreshDashboard()}
            isRefreshing={isRefreshing}
          />
        </div>
        <div className="lg:col-span-5">
          <AdminNotificationsCard />
        </div>
      </div>

      {/* 4. Bottom Quick Actions */}
      <AdminQuickActionsCard />
    </div>
  );
};

export default AdminDashboardPage;
