import { SlidersHorizontal, Calendar, Layers, User, RotateCcw } from "lucide-react";

export const StudentAttendanceFilterBar = ({
  selectedMonth,
  onMonthChange,
  selectedSubject,
  onSubjectChange,
  selectedStatus,
  onStatusChange,
  onReset,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
      {/* Left Filter Dropdowns */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-1.5 font-bold text-slate-700 mr-1">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <span>Filter:</span>
        </div>

        {/* Month Dropdown */}
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="appearance-none bg-white border border-slate-200/90 rounded-full pl-8 pr-8 py-2 font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs outline-none"
          >
            <option value="October 2026">October 2026</option>
            <option value="September 2026">September 2026</option>
            <option value="November 2026">November 2026</option>
          </select>
          <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Subject Dropdown */}
        <div className="relative">
          <select
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="appearance-none bg-white border border-slate-200/90 rounded-full pl-8 pr-8 py-2 font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs outline-none"
          >
            <option value="all">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Physics">Physics</option>
          </select>
          <Layers className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="appearance-none bg-white border border-slate-200/90 rounded-full pl-8 pr-8 py-2 font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs outline-none"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="leave">Leave</option>
            <option value="absent">Absent</option>
          </select>
          <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Right: Reset Filters */}
      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-1.5 font-bold text-[#0080f6] hover:underline cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Filters</span>
      </button>
    </div>
  );
};

export default StudentAttendanceFilterBar;

