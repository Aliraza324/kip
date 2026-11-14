import { useState } from "react";
import { User, Edit2, Mail, Phone, Calendar, Users2, Check } from "lucide-react";
import toast from "react-hot-toast";

export const TeacherPersonalInfoCard = ({ profile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile.fullName || "Alex",
    username: profile.username || "@alexteacher",
    email: profile.email || "alex.teacher@kipclassin.com",
    phone: profile.phone || "+92 300 1234567",
    dob: profile.dob || "Mar 15, 2011",
    gender: profile.gender || "Male",
  });

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
    toast.success("Personal information updated!");
  };

  const handleCancel = () => {
    setFormData({
      fullName: profile.fullName || "Alex",
      username: profile.username || "@alexteacher",
      email: profile.email || "alex.teacher@kipclassin.com",
      phone: profile.phone || "+92 300 1234567",
      dob: profile.dob || "Mar 15, 2011",
      gender: profile.gender || "Male",
    });
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
                <input
                  type="text"
                  value={formData[f.key]}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#0080f6] focus:bg-white transition-all"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#0080f6] text-white text-xs font-bold shadow-xs hover:bg-[#006fd6] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Changes</span>
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
                  {formData[f.key]}
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
