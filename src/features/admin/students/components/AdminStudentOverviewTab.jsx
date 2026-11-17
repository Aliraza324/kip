import {
  User, Mail, Phone, Calendar, GraduationCap, Layers,
  Video, FileText, BarChart3, Shield, Home, AlertCircle, Clock,
} from "lucide-react";

export const AdminStudentOverviewTab = ({ student = {}, report = {} }) => {
  const studentName = student.fullName || student.name || "—";
  const fatherName = student.fatherName || "—";
  const cnic = student.cnic || "—";
  const studentCode = student.code || student.studentId || "—";
  const username = student.username || "—";
  const email = student.email || "—";
  const phone = student.phone || "—";
  const emergencyContact = student.emergencyContact || "—";
  const address = student.address || "—";
  const dob = student.dob ? String(student.dob).split("T")[0] : "—";
  const gender = student.gender || "—";
  const className = student.class?.name || student.className || "—";
  const section = student.section || student.class?.section || "—";

  const infoRows = [
    { label: "Full Name", value: studentName, icon: User },
    { label: "Father's Name", value: fatherName, icon: User },
    { label: "CNIC / B-Form", value: cnic, icon: Shield },
    { label: "Student ID", value: studentCode, icon: Shield },
    { label: "Username", value: username, icon: User },
    { label: "Email Address", value: email, icon: Mail },
    { label: "Phone Number", value: phone, icon: Phone },
    { label: "Emergency Contact", value: emergencyContact, icon: AlertCircle },
    { label: "Residential Address", value: address, icon: Home },
    { label: "Class / Grade", value: className, icon: GraduationCap },
    { label: "Section", value: section, icon: Layers },
    { label: "Date of Birth", value: dob, icon: Calendar },
    { label: "Gender", value: gender, icon: User },
  ];

  // Derived KPIs from real report if available, else defaults
  const kpis = [
    {
      label: "Lectures Attended",
      value: report?.attendance?.present ?? report?.summary?.lecturesAttended ?? 0,
      icon: Video,
      color: "bg-blue-50 text-[#0080f6]",
    },
    {
      label: "Assignments",
      value: report?.progress?.kpi
        ? `${report.progress.kpi.assignmentsSubmitted}/${report.progress.kpi.assignmentsTotal}`
        : `${report?.assignments?.filter((a) => a.submitted)?.length ?? 0}/${report?.assignments?.length ?? 0}`,
      icon: FileText,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Overall Progress",
      value: report?.summary?.overallProgress
        ? `${report.summary.overallProgress}%`
        : report?.progress?.kpi?.overallProgress
        ? `${report.progress.kpi.overallProgress}%`
        : "N/A",
      icon: BarChart3,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
      {/* Left Column: Student Personal Information */}
      <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <User className="w-5 h-5 text-slate-700" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Personal & Academic Information
          </h3>
        </div>

        <div className="divide-y divide-slate-100 text-xs sm:text-sm">
          {infoRows.map((row, idx) => {
            const Icon = row.icon;
            return (
              <div key={idx} className="py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3">
                <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                  <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{row.label}</span>
                </div>
                <span className="font-bold text-slate-900 text-left sm:text-right break-words max-w-xs">
                  {row.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: KPIs & Account Details */}
      <div className="lg:col-span-5 space-y-5 sm:space-y-6">
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

        {/* Enrollment & Status Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <GraduationCap className="w-5 h-5 text-slate-700" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Class Enrollment Status
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500">Enrolled Class</span>
              <span className="font-bold text-slate-900">{className}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500">Assigned Section</span>
              <span className="font-bold text-slate-900">{section}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500">Account Status</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 capitalize">
                • {student.status || "Active"}
              </span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500">Registration Date</span>
              <span className="font-semibold text-slate-700">
                {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentOverviewTab;
