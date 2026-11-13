import { Link } from "react-router-dom";
import { Users, ChevronRight, FlaskConical, BookOpen, Code2 } from "lucide-react";

const renderClassIcon = (iconType, symbol) => {
  if (iconType === "sqrt") return <span className="font-serif font-black text-lg">√x</span>;
  if (iconType === "flask") return <FlaskConical className="w-6 h-6 stroke-[2.2]" />;
  if (iconType === "code") return <Code2 className="w-6 h-6 stroke-[2.2]" />;
  return <BookOpen className="w-6 h-6 stroke-[2.2]" />;
};

export const TeacherStudentsClassCard = ({ classItem }) => {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-2xs hover:shadow-md transition-all flex items-center justify-between gap-4">
      {/* Left: Icon + Title */}
      <div className="flex items-center gap-3.5 sm:gap-5 min-w-0">
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 ${classItem.colorClass}`}
        >
          {renderClassIcon(classItem.iconType, classItem.symbol)}
        </div>

        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
            {classItem.name}
          </h3>
          <p className="text-xs text-slate-400 font-medium truncate">
            {classItem.scheduleDays} • {classItem.scheduleTime}
          </p>
        </div>
      </div>

      {/* Right: Students Count + View Button */}
      <div className="flex items-center gap-3 sm:gap-5 shrink-0">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-semibold">
          <Users className="w-4 h-4 text-slate-500 shrink-0" />
          <span className="text-slate-900 font-black text-sm sm:text-base">
            {classItem.studentsCount}
          </span>
          <span className="text-slate-400 font-normal hidden sm:inline">Students</span>
        </div>

        <Link
          to={`/teacher/students/class/${classItem.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-blue-50/70 hover:bg-[#0080f6] text-[#0080f6] hover:text-white text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer group"
        >
          <span>View Students</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default TeacherStudentsClassCard;

