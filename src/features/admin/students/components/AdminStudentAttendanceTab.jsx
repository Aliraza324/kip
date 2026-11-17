import { useState, useMemo } from "react";
import { CheckCircle2, XCircle, Calendar, ChevronDown, Clock, ShieldAlert, UserCheck } from "lucide-react";

export const AdminStudentAttendanceTab = ({ attendance = {}, report = {} }) => {
  // Use passed attendance or fallback from report
  const attData = attendance?.total !== undefined ? attendance : (report?.attendance || {});

  const presentClasses = attData?.present ?? 0;
  const absentClasses = attData?.absent ?? 0;
  const leaveClasses = attData?.leave ?? 0;
  const totalClasses = attData?.total ?? 0;
  const percentage = Math.round(Number(attData?.percentage) || 0);

  const rawTrend = attData?.trend || [];
  const trend = rawTrend.length > 0
    ? rawTrend.map((t) => ({ week: t.week, percent: Math.round(Number(t.percentage) || 0) }))
    : [
        { week: "Week 1", percent: 0 },
        { week: "Week 2", percent: 0 },
        { week: "Week 3", percent: 0 },
        { week: "Week 4", percent: 0 },
      ];

  const history = attData?.history || [];

  const [selectedSubject, setSelectedSubject] = useState("all");

  const subjects = useMemo(() => {
    return Array.from(new Set(history.map((h) => h.subject).filter(Boolean)));
  }, [history]);

  const filteredHistory = useMemo(() => {
    if (selectedSubject === "all") return history;
    return history.filter((h) => h.subject === selectedSubject);
  }, [history, selectedSubject]);

  return (
    <div className="space-y-6">
      {/* Top 2 Cards: Gauge + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Card 1: Donut Gauge & Metrics */}
        <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Attendance Rate</h3>
            <span className="text-xs text-slate-400 font-medium">
              Overall recorded rate
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
            {/* Circular Gauge */}
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={percentage >= 75 ? "#10b981" : percentage >= 50 ? "#0080f6" : "#f59e0b"}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * Math.min(100, Math.max(0, percentage))) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-slate-900 leading-none">
                  {percentage}%
                </span>
                <span className="text-[11px] font-semibold text-slate-400 mt-1">
                  Attendance
                </span>
              </div>
            </div>

            {/* Metrics List */}
            <div className="flex-1 w-full space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-medium">Present Lectures</span>
                </div>
                <span className="font-bold text-slate-900">{presentClasses}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-600">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="font-medium">Absent Lectures</span>
                </div>
                <span className="font-bold text-slate-900">{absentClasses}</span>
              </div>
              {leaveClasses > 0 && (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="font-medium">Approved Leaves</span>
                  </div>
                  <span className="font-bold text-slate-900">{leaveClasses}</span>
                </div>
              )}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4 text-[#0080f6] shrink-0" />
                  <span className="font-medium">Total Conducted</span>
                </div>
                <span className="font-bold text-slate-900">{totalClasses}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Attendance Trend */}
        <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Attendance Trend</h3>
            <span className="text-xs text-slate-400 font-medium">Last 4 Weeks</span>
          </div>

          <div className="pt-3">
            <div className="h-44 flex items-end justify-between gap-3 px-2 sm:px-4 border-b border-slate-100 pb-2">
              {trend.map((tr) => (
                <div key={tr.week} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-700">{tr.percent}%</span>
                  <div className="w-full max-w-[48px] bg-slate-100 rounded-t-xl overflow-hidden h-28 flex items-end">
                    <div
                      className="w-full bg-[#0080f6] rounded-t-xl transition-all duration-500"
                      style={{ height: `${Math.min(100, Math.max(4, tr.percent))}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">{tr.week}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Weekly percentage of attended class sessions
            </p>
          </div>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Attendance History ({filteredHistory.length})
            </h3>
            <p className="text-xs text-slate-500">
              Recent session records and lecture attendance.
            </p>
          </div>

          {subjects.length > 0 && (
            <div className="relative">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 outline-none cursor-pointer"
              >
                <option value="all">All Subjects</option>
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          )}
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Lecture / Session Title</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <span>No attendance records logged for this student yet.</span>
                  </td>
                </tr>
              ) : (
                filteredHistory.map((row, idx) => {
                  const status = (row.status || "").toLowerCase();
                  const isPresent = status === "present";
                  const isLeave = status === "leave";

                  return (
                    <tr key={row.lectureId || idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                        {row.date ? new Date(row.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "—"}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {row.title || "Live Class Session"}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {row.subject || "General"}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize ${
                            isPresent
                              ? "bg-emerald-50 text-emerald-600"
                              : isLeave
                              ? "bg-amber-50 text-amber-600"
                              : "bg-rose-50 text-rose-600"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPresent ? "bg-emerald-500" : isLeave ? "bg-amber-500" : "bg-rose-500"
                            }`}
                          />
                          <span>{row.status || "Absent"}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentAttendanceTab;
