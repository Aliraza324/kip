import { useState, useMemo } from "react";
import {
  Users, Search, Upload, Plus, ChevronLeft, ChevronRight,
} from "lucide-react";
import { AdminStudentRow } from "./AdminStudentRow";

export const AdminClassStudentsTab = ({
  students = [],
  onAddStudent,
  onImportStudents,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.studentId.toLowerCase().includes(q)
      );
    });
  }, [students, searchQuery]);

  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(start, start + itemsPerPage);
  }, [filteredStudents, currentPage]);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedStudents.map((s) => s.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/70 p-5 sm:p-7 shadow-2xs space-y-5">
      {/* Tab Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <Users className="w-8 h-8 text-[#0080f6] stroke-[2] shrink-0" />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0c1a40] tracking-tight">
              Students (32)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              List of all students in Grade 9 – Section A.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <div className="relative flex-1 sm:w-60 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student by name or ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-full border border-slate-200/90 text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#0080f6] transition-all bg-[#f8fbfe]/50 focus:bg-white"
            />
          </div>

          <button
            type="button"
            onClick={onImportStudents}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200/90 text-slate-700 hover:bg-slate-50 font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import Students</span>
          </button>

          <button
            type="button"
            onClick={onAddStudent}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto no-scrollbar -mx-5 sm:mx-0 px-5 sm:px-0">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-200/80 text-xs sm:text-sm font-bold text-[#0c1a40] bg-[#eef4fb]">
              <th className="py-4 px-4 w-12 text-center whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={
                    paginatedStudents.length > 0 &&
                    selectedIds.length === paginatedStudents.length
                  }
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-slate-300 text-[#0080f6] focus:ring-blue-400 cursor-pointer accent-[#0080f6]"
                />
              </th>
              <th className="py-4 px-3 w-12 font-bold text-slate-900 whitespace-nowrap">#</th>
              <th className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">Student Name</th>
              <th className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">Student ID</th>
              <th className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">Gender</th>
              <th className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">Status</th>
              <th className="py-4 px-4 font-bold text-slate-900 text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/90 text-xs sm:text-sm font-medium text-slate-700">
            {paginatedStudents.map((s) => (
              <AdminStudentRow
                key={s.id}
                student={s}
                isSelected={selectedIds.includes(s.id)}
                onToggleSelect={() => toggleSelectOne(s.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <p className="text-xs text-slate-500">
          Showing 1–5 of 32 students
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-8 h-8 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="w-8 h-8 rounded-full bg-[#0080f6] text-white flex items-center justify-center text-xs font-bold shadow-xs">
            1
          </span>
          <span className="w-8 h-8 rounded-full text-slate-600 flex items-center justify-center text-xs">
            2
          </span>
          <span className="w-8 h-8 rounded-full text-slate-600 flex items-center justify-center text-xs">
            3
          </span>
          <span className="w-8 h-8 flex items-center justify-center text-slate-400 text-xs">
            ...
          </span>
          <span className="w-8 h-8 rounded-full text-slate-600 flex items-center justify-center text-xs">
            7
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => p + 1)}
            className="w-8 h-8 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminClassStudentsTab;
