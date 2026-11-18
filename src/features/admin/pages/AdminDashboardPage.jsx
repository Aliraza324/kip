import {
  AdminKpiStats,
  AdminGrowthChartCard,
  AdminNotificationsCard,
  AdminQuickActionsCard,
} from "../components";
import { useAdminDashboard } from "@/hooks/admin";

export const AdminDashboardPage = () => {
  const { kpis, queriesGrowth, totalQueriesReceived, loading } = useAdminDashboard();

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-8">
      {/* 1. Welcome Greeting Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>Welcome back, Admin</span>
          <span className="inline-block animate-wiggle">👋</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Manage your platform, users, classes, and content from one place.
        </p>
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
