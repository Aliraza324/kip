import { GraduationCap, ChevronDown } from "lucide-react";

export const AdminStudentAcademicCard = ({ formData, onChange }) => {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <GraduationCap className="w-5 h-5 text-slate-700" />
        <h3 className="text-base sm:text-lg font-bold text-slate-900">Academic Information</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Class *</label>
          <div className="relative">
            <select
              name="class"
              value={formData.class}
              onChange={onChange}
              className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 appearance-none bg-white focus:border-[#0080f6] outline-none cursor-pointer"
            >
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Status</label>
          <div className="relative">
            <select
              name="status"
              value={formData.status}
              onChange={onChange}
              className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 appearance-none bg-white focus:border-[#0080f6] outline-none cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentAcademicCard;
