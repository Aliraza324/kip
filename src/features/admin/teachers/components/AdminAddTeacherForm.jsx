import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { User, Loader2, RefreshCw, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { teacherService } from "@/service/apiService";
import { AdminTeacherAcademicAssignmentCard } from "./AdminTeacherAcademicAssignmentCard";

export const AdminAddTeacherForm = ({ onSuccess, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    teacherId: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    status: "active",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [subjects, setSubjects] = useState(["Mathematics", "Physics"]);
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [isGeneratingId, setIsGeneratingId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameEdited, setUsernameEdited] = useState(false);

  // Maximum allowed DOB (must be at least 18 years old)
  const maxDob = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return d.toISOString().split("T")[0];
  }, []);

  useEffect(() => {
    let active = true;
    const fetchNextCode = async () => {
      try {
        const code = await teacherService.getNextCode();
        if (active && code) {
          setFormData((prev) => (prev.teacherId ? prev : { ...prev, teacherId: code }));
        }
      } catch (err) {
        console.warn("Could not fetch next teacher code:", err);
      }
    };
    fetchNextCode();
    return () => {
      active = false;
    };
  }, []);

  const handleAutoGenerateCode = async () => {
    setIsGeneratingId(true);
    try {
      const code = await teacherService.getNextCode();
      if (code) {
        setFormData((prev) => ({ ...prev, teacherId: code }));
        toast.success(`Generated ID: ${code}`);
      }
    } catch {
      toast.error("Failed to generate unique ID");
    } finally {
      setIsGeneratingId(false);
    }
  };

  const handleFullNameChange = (e) => {
    const name = e.target.value;
    setFormData((prev) => {
      const updates = { ...prev, fullName: name };
      if (!usernameEdited) {
        const slug = name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, ".");
        updates.username = slug;
      }
      return updates;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsernameEdited(true);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      toast.error("Please enter teacher's full name");
      return;
    }

    if (formData.dob && formData.dob > maxDob) {
      toast.error("Teacher must be at least 18 years old.");
      return;
    }

    const classPairs = assignedClasses.map((item) => {
      const classId = typeof item === "string" ? item : item.id || item._id;
      return {
        classId,
        subject: item.subject || subjects[0] || undefined,
      };
    });

    const finalData = {
      fullName: formData.fullName.trim(),
      code: formData.teacherId?.trim() || undefined,
      username: formData.username?.trim() || undefined,
      password: formData.password?.trim() || undefined,
      email: formData.email?.trim() || undefined,
      phone: formData.phone?.trim() || undefined,
      dob: formData.dob || undefined,
      gender: formData.gender,
      status: (formData.status || "active").toLowerCase(),
      subjects: subjects.length > 0 ? subjects : undefined,
      classes: classPairs.length > 0 ? classPairs : undefined,
      avatar: avatarFile || undefined,
    };
    onSuccess(finalData);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
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
                autoComplete="off"
                value={formData.fullName}
                onChange={handleFullNameChange}
                placeholder="Enter teacher's full name"
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">Teacher ID</label>
                <button
                  type="button"
                  onClick={handleAutoGenerateCode}
                  disabled={isGeneratingId}
                  className="text-[11px] font-bold text-[#0080f6] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  title="Generate unique next ID"
                >
                  <RefreshCw className={`w-3 h-3 ${isGeneratingId ? "animate-spin" : ""}`} />
                  Auto Generate
                </button>
              </div>
              <input
                type="text"
                name="teacherId"
                autoComplete="off"
                value={formData.teacherId}
                onChange={handleChange}
                placeholder="Auto-generated (e.g. TE-1007)"
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
              <span className="text-[10px] text-slate-400 mt-1 block px-2">
                Leave blank or auto-generate for unique system ID (e.g. TE-1007)
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Username</label>
              <input
                type="text"
                name="username"
                autoComplete="off"
                value={formData.username}
                onChange={handleChange}
                placeholder="Auto-generated from name or enter custom"
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Auto-generated or enter custom password"
                  className="w-full pl-4 pr-11 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                  tabIndex={-1}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Email Address <span className="text-[11px] font-normal text-blue-600">(Login details sent here)</span>
              </label>
              <input
                type="email"
                name="email"
                autoComplete="off"
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
                autoComplete="off"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">Date of Birth (Optional)</label>
                <span className="text-[11px] text-slate-400 font-medium">18+ years required</span>
              </div>
              <input
                type="date"
                name="dob"
                max={maxDob}
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

        {/* Right Column: Profile Photo, Academic Assignment & Class Assignment */}
        <div className="lg:col-span-4">
          <AdminTeacherAcademicAssignmentCard
            formData={formData}
            onChange={handleChange}
            avatarFile={avatarFile}
            onAvatarChange={setAvatarFile}
            subjects={subjects}
            onSubjectsChange={setSubjects}
            assignedClasses={assignedClasses}
            onAssignedClassesChange={setAssignedClasses}
          />
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
          disabled={isSubmitting}
          className="px-7 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/25 cursor-pointer transition-colors flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>{isSubmitting ? "Creating Teacher..." : "+ Add Teacher"}</span>
        </button>
      </div>
    </form>
  );
};

export default AdminAddTeacherForm;
