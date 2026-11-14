import { useState } from "react";
import { User, UploadCloud, GraduationCap, ChevronDown, X } from "lucide-react";

export const AdminTeacherAcademicAssignmentCard = ({ formData, onChange, onTagsChange }) => {
  const [selectedSubjects, setSelectedSubjects] = useState(["Mathematics", "Physics"]);
  const [selectedClasses, setSelectedClasses] = useState(["Grade 9 – A", "Grade 10 – B"]);

  const removeSubject = (sub) => {
    const updated = selectedSubjects.filter((s) => s !== sub);
    setSelectedSubjects(updated);
    onTagsChange?.("subjects", updated);
  };

  const removeClass = (cls) => {
    const updated = selectedClasses.filter((c) => c !== cls);
    setSelectedClasses(updated);
    onTagsChange?.("classes", updated);
  };

  return (
    <div className="space-y-5">
      {/* Profile Photo Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <User className="w-5 h-5 text-slate-700" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Profile Photo</h3>
        </div>
        <div className="border-2 border-dashed border-blue-200/90 rounded-2xl p-6 text-center bg-blue-50/20 hover:bg-blue-50/40 transition-colors cursor-pointer">
          <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-[#0080f6] flex items-center justify-center mb-2">
            <UploadCloud className="w-6 h-6 stroke-[2]" />
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-800">Upload Teacher Photo</p>
          <p className="text-[11px] text-slate-400 mt-1">JPG, PNG (Max 5 MB)</p>
        </div>
      </div>

      {/* Academic Assignment Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <GraduationCap className="w-5 h-5 text-slate-700" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Academic Assignment</h3>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          {/* Subjects Tag Select */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Subjects *</label>
            <div className="w-full min-h-[42px] px-3 py-1.5 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-1.5 bg-white">
              {selectedSubjects.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-[#0080f6] font-semibold text-xs"
                >
                  <span>{s}</span>
                  <button type="button" onClick={() => removeSubject(s)} className="hover:text-blue-800">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Assign Classes Tag Select */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Assign Classes *</label>
            <div className="w-full min-h-[42px] px-3 py-1.5 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-1.5 bg-white">
              {selectedClasses.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs"
                >
                  <span>{c}</span>
                  <button type="button" onClick={() => removeClass(c)} className="hover:text-slate-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Status</label>
            <div className="relative">
              <select
                name="status"
                value={formData.status}
                onChange={onChange}
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 appearance-none bg-white focus:border-[#0080f6] outline-none cursor-pointer"
              >
                <option value="Active">• Active</option>
                <option value="Inactive">• Inactive</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTeacherAcademicAssignmentCard;
