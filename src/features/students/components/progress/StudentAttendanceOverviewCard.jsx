import { Calendar, CheckCircle, Umbrella, XCircle, FileText } from "lucide-react";

export const StudentAttendanceOverviewCard = ({ attendance }) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            This Month Overview
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          {attendance.monthName}
        </span>
      </div>

      {/* Breakdown List */}
      <div className="space-y-3.5 divide-y divide-slate-100">
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-xs sm:text-sm text-slate-700 font-medium">Present</span>
          </div>
          <span className="text-sm sm:text-base font-black text-slate-900">
            {attendance.present}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2.5">
            <Umbrella className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-xs sm:text-sm text-slate-700 font-medium">Leave</span>
          </div>
          <span className="text-sm sm:text-base font-black text-slate-900">
            {attendance.leave}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2.5">
            <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="text-xs sm:text-sm text-slate-700 font-medium">Absent</span>
          </div>
          <span className="text-sm sm:text-base font-black text-slate-900">
            {attendance.absent}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs sm:text-sm text-slate-700 font-medium">Total Classes</span>
          </div>
          <span className="text-sm sm:text-base font-black text-slate-900">
            {attendance.totalClasses}
          </span>
        </div>
      </div>

      {/* Bottom Rate Highlight Card */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/90 flex items-center justify-between">
        <span className="text-xs sm:text-sm font-bold text-slate-800">
          Attendance Rate
        </span>
        <span className="px-3.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-700">
          {attendance.rate}%
        </span>
      </div>
    </div>
  );
};

export default StudentAttendanceOverviewCard;

