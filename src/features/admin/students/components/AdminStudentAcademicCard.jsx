import { useEffect, useState } from "react";
import { GraduationCap, ChevronDown, Layers, CheckCircle2 } from "lucide-react";
import { classService } from "@/service/apiService";

export const AdminStudentAcademicCard = ({ formData, onChange, onClassSelect }) => {
  const [classes, setClasses] = useState([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(false);

  useEffect(() => {
    setIsLoadingClasses(true);
    classService
      .getAll({ limit: 100 })
      .then((res) => {
        const items = res?.data || (Array.isArray(res) ? res : []);
        setClasses(items);
      })
      .catch(() => setClasses([]))
      .finally(() => setIsLoadingClasses(false));
  }, []);

  const handleClassChange = (e) => {
    const selectedId = e.target.value;
    onChange(e);

    // Auto-fill section if class has a default section
    const found = classes.find((c) => String(c.id || c._id) === String(selectedId));
    if (found && onClassSelect) {
      onClassSelect(found);
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <GraduationCap className="w-5 h-5 text-slate-700" />
        <h3 className="text-base sm:text-lg font-bold text-slate-900">Academic Information</h3>
      </div>
      <div className="space-y-4">
        {/* Class Selection */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">
            Class / Grade <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <select
              name="classId"
              value={formData.classId || ""}
              onChange={handleClassChange}
              className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 appearance-none bg-white focus:border-[#0080f6] outline-none cursor-pointer pr-10"
            >
              <option value="">Select a Class</option>
              {classes.map((cls) => (
                <option key={cls.id || cls._id} value={cls.id || cls._id}>
                  {cls.name} {cls.grade ? `(${cls.grade})` : ""} {cls.section ? `- Sec ${cls.section}` : ""}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {isLoadingClasses && (
            <p className="text-[11px] text-slate-400 mt-1">Loading classes from server...</p>
          )}
        </div>

        {/* Section Input */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">
            Section
          </label>
          <div className="relative">
            <input
              type="text"
              name="section"
              value={formData.section || ""}
              onChange={onChange}
              placeholder="e.g. Section-A, Rose, B"
              className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Specify the section for class assignments and scheduling.
          </p>
        </div>

        {/* Status Selection */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Status</label>
          <div className="relative">
            <select
              name="status"
              value={formData.status || "active"}
              onChange={onChange}
              className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 appearance-none bg-white focus:border-[#0080f6] outline-none cursor-pointer pr-10"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentAcademicCard;
