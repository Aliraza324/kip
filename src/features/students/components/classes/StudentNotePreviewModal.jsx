import { X, FileText, Download } from "lucide-react";

export const StudentNotePreviewModal = ({ isOpen, onClose, note }) => {
  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {note.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {note.topic} • {note.format} ({note.size})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Note Mock Body / Preview Content */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm text-slate-700 space-y-3 max-h-72 overflow-y-auto">
          <p className="font-semibold text-slate-900">
            Document Summary:
          </p>
          <p className="leading-relaxed text-slate-600">
            {note.description}
          </p>
          <div className="p-3 bg-white rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
            <p>• Verified by Course Instructor</p>
            <p>• Uploaded on {note.uploadedDate}</p>
            <p>• Formatted for high-resolution print & offline study</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              alert(`Downloading ${note.title} (${note.format})`);
            }}
            className="py-2 px-5 rounded-full bg-[#0080f6] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#0060d0] shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Note</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentNotePreviewModal;

