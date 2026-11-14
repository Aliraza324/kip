import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { adminTeachersMock } from "@/mocks";
import { AdminTeacherRow } from "./AdminTeacherRow";

export const AdminTeachersTable = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredTeachers = adminTeachersMock.filter((t) => {
    if (activeTab === "pending") return t.status === "Pending Approval";
    if (activeTab === "active") return t.status === "Active";
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredTeachers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTeachers.map((t) => t.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {/* Tab Pills */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "all"
              ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/20"
              : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80"
          }`}
        >
          All Teachers <span className="ml-1 opacity-90 font-semibold">86</span>
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "pending"
              ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/20"
              : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80"
          }`}
        >
          Pending Approval <span className="ml-1 opacity-90 font-semibold">3</span>
        </button>
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "active"
              ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/20"
              : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80"
          }`}
        >
          Active <span className="ml-1 opacity-90 font-semibold">79</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        {["All Subjects", "All Classes", "All Status"].map((f) => (
          <button
            key={f}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <span>{f}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredTeachers.length && filteredTeachers.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-[#0080f6] focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-3 w-12">#</th>
                <th className="py-3.5 px-4">Teacher Name</th>
                <th className="py-3.5 px-4">Teacher ID</th>
                <th className="py-3.5 px-4">Subjects</th>
                <th className="py-3.5 px-4">Assigned Class(es)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
              {filteredTeachers.map((teacher, idx) => (
                <AdminTeacherRow
                  key={teacher.id}
                  teacher={teacher}
                  idx={idx}
                  isSelected={selectedIds.includes(teacher.id)}
                  onToggle={() => toggleSelectOne(teacher.id)}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>Showing 1–{filteredTeachers.length} of 86 teachers</span>
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
              18
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

export default AdminTeachersTable;
