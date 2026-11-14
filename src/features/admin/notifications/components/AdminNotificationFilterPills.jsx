import { Check, MoreHorizontal } from "lucide-react";

export const AdminNotificationFilterPills = ({
  categories,
  activeCategory,
  onSelectCategory,
  onMarkAllRead,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => onSelectCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isActive
                  ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 self-start lg:self-auto shrink-0">
        <button
          onClick={onMarkAllRead}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer"
        >
          <Check className="w-3.5 h-3.5 text-slate-500 stroke-[2.5]" />
          <span>Mark All as Read</span>
        </button>

        <button
          className="p-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 shadow-2xs transition-colors cursor-pointer"
          aria-label="More Options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AdminNotificationFilterPills;
