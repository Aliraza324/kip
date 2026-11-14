import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Eye, User } from "lucide-react";
import TeacherStudentsFilterBar from "./TeacherStudentsFilterBar";

export const TeacherStudentsTable = ({
  students = [],
  classId,
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const filteredStudents = useMemo(() => {
    return students.filter((stu) => {
      if (activeTab === "active" && stu.status.toLowerCase() !== "active") return false;
      if (activeTab === "inactive" && stu.status.toLowerCase() !== "inactive") return false;

      const term = searchTerm.toLowerCase();
      const matchesSearch =
        stu.name.toLowerCase().includes(term) ||
        (stu.roll && stu.roll.toLowerCase().includes(term));
      if (!matchesSearch) return false;

      if (selectedGrade !== "all" && !stu.grade.toLowerCase().includes(selectedGrade.toLowerCase())) {
        return false;
      }
      if (selectedCourse !== "all" && !stu.course.toLowerCase().includes(selectedCourse.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [students, activeTab, searchTerm, selectedGrade, selectedCourse]);

  return (
    <div className="space-y-4">
      {/* Status Pill Tabs matching SS 1 */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
        {[
          { id: "all", label: `All Students (${students.length})` },
          { id: "active", label: "Active (4)" },
          { id: "inactive", label: "Inactive (2)" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
              activeTab === tab.id
                ? "bg-[#0080f6] text-white shadow-xs"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-100 shadow-2xs"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        {/* Filters Row */}
        <TeacherStudentsFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedGrade={selectedGrade}
          onGradeChange={setSelectedGrade}
          selectedCourse={selectedCourse}
          onCourseChange={setSelectedCourse}
        />

        {/* Table Container */}
        <div className="overflow-x-auto no-scrollbar -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <table className="min-w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 font-bold border-y border-slate-100 text-xs">
                  <th className="py-3 px-4 rounded-l-xl">Student Name</th>
                  <th className="py-3 px-4">Grade/Class</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No students found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((stu) => {
                    const detailUrl = classId
                      ? `/teacher/students/class/${classId}/${stu.id}`
                      : `/teacher/students/detail/${stu.id}`;

                    return (
                      <tr key={stu.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-50 text-[#0080f6] flex items-center justify-center font-bold overflow-hidden ring-1 ring-slate-100 shrink-0">
                              {stu.avatar ? (
                                <img src={stu.avatar} alt={stu.name} className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-4 h-4" />
                              )}
                            </div>
                            <span className="font-bold text-slate-800 whitespace-nowrap">
                              {stu.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                          {stu.grade}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                          {stu.course}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            {stu.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <Link
                            to={detailUrl}
                            className="inline-flex w-8 h-8 rounded-full items-center justify-center text-[#0080f6] hover:bg-blue-50 transition-colors cursor-pointer"
                            title="View Student Details"
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
      </div>
    </div>
  );
};

export default TeacherStudentsTable;
