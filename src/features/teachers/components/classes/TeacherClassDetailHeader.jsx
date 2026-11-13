import { Link } from "react-router-dom";
import { ArrowLeft, Users, Layers, Calendar, Clock } from "lucide-react";

export const TeacherClassDetailHeader = ({ classItem }) => {
  return (
    <div className="space-y-4">
      {/* Back button and page title */}
      <div className="flex items-center gap-3">
        <Link
          to="/teacher/classes"
          className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-2xs hover:shadow-xs flex items-center justify-center text-slate-600 hover:text-[#0080f6] transition-all cursor-pointer shrink-0"
          title="Back to My Classes"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Class Details
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            View class information, students, and subjects.
          </p>
        </div>
      </div>

      {/* Main Class Hero Card matching SS 2 & SS 3 */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5 overflow-hidden">
        {/* Left: Class identity & metrics */}
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-serif font-black text-xl shrink-0 ${classItem.colorClass}`}
          >
            {classItem.symbol || "√x"}
          </div>

          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                {classItem.name}
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                {classItem.status || "Active"}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 font-semibold flex-wrap">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#0080f6] shrink-0" />
                <span className="text-slate-800 font-bold">{classItem.studentsCount}</span>
                <span>Students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#0080f6] shrink-0" />
                <span className="text-slate-800 font-bold">{classItem.subjectsCount || classItem.subjects?.length || 4}</span>
                <span>Subjects</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider on desktop */}
        <div className="hidden md:block w-px h-12 bg-slate-100 shrink-0" />

        {/* Right: Class Schedule info */}
        <div className="flex items-start gap-3 shrink-0 bg-slate-50/60 sm:bg-transparent p-3 sm:p-0 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Class Schedule
            </h4>
            <p className="text-sm font-bold text-slate-900 mt-0.5">
              {classItem.scheduleDays || "Mon, Wed, Fri"}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {classItem.scheduleTime || "10:00 AM – 11:00 AM"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassDetailHeader;

