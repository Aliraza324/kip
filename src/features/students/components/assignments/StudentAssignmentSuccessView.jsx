import { Check, Calendar, Upload, Eye, ArrowLeft } from "lucide-react";

export const StudentAssignmentSuccessView = ({
  assignment,
  submittedAt,
  onViewSubmission,
  onBackToAssignments,
}) => {
  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8 animate-in zoom-in-95 duration-200">
      <div className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 border border-slate-100 shadow-2xs text-center space-y-6 sm:space-y-7">
        {/* Success Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <Check className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.8]" />
        </div>

        {/* Headings */}
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Assignment Submitted!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Your assignment has been uploaded successfully.
          </p>
        </div>

        {/* Assignment Summary Box */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 text-left space-y-4 shadow-2xs">
          {/* Header */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 font-black text-lg flex items-center justify-center shrink-0">
                √x
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                  {assignment.title}
                </h3>
                <p className="text-xs text-slate-400">{assignment.subject}</p>
              </div>
            </div>
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/70 shrink-0">
              Submitted
            </span>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Schedule & Submission Timestamps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Due Date
                </span>
                <span className="font-semibold text-slate-800">
                  {assignment.dueDate}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Upload className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Submitted On
                </span>
                <span className="font-semibold text-slate-800">
                  {submittedAt || "Nov 4, 2026, 10:24 AM"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onViewSubmission}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-blue-500" />
            <span>View Submission</span>
          </button>
          <button
            type="button"
            onClick={onBackToAssignments}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Assignments</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentAssignmentSuccessView;

