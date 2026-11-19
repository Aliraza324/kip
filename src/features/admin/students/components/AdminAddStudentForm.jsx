import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Lock, Mail, Phone, Calendar, Shield, Home, AlertCircle, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { AdminStudentProfilePhotoCard } from "./AdminStudentProfilePhotoCard";
import { AdminStudentAcademicCard } from "./AdminStudentAcademicCard";

export const AdminAddStudentForm = ({ onSuccess, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    cnic: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    emergencyContact: "",
    address: "",
    dob: "",
    gender: "Male",
    classId: "",
    section: "",
    status: "active",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClassSelect = (cls) => {
    if (cls?.section && !formData.section) {
      setFormData((prev) => ({ ...prev, section: cls.section }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      toast.error("Please enter student's full name");
      return;
    }

    // Prepare FormData payload for multipart/form-data upload
    const payload = new FormData();
    payload.append("fullName", formData.fullName.trim());

    if (formData.fatherName?.trim()) payload.append("fatherName", formData.fatherName.trim());
    if (formData.cnic?.trim()) payload.append("cnic", formData.cnic.trim());
    if (formData.username?.trim()) payload.append("username", formData.username.trim().toLowerCase());
    if (formData.password?.trim()) payload.append("password", formData.password.trim());
    if (formData.email?.trim()) payload.append("email", formData.email.trim().toLowerCase());
    if (formData.phone?.trim()) payload.append("phone", formData.phone.trim());
    if (formData.emergencyContact?.trim()) payload.append("emergencyContact", formData.emergencyContact.trim());
    if (formData.address?.trim()) payload.append("address", formData.address.trim());
    if (formData.dob) payload.append("dob", formData.dob);
    if (formData.gender) payload.append("gender", formData.gender);
    if (formData.classId) payload.append("classId", formData.classId);
    if (formData.section?.trim()) payload.append("section", formData.section.trim());
    if (formData.status) payload.append("status", formData.status.toLowerCase());

    if (avatarFile) {
      payload.append("avatar", avatarFile);
    }

    onSuccess(payload, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left Column: Personal & Guardian Information */}
        <div className="lg:col-span-8 space-y-6">
          {/* Personal Info Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <User className="w-5 h-5 text-slate-700" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Personal Information</h3>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
                <label className="text-xs sm:text-sm font-bold text-slate-700">Full Name *</label>
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter student's full name"
                    className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Father Name */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
                <label className="text-xs sm:text-sm font-bold text-slate-700">Father's Name</label>
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="Enter father's name"
                    className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* CNIC / B-Form */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
                <label className="text-xs sm:text-sm font-bold text-slate-700">CNIC / B-Form</label>
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    name="cnic"
                    value={formData.cnic}
                    onChange={handleChange}
                    placeholder="e.g. 35201-1234567-1"
                    className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
                <label className="text-xs sm:text-sm font-bold text-slate-700">Username</label>
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Leave blank to auto-generate from name"
                    className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
                <label className="text-xs sm:text-sm font-bold text-slate-700">Password</label>
                <div className="sm:col-span-2 relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to auto-generate secure password"
                    className="w-full pl-11 pr-11 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-700 block">Email</label>
                  <span className="text-[11px] text-blue-600 font-medium">Credentials will be emailed</span>
                </div>
                <div className="sm:col-span-2 relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter student email (e.g. student@gmail.com)"
                    className="w-full pl-11 pr-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
                <label className="text-xs sm:text-sm font-bold text-slate-700">Phone</label>
                <div className="sm:col-span-2 relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter student phone number"
                    className="w-full pl-11 pr-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
                <label className="text-xs sm:text-sm font-bold text-slate-700">Emergency Contact</label>
                <div className="sm:col-span-2 relative">
                  <Phone className="w-4 h-4 text-amber-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    placeholder="Emergency / Guardian contact number"
                    className="w-full pl-11 pr-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
                <label className="text-xs sm:text-sm font-bold text-slate-700">Address</label>
                <div className="sm:col-span-2 relative">
                  <Home className="w-4 h-4 text-slate-400 absolute left-4 top-3" />
                  <textarea
                    name="address"
                    rows="2"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter residential address"
                    className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
                <label className="text-xs sm:text-sm font-bold text-slate-700">Date of Birth</label>
                <div className="sm:col-span-2 relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
                <label className="text-xs sm:text-sm font-bold text-slate-700">Gender</label>
                <div className="sm:col-span-2 flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-700">
                  {["Male", "Female", "Other"].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
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
            </div>
          </div>
        </div>

        {/* Right Column: Profile Photo & Academic Information */}
        <div className="lg:col-span-4 space-y-6">
          <AdminStudentProfilePhotoCard
            avatarFile={avatarFile}
            onAvatarChange={setAvatarFile}
          />
          <AdminStudentAcademicCard
            formData={formData}
            onChange={handleChange}
            onClassSelect={handleClassSelect}
          />
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex items-center gap-4 pt-2">
        <Link
          to="/admin/students"
          className="px-6 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/25 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <span>Creating Student...</span>
          ) : (
            <span>+ Add Student</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default AdminAddStudentForm;
