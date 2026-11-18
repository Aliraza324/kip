import { Users, GraduationCap, Layers } from "lucide-react";
import { useAdminDashboard } from "@/hooks/admin";

export const AdminKpiStats = ({ kpis: propKpis, loading: propLoading }) => {
  const dashboard = useAdminDashboard();
  const kpis = propKpis !== undefined ? propKpis : dashboard.kpis;
  const isLoading = propLoading !== undefined ? propLoading : dashboard.loading;

  const stats = [
    {
      id: "students",
      label: "Total Students",
      value: kpis?.students != null ? Number(kpis.students).toLocaleString() : "0",
      Icon: Users,
      bgClass: "bg-[#eaf4fe]",
      iconColorClass: "text-[#0080f6]",
    },
    {
      id: "teachers",
      label: "Total Teachers",
      value: kpis?.teachers != null ? Number(kpis.teachers).toLocaleString() : "0",
      Icon: GraduationCap,
      bgClass: "bg-[#fef8e7]",
      iconColorClass: "text-[#d97706]",
    },
    {
      id: "classes",
      label: "Total Classes",
      value: kpis?.classes != null ? Number(kpis.classes).toLocaleString() : "0",
      Icon: Layers,
      bgClass: "bg-[#eafaf1]",
      iconColorClass: "text-[#16a34a]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      {stats.map((item) => {
        const Icon = item.Icon;
        return (
          <div
            key={item.id}
            className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.bgClass} ${item.iconColorClass}`}
            >
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 block leading-tight tracking-tight">
                {isLoading && !kpis ? (
                  <span className="inline-block w-16 h-8 bg-slate-100 animate-pulse rounded-lg" />
                ) : (
                  item.value
                )}
              </span>
              <span className="text-xs sm:text-sm text-slate-500 font-semibold block mt-1">
                {item.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminKpiStats;
