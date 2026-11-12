import { CalendarCheck, CalendarDays, CalendarX } from "lucide-react";

export const StudentAttendanceKpiCards = ({ attendance }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Present Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs hover:shadow-xs transition-all flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
          <CalendarCheck className="w-7 h-7 stroke-[2.2]" />
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {attendance.present}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
            Present
          </p>
        </div>
      </div>

      {/* Leave Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs hover:shadow-xs transition-all flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
          <CalendarDays className="w-7 h-7 stroke-[2.2]" />
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {attendance.leave}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
            Leave
          </p>
        </div>
      </div>

      {/* Absent Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs hover:shadow-xs transition-all flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
          <CalendarX className="w-7 h-7 stroke-[2.2]" />
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {attendance.absent}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
            Absent
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceKpiCards;

