import { Filter, Calendar, Layers, UserCheck, ChevronDown } from "lucide-react";

export const TeacherAssignmentsFilterBar = ({
  activeTab,
  onTabChange,
  selectedMonth,
  onMonthChange,
  selectedSubject,
  onSubjectChange,
  selectedStatus,
  onStatusChange,
  onResetFilters,
}) => {
  const tabs = [
    { id: "all", label: "All Assignments (24)" },
    { id: "pending", label: "Pending (6)" },
    { id: "submitted", label: "Submitted (16)" },
    { id: "overdue", label: "Overdue (2)" },
  ];

  return (
    <div className="space-y-4">
      {/* Status Pill Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#0080f6] text-white shadow-xs"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-100 shadow-2xs hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters row */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-2xs flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 mr-1">
          <Filter className="w-4 h-4 text-slate-500" />
          <span>Filter:</span>
        </div>

        {/* Month Dropdown */}
        <div className="relative">
          <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            aria-label="Filter by month"
            className="appearance-none pl-9 pr-8 py-2 bg-slate-50 hover:bg-slate-100/70 border border-slate-100 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#0080f6] cursor-pointer transition-all"
          >
            <option value="oct-2026">October 2026</option>
            <option value="nov-2026">November 2026</option>
            <option value="all">All Dates</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Subject Dropdown */}
        <div className="relative">
          <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            aria-label="Filter by subject"
            className="appearance-none pl-9 pr-8 py-2 bg-slate-50 hover:bg-slate-100/70 border border-slate-100 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#0080f6] cursor-pointer transition-all"
          >
            <option value="all">All Subjects</option>
            <option value="algebra">Algebra</option>
            <option value="geometry">Geometry</option>
            <option value="trigonometry">Trigonometry</option>
            <option value="statistics">Statistics</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filter by status"
            className="appearance-none pl-9 pr-8 py-2 bg-slate-50 hover:bg-slate-100/70 border border-slate-100 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#0080f6] cursor-pointer transition-all"
          >
            <option value="all">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Reset button */}
        <button
          type="button"
          onClick={onResetFilters}
          className="text-xs sm:text-sm font-bold text-[#0080f6] hover:underline cursor-pointer sm:ml-auto"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default TeacherAssignmentsFilterBar;

