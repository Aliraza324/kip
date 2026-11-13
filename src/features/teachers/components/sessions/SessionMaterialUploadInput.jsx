import { UploadCloud, FileText, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export const SessionMaterialUploadInput = ({ attachedFiles, onAttach, onRemove }) => {
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newItems = files.map((f) => ({
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
    }));
    onAttach(newItems);
    toast.success(`${files.length} file(s) attached`);
  };

  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-slate-700">Upload Class Related Material</label>
      <label className="border-2 border-dashed border-slate-200 hover:border-[#0080f6] rounded-2xl p-3.5 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50">
        <UploadCloud className="w-5 h-5 text-slate-400 mb-1" />
        <span className="text-xs font-semibold text-slate-700">Click to upload class material</span>
        <span className="text-[11px] text-slate-400">PDF, PPT, DOC (Max 25MB)</span>
        <input type="file" multiple className="hidden" onChange={handleFileUpload} />
      </label>

      {attachedFiles.length > 0 && (
        <div className="space-y-1.5 pt-1">
          {attachedFiles.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between px-3 py-1.5 bg-blue-50/60 rounded-xl text-xs text-slate-700 border border-blue-100">
              <div className="flex items-center gap-2 truncate">
                <FileText className="w-3.5 h-3.5 text-[#0080f6] shrink-0" />
                <span className="truncate font-medium">{file.name}</span>
                <span className="text-[10px] text-slate-400">({file.size})</span>
              </div>
              <button type="button" onClick={() => onRemove(idx)} className="text-slate-400 hover:text-red-500">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionMaterialUploadInput;

