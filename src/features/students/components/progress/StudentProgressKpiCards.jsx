import { ClipboardCheck, Play, BookOpen } from "lucide-react";

const getKpiIcon = (type) => {
  if (type === "clipboard") return <ClipboardCheck className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.2]" />;
  if (type === "play") return <Play className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current" />;
  return <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.2]" />;
};

export const StudentProgressKpiCards = ({ kpiStats }) => {
  if (!kpiStats || kpiStats.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {kpiStats.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-3.5 min-w-0"
        >
          <div
            className={`w-9 sm:w-12 h-9 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${item.colorClass}`}
          >
            {getKpiIcon(item.iconType)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
              {item.value}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-400 font-semibold mt-1 leading-tight truncate">
              <span className="sm:hidden">{item.shortLabel || item.label}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentProgressKpiCards;
