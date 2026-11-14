import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AdminTeacherDetailCard } from "../components";
import { adminTeachersMock } from "@/mocks";

export const AdminTeacherDetailPage = () => {
  const { teacherId } = useParams();

  const teacher =
    adminTeachersMock.find((t) => t.teacherId === teacherId || t.id === teacherId) ||
    adminTeachersMock[0];

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

      {/* Teacher Profile & Assigned Classes */}
      <AdminTeacherDetailCard teacher={teacher} />
    </div>
  );
};

export default AdminTeacherDetailPage;
