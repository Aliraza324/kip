import { useState, useEffect, useRef } from "react";
import { X, UploadCloud, Loader2, User, ChevronDown, Lock, Mail, Phone, Calendar, Home } from "lucide-react";
import toast from "react-hot-toast";
import { studentService, classService } from "@/service/apiService";

export const AdminEditStudentModal = ({ isOpen, onClose, student, onUpdated }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    cnic: "",
    code: "",
    username: "",
    email: "",
    phone: "",
    emergencyContact: "",
    address: "",
    dob: "",
    gender: "Male",
    classId: "",
    section: "",
    status: "active",
    password: "",
  });

  const [classes, setClasses] = useState([]);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      classService
        .getAll({ limit: 100 })
        .then((res) => {
          const items = res?.data || (Array.isArray(res) ? res : []);
          setClasses(items);
        })
        .catch(() => setClasses([]));
    }
  }, [isOpen]);

  useEffect(() => {
    if (student) {
      const clsId = student.class?.id || student.classId || (typeof student.class === "string" ? student.class : "");
      setFormData({
        fullName: student.fullName || student.name || "",
        fatherName: student.fatherName || "",
        cnic: student.cnic || "",
        code: student.code || student.studentId || "",
        username: student.username || "",
        email: student.email || "",
        phone: student.phone || "",
        emergencyContact: student.emergencyContact || "",
        address: student.address || "",
        dob: student.dob ? String(student.dob).split("T")[0] : "",
        gender: student.gender || "Male",
        classId: clsId ? String(clsId) : "",
        section: student.section || student.class?.section || "",
        status: (student.status || "active").toLowerCase() === "inactive" ? "inactive" : "active",
        password: "",
      });

      setAvatarFile(null);
      setAvatarPreview(
        typeof student.avatar === "string"
          ? student.avatar
          : student.avatar?.url || null
      );
    }
  }, [student, isOpen]);

  if (!isOpen || !student) return null;

  const studentId = student.id || student._id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClassChange = (e) => {
    const selectedId = e.target.value;
    setFormData((prev) => ({ ...prev, classId: selectedId }));
    const found = classes.find((c) => String(c.id || c._id) === String(selectedId));
    if (found?.section && !formData.section) {
      setFormData((prev) => ({ ...prev, section: found.section }));
    }
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    toast.success("New photo selected!");
  };

  const handleRemovePhoto = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      toast.error("Student name is required.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = new FormData();
      payload.append("fullName", formData.fullName.trim());

      if (formData.fatherName !== undefined) payload.append("fatherName", formData.fatherName.trim());
      if (formData.cnic !== undefined) payload.append("cnic", formData.cnic.trim());
      if (formData.code !== undefined) payload.append("code", formData.code.trim());
      if (formData.username?.trim()) payload.append("username", formData.username.trim().toLowerCase());
      if (formData.email !== undefined) payload.append("email", formData.email.trim().toLowerCase());
      if (formData.phone !== undefined) payload.append("phone", formData.phone.trim());
      if (formData.emergencyContact !== undefined) payload.append("emergencyContact", formData.emergencyContact.trim());
      if (formData.address !== undefined) payload.append("address", formData.address.trim());
      if (formData.dob) payload.append("dob", formData.dob);
      if (formData.gender) payload.append("gender", formData.gender);
      if (formData.section !== undefined) payload.append("section", formData.section.trim());
      if (formData.status) payload.append("status", formData.status.toLowerCase());
      if (formData.classId) payload.append("classId", formData.classId);

      // Only include password if admin typed a new one
      if (formData.password?.trim()) {
        payload.append("password", formData.password.trim());
      }

      if (avatarFile) {
        payload.append("avatar", avatarFile);
      }

      await studentService.update(studentId, payload);
      toast.success("Student updated successfully!");
      onUpdated?.();
      onClose();
    } catch (err) {
      console.error("Update student error:", err);
      toast.error(err?.response?.data?.message || err?.message || "Failed to update student.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 my-8 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Edit Student
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Update personal details, photo, class, section, or status.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Avatar Upload Bar */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Student preview"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-xs shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-[#0080f6] flex items-center justify-center font-black text-xl shrink-0">
                {(formData.fullName || "S")[0]}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-bold text-slate-800">
                Profile Photo
              </p>
              <p className="text-[11px] text-slate-400">JPG, PNG, WebP (Max 5 MB)</p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handlePhotoSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-[#0080f6] hover:bg-blue-50 transition-colors cursor-pointer shadow-2xs"
                >
                  Change Photo
                </button>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="px-3 py-1 rounded-full text-xs font-semibold text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] outline-none"
                required
              />
            </div>

            {/* Father Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Father's Name
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Enter father's name"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] outline-none"
              />
            </div>

            {/* Student ID / Roll Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Student ID / Roll No.
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g. ST-1001"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] outline-none"
              />
            </div>

            {/* CNIC / B-Form */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                CNIC / B-Form
              </label>
              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                placeholder="e.g. 35201-1234567-1"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@gmail.com"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0300-1234567"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] outline-none"
              />
            </div>

            {/* Emergency Contact */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Emergency Contact
              </label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Emergency number"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] outline-none"
              />
            </div>

            {/* Class Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Class / Grade
              </label>
              <div className="relative">
                <select
                  name="classId"
                  value={formData.classId}
                  onChange={handleClassChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 bg-white focus:border-[#0080f6] outline-none appearance-none pr-8 cursor-pointer"
                >
                  <option value="">No Class Assigned</option>
                  {classes.map((cls) => (
                    <option key={cls.id || cls._id} value={cls.id || cls._id}>
                      {cls.name} {cls.grade ? `(${cls.grade})` : ""}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Section */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Section
              </label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="e.g. Section-A"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] outline-none"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Account Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 bg-white focus:border-[#0080f6] outline-none appearance-none pr-8 cursor-pointer"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Gender
              </label>
              <div className="relative">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 bg-white focus:border-[#0080f6] outline-none appearance-none pr-8 cursor-pointer"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 focus:border-[#0080f6] outline-none"
              />
            </div>

            {/* Reset Password */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reset Password <span className="text-slate-400 font-normal">(leave blank to keep current)</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password (optional)"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter residential address"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
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
              className="px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditStudentModal;
