import { Users, CheckCircle2, Clock } from "lucide-react";

export const TeacherSubmissionsStatsCards = ({
  totalStudents = 28,
  submitted = 24,
  pending = 4,
}) => {
  const cards = [
    {
      label: "Total Students",
      value: totalStudents,
      icon: Users,
      iconBg: "bg-blue-50 text-[#0080f6]",
    },
    {
      label: "Submitted",
      value: submitted,
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      iconBg: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-2xs flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${card.iconBg}`}
            >
              <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-2xl font-black text-slate-900 block leading-tight">
                {card.value}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {card.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeacherSubmissionsStatsCards;

