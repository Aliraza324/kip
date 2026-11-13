import { Layers, Users, Calendar } from "lucide-react";

const iconMap = {
  layers: Layers,
  users: Users,
  calendar: Calendar,
};

export const TeacherKpiStats = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
      {stats.map((stat) => {
        const Icon = iconMap[stat.iconType] || Layers;
        return (
          <div
            key={stat.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center gap-4"
          >
            {/* KPI Icon */}
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${stat.colorClass}`}
            >
              <Icon className="w-6 h-6 stroke-[2.2]" />
            </div>

            {/* Value & Label */}
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeacherKpiStats;

