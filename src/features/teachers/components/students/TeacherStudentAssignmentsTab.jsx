import { useState } from "react";
import {
  Calendar,
  Layers,
  ChevronDown,
  FileText,
  Download,
  Eye,
} from "lucide-react";
import TeacherStudentAssignmentsFilterBar from "./TeacherStudentAssignmentsFilterBar";

export const TeacherStudentAssignmentsTab = ({ student }) => {
  const [selectedMonth, setSelectedMonth] = useState("oct-2026");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const assignments = student?.assignments || [];

  const handleReset = () => {
    setSelectedMonth("oct-2026");
    setSelectedSubject("all");
    setSelectedStatus("all");
  };

  return (
    <div className="space-y-4">
      {/* Top Filter Bar matching SS 4 */}
      <TeacherStudentAssignmentsFilterBar
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        selectedSubject={selectedSubject}
        onSubjectChange={setSelectedSubject}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onReset={handleReset}
      />

      {/* Assignments Card with Table */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Assignments ({assignments.length})
          </h3>

          <div className="flex items-center gap-3 self-end sm:self-auto text-xs font-semibold">
            <div className="relative">
              <select
                aria-label="Subject filter"
                className="appearance-none pl-7 pr-7 py-1.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 cursor-pointer"
              >
                <option>All Subjects</option>
                <option>Mathematics</option>
              </select>
              <Layers className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                aria-label="Date filter"
                className="appearance-none pl-7 pr-7 py-1.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 cursor-pointer"
              >
                <option>All Dates</option>
                <option>November 2024</option>
              </select>
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="text-[#0080f6] hover:underline font-bold"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto no-scrollbar -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <table className="min-w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 font-bold border-y border-slate-100 text-xs">
                  <th className="py-3 px-4 rounded-l-xl">Assignment Title</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Assigned Date</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">File</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assignments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No assignments found.
                    </td>
                  </tr>
                ) : (
                  assignments.map((asg) => (
                    <tr key={asg.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2.5 min-w-[200px]">
                          <FileText className="w-4 h-4 text-[#0080f6] shrink-0" />
                          <span>{asg.title}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                        {asg.subject}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-medium whitespace-nowrap text-xs">
                        {asg.assignedDate}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-medium whitespace-nowrap text-xs">
                        {asg.dueDate}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                          <span>✓</span>
                          <span>{asg.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2 text-slate-400">
                          <button
                            type="button"
                            className="p-1 hover:text-[#0080f6] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Download File"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-1 hover:text-[#0080f6] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="View Assignment"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherStudentAssignmentsTab;
