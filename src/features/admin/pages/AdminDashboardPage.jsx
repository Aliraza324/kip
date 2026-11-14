import {
  AdminKpiStats,
  AdminGrowthChartCard,
  AdminNotificationsCard,
  AdminQuickActionsCard,
} from "../components";
import { adminDashboardMock } from "@/mocks";

export const AdminDashboardPage = () => {
  const { greeting } = adminDashboardMock;

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-8">
      {/* 1. Welcome Greeting Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>{greeting.title}</span>
          <span className="inline-block animate-wiggle">👋</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          {greeting.subtitle}
        </p>
      </div>

      {/* 2. Top 3 KPI Cards */}
      <AdminKpiStats />

      {/* 3. Middle Section: Form Overview Chart & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
        <div className="lg:col-span-7">
          <AdminGrowthChartCard />
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
