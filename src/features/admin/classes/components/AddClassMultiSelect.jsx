import { ChevronDown } from "lucide-react";

export const AddClassMultiSelect = ({
  label,
  required,
  items,
  availableItems,
  onRemoveItem,
  onAddItem,
  isOpen,
  onToggleOpen,
}) => {
  return (
    <div className="relative">
      <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div
        onClick={onToggleOpen}
        className="w-full min-h-[46px] p-2 rounded-2xl border border-slate-200/90 flex flex-wrap items-center justify-between gap-1.5 bg-white cursor-pointer shadow-2xs"
      >
        <div className="flex flex-wrap items-center gap-1.5">
          {items.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveItem(item);
                }}
                className="hover:text-rose-500 font-bold ml-0.5"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-30 max-h-40 overflow-y-auto">
          {availableItems.map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => onAddItem(val)}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              {val}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddClassMultiSelect;

