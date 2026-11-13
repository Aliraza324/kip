import { Calendar, Video, Clock } from "lucide-react";
import toast from "react-hot-toast";

export const TeacherSessionScheduleTab = ({ schedules = [] }) => {
  const handleLaunch = (sch) => {
    toast.success(`Starting schedule session: ${sch.title}`);
  };

  return (
    <div className="bg-white rounded-3xl p-3.5 sm:p-6 border border-slate-100 shadow-2xs space-y-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
          <Calendar className="w-4 h-4 stroke-[2.2]" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Class Schedule ({schedules.length})
        </h3>
      </div>

      <div className="space-y-3 pt-1">
        {schedules.map((sch) => (
          <div
            key={sch.id}
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
              sch.active
                ? "bg-blue-50/70 border-blue-200"
                : "bg-white hover:bg-slate-50 border-slate-100"
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0080f6]">{sch.date}</span>
                {sch.isToday && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0080f6] text-white">
                    Today
                  </span>
                )}
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {sch.title}
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{sch.time}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleLaunch(sch)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                sch.active
                  ? "bg-[#0080f6] hover:bg-[#006fd6] text-white shadow-md shadow-blue-500/25 active:scale-95"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{sch.active ? "Start Live" : "Start Class"}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherSessionScheduleTab;

