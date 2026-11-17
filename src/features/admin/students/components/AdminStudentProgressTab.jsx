import { Calendar, Layers, Star, CheckCircle, Video, FileText, BarChart3, Clock } from "lucide-react";

export const AdminStudentProgressTab = ({
  student = {},
  report = {},
  progress = {},
  progressFactors = {},
  kpi = {},
}) => {
  // Use passed props or extract from report
  const resolvedKpi = kpi?.overallProgress !== undefined ? kpi : (report?.kpi || {});
  const resolvedFactors = progressFactors?.attendance !== undefined ? progressFactors : (report?.progressFactors || {});
  const recentActivities = report?.recentActivity || [];

  const overallProgress = Math.round(Number(resolvedKpi?.overallProgress) || 0);
  const attendanceRate = Math.round(Number(resolvedFactors?.attendance) || 0);
  const assignmentsRate = Math.round(Number(resolvedFactors?.assignments) || 0);
  const averageScore = resolvedFactors?.averageScore !== null && resolvedFactors?.averageScore !== undefined
    ? Math.round(Number(resolvedFactors.averageScore))
    : null;

  const factors = [
    {
      label: "Attendance Rate",
      percentage: attendanceRate,
      icon: Calendar,
      color: "bg-[#0080f6]",
      description: `${resolvedKpi?.lecturesAttended ?? 0} lectures attended`,
    },
    {
      label: "Assignments Submission",
      percentage: assignmentsRate,
      icon: Layers,
      color: "bg-purple-500",
      description: `${resolvedKpi?.assignmentsSubmitted ?? 0} of ${resolvedKpi?.assignmentsTotal ?? 0} submitted`,
    },
    {
      label: "Average Assessment Score",
      percentage: averageScore !== null ? averageScore : 0,
      icon: Star,
      color: "bg-emerald-500",
      description: averageScore !== null ? `Average ${averageScore}% on graded tasks` : "No graded submissions yet",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Card: Donut & Progress Breakdown */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Academic Progress Summary
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cumulative evaluation based on attendance, submissions, and teacher assessments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Overall Circular Donut */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 md:border-r md:border-slate-100">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#0080f6"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * Math.min(100, Math.max(0, overallProgress))) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-slate-900 leading-none">
                  {overallProgress}%
                </span>
                <span className="text-[11px] font-semibold text-slate-400 mt-1">
                  Overall Score
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium text-center mt-3">
              {overallProgress >= 80
                ? "Excellent academic standing"
                : overallProgress >= 50
                ? "Consistent learning engagement"
                : "Just started learning activities"}
            </p>
          </div>

          {/* Factors Breakdown */}
          <div className="md:col-span-7 space-y-4">
            {factors.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="space-y-1.5 p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-[#0080f6]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{f.label}</span>
                    </div>
                    <span className="text-slate-900 font-black">{f.percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200/80 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${f.color} transition-all duration-500`}
                      style={{ width: `${Math.min(100, Math.max(0, f.percentage))}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium pl-1">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Card: Recent Learning Activities */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-700" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Recent Learning Activity
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {recentActivities.length} recent record(s)
          </span>
        </div>

        {recentActivities.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs sm:text-sm font-medium">
              No recent attendance or submission activities recorded yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentActivities.map((act, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    act.type === "attendance" ? "bg-blue-100 text-[#0080f6]" : "bg-emerald-100 text-emerald-600"
                  }`}>
                    {act.type === "attendance" ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{act.title}</span>
                    {act.subject && (
                      <span className="text-[11px] text-slate-500">{act.subject}</span>
                    )}
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">
                  {act.at ? new Date(act.at).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStudentProgressTab;
