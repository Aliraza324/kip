import { FlaskConical, BookOpen, Atom, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const getSubjectIcon = (iconType) => {
  if (iconType === "sqrt") return <span className="text-sm sm:text-base font-black text-purple-600">√x</span>;
  if (iconType === "flask") return <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 stroke-[2.2]" />;
  if (iconType === "book") return <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 stroke-[2.2]" />;
  return <Atom className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 stroke-[2.2]" />;
};

export const StudentSubjectProgressBar = ({ subjectProgress }) => {
  if (!subjectProgress) return null;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4.5 sm:p-7 border border-slate-100 shadow-2xs space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-xl font-bold text-slate-900">
          Progress by Subject
        </h2>
        <button
          type="button"
          onClick={() => toast.success("Opening detailed subject breakdown...")}
          className="text-xs sm:text-sm font-semibold text-[#0080f6] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress Bars List */}
      <div className="space-y-4 sm:space-y-5">
        {subjectProgress.map((item) => (
          <div key={item.id} className="space-y-2">
            {/* Subject Info Row: Icon + Title on left, Percentage on right */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${item.colorClass}`}
                >
                  {getSubjectIcon(item.iconType)}
                </div>
                <span className="text-xs sm:text-base font-bold text-slate-800 truncate">
                  {item.subject}
                </span>
              </div>

              <span className="text-xs sm:text-base font-black text-slate-900 shrink-0 ml-2">
                {item.percentage}%
              </span>
            </div>

            {/* Progress Bar Track: Full Width */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 sm:h-3 overflow-hidden">
              <div
                className="bg-[#0080f6] h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSubjectProgressBar;
