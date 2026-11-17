import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search, ChevronDown, ChevronLeft, ChevronRight,
  Eye, Edit2, Trash2, Users, RefreshCw, Loader2,
} from "lucide-react";
import { useAdminStudents } from "@/hooks/admin";
import { classService } from "@/service/apiService";
import { AdminEditStudentModal } from "./AdminEditStudentModal";
import { AdminDeleteStudentModal } from "./AdminDeleteStudentModal";
import { AdminStudentRow } from "./AdminStudentRow";

export const AdminClassStudentsTable = ({ classId: initialClassId }) => {
  const [selectedClassId, setSelectedClassId] = useState(initialClassId || "all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [classesList, setClassesList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load classes for the filter dropdown
  useEffect(() => {
    classService
      .getAll({ limit: 100 })
      .then((res) => {
        const items = res?.data || (Array.isArray(res) ? res : []);
        setClassesList(items);
      })
      .catch(() => setClassesList([]));
  }, []);

  // Fetch students from real backend
  const { students, meta, isLoading, refetch } = useAdminStudents({
    classId: selectedClassId,
    status: selectedStatus,
    search: debouncedSearch,
    page: currentPage,
    limit: itemsPerPage,
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === students.length && students.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map((s) => s.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalCount = meta?.total ?? students.length;
  const totalPages = meta?.totalPages ?? Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  return (
    <div className="space-y-4">
      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Class Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedClassId}
              onChange={(e) => {
                setSelectedClassId(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none pl-4 pr-9 py-2 rounded-full bg-white border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs outline-none cursor-pointer"
            >
              <option value="all">All Classes</option>
              {classesList.map((cls) => (
                <option key={cls.id || cls._id} value={cls.id || cls._id}>
                  {cls.name} {cls.grade ? `(${cls.grade})` : ""}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none pl-4 pr-9 py-2 rounded-full bg-white border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            className="p-2 rounded-full bg-white border border-slate-200/80 text-slate-500 hover:text-[#0080f6] hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-[#0080f6]" : ""}`} />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-full border border-slate-200/90 text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#0080f6] bg-white transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === students.length && students.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-[#0080f6] focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-3 w-12">#</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Student ID</th>
                <th className="py-3.5 px-4">Class</th>
                <th className="py-3.5 px-4">Gender</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#0080f6] mb-2" />
                    <span>Loading students...</span>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-medium">
                    <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <span>No students found.</span>
                  </td>
                </tr>
              ) : (
                students.map((stu, idx) => (
                  <AdminStudentRow
                    key={stu.id}
                    student={stu}
                    index={(currentPage - 1) * itemsPerPage + idx + 1}
                    isSelected={selectedIds.includes(stu.id)}
                    onToggleSelect={() => toggleSelectOne(stu.id)}
                    onEdit={(s) => setEditingStudent(s)}
                    onDelete={(s) => setDeletingStudent(s)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            Showing {startItem}–{endItem} of {totalCount} students
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-7 h-7 rounded-lg border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 cursor-pointer disabled:opacity-40"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 h-7 rounded-lg bg-[#0080f6] text-white font-bold flex items-center justify-center">
              {currentPage}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-7 h-7 rounded-lg border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 cursor-pointer disabled:opacity-40"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Student Modal */}
      <AdminEditStudentModal
        isOpen={Boolean(editingStudent)}
        onClose={() => setEditingStudent(null)}
        student={editingStudent}
        onUpdated={() => {
          refetch();
          setEditingStudent(null);
        }}
      />

      {/* Delete Student Modal */}
      <AdminDeleteStudentModal
        isOpen={Boolean(deletingStudent)}
        onClose={() => setDeletingStudent(null)}
        student={deletingStudent}
        onDeleted={() => {
          refetch();
          setDeletingStudent(null);
        }}
      />
    </div>
  );
};

export default AdminClassStudentsTable;
