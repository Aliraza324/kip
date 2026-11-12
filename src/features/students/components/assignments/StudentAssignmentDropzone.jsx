import { UploadCloud, FileCheck, X } from "lucide-react";

export const StudentAssignmentDropzone = ({
  fileInputRef,
  isDragging,
  setIsDragging,
  selectedFile,
  setSelectedFile,
  validateAndSetFile,
}) => {
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all ${
          isDragging
            ? "border-[#0080f6] bg-blue-50/50"
            : "border-blue-200/80 bg-blue-50/20"
        }`}
      >
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-blue-50 text-[#0080f6] flex items-center justify-center mb-3">
          <UploadCloud className="w-8 sm:w-9 h-8 sm:h-9" />
        </div>
        <h3 className="font-bold text-slate-900 text-base sm:text-lg">
          Upload Your Assignment
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Drag and drop your file here, or click to browse
        </p>
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
        <p className="text-[11px] text-slate-400 mt-3 sm:mt-4">
          Supported formats: PDF, JPG, PNG (Max 10 MB)
        </p>
      </div>

      {selectedFile && (
        <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">
                {selectedFile.name}
              </p>
              <p className="text-[10px] text-slate-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
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
    </div>
  );
};

export default StudentAssignmentDropzone;

