import { useState, useMemo } from "react";
import { ClipboardList, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { AdminAssignmentRow } from "./AdminAssignmentRow";

export const AdminClassAssignmentsTab = ({ assignments = [] }) => {
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedIds, setSelectedIds] = useState([]);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const subjects = ["All Subjects", "Mathematics", "English", "Physics", "Chemistry", "Biology"];
  const statuses = ["All Status", "Completed", "Pending"];

  const filtered = useMemo(() => {
    return assignments.filter((a) => {
      const matchSub = selectedSubject === "All Subjects" || a.subject === selectedSubject;
      const matchStat = selectedStatus === "All Status" || a.status === selectedStatus;
      return matchSub && matchStat;
    });
  }, [assignments, selectedSubject, selectedStatus]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  const toggleSelectAll = () => {
    setSelectedIds(selectedIds.length === paginated.length ? [] : paginated.map((a) => a.id));
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/70 p-5 sm:p-7 shadow-2xs space-y-5">
      {/* Tab Header & Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <ClipboardList className="w-8 h-8 text-[#0080f6] stroke-[2] shrink-0" />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0c1a40] tracking-tight whitespace-nowrap">
              Assignments ({assignments.length})
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              All assignments for Grade 9 – Section A.
            </p>
          </div>
        </div>

        {/* Dropdown filters */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
          {/* Subject Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setSubjectOpen(!subjectOpen); setStatusOpen(false); }}
              className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-white border border-slate-200/90 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs cursor-pointer hover:border-slate-300 transition-colors whitespace-nowrap"
            >
              <span>{selectedSubject}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>
            {subjectOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30">
                {subjects.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => { setSelectedSubject(sub); setSubjectOpen(false); setCurrentPage(1); }}
                    className="w-full text-left px-4 py-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 font-medium whitespace-nowrap"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setStatusOpen(!statusOpen); setSubjectOpen(false); }}
              className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-white border border-slate-200/90 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs cursor-pointer hover:border-slate-300 transition-colors whitespace-nowrap"
            >
              <span>{selectedStatus}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>
            {statusOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-40 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30">
                {statuses.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => { setSelectedStatus(st); setStatusOpen(false); setCurrentPage(1); }}
                    className="w-full text-left px-4 py-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 font-medium whitespace-nowrap"
                  >
                    {st}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table with responsive horizontal scrolling */}
      <div className="overflow-x-auto no-scrollbar -mx-5 sm:mx-0 px-5 sm:px-0">
        <table className="w-full text-left border-collapse min-w-[920px]">
          <thead>
            <tr className="border-b border-slate-200/80 text-xs sm:text-sm font-bold text-[#0c1a40] bg-[#eef4fb]">
              <th className="py-4 px-4 w-12 text-center whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={paginated.length > 0 && selectedIds.length === paginated.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-slate-300 text-[#0080f6] focus:ring-blue-400 cursor-pointer accent-[#0080f6]"
                />
              </th>
              <th className="py-4 px-3 w-12 font-bold text-[#0c1a40] whitespace-nowrap">#</th>
              <th className="py-4 px-4 font-bold text-[#0c1a40] whitespace-nowrap">Assignment Title</th>
              <th className="py-4 px-4 font-bold text-[#0c1a40] whitespace-nowrap">Subject</th>
              <th className="py-4 px-4 font-bold text-[#0c1a40] whitespace-nowrap">Assigned Date</th>
              <th className="py-4 px-4 font-bold text-[#0c1a40] whitespace-nowrap">Due Date</th>
              <th className="py-4 px-4 font-bold text-[#0c1a40] whitespace-nowrap">Status</th>
              <th className="py-4 px-4 font-bold text-[#0c1a40] whitespace-nowrap">Submissions</th>
              <th className="py-4 px-4 font-bold text-[#0c1a40] text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/90 text-xs sm:text-sm font-medium text-slate-700">
            {paginated.map((a) => (
              <AdminAssignmentRow
                key={a.id}
                assignment={a}
                isSelected={selectedIds.includes(a.id)}
                onToggleSelect={() => toggleSelectOne(a.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
        <p className="text-xs sm:text-sm text-slate-500 font-normal whitespace-nowrap">
          Showing 1–{paginated.length} of {filtered.length} assignments
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-8 h-8 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2]" />
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                currentPage === page ? "bg-[#0080f6] text-white shadow-xs" : "text-slate-600 hover:bg-slate-50 font-semibold"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="w-6 h-8 flex items-center justify-center text-slate-400 text-xs font-semibold">...</span>
          <button
            type="button"
            onClick={() => setCurrentPage(6)}
            className="w-8 h-8 rounded-full text-slate-600 flex items-center justify-center text-xs font-semibold hover:bg-slate-50 cursor-pointer"
          >
            6
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(6, p + 1))}
            className="w-8 h-8 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminClassAssignmentsTab;
