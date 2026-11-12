import { ClipboardCheck, Play, BookOpen } from "lucide-react";

const getKpiIcon = (type) => {
  if (type === "clipboard") return <ClipboardCheck className="w-6 h-6 stroke-[2.2]" />;
  if (type === "play") return <Play className="w-5 h-5 fill-current" />;
  return <BookOpen className="w-6 h-6 stroke-[2.2]" />;
};

export const StudentProgressKpiCards = ({ kpiStats }) => {
  if (!kpiStats || kpiStats.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {kpiStats.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs hover:shadow-xs transition-all flex items-center gap-4"
        >
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.colorClass}`}
          >
            {getKpiIcon(item.iconType)}
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {item.value}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentProgressKpiCards;

