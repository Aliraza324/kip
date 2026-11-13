import { Link } from "react-router-dom";
import { ArrowLeft, Edit2, Video, Calendar, Clock, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

export const TeacherSessionDetailHeader = ({ session, onEditSchedule, onStartLive }) => {
  const handleStartLive = () => {
    onStartLive?.(session.title);
  };

  return (
    <div className="space-y-4">
      {/* Back Link */}
      <Link
        to="/teacher/sessions"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0080f6] hover:text-[#0060d0] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>My Classes / Sessions</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-3.5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5 overflow-hidden">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-serif font-black text-lg sm:text-xl shrink-0">
            √x
          </div>

          <div className="space-y-1 sm:space-y-1.5 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-xl lg:text-2xl font-black text-slate-900 tracking-tight truncate">
                {session.title}
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-blue-50 text-[#0080f6] border border-blue-200/60 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0080f6]" />
                <span>{session.statusBadge || "Scheduled"}</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5 shrink-0">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{session.scheduleDate || "Tue, Nov 5, 2024"}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{session.duration || "10:00 AM – 10:45 AM"}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>{session.repeatRule || "Weekly (Every Tuesday)"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons: Edit Schedule & Start Live Class (Grid on 320px mobile) */}
        <div className="grid grid-cols-2 gap-2 w-full md:w-auto md:flex md:items-center md:gap-2.5 shrink-0 pt-2 md:pt-0 border-t border-slate-50 md:border-t-0">
          <button
            type="button"
            onClick={onEditSchedule}
            className="w-full md:w-auto px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit schedule</span>
          </button>
          <button
            type="button"
            onClick={handleStartLive}
            className="w-full md:w-auto px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Start Live</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherSessionDetailHeader;

