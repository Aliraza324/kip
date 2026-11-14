import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Users, Plus } from "lucide-react";
import { AdminClassStudentsTable } from "../components";
import { adminClassesMock } from "@/mocks";

export const AdminClassStudentsPage = () => {
  const { classId } = useParams();
  const currentClass = adminClassesMock.find((c) => c.id === classId) || {
    name: "All Students",
    grade: "Grade 9",
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/admin/students"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0080f6] hover:text-blue-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Classes</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#eaf4fe] text-[#0080f6] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {currentClass.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Enrolled students list and performance records.
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/admin/students/create"
          className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Student</span>
        </Link>
      </div>

      {/* Class Students Table */}
      <AdminClassStudentsTable classId={classId} />
    </div>
  );
};

export default AdminClassStudentsPage;
