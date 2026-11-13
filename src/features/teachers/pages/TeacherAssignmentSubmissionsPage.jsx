import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { teacherAssignmentsListMock } from "@/mocks";
import {
  TeacherSubmissionsSummaryHeader,
  TeacherSubmissionsStatsCards,
  TeacherSubmissionsTable,
} from "../components/assignments";

export const TeacherAssignmentSubmissionsPage = () => {
  const { assignmentId } = useParams();

  const currentAssignment = useMemo(() => {
    return (
      teacherAssignmentsListMock.find((a) => a.id === assignmentId) ||
      teacherAssignmentsListMock[0]
    );
  }, [assignmentId]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner matching SS 3 */}
      <TeacherSubmissionsSummaryHeader
        assignment={currentAssignment}
        badgeText="Active"
        backTo="/teacher/assignments"
        backLabel="Back to Assignments"
      />

      {/* KPI Stats Cards */}
      <TeacherSubmissionsStatsCards
        totalStudents={currentAssignment.totalStudents || 28}
        submitted={currentAssignment.submittedCount || 24}
        pending={currentAssignment.pendingCount || 4}
      />

      {/* Submissions Table matching SS 3 */}
      <TeacherSubmissionsTable
        assignmentId={currentAssignment.id}
        submissions={currentAssignment.submissionsList || []}
      />
    </div>
  );
};

export default TeacherAssignmentSubmissionsPage;

