import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { AdminStudentProfilePhotoCard } from "./AdminStudentProfilePhotoCard";
import { AdminStudentAcademicCard } from "./AdminStudentAcademicCard";

export const AdminAddStudentForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    class: "Grade 9",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      toast.error("Please enter full name");
      return;
    }
    const finalData = {
      ...formData,
      username: formData.username || formData.fullName.toLowerCase().replace(/\s+/g, "."),
      password: formData.password || "Kip@123",
    };
    onSuccess(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left Column: Personal Information */}
        <div className="lg:col-span-8 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <User className="w-5 h-5 text-slate-700" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Personal Information</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
              <label className="text-xs sm:text-sm font-bold text-slate-700">Full Name *</label>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
              <label className="text-xs sm:text-sm font-bold text-slate-700">Username *</label>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
              <label className="text-xs sm:text-sm font-bold text-slate-700">Password *</label>
              <div className="sm:col-span-2 relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full pl-11 pr-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
              <label className="text-xs sm:text-sm font-bold text-slate-700">Email</label>
              <div className="sm:col-span-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
              <label className="text-xs sm:text-sm font-bold text-slate-700">Phone</label>
              <div className="sm:col-span-2">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
              <label className="text-xs sm:text-sm font-bold text-slate-700">Date of Birth</label>
              <div className="sm:col-span-2">
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            </div>

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

        {/* Right Column: Profile Photo & Academic Information */}
        <div className="lg:col-span-4 space-y-5">
          <AdminStudentProfilePhotoCard />
          <AdminStudentAcademicCard formData={formData} onChange={handleChange} />
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/students"
          className="px-6 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="px-7 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/25 cursor-pointer transition-colors"
        >
          + Add Student
        </button>
      </div>
    </form>
  );
};

export default AdminAddStudentForm;
