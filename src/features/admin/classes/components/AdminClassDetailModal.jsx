import { X, Layers, Users, MapPin, UserCheck, ShieldCheck } from "lucide-react";

export const AdminClassDetailModal = ({ isOpen, onClose, classData }) => {
  if (!isOpen || !classData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900">{classData.name}</h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eefcf3] text-[#16a34a] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                {classData.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Grade level: {classData.grade} • {classData.section || "General"}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3.5 rounded-2xl bg-[#f8fbfe] border border-blue-50/80">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Users className="w-3.5 h-3.5 text-[#0080f6]" />
              <span className="font-semibold text-slate-600">Students Enrolled</span>
            </div>
            <span className="text-lg font-black text-slate-800">
              {classData.studentsCount} Students
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f8fbfe] border border-blue-50/80">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#0080f6]" />
              <span className="font-semibold text-slate-600">Room Location</span>
            </div>
            <span className="text-lg font-black text-slate-800">
              {classData.room || "Room 101"}
            </span>
          </div>
        </div>

        {/* Assigned Teachers Section */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-[#0080f6]" />
            <span>Assigned Teachers</span>
          </h4>
          <div className="p-3 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
            <div className="flex items-center gap-3">
              <img
                src={classData.primaryTeacher?.avatar}
                alt={classData.primaryTeacher?.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {classData.primaryTeacher?.name}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  Lead Class Teacher
                </p>
              </div>
            </div>
            {classData.teachersList && classData.teachersList.length > 1 && (
              <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">Co-teachers: </span>
                {classData.teachersList.filter((t) => t !== classData.primaryTeacher?.name).join(", ")}
              </div>
            )}
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminClassDetailModal;

