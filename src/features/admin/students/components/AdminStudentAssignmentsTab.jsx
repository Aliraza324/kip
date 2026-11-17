import { useState, useMemo } from "react";
import { Filter, ChevronDown, RotateCcw, FileText, Download, Eye, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export const AdminStudentAssignmentsTab = ({ assignments = [] }) => {
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewingSubmission, setViewingSubmission] = useState(null);

  // Derive unique subjects dynamically from real assignments
  const subjects = useMemo(() => {
    return Array.from(
      new Set(assignments.map((a) => a.subject).filter(Boolean))
    );
  }, [assignments]);

  // Filter assignments
  const filteredAssignments = useMemo(() => {
    return assignments.filter((asg) => {
      if (selectedSubject !== "all" && asg.subject !== selectedSubject) {
        return false;
      }
      if (selectedStatus !== "all") {
        const s = (asg.status || "").toLowerCase();
        if (selectedStatus === "graded" && !asg.isGraded) return false;
        if (selectedStatus === "submitted" && s !== "submitted" && !asg.submission) return false;
        if (selectedStatus === "pending" && (asg.submission || s === "submitted" || s === "graded")) return false;
        if (selectedStatus === "late" && !asg.submission?.isLate) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = (asg.title || "").toLowerCase().includes(q);
        const matchesSub = (asg.subject || "").toLowerCase().includes(q);
        if (!matchesTitle && !matchesSub) return false;
      }
      return true;
    });
  }, [assignments, selectedSubject, selectedStatus, searchQuery]);

  const handleReset = () => {
    setSelectedSubject("all");
    setSelectedStatus("all");
    setSearchQuery("");
  };

  return (
    <div className="space-y-4">
      {/* Top Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-2xs">
        <div className="flex items-center gap-2 text-slate-500 font-bold text-xs sm:text-sm mr-2">
          <Filter className="w-4 h-4 text-[#0080f6]" />
          <span>Filters:</span>
        </div>

        {/* Subject Filter */}
        <div className="relative">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 outline-none cursor-pointer"
          >
            <option value="all">All Subjects</option>
            {subjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="graded">Graded</option>
            <option value="submitted">Submitted</option>
            <option value="pending">Pending</option>
            <option value="late">Late Submission</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#0080f6] w-40 sm:w-52"
        />

        {(selectedSubject !== "all" || selectedStatus !== "all" || searchQuery) && (
          <button
            onClick={handleReset}
            className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-[#0080f6] hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Assignments ({filteredAssignments.length})
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            Total {assignments.length} assigned task(s)
          </span>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Assignment Title</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Marks / Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Submission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
              {filteredAssignments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <span>No assignments found matching the criteria.</span>
                  </td>
                </tr>
              ) : (
                filteredAssignments.map((asg) => {
                  const isGraded = asg.isGraded || asg.submission?.marks !== undefined;
                  const isSubmitted = Boolean(asg.submission);
                  const isLate = asg.submission?.isLate;
                  const fileUrl = asg.submission?.file?.url;

                  return (
                    <tr key={asg.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{asg.title}</span>
                            {asg.submission?.submittedAt && (
                              <span className="text-[11px] text-slate-400 block">
                                Submitted {new Date(asg.submission.submittedAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {asg.subject || "General"}
                      </td>

                      <td className="py-3.5 px-4 text-slate-500">
                        {asg.deadline ? new Date(asg.deadline).toLocaleDateString() : "—"}
                      </td>

                      <td className="py-3.5 px-4">
                        {isGraded ? (
                          <span className="font-black text-emerald-600">
                            {asg.submission.marks} / {asg.totalMarks ?? 100}
                            {asg.submission.gradeLetter ? ` (${asg.submission.gradeLetter})` : ""}
                          </span>
                        ) : (
                          <span className="text-slate-400 font-semibold">
                            — / {asg.totalMarks ?? 100}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        {isGraded ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Graded</span>
                          </span>
                        ) : isSubmitted ? (
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                            isLate ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-[#0080f6]"
                          }`}>
                            <Clock className="w-3.5 h-3.5" />
                            <span>{isLate ? "Submitted Late" : "Submitted"}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                            <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                            <span>Pending</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        {fileUrl ? (
                          <div className="flex items-center justify-center gap-2">
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              download
                              className="p-1.5 rounded-lg text-slate-500 hover:text-[#0080f6] hover:bg-blue-50 transition-colors cursor-pointer"
                              title="Download Submission File"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                            <button
                              type="button"
                              onClick={() => setViewingSubmission(asg)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-[#0080f6] hover:bg-blue-50 transition-colors cursor-pointer"
                              title="View Submission Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">No File</span>
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

      {/* Submission Preview Modal */}
      {viewingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 animate-in zoom-in-95 duration-150 space-y-4">
            <h4 className="text-lg font-black text-slate-900">
              {viewingSubmission.title}
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Subject:</span>
                <span className="font-bold text-slate-800">{viewingSubmission.subject}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Marks:</span>
                <span className="font-bold text-emerald-600">
                  {viewingSubmission.submission?.marks ?? "Not Graded"} / {viewingSubmission.totalMarks}
                </span>
              </div>
              {viewingSubmission.submission?.feedback && (
                <div className="py-2">
                  <span className="text-slate-500 block mb-1">Teacher Feedback:</span>
                  <p className="p-3 rounded-xl bg-slate-50 text-slate-700 italic border border-slate-100">
                    "{viewingSubmission.submission.feedback}"
                  </p>
                </div>
              )}
              {viewingSubmission.submission?.file?.url && (
                <div className="pt-2">
                  <a
                    href={viewingSubmission.submission.file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#0080f6] text-white font-bold text-xs hover:bg-blue-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Submitted File</span>
                  </a>
                </div>
              )}
            </div>
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingSubmission(null)}
                className="px-5 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudentAssignmentsTab;
