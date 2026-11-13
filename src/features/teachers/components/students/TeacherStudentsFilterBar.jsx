import { Search, GraduationCap, Layers, ChevronDown } from "lucide-react";

export const TeacherStudentsFilterBar = ({
  searchTerm,
  onSearchChange,
  selectedGrade,
  onGradeChange,
  selectedCourse,
  onCourseChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search students..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0080f6] focus:bg-white transition-all"
        />
      </div>

      {/* Grade Dropdown */}
      <div className="relative min-w-[150px]">
        <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <select
          value={selectedGrade}
          onChange={(e) => onGradeChange(e.target.value)}
          aria-label="Filter by Grade or Class"
          className="w-full appearance-none pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#0080f6] focus:bg-white cursor-pointer"
        >
          <option value="all">Grade/Class: All</option>
          <option value="grade 9">Grade 9</option>
          <option value="grade 8">Grade 8</option>
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Course Dropdown */}
      <div className="relative min-w-[150px]">
        <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <select
          value={selectedCourse}
          onChange={(e) => onCourseChange(e.target.value)}
          aria-label="Filter by Course"
          className="w-full appearance-none pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#0080f6] focus:bg-white cursor-pointer"
        >
          <option value="all">Course: All</option>
          <option value="mathematics">Mathematics</option>
          <option value="science">Science</option>
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};

export default TeacherStudentsFilterBar;

