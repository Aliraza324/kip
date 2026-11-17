import { useState, useEffect, useRef } from "react";
import { X, UploadCloud, Plus, Loader2, User, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { teacherService } from "@/service/apiService";

const COMMON_SUBJECTS = [
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

export const AdminEditTeacherModal = ({ isOpen, onClose, teacher, onUpdated }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    code: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    status: "active",
    password: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [customSubject, setCustomSubject] = useState("");
  const [showSubjectMenu, setShowSubjectMenu] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (teacher) {
      setFormData({
        fullName: teacher.fullName || teacher.name || "",
        code: teacher.code || teacher.teacherId || "",
        email: teacher.email || "",
        phone: teacher.phone || "",
        dob: teacher.dob ? teacher.dob.split("T")[0] : "",
        gender: teacher.gender || "Male",
        status: (teacher.status === "inactive" ? "inactive" : "active"),
        password: "",
      });
      setSubjects(Array.isArray(teacher.subjects) ? [...teacher.subjects] : []);
      setAvatarFile(null);
      setAvatarPreview(
        typeof teacher.avatar === "string"
          ? teacher.avatar
          : teacher.avatar?.url || null
      );
    }
  }, [teacher, isOpen]);

  if (!isOpen || !teacher) return null;

  const teacherId = teacher.id || teacher._id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, WEBP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const addSubject = (sub) => {
    const trimmed = sub.trim();
    if (!trimmed) return;
    if (!subjects.includes(trimmed)) {
      setSubjects((prev) => [...prev, trimmed]);
    }
    setCustomSubject("");
    setShowSubjectMenu(false);
  };

  const removeSubject = (sub) => {
    setSubjects((prev) => prev.filter((s) => s !== sub));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      toast.error("Teacher name cannot be empty.");
      return;
    }

    setIsSaving(true);
    try {
      const updates = {
        fullName: formData.fullName.trim(),
        code: formData.code.trim() || undefined,
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        dob: formData.dob || undefined,
        gender: formData.gender,
        status: formData.status.toLowerCase(),
        subjects: subjects,
      };

      if (formData.password.trim()) {
        updates.password = formData.password.trim();
      }

      if (avatarFile) {
        updates.avatar = avatarFile;
      }

      await teacherService.update(teacherId, updates);
      toast.success("Teacher updated successfully!");
      onUpdated?.();
      onClose();
    } catch (err) {
      console.error("Update teacher error:", err);
      toast.error(err.message || "Failed to update teacher.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 my-8 animate-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isSaving}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Edit Teacher
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Update teacher details, subjects, status, or profile photo.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Upload */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileSelect}
              className="hidden"
            />
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Teacher avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0080f6] flex items-center justify-center font-bold text-lg border-2 border-white shadow-xs shrink-0">
                {(formData.fullName?.[0] || "T").toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-bold text-slate-800">Profile Photo</p>
              <p className="text-[11px] text-slate-400">JPG, PNG, WEBP (Max 5 MB)</p>
              <div className="flex items-center gap-3 mt-1.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold text-[#0080f6] hover:underline cursor-pointer"
                >
                  Change Photo
                </button>
                {avatarFile && (
                  <button
                    type="button"
                    onClick={() => {
                      setAvatarFile(null);
                      setAvatarPreview(
                        typeof teacher.avatar === "string"
                          ? teacher.avatar
                          : teacher.avatar?.url || null
                      );
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 focus:border-[#0080f6] outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Teacher ID / Code</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 focus:border-[#0080f6] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 focus:border-[#0080f6] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 focus:border-[#0080f6] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 focus:border-[#0080f6] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Status</label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 appearance-none bg-white focus:border-[#0080f6] outline-none cursor-pointer"
                >
                  <option value="active">• Active</option>
                  <option value="inactive">• Inactive</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Gender</label>
              <div className="flex items-center gap-4 pt-2 text-xs font-semibold text-slate-700">
                {["Male", "Female", "Other"].map((g) => (
                  <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="text-[#0080f6] focus:ring-blue-500"
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">New Password (Optional)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep unchanged"
                className="w-full px-4 py-2 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] outline-none transition-all"
              />
            </div>
          </div>

          {/* Subjects Tag Select */}
          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">Subjects</label>
              <button
                type="button"
                onClick={() => setShowSubjectMenu(!showSubjectMenu)}
                className="text-[11px] font-bold text-[#0080f6] hover:underline cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Subject
              </button>
            </div>

            <div className="w-full min-h-[40px] px-3 py-1.5 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-1.5 bg-white">
              {subjects.map((sub) => (
                <span
                  key={sub}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0080f6] font-semibold text-xs"
                >
                  <span>{sub}</span>
                  <button
                    type="button"
                    onClick={() => removeSubject(sub)}
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

            {/* Dropdown for subjects */}
            {showSubjectMenu && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-20 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 space-y-2 animate-in fade-in duration-150">
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
                <div className="max-h-36 overflow-y-auto space-y-1 pt-1">
                  {COMMON_SUBJECTS.filter((s) => !subjects.includes(s)).map((sub) => (
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

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-60"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditTeacherModal;