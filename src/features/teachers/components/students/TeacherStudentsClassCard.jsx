import { Link } from "react-router-dom";
import { Users, ChevronRight, FlaskConical, BookOpen, Code2 } from "lucide-react";

const renderClassIcon = (iconType, symbol) => {
  if (iconType === "sqrt") return <span className="font-serif font-black text-base sm:text-lg">√x</span>;
  if (iconType === "flask") return <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />;
  if (iconType === "code") return <Code2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />;
  return <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />;
};

export const TeacherStudentsClassCard = ({ classItem }) => {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
      {/* Top / Left: Icon + Title & Schedule */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div
          className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${classItem.colorClass}`}
        >
          {renderClassIcon(classItem.iconType, classItem.symbol)}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 truncate">
            {classItem.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-400 font-medium truncate mt-0.5">
            {classItem.scheduleDays} • {classItem.scheduleTime}
          </p>
        </div>
      </div>

      {/* Bottom on mobile / Right on desktop: Students Count + View Button */}
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-5 pt-2 sm:pt-0 border-t border-slate-50 sm:border-t-0 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-600 font-semibold">
          <Users className="w-4 h-4 text-[#0080f6] shrink-0" />
          <span className="text-slate-900 font-black text-sm sm:text-base">
            {classItem.studentsCount}
          </span>
          <span className="text-slate-400 font-normal">Students</span>
        </div>

        <Link
          to={`/teacher/students/class/${classItem.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-blue-50/80 hover:bg-[#0080f6] text-[#0080f6] hover:text-white text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer group active:scale-95"
        >
          <span>View Students</span>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default TeacherStudentsClassCard;
