import { Link } from "react-router-dom";
import { FileText, Eye, MoreHorizontal, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export const TeacherAssignmentsTable = ({ assignments = [] }) => {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
      {/* Table Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
          Assignment List
        </h3>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-slate-400 font-semibold">Sort:</span>
          <div className="relative">
            <select
              aria-label="Sort assignments"
              className="appearance-none pl-3 pr-7 py-1.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#0080f6] cursor-pointer"
            >
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Due Date</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto no-scrollbar -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold border-y border-slate-100 text-xs">
                <th className="py-3 px-4 rounded-l-xl">Assignment Title</th>
                <th className="py-3 px-3">Class</th>
                <th className="py-3 px-3">Subject</th>
                <th className="py-3 px-3">Due Date</th>
                <th className="py-3 px-3">Submissions</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assignments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No assignments found.
                  </td>
                </tr>
              ) : (
                assignments.map((asg) => (
                  <tr key={asg.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Title */}
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2.5 min-w-[200px]">
                        <FileText className="w-4 h-4 text-[#0080f6] shrink-0" />
                        <span className="truncate">{asg.title}</span>
                      </div>
                    </td>

                    {/* Class */}
                    <td className="py-3.5 px-3 text-slate-600 font-medium whitespace-nowrap">
                      {asg.grade}
                    </td>

                    {/* Subject */}
                    <td className="py-3.5 px-3 text-slate-600 font-medium whitespace-nowrap">
                      {asg.subject}
                    </td>

                    {/* Due Date */}
                    <td className="py-3.5 px-3 text-slate-500 font-medium whitespace-nowrap text-xs">
                      {asg.dueDate}
                    </td>

                    {/* Submissions */}
                    <td className="py-3.5 px-3 font-bold text-slate-800 whitespace-nowrap">
                      {asg.submissions}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${asg.badgeColor}`}
                      >
                        {asg.status}
                      </span>
                    </td>

                    {/* Actions: Eye button -> SS 3 */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/teacher/assignments/${asg.id}/submissions`}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#0080f6] hover:bg-blue-50 transition-colors cursor-pointer"
                          title="View Submissions"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="More options"
                        >
                          <MoreHorizontal className="w-4 h-4" />
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

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500 font-medium">
        <span>Showing 1-5 of 24 assignments</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-lg bg-[#0080f6] text-white font-bold flex items-center justify-center cursor-pointer shadow-2xs"
          >
            1
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            2
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            3
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            4
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            5
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignmentsTable;

