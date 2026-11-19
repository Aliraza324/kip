import { useState, useMemo } from "react";
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
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const rawAssignments = student?.assignments || [];

  const handleReset = () => {
    setSelectedMonth("all");
    setSelectedSubject("all");
    setSelectedStatus("all");
  };

  const filteredAssignments = useMemo(() => {
    return rawAssignments.filter((asg) => {
      if (selectedSubject !== "all" && asg.subject?.toLowerCase() !== selectedSubject.toLowerCase()) {
        return false;
      }
      if (selectedStatus !== "all" && asg.status?.toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [rawAssignments, selectedSubject, selectedStatus]);

  const handleDownload = (asg) => {
    const fileUrl = asg.submission?.file?.url || asg.fileUrl;
    if (fileUrl) {
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = asg.submission?.file?.name || asg.title || "assignment";
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // Empty placeholder as requested by user until student portal submission endpoint is connected
    }
  };

  const handleView = (asg) => {
    const fileUrl = asg.submission?.file?.url || asg.fileUrl;
    if (fileUrl) {
      window.open(fileUrl, "_blank", "noopener,noreferrer");
    }
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
            Assignments ({filteredAssignments.length})
          </h3>

          <div className="flex items-center gap-3 self-end sm:self-auto text-xs font-semibold">
            <button
              type="button"
              onClick={handleReset}
              className="text-[#0080f6] hover:underline font-bold cursor-pointer"
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
                {filteredAssignments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No assignments found.
                    </td>
                  </tr>
                ) : (
                  filteredAssignments.map((asg) => {
                    const isSubmitted = (asg.status || "").toLowerCase() === "submitted";
                    const isGraded = (asg.status || "").toLowerCase() === "graded";

                    return (
                      <tr key={asg.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          <div className="flex items-center gap-2.5 min-w-[200px]">
                            <FileText className="w-4 h-4 text-[#0080f6] shrink-0" />
                            <span className="truncate">{asg.title}</span>
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
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                              isSubmitted || isGraded
                                ? "bg-emerald-50 text-emerald-600 border-emerald-200/60"
                                : "bg-amber-50 text-amber-600 border-amber-200/60"
                            }`}
                          >
                            <span>✓</span>
                            <span className="capitalize">{asg.status}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2 text-slate-400">
                            <button
                              type="button"
                              onClick={() => handleDownload(asg)}
                              className="p-1 hover:text-[#0080f6] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                              title="Download File"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleView(asg)}
                              className="p-1 hover:text-[#0080f6] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                              title="View Assignment"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
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
    </div>
  );
};

export default TeacherStudentAssignmentsTab;
