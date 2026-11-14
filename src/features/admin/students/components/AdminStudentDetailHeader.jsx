import { Link } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";

export const AdminStudentDetailHeader = ({ student, activeTab, onSelectTab }) => {
  const tabs = ["Overview", "Progress", "Assignments", "Attendance"];

  return (
    <div className="space-y-5">
      {/* Back Link & Title */}
      <div>
        <Link
          to="/admin/students"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0080f6] hover:text-blue-700 transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Students</span>
        </Link>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Student Details
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          View and manage the student's information and academic progress.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-2xs flex items-center gap-4">
        {student.avatar ? (
          <img
            src={student.avatar}
            alt={student.name}
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover border-2 border-blue-100 shadow-sm shrink-0"
          />
        ) : (
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
            <User className="w-8 h-8" />
          </div>
        )}

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              {student.name}
            </h2>
            <span
              className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                student.status === "Active"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              • {student.status}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
            {student.className} | {student.course}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onSelectTab(tab)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === tab
                ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/20"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminStudentDetailHeader;
