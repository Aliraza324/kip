import { BookOpen, Plus, Download, FileText, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export const TeacherSessionMaterialsTab = ({ materials = [], onUploadClick, onRemoveMaterial }) => {
  const handleDownload = (mat) => {
    toast.success(`Downloading ${mat.title}...`);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Course Materials ({materials.length})
          </h3>
        </div>

        <button
          type="button"
          onClick={onUploadClick}
          className="px-4 py-2 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-blue-500/25 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Upload Material</span>
        </button>
      </div>

      {/* Materials List */}
      <div className="space-y-3 pt-1">
        {materials.map((mat) => (
          <div
            key={mat.id}
            className="p-4 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-4 transition-colors"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">{mat.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {mat.type} • {mat.size} • {mat.uploadDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleDownload(mat)}
                className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
              {onRemoveMaterial && (
                <button
                  type="button"
                  onClick={() => onRemoveMaterial(mat.id)}
                  className="p-2 rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherSessionMaterialsTab;

