import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle, RefreshCw } from "lucide-react";
import { useTeacherAssignmentSubmissions } from "@/hooks";
import {
  TeacherSubmissionsSummaryHeader,
  TeacherSubmissionsStatsCards,
  TeacherSubmissionsTable,
} from "../components/assignments";

export const TeacherAssignmentSubmissionsPage = () => {
  const { assignmentId } = useParams();
  const { assignment, stats, items, isLoading, isError, error, refetch } =
    useTeacherAssignmentSubmissions(assignmentId);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-pulse">
        <div className="w-40 h-5 bg-slate-100 rounded" />
        <div className="bg-white rounded-3xl p-5 border border-slate-100 h-24" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 h-24" />
          <div className="bg-white rounded-3xl p-5 border border-slate-100 h-24" />
          <div className="bg-white rounded-3xl p-5 border border-slate-100 h-24" />
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 h-72" />
      </div>
    );
  }

  if (isError || !assignment) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-black text-slate-900">
          Assignment Not Available
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          {error?.message || "The requested assignment could not be found or you may not have access."}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/teacher/assignments"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Assignments</span>
          </Link>
          <button
            type="button"
            onClick={refetch}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0080f6] text-white text-xs font-bold hover:bg-blue-600 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner matching SS 3 */}
      <TeacherSubmissionsSummaryHeader
        assignment={assignment}
        badgeText={assignment?.status || "Active"}
        backTo="/teacher/assignments"
        backLabel="Back to Assignments"
      />

      {/* KPI Stats Cards matching SS 3 */}
      <TeacherSubmissionsStatsCards
        totalStudents={stats?.totalStudents ?? 0}
        submitted={stats?.submitted ?? 0}
        pending={stats?.pending ?? 0}
      />

      {/* Submissions Table matching SS 3 */}
      <TeacherSubmissionsTable
        assignmentId={assignmentId}
        items={items}
      />
    </div>
  );
};

export default TeacherAssignmentSubmissionsPage;
