import { ChevronLeft, ChevronRight } from "lucide-react";

export const AdminClassesPagination = ({
  currentPage = 1,
  totalItems = 24,
  itemsPerPage = 5,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers with ellipsis (e.g., 1, 2, 3, '...', 5)
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1];
    if (currentPage > 3) {
      pages.push("...");
    }
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (currentPage < totalPages - 2) {
      if (!pages.includes("...")) pages.push("...");
    }
    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1 px-1">
      {/* Information Text */}
      <p className="text-xs sm:text-sm text-slate-500 font-normal">
        Showing <span className="font-semibold text-slate-700">{startItem}–{endItem}</span> of{" "}
        <span className="font-semibold text-slate-700">{totalItems}</span> classes
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          className="w-8 h-8 rounded-full border border-slate-200/90 text-slate-500 hover:text-slate-800 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Page items */}
        {getPageNumbers().map((p, idx) => {
          if (p === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-8 h-8 flex items-center justify-center text-slate-400 text-xs font-semibold"
              >
                ...
              </span>
            );
          }
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#0080f6] text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
              }`}
            >
              {p}
            </button>
          );
        })}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          className="w-8 h-8 rounded-full border border-slate-200/90 text-slate-500 hover:text-slate-800 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 stroke-[2]" />
        </button>
      </div>
    </div>
  );
};

export default AdminClassesPagination;

