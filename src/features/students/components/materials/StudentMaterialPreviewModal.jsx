import { X, Download, ExternalLink, FileText, Play, Check } from "lucide-react";
import { openMaterialInBrowser, downloadMaterialFile } from "../../utils/pdfGenerator";
import toast from "react-hot-toast";

export const StudentMaterialPreviewModal = ({ isOpen, onClose, material }) => {
  if (!isOpen || !material) return null;

  const isVideo = material.type === "video";

  const handleOpenBrowserTab = () => {
    const success = openMaterialInBrowser(material);
    if (!success) {
      toast.error("Popup blocked. Please allow popups for this site.");
    } else {
      toast.success("Opened in new browser tab!");
    }
  };

  const handleDownload = () => {
    downloadMaterialFile(material);
    toast.success(`Downloading ${material.title}...`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${material.iconBg}`}
            >
              {isVideo ? (
                <Play className="w-5 h-5 fill-current" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-400 block">
                {material.subject}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                {material.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Details */}
        <div className="space-y-3.5">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {material.description}
          </p>

          {/* Key Topics List */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 space-y-2 max-h-56 overflow-y-auto">
            <p className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Resource Outline &amp; Topics:
            </p>
            {material.previewContent?.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {/* Meta Info Pill */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Instructor: {material.author}</span>
            <span>Uploaded: {material.uploadedDate}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Close
          </button>
          {!isVideo && (
            <button
              type="button"
              onClick={handleOpenBrowserTab}
              className="px-5 py-2.5 rounded-full border border-blue-200 bg-blue-50/60 text-[#0080f6] text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in Browser Tab</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-full bg-[#0080f6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center gap-2 hover:bg-[#0060d0] transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download ({material.format})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentMaterialPreviewModal;

