import { FlaskConical, BookOpen, Atom, ArrowRight } from "lucide-react";

const getSubjectIcon = (iconType) => {
  if (iconType === "sqrt") return <span className="text-base font-black text-purple-600">√x</span>;
  if (iconType === "flask") return <FlaskConical className="w-5 h-5 text-emerald-600 stroke-[2.2]" />;
  if (iconType === "book") return <BookOpen className="w-5 h-5 text-amber-600 stroke-[2.2]" />;
  return <Atom className="w-5 h-5 text-indigo-600 stroke-[2.2]" />;
};

export const StudentSubjectProgressBar = ({ subjectProgress }) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          Progress by Subject
        </h2>
        <button
          type="button"
          className="text-xs sm:text-sm font-semibold text-[#0080f6] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bars List */}
      <div className="space-y-5">
        {subjectProgress.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6"
          >
            {/* Subject Info */}
            <div className="flex items-center gap-3 w-40 shrink-0">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${item.colorClass}`}
              >
                {getSubjectIcon(item.iconType)}
              </div>
              <span className="text-sm sm:text-base font-bold text-slate-800">
                {item.subject}
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#0080f6] h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${item.percentage}%` }}
              />
            </div>

            {/* Percentage Label */}
            <div className="w-14 text-right shrink-0">
              <span className="text-sm sm:text-base font-black text-slate-900">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSubjectProgressBar;

