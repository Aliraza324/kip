import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle, RefreshCw } from "lucide-react";
import { useTeacherClassDetail } from "@/hooks";
import { TeacherStudentsTable } from "../components/students";

export const TeacherClassStudentsListPage = () => {
  const { classId } = useParams();
  const { classData, isLoading, isError, error, refetch } = useTeacherClassDetail(classId);

  const className = classData?.name || classData?.label || "Class";

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-pulse">
        <div className="w-32 h-4 bg-slate-100 rounded" />
        <div className="space-y-2">
          <div className="w-48 h-6 bg-slate-100 rounded" />
          <div className="w-64 h-4 bg-slate-100 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="w-28 h-9 bg-slate-100 rounded-full" />
          <div className="w-24 h-9 bg-slate-100 rounded-full" />
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 h-96" />
      </div>
    );
  }

  if (isError || !classData) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-black text-slate-900">
          Class Not Available
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          {error?.message || "The requested class could not be found or you may not be assigned to teach it."}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/teacher/students"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Classes</span>
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

  const assignedSubjectNames = Array.isArray(classData.subjects)
    ? classData.subjects.map((s) => (typeof s === "string" ? s : s.name)).filter(Boolean)
    : [];

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12">
      {/* Back button and page title matching SS 2 */}
      <div>
        <Link
          to="/teacher/students"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0080f6] hover:underline mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Classes</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Students
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage and view all your students for {className}.
            </p>
          </div>

          <span className="self-start sm:self-auto inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0080f6] border border-blue-100">
            {className}
          </span>
        </div>
      </div>

      {/* Students Table matching SS 2 */}
      <TeacherStudentsTable
        classId={classId}
        classItem={classData}
        assignedSubjects={assignedSubjectNames}
      />
    </div>
  );
};

export default TeacherClassStudentsListPage;
