import { useNavigate } from "react-router-dom";
import { Edit2, LogOut } from "lucide-react";
import toast from "react-hot-toast";

export const TeacherProfileDropdown = ({ isOpen, onClose, user }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleLogout = () => {
    onClose();
    toast.success("Logged out successfully");
    navigate("/auth/teacher-login");
  };

  const handleEditProfile = () => {
    onClose();
    navigate("/teacher/profile");
  };

  return (
    <div className="absolute right-0 top-full mt-3 w-56 sm:w-60 rounded-3xl bg-white p-4 shadow-2xl border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
      {/* Top pointing caret arrow matching SS 1 */}
      <div className="absolute -top-2 right-6 w-4 h-4 bg-white rotate-45 border-t border-l border-slate-100" />

      {/* User Header */}
      <div className="flex flex-col items-center text-center pb-3 pt-1">
        <div className="w-14 h-14 rounded-full p-0.5 bg-blue-50 border-2 border-blue-100 shadow-2xs mb-2 overflow-hidden">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h4 className="text-sm font-bold text-slate-900 leading-tight">
          {user.name || "Alex Teacher"}
        </h4>
        <span className="mt-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#f0f7ff] text-[#0080f6]">
          {user.role || "Teacher"}
        </span>
      </div>

      {/* Actions matching SS 1 */}
      <div className="pt-2 space-y-1.5">
        <button
          type="button"
          onClick={handleEditProfile}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#f0f7ff] hover:bg-[#e4f0fe] text-[#0080f6] text-xs font-bold transition-all cursor-pointer"
        >
          <Edit2 className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Edit Profile</span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-700 hover:text-rose-600 hover:bg-slate-50 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default TeacherProfileDropdown;
