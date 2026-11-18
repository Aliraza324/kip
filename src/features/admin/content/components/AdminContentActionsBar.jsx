import { Check, Loader2 } from "lucide-react";

export const AdminContentActionsBar = ({ onDiscard, onSave, isSaving = false }) => {
  return (
    <div className="flex items-center justify-end gap-3 pt-3">
      <button
        type="button"
        onClick={onDiscard}
        disabled={isSaving}
        className="px-6 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
      >
        Discard Changes
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
      >
        {isSaving ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Check className="w-4 h-4 stroke-[2.5]" />
        )}
        <span>{isSaving ? "Saving..." : "Save Changes"}</span>
      </button>
    </div>
  );
};

export default AdminContentActionsBar;
