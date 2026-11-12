import { useState } from "react";
import { User, Mail, Phone, Calendar, Edit3, Check, AtSign } from "lucide-react";
import toast from "react-hot-toast";

export const StudentPersonalInfoCard = ({ profile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
    toast.success("Profile saved successfully!");
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
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            isEditing
              ? "bg-[#0080f6] text-white shadow-sm"
              : "border border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          {isEditing ? (
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
      <div className="divide-y divide-slate-100/70">
        {infoFields.map((field) => {
          const Icon = field.icon;
          return (
            <div
              key={field.key}
              className={`flex items-center justify-between gap-3 py-2.5 ${
                isEditing ? "flex-col items-start gap-1.5" : ""
              }`}
            >
              <div className="flex items-center gap-2 text-slate-500 shrink-0">
                <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">{field.label}</span>
              </div>

              {isEditing ? (
                <input
                  type="text"
                  value={formData[field.key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6] focus:bg-white transition-colors"
                />
              ) : (
                <span className="text-xs sm:text-sm font-bold text-slate-900 text-right truncate min-w-0 max-w-[55%] sm:max-w-none">
                  {formData[field.key]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentPersonalInfoCard;
