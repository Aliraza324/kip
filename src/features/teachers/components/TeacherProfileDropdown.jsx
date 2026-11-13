import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
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
    <div className="absolute right-0 top-full mt-2 w-56 sm:w-60 rounded-3xl bg-white p-4 shadow-2xl border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="flex flex-col items-center text-center pb-3 border-b border-slate-100">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-blue-100 shadow-xs mb-2"
        />
        <h4 className="text-sm font-bold text-slate-900 leading-tight">
          {user.name}
        </h4>
        <span className="mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0080f6]">
          {user.role}
        </span>
      </div>

      <div className="pt-2 space-y-1">
        <button
          type="button"
          onClick={handleEditProfile}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-left"
        >
          <User className="w-4 h-4 text-slate-400" />
          <span>My Profile</span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
        >
          <LogOut className="w-4 h-4 text-rose-500" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default TeacherProfileDropdown;

