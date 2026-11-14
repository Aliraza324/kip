import {
  User, Mail, Phone, Calendar, GraduationCap, Layers,
  Video, FileText, BarChart3, Play, CheckCircle2,
} from "lucide-react";

export const AdminStudentOverviewTab = ({ student }) => {
  const infoRows = [
    { label: "Full Name", value: student.name, icon: User },
    { label: "Email", value: student.email, icon: Mail },
    { label: "Phone", value: student.phone, icon: Phone },
    { label: "Date of Birth", value: student.dob, icon: Calendar },
    { label: "Grade/Class", value: student.className, icon: GraduationCap },
    { label: "Course", value: student.course, icon: Layers },
  ];

  const kpis = [
    {
      label: "Lectures Watched",
      value: student.kpi?.lecturesWatched || 12,
      icon: Video,
      color: "bg-blue-50 text-[#0080f6]",
    },
    {
      label: "Assignments",
      value: student.kpi?.assignmentsCount || "2/3",
      icon: FileText,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Overall Progress",
      value: student.kpi?.overallProgress || "78%",
      icon: BarChart3,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const recent = student.recentActivity || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
      {/* Left: Student Information */}
      <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Student Information
        </h3>

        <div className="divide-y divide-slate-100 text-xs sm:text-sm">
          {infoRows.map((row, idx) => {
            const Icon = row.icon;
            return (
              <div key={idx} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{row.label}</span>
                </div>
                <span className="font-bold text-slate-900 text-right">{row.value}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: KPIs + Recent Activity */}
      <div className="lg:col-span-6 space-y-5 sm:space-y-6">
        {/* 3 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs flex flex-col justify-between"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-semibold block">{kpi.label}</span>
                  <span className="text-xl font-black text-slate-900 block mt-0.5">{kpi.value}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Recent Activity
            </h3>
            <button className="text-xs font-bold text-[#0080f6] hover:underline cursor-pointer">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {recent.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100/80 gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#0080f6] flex items-center justify-center shrink-0">
                    {act.type === "watch" && <Play className="w-4 h-4 fill-current" />}
                    {act.type === "assignment" && <FileText className="w-4 h-4" />}
                    {act.type === "attendance" && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {act.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium shrink-0">
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

export default AdminStudentOverviewTab;
