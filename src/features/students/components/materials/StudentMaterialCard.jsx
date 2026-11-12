import { FileText, Play, Code2, Download, Eye } from "lucide-react";

const getMaterialIcon = (material) => {
  if (material.type === "video" || material.subject === "Physics") {
    return <Play className="w-5 h-5 fill-current" />;
  }
  if (material.subject === "Computer Science") {
    return <Code2 className="w-5 h-5 stroke-[2.2]" />;
  }
  return <FileText className="w-5 h-5 stroke-[2.2]" />;
};

export const StudentMaterialCard = ({ material, onDownload, onView }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-3 sm:p-4 shadow-2xs hover:border-slate-200/90 hover:shadow-xs transition-all flex items-center justify-between gap-4">
      {/* Left: Icon & Title info */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 ${material.iconBg}`}
        >
          {getMaterialIcon(material)}
        </div>
        <div className="min-w-0">
          <span className="text-xs font-medium text-slate-400 block truncate">
            {material.subject}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
            {material.title}
          </h3>
        </div>
      </div>

      {/* Middle: File Meta format & size */}
      <div className="text-xs sm:text-sm font-medium text-slate-400 shrink-0 hidden sm:block">
        {material.meta}
      </div>

      {/* Right: Actions (Download & View) */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        <button
          type="button"
          onClick={() => onDownload(material)}
          title={`Download ${material.title}`}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full sm:rounded-2xl border border-blue-100 text-[#0080f6] bg-blue-50/40 hover:bg-blue-100/70 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
          aria-label={`Download ${material.title}`}
        >
          <Download className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        <button
          type="button"
          onClick={() => onView(material)}
          title={`View ${material.title} in Browser`}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full sm:rounded-2xl border border-blue-100 text-[#0080f6] bg-blue-50/40 hover:bg-blue-100/70 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
          aria-label={`View ${material.title}`}
        >
          <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>
      </div>
    </div>
  );
};

export default StudentMaterialCard;

