import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Trophy,
  MessageSquare,
  Clock3,
  CheckCircle2,
  Download,
  UploadCloud,
} from "lucide-react";
import toast from "react-hot-toast";

export const StudentAssignmentResultView = ({
  assignment,
  onBack,
  onToggleGraded,
  onReSubmit,
}) => {
  const submission = assignment.submission || null;
  const isGraded = Boolean(
    assignment.isGraded ||
      submission?.status === "graded" ||
      assignment.status === "graded" ||
      (submission && submission.marks !== undefined && submission.marks !== null)
  );

  const dueObj = assignment.dueAt ? new Date(assignment.dueAt) : null;
  const dueDate =
    assignment.dueDate ||
    (dueObj
      ? dueObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "—");
  const dueTime =
    assignment.dueTime ||
    (dueObj
      ? dueObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      : "—");

  const getDueBadge = () => {
    if (assignment.dueBadge) return assignment.dueBadge;
    if (!dueObj) return "Due Soon";
    const now = new Date();
    if (dueObj < now) return "Overdue";
    const diffDays = Math.ceil((dueObj - now) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "Due Today";
    if (diffDays === 1) return "Due Tomorrow";
    return `Due in ${diffDays} Days`;
  };

  const rawInstructions =
    assignment.instructions ||
    (assignment.description
      ? assignment.description
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [
          "Solve all the problems in the practice set.",
          "Write your answers clearly and neatly.",
          "Submit your completed work as a PDF, JPG, or PNG file.",
        ]);

  const attachments =
    Array.isArray(assignment.attachments) && assignment.attachments.length > 0
      ? assignment.attachments
      : assignment.attachedFile
      ? [assignment.attachedFile]
      : [];

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    if (typeof bytes === "string") return bytes;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const submittedFile = submission?.file || assignment.submittedFile || null;
  const submittedAtFormatted = submission?.submittedAt
    ? new Date(submission.submittedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : assignment.submittedAt || "Recently submitted";

  const scoreDisplay =
    submission?.marks !== undefined && submission?.marks !== null
      ? `${submission.marks} / ${submission.totalMarks || assignment.totalMarks || 100}`
      : assignment.score || "92 / 100";

  const gradeLetterDisplay = submission?.gradeLetter || assignment.grade || "A";
  const feedbackDisplay =
    submission?.feedback ||
    assignment.teacherFeedback ||
    "Excellent work! Your solutions are correct and well-presented. Just make sure to show a bit more detail in steps for full marks.";

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white border border-slate-200/90 text-slate-700 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Assignment Details
        </h1>
      </div>

      {/* Grid: Left (Assignment info) + Right (Grading / Review state) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Assignment Details & Instructions */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xs space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 font-black text-lg flex items-center justify-center shrink-0">
                √x
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-slate-900 truncate">
                  {assignment.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  {assignment.subject}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100/70 text-amber-700 shrink-0">
              {getDueBadge()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 py-3 px-4 rounded-2xl bg-slate-50/70 border border-slate-100/80">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Due Date</span>
                <span className="font-semibold text-slate-800">{dueDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Due Time</span>
                <span className="font-semibold text-slate-800">{dueTime}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <FileText className="w-4 h-4 text-blue-500" />
              <span>Instructions</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
              {rawInstructions.map((inst, i) => (
                <li key={i} className="leading-relaxed">{inst}</li>
              ))}
            </ul>
          </div>

          {/* Teacher Reference Materials */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Reference Materials
            </span>
            {attachments.length > 0 ? (
              attachments.map((att, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                        {att.name || "Assignment_Material.pdf"}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {formatFileSize(att.size) || "PDF Document"}
                      </p>
                    </div>
                  </div>
                  {att.url && (
                    <button
                      type="button"
                      onClick={() => window.open(att.url, "_blank", "noopener,noreferrer")}
                      className="px-4 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer shrink-0 shadow-2xs active:scale-95"
                    >
                      View PDF
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No reference materials attached.</p>
            )}
          </div>
        </div>

        {/* Right Column: Grade / Waiting State Matching Image 4 */}
        <div className="lg:col-span-5 space-y-4">
          {/* Submitted File Card */}
          {submittedFile && (
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Your Submission
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {submittedAtFormatted}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                      {submittedFile.name || "My_Submission.pdf"}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {formatFileSize(submittedFile.size) || "PDF Document"}
                    </p>
                  </div>
                </div>
                {submittedFile.url && (
                  <button
                    type="button"
                    onClick={() => window.open(submittedFile.url, "_blank", "noopener,noreferrer")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer shrink-0 shadow-2xs active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                )}
              </div>
              {!isGraded && onReSubmit && (
                <button
                  type="button"
                  onClick={onReSubmit}
                  className="w-full mt-2 py-2 px-4 rounded-full border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 text-[#0080f6] text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Re-upload / Update Submission</span>
                </button>
              )}
            </div>
          )}

          {isGraded ? (
            <>
              {/* Grade Header Card */}
              <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-3xl p-5 sm:p-6 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Your Grade</span>
                    <span className="text-2xl font-black text-slate-900">
                      {scoreDisplay}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-400 block mb-1">Result</span>
                  <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-700 border border-emerald-200">
                    {gradeLetterDisplay}
                  </span>
                </div>
              </div>

              {/* Teacher Feedback Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <MessageSquare className="w-4 h-4 text-[#0080f6]" />
                  <span>Teacher Feedback</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {feedbackDisplay}
                </div>
              </div>
            </>
          ) : (
            /* Result Pending / Waiting for Teacher State */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xs text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
                <Clock3 className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Waiting for Teacher&apos;s Review
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Your submission was uploaded successfully. Result and personalized feedback will appear here as soon as the teacher grades it.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Status: Submitted &amp; Pending Evaluation</span>
              </div>
            </div>
          )}

          {/* Teacher Grading Simulator Toggle for Testing (if handler provided) */}
          {onToggleGraded && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => onToggleGraded(assignment.id)}
                className="text-xs text-slate-400 hover:text-[#0080f6] underline cursor-pointer"
              >
                Simulator: {isGraded ? "Switch to Waiting State" : "Simulate Teacher Grading (Grade Now)"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignmentResultView;

