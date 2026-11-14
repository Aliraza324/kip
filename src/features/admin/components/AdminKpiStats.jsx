import { Users, GraduationCap, Layers } from "lucide-react";
import { adminDashboardMock } from "@/mocks";

const iconMap = {
  users: Users,
  teachers: GraduationCap,
  classes: Layers,
};

export const AdminKpiStats = () => {
  const { kpis } = adminDashboardMock;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      {kpis.map((kpi) => {
        const Icon = iconMap[kpi.iconType] || Users;
        return (
          <div
            key={kpi.id}
            className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 ${kpi.bgClass} ${kpi.iconColorClass}`}
            >
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 block leading-tight tracking-tight">
                {kpi.value}
              </span>
              <span className="text-xs sm:text-sm text-slate-500 font-semibold block mt-1">
                {kpi.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminKpiStats;
