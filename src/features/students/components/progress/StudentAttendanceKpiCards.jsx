import { CalendarCheck, CalendarDays, CalendarX } from "lucide-react";

export const StudentAttendanceKpiCards = ({ attendance }) => {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {/* Present Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-3.5 min-w-0">
        <div className="w-9 sm:w-12 h-9 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
          <CalendarCheck className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
            {attendance.present}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-400 font-semibold mt-1 leading-tight truncate">
            Present
          </p>
        </div>
      </div>

      {/* Leave Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-3.5 min-w-0">
        <div className="w-9 sm:w-12 h-9 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
          <CalendarDays className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
            {attendance.leave}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-400 font-semibold mt-1 leading-tight truncate">
            Leave
          </p>
        </div>
      </div>

      {/* Absent Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-3.5 min-w-0">
        <div className="w-9 sm:w-12 h-9 sm:h-12 rounded-xl sm:rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
          <CalendarX className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
            {attendance.absent}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-400 font-semibold mt-1 leading-tight truncate">
            Absent
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceKpiCards;
