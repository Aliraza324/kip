import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Layers, Calendar } from "lucide-react";

export const TeacherSubmissionsSummaryHeader = ({
  assignment,
  backTo = "/teacher/assignments",
  backLabel = "Back to Assignments",
  badgeText = "Active",
}) => {
  return (
    <div className="space-y-4">
      {/* Back button and page title */}
      <div className="flex items-center gap-3">
        <Link
          to={backTo}
          className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-2xs hover:shadow-xs flex items-center justify-center text-slate-600 hover:text-[#0080f6] transition-all cursor-pointer shrink-0"
          title={backLabel}
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Assignment Submissions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            View and grade student submissions.
          </p>
        </div>
      </div>

      {/* Hero Card matching SS 3 & SS 4 */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div className="space-y-1 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {assignment?.title || "Quadratic Equations – Practice Problems"}
            </h2>
            <div className="flex items-center gap-3 sm:gap-5 text-xs text-slate-500 font-semibold flex-wrap">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#0080f6] shrink-0" />
                <span>{assignment?.class || "Mathematics – Grade 9"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0080f6] shrink-0" />
                <span>Due: {assignment?.dueDate || "Nov 12, 2026, 11:59 PM"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 self-start sm:self-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            {badgeText || assignment?.status || "Active"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeacherSubmissionsSummaryHeader;

