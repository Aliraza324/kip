import { useState, useRef, useMemo, useEffect } from "react";
import { User, UploadCloud, GraduationCap, ChevronDown, X, Plus, Check } from "lucide-react";
import toast from "react-hot-toast";

const ALL_SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
  "History",
  "Urdu",
  "Islamiat",
  "Economics",
  "Accounting",
];

export const AdminTeacherAcademicAssignmentCard = ({
  formData,
  onChange,
  avatarFile,
  onAvatarChange,
  subjects = ["Mathematics", "Physics"],
  onSubjectsChange,
}) => {
  const fileInputRef = useRef(null);
  const [showSubjectMenu, setShowSubjectMenu] = useState(false);
  const [customSubject, setCustomSubject] = useState("");

  const previewUrl = useMemo(() => {
    if (!avatarFile) return null;
    return URL.createObjectURL(avatarFile);
  }, [avatarFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPG, PNG, or WEBP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Photo size must be less than 5 MB.");
      return;
    }
    onAvatarChange(file);
    toast.success("Photo selected! Will be uploaded to Cloudinary.");
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeSubject = (sub) => {
    const updated = subjects.filter((s) => s !== sub);
    onSubjectsChange(updated);
  };

  const addSubject = (sub) => {
    const trimmed = sub.trim();
    if (!trimmed) return;
    if (!subjects.includes(trimmed)) {
      onSubjectsChange([...subjects, trimmed]);
    }
    setCustomSubject("");
    setShowSubjectMenu(false);
  };

  return (
    <div className="space-y-5">
      {/* Profile Photo Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <User className="w-5 h-5 text-slate-700" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Profile Photo</h3>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative border-2 border-blue-100 rounded-2xl p-4 bg-blue-50/30 flex items-center gap-4">
            <img
              src={previewUrl}
              alt="Teacher Preview"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-xs shrink-0"
            />
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {avatarFile?.name}
                </p>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {(avatarFile?.size / 1024).toFixed(0)} KB • Cloudinary Ready
              </p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold text-[#0080f6] hover:underline cursor-pointer"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => onAvatarChange(null)}
                  className="text-xs font-bold text-red-500 hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
            }}
            className="border-2 border-dashed border-blue-200/90 rounded-2xl p-6 text-center bg-blue-50/20 hover:bg-blue-50/40 transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-[#0080f6] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-6 h-6 stroke-[2]" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Upload Teacher Photo</p>
            <p className="text-[11px] text-slate-400 mt-1">JPG, PNG, WEBP (Max 5 MB)</p>
          </div>
        )}
      </div>

      {/* Academic Assignment Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <GraduationCap className="w-5 h-5 text-slate-700" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Academic Assignment</h3>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          {/* Subjects Tag Select */}
          <div className="relative">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">Subjects *</label>
              <button
                type="button"
                onClick={() => setShowSubjectMenu(!showSubjectMenu)}
                className="text-[11px] font-bold text-[#0080f6] hover:underline cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Subject
              </button>
            </div>

            <div className="w-full min-h-[42px] px-3 py-1.5 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-1.5 bg-white">
              {subjects.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-[#0080f6] font-semibold text-xs"
                >
                  <span>{s}</span>
                  <button
                    type="button"
                    onClick={() => removeSubject(s)}
                    className="hover:text-blue-800 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {subjects.length === 0 && (
                <span className="text-xs text-slate-400">No subjects assigned</span>
              )}
            </div>

            {/* Subject Selector Dropdown */}
            {showSubjectMenu && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-20 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 space-y-2 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSubject(customSubject);
                      }
                    }}
                    placeholder="Type subject & press Enter..."
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0080f6]"
                  />
                  <button
                    type="button"
                    onClick={() => addSubject(customSubject)}
                    className="px-3 py-1.5 rounded-xl bg-[#0080f6] text-white text-xs font-bold cursor-pointer hover:bg-blue-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="max-h-40 overflow-y-auto space-y-1 pt-1">
                  {ALL_SUBJECTS.filter((s) => !subjects.includes(s)).map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => addSubject(sub)}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-[#0080f6] transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{sub}</span>
                      <Plus className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Status</label>
            <div className="relative">
              <select
                name="status"
                value={formData.status || "active"}
                onChange={onChange}
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 appearance-none bg-white focus:border-[#0080f6] outline-none cursor-pointer"
              >
                <option value="active">• Active</option>
                <option value="inactive">• Inactive</option>
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