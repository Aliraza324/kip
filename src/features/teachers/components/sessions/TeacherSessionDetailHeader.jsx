import { Link } from "react-router-dom";
import { ArrowLeft, Edit2, Video, Calendar, Clock, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

export const TeacherSessionDetailHeader = ({ session, onEditSchedule }) => {
  const handleStartLive = () => {
    toast.success(`Starting Live Classroom for ${session.title}...`);
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
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-serif font-black text-xl shrink-0">
            √x
          </div>

          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {session.title}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-[#0080f6] border border-blue-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0080f6]" />
                <span>{session.statusBadge || "Scheduled"}</span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{session.scheduleDate || "Tue, Nov 5, 2024"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{session.duration || "10:00 AM – 10:45 AM"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>{session.repeatRule || "Weekly (Every Tuesday)"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons: Edit Schedule & Start Live Class */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onEditSchedule}
            className="px-5 py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit schedule</span>
          </button>
          <button
            type="button"
            onClick={handleStartLive}
            className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/25 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
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

