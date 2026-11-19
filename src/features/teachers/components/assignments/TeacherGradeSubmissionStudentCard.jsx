import { Calendar, FileText, Download, User } from "lucide-react";

export const TeacherGradeSubmissionStudentCard = ({ submission, student }) => {
  const stu = student || submission?.student || {};
  const studentName = stu.fullName || stu.name || "Student";
  const studentAvatar = typeof stu.avatar === "string" ? stu.avatar : stu.avatar?.url || null;
  const sectionOrClass =
    (stu.class?.grade ? `Grade ${stu.class.grade}` : "") ||
    stu.class?.name ||
    stu.grade ||
    stu.section ||
    "Enrolled Student";

  const submittedOnFormatted = submission?.submittedAt
    ? new Date(submission.submittedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  const file = submission?.file || null;
  const fileName = file?.name || "Submission_Document.pdf";
  const fileUrl = file?.url || null;

  const formatFileSize = (bytes) => {
    if (!bytes || isNaN(bytes)) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDownload = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-5">
      <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
        Student Submission
      </h3>

      {/* Student Identity and Submission time */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0080f6] flex items-center justify-center font-bold overflow-hidden ring-2 ring-white shadow-2xs shrink-0">
            {studentAvatar ? (
              <img
                src={studentAvatar}
                alt={studentName}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6" />
            )}
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">
              {studentName}
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              {sectionOrClass}
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
              {submittedOnFormatted}
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
                {fileName}
              </span>
              {file?.size && (
                <span className="text-xs text-slate-400 font-medium block">
                  {formatFileSize(file.size)}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            disabled={!fileUrl}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#0080f6] border border-slate-200 hover:border-blue-200 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs disabled:opacity-40 disabled:pointer-events-none active:scale-95"
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
