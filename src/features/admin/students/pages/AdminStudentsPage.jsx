import { Link } from "react-router-dom";
import { Users, Plus } from "lucide-react";
import { AdminClassesTable } from "../components";

export const AdminStudentsPage = () => {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#eaf4fe] text-[#0080f6] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Students
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Manage all students, add new students, and assign them to classes.
            </p>
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

      {/* Classes Table */}
      <AdminClassesTable />
    </div>
  );
};

export default AdminStudentsPage;
