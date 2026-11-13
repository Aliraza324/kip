import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { teacherAssignmentsListMock } from "@/mocks";
import {
  TeacherSubmissionsSummaryHeader,
  TeacherGradeSubmissionStudentCard,
  TeacherGradeSubmissionForm,
} from "../components/assignments";

export const TeacherGradeSubmissionPage = () => {
  const { assignmentId, submissionId } = useParams();
  const navigate = useNavigate();

  const currentAssignment = useMemo(() => {
    return (
      teacherAssignmentsListMock.find((a) => a.id === assignmentId) ||
      teacherAssignmentsListMock[0]
    );
  }, [assignmentId]);

  const currentSubmission = useMemo(() => {
    const list = currentAssignment.submissionsList || [];
    return (
      list.find((s) => s.id === submissionId) ||
      list.find((s) => s.studentName.includes("Hassan")) ||
      list[0]
    );
  }, [currentAssignment, submissionId]);

  const handleSaveGrade = () => {
    setTimeout(() => {
      navigate(`/teacher/assignments/${currentAssignment.id}/submissions`);
    }, 800);
  };

  const handleCancel = () => {
    navigate(`/teacher/assignments/${currentAssignment.id}/submissions`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-14">
      {/* Top Banner matching SS 4 */}
      <TeacherSubmissionsSummaryHeader
        assignment={currentAssignment}
        badgeText="Submitted"
        backTo={`/teacher/assignments/${currentAssignment.id}/submissions`}
        backLabel="Back to Submissions"
      />

      {/* Card 1: Student Submission Info & File Download */}
      <TeacherGradeSubmissionStudentCard submission={currentSubmission} />

      {/* Card 2: Grade Assignment Form (Marks, Grade, Feedback) */}
      <TeacherGradeSubmissionForm
        initialMarks={currentSubmission?.marks ?? 92}
        initialGrade={currentSubmission?.gradeLetter || "A"}
        initialFeedback={
          currentSubmission?.feedback ||
          "Excellent work! Your solutions are accurate and well-written. Keep up the great effort."
        }
        totalMarks={currentAssignment.totalMarks || 100}
        onSave={handleSaveGrade}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TeacherGradeSubmissionPage;

