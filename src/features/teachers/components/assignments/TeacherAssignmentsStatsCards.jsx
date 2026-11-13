import { Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export const TeacherAssignmentsStatsCards = ({ stats }) => {
  const cards = [
    {
      label: "Total Assignments",
      value: stats?.totalAssignments || 24,
      icon: Calendar,
      iconBg: "bg-blue-50 text-[#0080f6]",
    },
    {
      label: "Submitted",
      value: stats?.submitted || 16,
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Pending",
      value: stats?.pending || 6,
      icon: Clock,
      iconBg: "bg-amber-50 text-amber-600",
    },
    {
      label: "Overdue",
      value: stats?.overdue || 2,
      icon: AlertCircle,
      iconBg: "bg-rose-50 text-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-2xs flex items-center gap-3 sm:gap-4"
          >
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 ${card.iconBg}`}
            >
              <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="text-xl sm:text-2xl font-black text-slate-900 block leading-tight">
                {card.value}
              </span>
              <span className="text-xs text-slate-500 font-semibold truncate block">
                {card.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeacherAssignmentsStatsCards;

