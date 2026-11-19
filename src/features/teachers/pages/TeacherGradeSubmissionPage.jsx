import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle, RefreshCw } from "lucide-react";
import {
  useTeacherSubmissionDetail,
  useTeacherGradeSubmission,
} from "@/hooks";
import {
  TeacherSubmissionsSummaryHeader,
  TeacherGradeSubmissionStudentCard,
  TeacherGradeSubmissionForm,
} from "../components/assignments";

export const TeacherGradeSubmissionPage = () => {
  const { assignmentId, submissionId } = useParams();
  const navigate = useNavigate();

  const { submission, assignment, student, isLoading, isError, error, refetch } =
    useTeacherSubmissionDetail(submissionId);

  const { gradeSubmission, isSubmitting } = useTeacherGradeSubmission();

  const backUrl = `/teacher/assignments/${assignmentId}/submissions`;

  const handleSaveGrade = async ({ marks, gradeLetter, feedback }) => {
    try {
      await gradeSubmission(submissionId, { marks, gradeLetter, feedback });
      navigate(backUrl);
    } catch {
      // Error handled in hook toast
    }
  };

  const handleCancel = () => {
    navigate(backUrl);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-14 animate-pulse">
        <div className="w-40 h-5 bg-slate-100 rounded" />
        <div className="bg-white rounded-3xl p-5 border border-slate-100 h-24" />
        <div className="bg-white rounded-3xl p-6 border border-slate-100 h-44" />
        <div className="bg-white rounded-3xl p-6 border border-slate-100 h-64" />
      </div>
    );
  }

  if (isError || !submission) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-black text-slate-900">
          Submission Not Found
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          {error?.message || "The requested student submission could not be found or you may not have permission to view it."}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to={backUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Submissions</span>
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
    <div className="space-y-6 max-w-7xl mx-auto pb-14">
      {/* Top Banner matching SS 4 */}
      <TeacherSubmissionsSummaryHeader
        assignment={assignment}
        badgeText={submission?.status || "Submitted"}
        backTo={backUrl}
        backLabel="Back to Submissions"
      />

      {/* Card 1: Student Submission Info & File Download */}
      <TeacherGradeSubmissionStudentCard
        submission={submission}
        student={student}
      />

      {/* Card 2: Grade Assignment Form (Marks, Grade, Feedback) */}
      <TeacherGradeSubmissionForm
        initialMarks={submission?.marks ?? ""}
        initialGrade={submission?.gradeLetter || "A"}
        initialFeedback={submission?.feedback || ""}
        totalMarks={submission?.totalMarks || assignment?.totalMarks || 100}
        isSubmitting={isSubmitting}
        onSave={handleSaveGrade}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TeacherGradeSubmissionPage;
