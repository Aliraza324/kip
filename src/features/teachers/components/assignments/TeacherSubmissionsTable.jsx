import { Link } from "react-router-dom";
import { FileText, Eye } from "lucide-react";

export const TeacherSubmissionsTable = ({
  assignmentId,
  submissions = [],
}) => {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
      {/* Table Container */}
      <div className="overflow-x-auto no-scrollbar -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold border-y border-slate-100 text-xs">
                <th className="py-3 px-4 w-12 rounded-l-xl">#</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Submission</th>
                <th className="py-3 px-4">Submitted On</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4">Marks</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No submissions available.
                  </td>
                </tr>
              ) : (
                submissions.map((sub, idx) => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Index */}
                    <td className="py-3.5 px-4 font-bold text-slate-400">
                      {idx + 1}
                    </td>

                    {/* Student Avatar + Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={sub.avatar}
                          alt={sub.studentName}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-100 shrink-0"
                        />
                        <span className="font-bold text-slate-800 whitespace-nowrap">
                          {sub.studentName}
                        </span>
                      </div>
                    </td>

                    {/* Submission file */}
                    <td className="py-3.5 px-4 font-semibold text-slate-700 whitespace-nowrap">
                      {sub.submissionFile ? (
                        <div className="flex items-center gap-2 text-[#0080f6]">
                          <FileText className="w-4 h-4 shrink-0" />
                          <span className="hover:underline">{sub.submissionFile}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Submitted On */}
                    <td className="py-3.5 px-4 text-slate-500 font-medium whitespace-nowrap text-xs">
                      {sub.submittedOn || "—"}
                    </td>

                    {/* Status badge */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          sub.status === "Graded" || sub.status === "Submitted"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200/60"
                            : "bg-amber-50 text-amber-600 border-amber-200/60"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>

                    {/* Marks */}
                    <td className="py-3.5 px-4 font-bold text-slate-800 whitespace-nowrap">
                      {sub.marks !== null ? `${sub.marks} / ${sub.totalMarks}` : "—"}
                    </td>

                    {/* Action: Eye button -> SS 4 Grade Student */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/teacher/assignments/${assignmentId}/submissions/${sub.id}/grade`}
                        className="inline-flex w-8 h-8 rounded-full items-center justify-center text-[#0080f6] hover:bg-blue-50 transition-colors cursor-pointer"
                        title="View & Grade Submission"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
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

export default TeacherSubmissionsTable;

