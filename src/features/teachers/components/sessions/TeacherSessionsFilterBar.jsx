import { Search, Calendar, ChevronDown } from "lucide-react";

export const TeacherSessionsFilterBar = ({
  searchQuery,
  onSearchChange,
  selectedGrade,
  onGradeChange,
  selectedCourse,
  onCourseChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search session.."
          className="w-full bg-white border border-slate-200/80 rounded-2xl pl-11 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0080f6] shadow-2xs"
        />
      </div>

      {/* Filter 1: Date/Time */}
      <button
        type="button"
        className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-between sm:justify-center gap-2 shadow-2xs"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Date /Time</span>
        </div>
      </button>

      {/* Filter 2: Grade Dropdown */}
      <div className="relative w-full sm:w-auto">
        <select
          value={selectedGrade}
          onChange={(e) => onGradeChange(e.target.value)}
          className="w-full sm:w-auto appearance-none bg-white border border-slate-200/80 rounded-2xl pl-4 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 outline-none focus:border-[#0080f6] shadow-2xs cursor-pointer"
        >
          <option value="all">√x Grade: All</option>
          <option value="Grade 8">Grade 8</option>
          <option value="Grade 9">Grade 9</option>
          <option value="Grade 10">Grade 10</option>
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Filter 3: Course Dropdown */}
      <div className="relative w-full sm:w-auto">
        <select
          value={selectedCourse}
          onChange={(e) => onCourseChange(e.target.value)}
          className="w-full sm:w-auto appearance-none bg-white border border-slate-200/80 rounded-2xl pl-4 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 outline-none focus:border-[#0080f6] shadow-2xs cursor-pointer"
        >
          <option value="all">📚 Course: All</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="Computer Science">Computer Science</option>
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};

export default TeacherSessionsFilterBar;

