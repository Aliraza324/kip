import { useState, useEffect } from "react";
import { User, Edit2, Mail, Phone, Calendar, Users2, Check, Loader2 } from "lucide-react";

export const TeacherPersonalInfoCard = ({ profile, onUpdateProfile, isUpdating = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || profile.name || "",
        username: profile.username ? `@${profile.username.replace(/^@/, "")}` : "",
        email: profile.email || "",
        phone: profile.phone || "",
        dob: profile.dob ? new Date(profile.dob).toISOString().split("T")[0] : "",
        gender: profile.gender || "Male",
      });
    }
  }, [profile]);

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (onUpdateProfile) {
      try {
        await onUpdateProfile({
          fullName: formData.fullName,
          username: formData.username.replace(/^@/, ""),
          email: formData.email,
          phone: formData.phone,
          dob: formData.dob || undefined,
          gender: formData.gender,
        });
        setIsEditing(false);
      } catch {
        // Error handled in parent hook
      }
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || profile.name || "",
        username: profile.username ? `@${profile.username.replace(/^@/, "")}` : "",
        email: profile.email || "",
        phone: profile.phone || "",
        dob: profile.dob ? new Date(profile.dob).toISOString().split("T")[0] : "",
        gender: profile.gender || "Male",
      });
    }
    setIsEditing(false);
  };

  const fields = [
    { key: "fullName", label: "Full Name", icon: User },
    { key: "username", label: "Username", icon: User },
    { key: "email", label: "Email", icon: Mail },
    { key: "phone", label: "Phone", icon: Phone },
    { key: "dob", label: "Date of Birth", icon: Calendar },
    { key: "gender", label: "Gender", icon: Users2 },
  ];

  const formatDisplayValue = (key, val) => {
    if (!val) return "—";
    if (key === "dob") {
      try {
        return new Date(val).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      } catch {
        return val;
      }
    }
    return val;
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-4">
      {/* Card Header matching SS 2 */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
            <User className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Personal Information
          </h3>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:text-[#0080f6] hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        )}
      </div>

      {/* Fields List or Edit Form */}
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-3.5 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {fields.map((f) => (
              <div key={f.key} className="space-y-1">
                <label className="text-xs font-bold text-slate-700">{f.label}</label>
                {f.key === "gender" ? (
                  <select
                    value={formData[f.key]}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#0080f6] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <input
                    type={f.key === "dob" ? "date" : f.key === "email" ? "email" : "text"}
                    value={formData[f.key]}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#0080f6] focus:bg-white transition-all"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isUpdating}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-5 py-2 rounded-xl bg-[#0080f6] text-white text-xs font-bold shadow-xs hover:bg-[#006fd6] transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="divide-y divide-slate-100/80 text-xs sm:text-sm">
          {fields.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.key} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5 text-slate-400 font-medium">
                  <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{f.label}</span>
                </div>
                <span className="font-bold text-slate-900 truncate ml-2">
                  {formatDisplayValue(f.key, formData[f.key])}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TeacherPersonalInfoCard;
