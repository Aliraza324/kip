import { useState, useRef } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  UploadCloud,
  Send,
  X,
  FileCheck,
} from "lucide-react";
import toast from "react-hot-toast";

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

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Submit Assignment
        </h1>
      </div>

      {/* Main Grid: Details (Left) + Upload Area (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Card: Assignment Details & Instructions */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xs space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 font-black text-lg flex items-center justify-center shrink-0">
                √x
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {assignment.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  {assignment.subject}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100/70 text-amber-700 shrink-0">
              {assignment.dueBadge || "Due in 2 Days"}
            </span>
          </div>

          {/* Schedule Row */}
          <div className="grid grid-cols-2 gap-4 py-3 px-4 rounded-2xl bg-slate-50/70 border border-slate-100/80">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Due Date</span>
                <span className="font-semibold text-slate-800">{assignment.dueDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Due Time</span>
                <span className="font-semibold text-slate-800">{assignment.dueTime}</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <FileText className="w-4 h-4 text-blue-500" />
              <span>Instructions</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
              {assignment.instructions?.map((inst, i) => (
                <li key={i} className="leading-relaxed">{inst}</li>
              ))}
            </ul>
          </div>

          {/* Attached Material Card */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                  {assignment.attachedFile?.name || "Algebra_Practice_Set.pdf"}
                </p>
                <p className="text-[11px] text-slate-400">
                  {assignment.attachedFile?.size || "1.2 MB"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toast.success("Opening assignment guidelines PDF...")}
              className="px-4 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer shrink-0"
            >
              View PDF
            </button>
          </div>
        </div>

        {/* Right Card: Upload Dropzone & Actions */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xs space-y-6">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all ${
              isDragging ? "border-[#0080f6] bg-blue-50/50" : "border-blue-200/80 bg-blue-50/20"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0080f6] flex items-center justify-center mb-3">
              <UploadCloud className="w-9 h-9" />
            </div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">Upload Your Assignment</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">Drag and drop your file here, or click to browse</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && validateAndSetFile(e.target.files[0])}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 px-6 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              Choose File
            </button>
            <p className="text-[11px] text-slate-400 mt-4">Supported formats: PDF, JPG, PNG (Max 10 MB)</p>
          </div>

          {/* Selected File Feedback */}
          {selectedFile && (
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{selectedFile.name}</p>
                  <p className="text-[10px] text-slate-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="p-1 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Submitting..." : "Submit Assignment"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSubmitAssignmentForm;

