import { CheckCircle2, XCircle, Calendar, ChevronDown } from "lucide-react";

export const AdminStudentAttendanceTab = ({ student }) => {
  const stats = student.attendanceStats || {
    percentage: 92,
    presentClasses: 23,
    absentClasses: 2,
    totalClasses: 25,
    trend: [
      { week: "Week 1", percent: 100 },
      { week: "Week 2", percent: 88 },
      { week: "Week 3", percent: 92 },
      { week: "Week 4", percent: 88 },
    ],
    history: [
      { id: "h1", date: "Nov 5, 2024", subject: "Mathematics", status: "Present" },
      { id: "h2", date: "Nov 4, 2024", subject: "Mathematics", status: "Present" },
      { id: "h3", date: "Nov 3, 2024", subject: "Mathematics", status: "Absent" },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top 2 Cards: Gauge + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Card 1: Donut Gauge */}
        <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Attendance</h3>
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
            {/* Circular Gauge */}
            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="9" fill="transparent" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#10b981"
                  strokeWidth="9"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * stats.percentage) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-900 leading-none">{stats.percentage}%</span>
                <span className="text-[11px] font-semibold text-slate-400 mt-1">Attendance</span>
              </div>
            </div>

            {/* Metrics List */}
            <div className="flex-1 w-full space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">Present Classes</span>
                </div>
                <span className="font-bold text-slate-900">{stats.presentClasses}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-600">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <span className="font-medium">Absent Classes</span>
                </div>
                <span className="font-bold text-slate-900">{stats.absentClasses}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Total Classes</span>
                </div>
                <span className="font-bold text-slate-900">{stats.totalClasses}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Attendance Trend */}
        <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Attendance Trend</h3>
            <button className="px-3 py-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 flex items-center gap-1">
              <span>Last 4 Weeks</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          <div className="pt-2">
            <div className="h-40 flex items-end justify-between gap-3 px-4 border-b border-slate-100">
              {stats.trend.map((tr) => (
                <div key={tr.week} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-700">{tr.percent}%</span>
                  <div className="w-full max-w-[48px] bg-blue-50 rounded-t-xl overflow-hidden h-28 flex items-end">
                    <div
                      className="w-full bg-[#0080f6] rounded-t-xl transition-all duration-300"
                      style={{ height: `${tr.percent}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">{tr.week}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Attendance History</h3>
          <button className="px-3 py-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 flex items-center gap-1">
            <span>Nov 2024</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
              {stats.history.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{row.date}</td>
                  <td className="py-3.5 px-4 text-slate-600">{row.subject}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold ${
                        row.status === "Present"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      • {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentAttendanceTab;
