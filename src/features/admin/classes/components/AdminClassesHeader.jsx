import { Layers, Plus } from "lucide-react";

export const AdminClassesHeader = ({
  title = "Classes",
  subtitle = "Manage classes, teachers, and class assignments.",
  onAddClass,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title & Badge */}
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-2xs text-[#0080f6] flex items-center justify-center shrink-0">
          <Layers className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Add Class Action */}
      <button
        type="button"
        onClick={onAddClass}
        className="self-start sm:self-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>Add Class</span>
      </button>
    </div>
  );
};

export default AdminClassesHeader;

