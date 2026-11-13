import { useState, useMemo } from "react";
import { Search, GraduationCap, Layers, ChevronDown } from "lucide-react";

export const TeacherClassStudentsTab = ({ students = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const filteredStudents = useMemo(() => {
    return students.filter((stu) => {
      const matchesSearch =
        stu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stu.roll.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGrade =
        selectedGrade === "all" || stu.grade.toLowerCase().includes(selectedGrade.toLowerCase());
      const matchesCourse =
        selectedCourse === "all" || stu.course.toLowerCase().includes(selectedCourse.toLowerCase());
      return matchesSearch && matchesGrade && matchesCourse;
    });
  }, [students, searchTerm, selectedGrade, selectedCourse]);

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-2xs space-y-5">
      {/* Search and Filters Bar matching SS 3 */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search students..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0080f6] focus:bg-white transition-all"
          />
        </div>

        {/* Grade / Class Filter */}
        <div className="relative min-w-[150px]">
          <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            aria-label="Filter by Grade or Class"
            className="w-full appearance-none pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#0080f6] focus:bg-white cursor-pointer transition-all"
          >
            <option value="all">Grade/Class: All</option>
            <option value="grade 9">Grade 9</option>
            <option value="grade 8">Grade 8</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Course Filter */}
        <div className="relative min-w-[150px]">
          <Layers className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            aria-label="Filter by Course"
            className="w-full appearance-none pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#0080f6] focus:bg-white cursor-pointer transition-all"
          >
            <option value="all">Course: All</option>
            <option value="mathematics">Mathematics</option>
            <option value="science">Science</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Table Container - View Icon removed per user command #3 */}
      <div className="overflow-x-auto no-scrollbar -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold border-y border-slate-100">
                <th className="py-3 px-4 rounded-l-xl">Student Name</th>
                <th className="py-3 px-4">Grade/Class</th>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-4 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    No students found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((stu) => (
                  <tr key={stu.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Student Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={stu.avatar}
                          alt={stu.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-slate-800 block truncate">
                            {stu.name}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium block">
                            {stu.roll}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Grade / Class */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                      {stu.grade}
                    </td>

                    {/* Course */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                      {stu.course}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {stu.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassStudentsTab;

