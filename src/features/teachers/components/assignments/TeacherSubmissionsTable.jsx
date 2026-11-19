import { Link } from "react-router-dom";
import { FileText, Eye, User } from "lucide-react";

export const TeacherSubmissionsTable = ({
  assignmentId,
  items = [],
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
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No enrolled students or submissions found.
                  </td>
                </tr>
              ) : (
                items.map((row, idx) => {
                  const stu = row.student || {};
                  const sub = row.submission || null;
                  const statusRaw = (row.status || sub?.status || "pending").toLowerCase();
                  const isGraded = statusRaw === "graded";
                  const isSubmitted = statusRaw === "submitted";

                  let badgeClass = "bg-amber-50 text-amber-600 border-amber-200/60";
                  let statusText = "Pending";
                  if (isGraded) {
                    badgeClass = "bg-emerald-50 text-emerald-600 border-emerald-200/60";
                    statusText = "Graded";
                  } else if (isSubmitted) {
                    badgeClass = "bg-teal-50 text-teal-600 border-teal-200/60";
                    statusText = "Submitted";
                  }

                  const studentName = stu.fullName || stu.name || "Student";
                  const studentAvatar = typeof stu.avatar === "string" ? stu.avatar : stu.avatar?.url || null;

                  const fileName = sub?.file?.name || "Submission.pdf";
                  const fileUrl = sub?.file?.url || null;

                  const submittedOnFormatted = sub?.submittedAt
                    ? new Date(sub.submittedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—";

                  const marksDisplay =
                    sub?.marks != null
                      ? `${sub.marks} / ${sub.totalMarks || 100}`
                      : "—";

                  const gradeUrl = sub?.id
                    ? `/teacher/assignments/${assignmentId}/submissions/${sub.id}/grade`
                    : null;

                  return (
                    <tr key={stu.id || idx} className="hover:bg-slate-50/50 transition-colors">
                      {/* Index */}
                      <td className="py-3.5 px-4 font-bold text-slate-400">
                        {idx + 1}
                      </td>

                      {/* Student Avatar + Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0080f6] flex items-center justify-center font-bold overflow-hidden ring-1 ring-slate-100 shrink-0">
                            {studentAvatar ? (
                              <img
                                src={studentAvatar}
                                alt={studentName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-4 h-4" />
                            )}
                          </div>
                          <span className="font-bold text-slate-800 whitespace-nowrap">
                            {studentName}
                          </span>
                        </div>
                      </td>

                      {/* Submission file */}
                      <td className="py-3.5 px-4 font-semibold text-slate-700 whitespace-nowrap">
                        {sub?.file ? (
                          <a
                            href={fileUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[#0080f6] hover:underline"
                            title="Open submission file"
                          >
                            <FileText className="w-4 h-4 shrink-0" />
                            <span className="truncate max-w-[180px]">{fileName}</span>
                          </a>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      {/* Submitted On */}
                      <td className="py-3.5 px-4 text-slate-500 font-medium whitespace-nowrap text-xs">
                        {submittedOnFormatted}
                      </td>

                      {/* Status badge */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize ${badgeClass}`}
                        >
                          {statusText}
                        </span>
                      </td>

                      {/* Marks */}
                      <td className="py-3.5 px-4 font-bold text-slate-800 whitespace-nowrap">
                        {marksDisplay}
                      </td>

                      {/* Action: Eye button -> SS 4 Grade Student */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        {gradeUrl ? (
                          <Link
                            to={gradeUrl}
                            className="inline-flex w-8 h-8 rounded-full items-center justify-center text-[#0080f6] hover:bg-blue-50 transition-colors cursor-pointer"
                            title="View & Grade Submission"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        ) : (
                          <span
                            className="inline-flex w-8 h-8 rounded-full items-center justify-center text-slate-300 cursor-not-allowed"
                            title="No submission yet"
                          >
                            <Eye className="w-4 h-4" />
                          </span>
                        )}
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
  );
};

export default TeacherSubmissionsTable;
