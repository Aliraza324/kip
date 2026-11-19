import { Link } from "react-router-dom";
import { Layers, ChevronRight, BookOpen, FlaskConical, ArrowRight } from "lucide-react";

const renderClassIcon = (iconType) => {
  if (iconType === "sqrt") {
    return <span className="font-serif font-black text-sm sm:text-base">√x</span>;
  }
  if (iconType === "clover" || iconType === "flask") {
    return <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />;
  }
  if (iconType === "code") {
    return <span className="font-mono font-bold text-xs sm:text-sm">&lt;/&gt;</span>;
  }
  return <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />;
};

export const TeacherMyClassesCard = ({ classes = [] }) => {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-slate-100">
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
        <div className="space-y-2.5 sm:space-y-3 pt-3.5 sm:pt-4">
          {classes.length === 0 ? (
            <div className="py-10 px-4 rounded-xl sm:rounded-2xl bg-slate-50/70 border border-dashed border-slate-200 text-center flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0080f6] flex items-center justify-center mb-2">
                <Layers className="w-5 h-5 stroke-[2.2]" />
              </div>
              <p className="text-sm font-bold text-slate-800">No classes assigned yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Classes assigned by the administrator will appear here.
              </p>
            </div>
          ) : (
            classes.map((cls) => (
              <Link
                key={cls.id}
                to={cls.id ? `/teacher/classes/${cls.id}` : "/teacher/classes"}
                className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 flex items-center justify-between gap-2.5 sm:gap-3 transition-colors group cursor-pointer"
              >
                {/* Left Subject Icon + Details */}
                <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${cls.colorClass || "bg-purple-100 text-purple-600"}`}
                  >
                    {renderClassIcon(cls.iconType)}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm lg:text-base font-bold text-slate-900 group-hover:text-[#0080f6] transition-colors leading-snug break-words sm:truncate">
                      {cls.subject || cls.name || cls.label}
                    </h4>
                    <p className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">
                      {cls.studentsCount ?? 0} Students
                    </p>
                  </div>
                </div>

                {/* Arrow Indicator */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-slate-400 group-hover:text-[#0080f6] group-hover:translate-x-0.5 transition-all shrink-0">
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherMyClassesCard;
