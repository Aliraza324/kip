import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Edit3, MoreHorizontal, ChevronDown } from "lucide-react";
import { adminStudentsMock } from "@/mocks";

export const AdminClassStudentsTable = ({ classId }) => {
  const [students] = useState(
    classId
      ? adminStudentsMock.filter((s) => s.classId === classId || !classId)
      : adminStudentsMock
  );
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === students.length) {
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

  return (
    <div className="space-y-4">
      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <span>All Classes</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <span>All Status</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
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
                <th className="py-3.5 px-4">Username</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
              {students.map((stu, idx) => (
                <tr key={stu.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(stu.id)}
                      onChange={() => toggleSelectOne(stu.id)}
                      className="w-4 h-4 rounded border-slate-300 text-[#0080f6] focus:ring-blue-500 cursor-pointer"
                    />
                  </td>
                  <td className="py-3.5 px-3 text-slate-400 font-semibold">{idx + 1}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={stu.avatar}
                        alt={stu.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <span className="font-bold text-slate-900">{stu.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{stu.studentId}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0080f6] text-xs font-semibold">
                      {stu.className}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{stu.username}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        stu.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {stu.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/admin/students/${stu.studentId}`}
                        title="View Student Details"
                        className="p-1.5 rounded-lg text-[#0080f6] hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        title="Edit Student"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="More Options"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>Showing 1–{students.length} of 1,248 students</span>
          <div className="flex items-center gap-1.5">
            <button className="w-7 h-7 rounded-lg border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 cursor-pointer">
              &lt;
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#0080f6] text-white font-bold flex items-center justify-center">
              1
            </button>
            <button className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 cursor-pointer">
              2
            </button>
            <button className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 cursor-pointer">
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 cursor-pointer">
              250
            </button>
            <button className="w-7 h-7 rounded-lg border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 cursor-pointer">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClassStudentsTable;
