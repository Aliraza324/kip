import { Check } from "lucide-react";

export const AdminContentActionsBar = ({ onDiscard, onSave }) => {
  return (
    <div className="flex items-center justify-end gap-3 pt-3">
      <button
        type="button"
        onClick={onDiscard}
        className="px-6 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
      >
        Discard Changes
      </button>
      <button
        type="button"
        onClick={onSave}
        className="px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center gap-1.5"
      >
        <Check className="w-4 h-4 stroke-[2.5]" />
        <span>Save Changes</span>
      </button>
    </div>
  );
};

export default AdminContentActionsBar;
