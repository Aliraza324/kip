import { Filter, ChevronDown, RotateCcw, FileText, Download, Eye } from "lucide-react";

export const AdminStudentAssignmentsTab = ({ student }) => {
  const assignments = student.assignments || [];

  return (
    <div className="space-y-4">
      {/* Top Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-2xs">
        <div className="flex items-center gap-2 text-slate-500 font-bold text-xs sm:text-sm mr-2">
          <Filter className="w-4 h-4 text-[#0080f6]" />
          <span>Filter:</span>
        </div>
        <button className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5">
          <span>October 2026</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
        <button className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5">
          <span>All Subjects</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
        <button className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5">
          <span>All Status</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
        <button className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-[#0080f6] hover:underline cursor-pointer">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Assignments ({assignments.length})
          </h3>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 flex items-center gap-1">
              <span>All Subjects</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            <button className="px-3 py-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 flex items-center gap-1">
              <span>All Dates</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            <button className="text-xs font-bold text-slate-400 hover:text-slate-600 ml-1">
              Reset
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Assignment Title</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Assigned Date</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">File</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
              {assignments.map((asg) => (
                <tr key={asg.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-900">{asg.title}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{asg.subject}</td>
                  <td className="py-3.5 px-4 text-slate-500">{asg.assignedDate}</td>
                  <td className="py-3.5 px-4 text-slate-500">{asg.dueDate}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">
                      ✓ {asg.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#0080f6] hover:bg-blue-50 cursor-pointer"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#0080f6] hover:bg-blue-50 cursor-pointer"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentAssignmentsTab;
