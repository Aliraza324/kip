import { ArrowUpDown, ChevronDown, ClipboardList } from "lucide-react";
import { StudentAssignmentRow } from "./StudentAssignmentRow";

export const StudentAssignmentsTable = ({
  assignments,
  activeTab,
  onTabChange,
  sortOrder,
  onToggleSort,
  onViewAssignment,
}) => {
  const tabs = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "submitted", label: "Submitted" },
    { id: "overdue", label: "Overdue" },
  ];

  return (
    <div className="space-y-4">
      {/* Filters row: Tab Pills + Sort by Due Date */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right: Due Date Sort */}
        <button
          type="button"
          onClick={onToggleSort}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/90 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
          <span>Due date</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Table Layout */}
      <div className="space-y-3">
        {/* Header row for medium+ screens */}
        <div className="hidden md:flex items-center justify-between px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <div className="w-5/12">Assignment</div>
          <div className="w-2/12">Subject</div>
          <div className="w-2/12">Due date / time</div>
          <div className="w-1.5/12">Status</div>
          <div className="w-1.5/12 text-right">Action</div>
        </div>

        {/* Rows */}
        {assignments.length > 0 ? (
          <div className="space-y-2.5">
            {assignments.map((assignment) => (
              <StudentAssignmentRow
                key={assignment.id}
                assignment={assignment}
                onView={onViewAssignment}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-2xs">
            <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">
              No assignments found
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              There are no assignments in this category right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssignmentsTable;

