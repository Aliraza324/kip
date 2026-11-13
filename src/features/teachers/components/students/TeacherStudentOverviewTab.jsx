import {
  User,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  Layers,
  Video,
  FileText,
  BarChart3,
  Play,
  CheckCircle2,
} from "lucide-react";

export const TeacherStudentOverviewTab = ({ student }) => {
  const kpiStats = [
    {
      label: "Lectures Watched",
      value: student?.kpi?.lecturesWatched || 12,
      icon: Video,
      color: "bg-blue-50 text-[#0080f6]",
    },
    {
      label: "Assignments",
      value: student?.kpi?.assignmentsCount || "2/3",
      icon: FileText,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Overall Progress",
      value: student?.kpi?.overallProgress || "78%",
      icon: BarChart3,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const infoRows = [
    { label: "Full Name", value: student?.name || "Ayesha Ali", icon: User },
    { label: "Email", value: student?.email || "ayesha.ali@kipclassin.com", icon: Mail },
    { label: "Phone", value: student?.phone || "+92 300 1234567", icon: Phone },
    { label: "Date of Birth", value: student?.dob || "Mar 15, 2010", icon: Calendar },
    { label: "Grade/Class", value: student?.grade || "Grade 9", icon: GraduationCap },
    { label: "Course", value: student?.course || "Mathematics", icon: Layers },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      {/* Left Column: Student Information */}
      <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
          Student Information
        </h3>

        <div className="divide-y divide-slate-100/80 text-xs sm:text-sm">
          {infoRows.map((row, idx) => {
            const Icon = row.icon;
            return (
              <div key={idx} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                  <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{row.label}</span>
                </div>
                <span className="font-bold text-slate-900 truncate ml-2">
                  {row.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: KPI Stats + Recent Activity */}
      <div className="lg:col-span-7 space-y-5">
        {/* Top 3 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {kpiStats.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-2xs flex flex-col justify-between space-y-3"
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${kpi.color}`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold block">
                    {kpi.label}
                  </span>
                  <span className="text-2xl font-black text-slate-900 block mt-0.5">
                    {kpi.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Recent Activity
            </h3>
            <button
              type="button"
              className="text-xs font-bold text-[#0080f6] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {student?.recentActivity?.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
                    {act.type === "watch" && <Play className="w-4 h-4 fill-current" />}
                    {act.type === "assignment" && <FileText className="w-4 h-4" />}
                    {act.type === "attendance" && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                    {act.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium shrink-0 ml-2">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherStudentOverviewTab;

