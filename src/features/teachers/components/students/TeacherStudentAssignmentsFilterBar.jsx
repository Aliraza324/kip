import { Filter, Calendar, Layers, UserCheck, ChevronDown } from "lucide-react";

export const TeacherStudentAssignmentsFilterBar = ({
  selectedMonth,
  onMonthChange,
  selectedSubject,
  onSubjectChange,
  selectedStatus,
  onStatusChange,
  onReset,
}) => {
  return (
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
          className="appearance-none pl-9 pr-8 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#0080f6] cursor-pointer"
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
          className="appearance-none pl-9 pr-8 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#0080f6] cursor-pointer"
        >
          <option value="all">All Subjects</option>
          <option value="mathematics">Mathematics</option>
          <option value="science">Science</option>
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
          className="appearance-none pl-9 pr-8 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#0080f6] cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="submitted">Submitted</option>
          <option value="pending">Pending</option>
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      <button
        type="button"
        onClick={onReset}
        className="text-xs sm:text-sm font-bold text-[#0080f6] hover:underline cursor-pointer sm:ml-auto"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default TeacherStudentAssignmentsFilterBar;

