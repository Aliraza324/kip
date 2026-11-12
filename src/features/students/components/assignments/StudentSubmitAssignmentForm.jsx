import { useState, useRef } from "react";
import { ArrowLeft, Calendar, Clock, FileText, Send } from "lucide-react";
import toast from "react-hot-toast";
import { StudentAssignmentDropzone } from "./StudentAssignmentDropzone";

export const StudentSubmitAssignmentForm = ({
  assignment,
  onBack,
  onSubmitSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const validateAndSetFile = (file) => {
    if (!file) return;
    const allowedExtensions = ["pdf", "jpg", "jpeg", "png"];
    const ext = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      toast.error("Unsupported format. Please upload a PDF, JPG, or PNG file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File exceeds the 10 MB maximum size limit.");
      return;
    }
    setSelectedFile(file);
    toast.success(`Selected "${file.name}"`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please upload your assignment file before submitting.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Assignment submitted successfully!");
      onSubmitSuccess(assignment, selectedFile);
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header with Back Button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white border border-slate-200/90 text-slate-700 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Submit Assignment
        </h1>
      </div>

      {/* Main Grid: Details (Left) + Upload Area (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left Card: Assignment Details & Instructions */}
        <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-5 sm:space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
              <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-2xl bg-purple-100 text-purple-600 font-black text-base sm:text-lg flex items-center justify-center shrink-0">
                √x
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-xl font-bold text-slate-900 truncate">
                  {assignment.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  {assignment.subject}
                </p>
              </div>
            </div>
            <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-amber-100/70 text-amber-700 shrink-0">
              {assignment.dueBadge || "Due in 2 Days"}
            </span>
          </div>

          {/* Schedule Row */}
          <div className="grid grid-cols-2 gap-3 py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-2xl bg-slate-50/70 border border-slate-100/80">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Due Date</span>
                <span className="font-semibold text-slate-800 text-xs sm:text-sm">{assignment.dueDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Due Time</span>
                <span className="font-semibold text-slate-800 text-xs sm:text-sm">{assignment.dueTime}</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm">
              <FileText className="w-4 h-4 text-blue-500" />
              <span>Instructions</span>
            </div>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
              {assignment.instructions?.map((inst, i) => (
                <li key={i} className="leading-relaxed">{inst}</li>
              ))}
            </ul>
          </div>

          {/* Attached Material Card */}
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                  {assignment.attachedFile?.name || "Algebra_Practice_Set.pdf"}
                </p>
                <p className="text-[10px] sm:text-[11px] text-slate-400">
                  {assignment.attachedFile?.size || "1.2 MB"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toast.success("Opening assignment guidelines PDF...")}
              className="px-3 sm:px-4 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer shrink-0"
            >
              View PDF
            </button>
          </div>
        </div>

        {/* Right Card: Upload Dropzone & Actions */}
        <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-5">
          <StudentAssignmentDropzone
            fileInputRef={fileInputRef}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            validateAndSetFile={validateAndSetFile}
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-60"
            >
              <Send className="w-4 h-4 shrink-0" />
              <span>{isSubmitting ? "Submitting..." : "Submit Assignment"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSubmitAssignmentForm;
