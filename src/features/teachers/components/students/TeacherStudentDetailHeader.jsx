import { Link } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";

export const TeacherStudentDetailHeader = ({
  student,
  activeTab,
  onTabChange,
  backUrl = "/teacher/students",
}) => {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "progress", label: "Progress" },
    { id: "assignments", label: "Assignments" },
    { id: "attendance", label: "Attendance" },
  ];

  return (
    <div className="space-y-5">
      {/* Back button and page title */}
      <div>
        <Link
          to={backUrl}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0080f6] hover:underline mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Students</span>
        </Link>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Student Details
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          View and manage the student's information and academic progress.
        </p>
      </div>

      {/* Hero Card matching SS 2-5 */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-100/70 text-[#0080f6] flex items-center justify-center font-bold overflow-hidden ring-2 ring-white shadow-xs shrink-0">
            {student?.avatar ? (
              <img
                src={student.avatar}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-7 h-7" />
            )}
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 truncate">
                {student?.name || "Ayesha Ali"}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{student?.status || "Active"}</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              {student?.grade || "Grade 9"} | {student?.course || "Mathematics"}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs navigation row matching SS 2-5 */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#0080f6] text-white shadow-xs"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-100 shadow-2xs"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeacherStudentDetailHeader;

