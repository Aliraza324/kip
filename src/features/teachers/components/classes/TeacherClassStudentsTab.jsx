import { useState, useEffect, useMemo } from "react";
import { Search, Layers, ChevronDown, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { useTeacherClassStudents } from "@/hooks";

export const TeacherClassStudentsTab = ({
  classId,
  classItem = {},
  assignedSubjects = [],
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Combine subjects list from props and classItem
  const availableCourses = useMemo(() => {
    const list = [];
    if (Array.isArray(assignedSubjects)) {
      list.push(...assignedSubjects);
    }
    if (Array.isArray(classItem?.subjects)) {
      classItem.subjects.forEach((s) => {
        const name = typeof s === "string" ? s : s.name;
        if (name && !list.includes(name)) list.push(name);
      });
    }
    return list;
  }, [assignedSubjects, classItem]);

  const { students, meta, classInfo, isLoading, isError, error, refetch } =
    useTeacherClassStudents(classId, {
      search: debouncedSearch,
      subject: selectedCourse,
      page: currentPage,
      limit: itemsPerPage,
    });

  const totalCount = meta?.total ?? students.length;
  const totalPages = meta?.totalPages ?? Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  // Generate page numbers
  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-2xs space-y-5">
      {/* Search and Filters Bar (Grade/Class: All removed per user instructions) */}
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

        {/* Course / Subject Filter (Populated with assigned subjects) */}
        <div className="relative min-w-[170px]">
          <Layers className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter by Course"
            className="w-full appearance-none pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#0080f6] focus:bg-white cursor-pointer transition-all"
          >
            <option value="all">Course: All</option>
            {availableCourses.map((crs) => (
              <option key={crs} value={crs}>
                {crs}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Error display */}
      {!isLoading && isError && (
        <div className="bg-red-50 border border-red-200/80 rounded-2xl p-4 text-center space-y-2">
          <AlertCircle className="w-5 h-5 text-red-500 mx-auto" />
          <p className="text-xs text-red-600 font-semibold">
            {error?.message || "Failed to load class students."}
          </p>
          <button
            type="button"
            onClick={refetch}
            className="text-xs font-bold text-red-700 underline cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Table Container */}
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
              {isLoading ? (
                /* Skeleton rows */
                [1, 2, 3, 4, 5].map((n) => (
                  <tr key={n} className="animate-pulse">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0" />
                        <div className="space-y-1.5">
                          <div className="w-24 h-3 bg-slate-100 rounded" />
                          <div className="w-14 h-2.5 bg-slate-100 rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="w-16 h-3 bg-slate-100 rounded" />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="w-20 h-3 bg-slate-100 rounded" />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="w-14 h-5 bg-slate-100 rounded-full" />
                    </td>
                  </tr>
                ))
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    No students found in this class.
                  </td>
                </tr>
              ) : (
                students.map((stu) => {
                  const studentName = stu.fullName || stu.name || "Student";
                  const studentRoll = stu.code || stu.roll || "—";
                  const studentGrade =
                    stu.grade || classInfo?.name || classItem?.name || "Class";
                  const studentCourse =
                    selectedCourse !== "all"
                      ? selectedCourse
                      : stu.course || availableCourses[0] || classItem?.name || "General";
                  const isActive = (stu.status || "active").toLowerCase() === "active";

                  return (
                    <tr
                      key={stu.id || stu._id || studentRoll}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Student Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {stu.avatar ? (
                            <img
                              src={typeof stu.avatar === "string" ? stu.avatar : stu.avatar?.url}
                              alt={studentName}
                              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-100 shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0080f6] font-bold text-xs flex items-center justify-center shrink-0">
                              {(studentName || "S")[0].toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0">
                            <span className="font-bold text-slate-800 block truncate">
                              {studentName}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium block">
                              {studentRoll}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Grade / Class */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                        {studentGrade}
                      </td>

                      {/* Course */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                        {studentCourse}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                            isActive
                              ? "bg-emerald-50 text-emerald-600 border-emerald-200/60"
                              : "bg-slate-50 text-slate-500 border-slate-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? "bg-emerald-500" : "bg-slate-400"
                            }`}
                          />
                          <span className="capitalize">{stu.status || "Active"}</span>
                        </span>
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
      {!isLoading && totalCount > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{startItem}</span> to{" "}
            <span className="font-bold text-slate-800">{endItem}</span> of{" "}
            <span className="font-bold text-slate-800">{totalCount}</span> students
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-xl border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {pageNumbers.map((p, idx) =>
              p === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 text-xs font-bold"
                >
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentPage === p
                      ? "bg-[#0080f6] text-white shadow-2xs"
                      : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              )
            )}

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-8 h-8 rounded-xl border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherClassStudentsTab;
