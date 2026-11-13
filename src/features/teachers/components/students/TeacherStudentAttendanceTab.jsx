import { CheckCircle2, XCircle, Calendar, ChevronDown } from "lucide-react";
import TeacherStudentAttendanceHistoryCard from "./TeacherStudentAttendanceHistoryCard";

export const TeacherStudentAttendanceTab = ({ student }) => {
  const stats = student?.attendanceStats || {
    percentage: 92,
    present: 23,
    absent: 2,
    total: 25,
    trendWeeks: [
      { week: "Week 1", percentage: 100 },
      { week: "Week 2", percentage: 88 },
      { week: "Week 3", percentage: 92 },
      { week: "Week 4", percentage: 88 },
    ],
    history: [
      { id: "1", date: "Nov 5, 2024", subject: "Mathematics", status: "Present" },
      { id: "2", date: "Nov 4, 2024", subject: "Mathematics", status: "Present" },
      { id: "3", date: "Nov 3, 2024", subject: "Mathematics", status: "Absent" },
    ],
  };

  return (
    <div className="space-y-5">
      {/* Top 2 Cards: Attendance Gauge + Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Card: Attendance Gauge */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-5">
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Attendance
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Circular Gauge */}
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-emerald-500 transition-all duration-1000"
                  strokeWidth="8"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 * (1 - stats.percentage / 100)}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-slate-900">
                  {stats.percentage}%
                </span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">
                  Attendance
                </span>
              </div>
            </div>

            {/* Metrics List */}
            <div className="flex-1 space-y-3 w-full text-xs sm:text-sm">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100/70">
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Present Classes</span>
                </div>
                <span className="font-black text-slate-900">{stats.present}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100/70">
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <span>Absent Classes</span>
                </div>
                <span className="font-black text-slate-900">{stats.absent}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100/70">
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <Calendar className="w-4 h-4 text-[#0080f6]" />
                  <span>Total Classes</span>
                </div>
                <span className="font-black text-slate-900">{stats.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Attendance Trend */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Attendance Trend
            </h3>
            <div className="relative">
              <select
                aria-label="Attendance trend timeframe"
                className="appearance-none pl-3 pr-7 py-1 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
              >
                <option>Last 4 Weeks</option>
                <option>Last 8 Weeks</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Bar Chart Visualization matching SS 5 */}
          <div className="pt-2">
            <div className="flex items-end justify-around h-36 border-b border-slate-100 pb-2">
              {stats.trendWeeks.map((week, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 w-1/5">
                  <span className="text-[11px] font-bold text-slate-700">
                    {week.percentage}%
                  </span>
                  <div className="w-full bg-blue-50/70 rounded-xl flex items-end justify-center h-24 p-1">
                    <div
                      className="w-full bg-[#0080f6] rounded-lg transition-all duration-700"
                      style={{ height: `${week.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-around pt-2 text-[11px] font-bold text-slate-400">
              {stats.trendWeeks.map((week, idx) => (
                <span key={idx} className="w-1/5 text-center">
                  {week.week}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Card: Attendance History */}
      <TeacherStudentAttendanceHistoryCard history={stats.history} />
    </div>
  );
};

export default TeacherStudentAttendanceTab;
