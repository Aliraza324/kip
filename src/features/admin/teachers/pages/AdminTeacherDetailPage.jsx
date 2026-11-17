import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { AdminTeacherDetailCard } from "../components";
import { useAdminTeacherDetail } from "@/hooks/admin";

export const AdminTeacherDetailPage = () => {
  const { teacherId } = useParams();
  const { teacher, isLoading, error } = useAdminTeacherDetail(teacherId);

  return (
    <div className="space-y-6 max-w-[1300px] mx-auto pb-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/admin/teachers"
          className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 text-[#0080f6] flex items-center justify-center hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Teacher Details
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            View complete information of the teacher.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="py-16 text-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#0080f6] mb-2" />
          <span>Loading teacher details...</span>
        </div>
      ) : !teacher ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-100 p-8 space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Teacher Not Found</h3>
          <p className="text-xs text-slate-400">
            {error?.message || "The requested teacher does not exist or may have been deleted."}
          </p>
          <Link
            to="/admin/teachers"
            className="inline-block mt-2 px-5 py-2 rounded-full bg-[#0080f6] text-white text-xs font-bold hover:bg-blue-600 transition-colors"
          >
            Back to Teachers
          </Link>
        </div>
      ) : (
        <AdminTeacherDetailCard teacher={teacher} />
      )}
    </div>
  );
};

export default AdminTeacherDetailPage;
