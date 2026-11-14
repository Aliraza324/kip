import { BookOpen, Trash2 } from "lucide-react";

export const AddClassSubjectItem = ({ subject, onRemove }) => {
  return (
    <div className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/90 flex items-center justify-between bg-white shadow-2xs">
      <div className="flex items-center gap-3">
        <BookOpen className="w-4 h-4 text-[#0080f6]" />
        <span className="text-xs sm:text-sm font-semibold text-slate-800">
          {subject}
        </span>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        aria-label={`Remove subject ${subject}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AddClassSubjectItem;

