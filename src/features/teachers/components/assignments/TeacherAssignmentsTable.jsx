import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FileText, Eye, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export const TeacherAssignmentsTable = ({ assignments = [] }) => {
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sorting
  const sortedAssignments = useMemo(() => {
    const list = [...assignments];
    if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.createdAt || b.dueAt || 0) - new Date(a.createdAt || a.dueAt || 0));
    } else if (sortBy === "oldest") {
      list.sort((a, b) => new Date(a.createdAt || a.dueAt || 0) - new Date(b.createdAt || b.dueAt || 0));
    } else if (sortBy === "due-date") {
      list.sort((a, b) => new Date(a.dueAt || 0) - new Date(b.dueAt || 0));
    }
    return list;
  }, [assignments, sortBy]);

  const totalCount = sortedAssignments.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  const paginatedAssignments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedAssignments.slice(start, start + itemsPerPage);
  }, [sortedAssignments, currentPage, itemsPerPage]);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
      {/* Table Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
          Assignment List
        </h3>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-slate-400 font-semibold">Sort:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Sort assignments"
              className="appearance-none pl-3 pr-7 py-1.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#0080f6] cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="due-date">Due Date</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto no-scrollbar -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold border-y border-slate-100 text-xs">
                <th className="py-3 px-4 rounded-l-xl">Assignment Title</th>
                <th className="py-3 px-3">Class</th>
                <th className="py-3 px-3">Subject</th>
                <th className="py-3 px-3">Due Date</th>
                <th className="py-3 px-3">Submissions</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedAssignments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No assignments found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedAssignments.map((asg) => {
                  const status = (asg.status || "pending").toLowerCase();
                  let badgeColor = "bg-amber-50 text-amber-600 border-amber-200/60";
                  let statusLabel = asg.status || "Pending";

                  if (status === "submitted" || status === "completed") {
                    badgeColor = "bg-emerald-50 text-emerald-600 border-emerald-200/60";
                    statusLabel = "Submitted";
                  } else if (status === "overdue") {
                    badgeColor = "bg-rose-50 text-rose-500 border-rose-200/60";
                    statusLabel = "Overdue";
                  }

                  const className =
                    asg.class?.name ||
                    (asg.class?.grade ? `Grade ${asg.class.grade}` : "") ||
                    asg.grade ||
                    "Class";

                  const dueDateFormatted = asg.dueAt
                    ? new Date(asg.dueAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : asg.dueDate || "—";

                  const submissionsCount =
                    asg.submissions ||
                    `${asg.submittedCount ?? 0} / ${asg.totalStudents ?? 0}`;

                  return (
                    <tr key={asg.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Title */}
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2.5 min-w-[200px]">
                          <FileText className="w-4 h-4 text-[#0080f6] shrink-0" />
                          <span className="truncate">{asg.title}</span>
                        </div>
                      </td>

                      {/* Class */}
                      <td className="py-3.5 px-3 text-slate-600 font-medium whitespace-nowrap">
                        {className}
                      </td>

                      {/* Subject */}
                      <td className="py-3.5 px-3 text-slate-600 font-medium whitespace-nowrap">
                        {asg.subject}
                      </td>

                      {/* Due Date */}
                      <td className="py-3.5 px-3 text-slate-500 font-medium whitespace-nowrap text-xs">
                        {dueDateFormatted}
                      </td>

                      {/* Submissions */}
                      <td className="py-3.5 px-3 font-bold text-slate-800 whitespace-nowrap">
                        {submissionsCount}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize ${badgeColor}`}
                        >
                          {statusLabel}
                        </span>
                      </td>

                      {/* Actions: Eye button -> SS 3 Submissions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <Link
                          to={`/teacher/assignments/${asg.id}/submissions`}
                          className="inline-flex w-8 h-8 rounded-full items-center justify-center text-[#0080f6] hover:bg-blue-50 transition-colors cursor-pointer"
                          title="View Submissions"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      {totalCount > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500 font-medium border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-800">{startItem}</strong>-
            <strong className="text-slate-800">{endItem}</strong> of{" "}
            <strong className="text-slate-800">{totalCount}</strong> assignments
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-7 h-7 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setCurrentPage(p)}
                className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center cursor-pointer transition-all ${
                  currentPage === p
                    ? "bg-[#0080f6] text-white shadow-2xs"
                    : "border border-slate-100 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-7 h-7 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAssignmentsTable;
