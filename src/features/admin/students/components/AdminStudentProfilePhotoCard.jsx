import { User, UploadCloud } from "lucide-react";

export const AdminStudentProfilePhotoCard = () => {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <User className="w-5 h-5 text-slate-700" />
        <h3 className="text-base sm:text-lg font-bold text-slate-900">Profile Photo</h3>
      </div>
      <div className="border-2 border-dashed border-blue-200/90 rounded-2xl p-6 text-center bg-blue-50/20 hover:bg-blue-50/40 transition-colors cursor-pointer">
        <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-[#0080f6] flex items-center justify-center mb-2">
          <UploadCloud className="w-6 h-6 stroke-[2]" />
        </div>
        <p className="text-xs sm:text-sm font-bold text-slate-800">Upload Student Photo</p>
        <p className="text-[11px] text-slate-400 mt-1">JPG, PNG (Max 5 MB)</p>
      </div>
    </div>
  );
};

export default AdminStudentProfilePhotoCard;
