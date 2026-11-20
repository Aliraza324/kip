import { useState, useEffect } from "react";
import { User, Mail, Phone, Calendar, Edit3, Check, AtSign, Loader2 } from "lucide-react";

export const StudentPersonalInfoCard = ({
  profile = {},
  onUpdateProfile,
  isUpdating = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || profile?.fullName || "Alex Student",
    username: profile?.username || "@alexstudent",
    email: profile?.email || "alex.student@kipclassin.com",
    phone: profile?.phone || "+92 300 1234567",
    dob: profile?.dob || "Mar 15, 2011",
    gender: profile?.gender || "Male",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || profile.fullName || "Alex Student",
        username: profile.username || "@alexstudent",
        email: profile.email || "alex.student@kipclassin.com",
        phone: profile.phone || "+92 300 1234567",
        dob: profile.dob || "Mar 15, 2011",
        gender: profile.gender || "Male",
      });
    }
  }, [profile]);

  const handleSave = async () => {
    if (onUpdateProfile) {
      try {
        await onUpdateProfile(formData);
        setIsEditing(false);
      } catch (err) {
        // error handled in hook
      }
    } else {
      setIsEditing(false);
    }
  };

  const infoFields = [
    { label: "Full Name", key: "name", value: formData.name, icon: User },
    { label: "Username", key: "username", value: formData.username, icon: AtSign },
    { label: "Email", key: "email", value: formData.email, icon: Mail },
    { label: "Phone", key: "phone", value: formData.phone, icon: Phone },
    { label: "Date of Birth", key: "dob", value: formData.dob, icon: Calendar },
    { label: "Gender", key: "gender", value: formData.gender, icon: User },
  ];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-100 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
            <User className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-sm sm:text-lg font-bold text-slate-900">
            Personal Information
          </h3>
        </div>

        <button
          type="button"
          disabled={isUpdating}
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            isEditing
              ? "bg-[#0080f6] hover:bg-[#006fd6] text-white shadow-sm"
              : "border border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          {isUpdating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : isEditing ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Save</span>
            </>
          ) : (
            <>
              <Edit3 className="w-3.5 h-3.5 text-blue-500" />
              <span>Edit</span>
            </>
          )}
        </button>
      </div>

      {/* Fields List */}
      <div className="space-y-4 sm:space-y-5 pt-1">
        {infoFields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-500">
                <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-xs font-medium">{field.label}</span>
              </div>

              {isEditing ? (
                field.key === "gender" ? (
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6] focus:bg-white transition-colors"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData[field.key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6] focus:bg-white transition-colors"
                  />
                )
              ) : (
                <p className="text-sm sm:text-base font-bold text-slate-900 pl-0.5">
                  {formData[field.key] || "—"}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentPersonalInfoCard;
