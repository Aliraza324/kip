import { useState, useEffect } from "react";
import { ChevronDown, Search, Loader2 } from "lucide-react";
import { useAdminTeachers } from "@/hooks/admin";
import { AdminTeacherRow } from "./AdminTeacherRow";
import { AdminEditTeacherModal } from "./AdminEditTeacherModal";
import { AdminDeleteTeacherModal } from "./AdminDeleteTeacherModal";

export const AdminTeachersTable = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showSubjectMenu, setShowSubjectMenu] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [deletingTeacher, setDeletingTeacher] = useState(null);

  // Debounce search input by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch teachers from backend via custom hook
  const { teachers, meta, counts, isLoading, isError, refetch } = useAdminTeachers({
    tab: activeTab,
    search: debouncedSearch || undefined,
    subject: selectedSubject || undefined,
    page: currentPage,
    limit: 15,
  });

  const availableSubjects = meta?.filters?.subjects || [];

  const toggleSelectAll = () => {
    if (selectedIds.length === teachers.length && teachers.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(teachers.map((t) => t.id || t._id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  return (
    <div className="space-y-4">
      {/* Tab Pills & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleTabChange("all")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/20"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80"
            }`}
          >
            All Teachers <span className="ml-1 opacity-90 font-semibold">{counts.all}</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("pending")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "pending"
                ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/20"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80"
            }`}
          >
            Pending Approval{" "}
            <span className="ml-1 opacity-90 font-semibold">{counts.pending}</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("active")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "active"
                ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/20"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80"
            }`}
          >
            Active <span className="ml-1 opacity-90 font-semibold">{counts.active}</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search teachers by name or ID..."
            className="w-full bg-white border border-slate-200/80 rounded-full pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0080f6] transition-colors shadow-2xs"
          />
        </div>

        {/* Subject Filter Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSubjectMenu((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <span>{selectedSubject ? `Subject: ${selectedSubject}` : "All Subjects"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showSubjectMenu && (
            <div className="absolute left-0 top-full mt-1.5 z-30 w-48 rounded-2xl bg-white border border-slate-200 shadow-xl p-1.5 space-y-0.5 text-xs font-medium text-slate-700">
              <button
                type="button"
                onClick={() => {
                  setSelectedSubject("");
                  setShowSubjectMenu(false);
                  setCurrentPage(1);
                }}
                className={`w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors ${
                  !selectedSubject ? "text-[#0080f6] font-bold bg-blue-50/50" : ""
                }`}
              >
                All Subjects
              </button>
              {availableSubjects.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => {
                    setSelectedSubject(sub);
                    setShowSubjectMenu(false);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors ${
                    selectedSubject === sub ? "text-[#0080f6] font-bold bg-blue-50/50" : ""
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === teachers.length && teachers.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-[#0080f6] focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-3 w-12">#</th>
                <th className="py-3.5 px-4">Teacher Name</th>
                <th className="py-3.5 px-4">Teacher ID</th>
                <th className="py-3.5 px-4">Subjects</th>
                <th className="py-3.5 px-4">Assigned Class(es)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
              {isLoading && teachers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#0080f6] mb-2" />
                    <span>Loading teachers...</span>
                  </td>
                </tr>
              ) : teachers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No teachers found matching your criteria.
                  </td>
                </tr>
              ) : (
                teachers.map((teacher, idx) => (
                  <AdminTeacherRow
                    key={teacher.id || teacher._id || idx}
                    teacher={teacher}
                    idx={idx}
                    isSelected={selectedIds.includes(teacher.id || teacher._id)}
                    onToggle={() => toggleSelectOne(teacher.id || teacher._id)}
                    onEdit={(t) => setEditingTeacher(t)}
                    onDelete={(t) => setDeletingTeacher(t)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            Showing {teachers.length} of {meta?.total || counts.all || teachers.length} teachers
          </span>

          {meta?.pages && meta.pages > 1 ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 disabled:text-slate-300 flex items-center justify-center hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              {Array.from({ length: meta.pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center cursor-pointer ${
                    currentPage === page
                      ? "bg-[#0080f6] text-white"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(meta.pages, p + 1))}
                disabled={currentPage >= meta.pages}
                className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 disabled:text-slate-300 flex items-center justify-center hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Edit Teacher Modal */}
      <AdminEditTeacherModal
        isOpen={Boolean(editingTeacher)}
        teacher={editingTeacher}
        onClose={() => setEditingTeacher(null)}
        onUpdated={() => {
          refetch();
        }}
      />

      {/* Delete Teacher Confirmation Modal */}
      <AdminDeleteTeacherModal
        isOpen={Boolean(deletingTeacher)}
        teacher={deletingTeacher}
        onClose={() => setDeletingTeacher(null)}
        onDeleted={() => {
          refetch();
        }}
      />
    </div>
  );
};

export default AdminTeachersTable;
