import { Link } from "react-router-dom";
import { Layers, ChevronRight, BookOpen, FlaskConical, ArrowRight } from "lucide-react";

const renderClassIcon = (iconType) => {
  if (iconType === "sqrt") {
    return <span className="font-serif font-black text-base">√x</span>;
  }
  if (iconType === "clover") {
    return <FlaskConical className="w-5 h-5 stroke-[2.2]" />;
  }
  return <BookOpen className="w-5 h-5 stroke-[2.2]" />;
};

export const TeacherMyClassesCard = ({ classes = [] }) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              My Classes
            </h3>
          </div>

          <Link
            to="/teacher/classes"
            className="text-xs sm:text-sm font-semibold text-[#0080f6] hover:text-[#0060d0] flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Classes List */}
        <div className="space-y-3 pt-4">
          {classes.map((cls) => (
            <Link
              key={cls.id}
              to={`/teacher/classes`}
              className="p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 transition-colors group cursor-pointer"
            >
              {/* Left Subject Icon + Details */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${cls.colorClass}`}
                >
                  {renderClassIcon(cls.iconType)}
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate group-hover:text-[#0080f6] transition-colors">
                    {cls.subject}
                  </h4>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    {cls.studentsCount} Students
                  </p>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 group-hover:text-[#0080f6] group-hover:translate-x-0.5 transition-all">
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherMyClassesCard;

