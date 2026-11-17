import { Link } from "react-router-dom";
import { ArrowLeft, User, Edit2 } from "lucide-react";

export const AdminStudentDetailHeader = ({
  student = {},
  activeTab,
  onSelectTab,
  onEdit,
}) => {
  const tabs = ["Overview", "Progress", "Assignments", "Attendance"];
  const studentName = student.fullName || student.name || "Student";
  const studentCode = student.code || student.studentId || "";
  const className = student.class?.name || student.className || "No Class Assigned";
  const section = student.section || student.class?.section || "";
  const isActive = (student.status || "active").toLowerCase() === "active";
  const avatarUrl = typeof student.avatar === "string" ? student.avatar : student.avatar?.url;

  return (
    <div className="space-y-5">
      {/* Back Link & Title */}
      <div>
        <Link
          to="/admin/students"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0080f6] hover:text-blue-700 transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students</span>
        </Link>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Student Details
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          View and manage the student's personal information, credentials, and academic records.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={studentName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-blue-100 shadow-sm shrink-0"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center font-black text-2xl shrink-0">
              {(studentName || "S")[0]}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                {studentName}
              </h2>
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-bold capitalize ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                • {student.status || "Active"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
              {className} {section ? `• Section ${section}` : ""} {studentCode ? `• ID: ${studentCode}` : ""}
            </p>
          </div>
        </div>

        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer"
          >
            <Edit2 className="w-4 h-4 text-slate-500" />
            <span>Edit Profile</span>
          </button>
        )}
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
