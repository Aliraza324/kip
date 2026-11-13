import { Calendar, FileText, Download } from "lucide-react";

export const TeacherGradeSubmissionStudentCard = ({ submission }) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-5">
      <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
        Student Submission
      </h3>

      {/* Student Identity and Submission time */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
        <div className="flex items-center gap-3.5">
          <img
            src={submission?.avatar}
            alt={submission?.studentName}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-2xs shrink-0"
          />
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">
              {submission?.studentName || "Hassan Raza"}
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              {submission?.section || "Grade 9 – Section A"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-slate-500 font-semibold self-start sm:self-auto bg-white sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-xl border sm:border-0 border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block uppercase tracking-wider">
              Submitted On
            </span>
            <span className="text-slate-800 font-bold block">
              {submission?.submittedOn || "Nov 11, 2026, 02:47 PM"}
            </span>
          </div>
        </div>
      </div>

      {/* Submission File Download Row */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Submission File
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50/50 transition-all">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="text-sm font-bold text-slate-800 block truncate">
                {submission?.submissionFile || "Assignment.pdf"}
              </span>
              <span className="text-xs text-slate-400 font-medium block">
                {submission?.fileSize || "2.1 MB"}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#0080f6] border border-slate-200 hover:border-blue-200 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherGradeSubmissionStudentCard;

