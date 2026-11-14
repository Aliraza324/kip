import { Link } from "react-router-dom";
import { Users, ChevronRight, FlaskConical, BookOpen, Code2 } from "lucide-react";

const renderClassIcon = (iconType, symbol) => {
  if (iconType === "sqrt") return <span className="font-serif font-black text-lg">√x</span>;
  if (iconType === "flask") return <FlaskConical className="w-6 h-6 stroke-[2.2]" />;
  if (iconType === "code") return <Code2 className="w-6 h-6 stroke-[2.2]" />;
  return <BookOpen className="w-6 h-6 stroke-[2.2]" />;
};

export const TeacherClassCard = ({ classItem }) => {
  return (
    <Link
      to={`/teacher/classes/${classItem.id}`}
      className="group bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-100 shadow-2xs hover:shadow-md transition-all flex items-center justify-between gap-3 sm:gap-4 cursor-pointer"
    >
      {/* Left: Icon + Title */}
      <div className="flex items-center gap-2.5 sm:gap-5 min-w-0">
        <div
          className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${classItem.colorClass}`}
        >
          {renderClassIcon(classItem.iconType, classItem.symbol)}
        </div>

        <h3 className="text-sm sm:text-lg font-bold text-slate-900 group-hover:text-[#0080f6] transition-colors truncate">
          {classItem.name}
        </h3>
      </div>

      {/* Right: Students Count + Arrow Navigation Button */}
      <div className="flex items-center gap-2 sm:gap-6 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-600 font-semibold">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 shrink-0" />
          <span className="text-slate-900 font-black text-xs sm:text-base">{classItem.studentsCount}</span>
          <span className="text-slate-400 font-normal hidden sm:inline">Students</span>
        </div>

        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#f0f7ff] group-hover:bg-[#0080f6] text-[#0080f6] group-hover:text-white flex items-center justify-center transition-all shadow-2xs">
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </div>
      </div>
    </Link>
  );
};

export default TeacherClassCard;
