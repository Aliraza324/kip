import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import toast from "react-hot-toast";
import { AdminTeacherAcademicAssignmentCard } from "./AdminTeacherAcademicAssignmentCard";

export const AdminAddTeacherForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    teacherId: "TE-1006",
    username: "",
    password: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      toast.error("Please enter teacher's full name");
      return;
    }
    const finalData = {
      ...formData,
      username: formData.username || formData.fullName.toLowerCase().replace(/\s+/g, "."),
      password: formData.password || "Kip@1234",
    };
    onSuccess(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left Column: Teacher Information */}
        <div className="lg:col-span-8 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <User className="w-5 h-5 text-slate-700" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Teacher Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter teacher's full name"
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Teacher ID *</label>
              <input
                type="text"
                name="teacherId"
                value={formData.teacherId}
                onChange={handleChange}
                placeholder="Auto-generate or enter ID"
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••"
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Email (Optional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Phone (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Date of Birth (Optional)</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Gender (Optional)</label>
              <div className="flex items-center gap-5 pt-2 text-xs sm:text-sm font-semibold text-slate-700">
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
          </div>
        </div>

        {/* Right Column: Profile Photo & Academic Assignment */}
        <div className="lg:col-span-4">
          <AdminTeacherAcademicAssignmentCard formData={formData} onChange={handleChange} />
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/teachers"
          className="px-6 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="px-7 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/25 cursor-pointer transition-colors"
        >
          + Add Teacher
        </button>
      </div>
    </form>
  );
};

export default AdminAddTeacherForm;
