import { Edit3, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const StudentProfileDropdown = ({
  isOpen,
  onClose,
  user,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleEditProfile = () => {
    onClose();
    navigate("/student/profile");
  };

  const handleLogOut = () => {
    onClose();
    navigate("/auth/login");
  };

  return (
    <div className="absolute right-0 top-full mt-2.5 w-60 sm:w-64 rounded-3xl bg-white border border-slate-100 shadow-2xl p-5 z-50 animate-in zoom-in-95 duration-150 text-center space-y-4">
      {/* Top Profile Avatar & Name */}
      <div className="space-y-1">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover mx-auto ring-4 ring-blue-50 shadow-sm"
        />
        <h3 className="font-bold text-slate-900 text-sm sm:text-base pt-1">
          {user.name}
        </h3>
        <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-[#0080f6]">
          {user.role || "Student"}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1 border-t border-slate-100">
        <button
          type="button"
          onClick={handleEditProfile}
          className="w-full py-2.5 px-4 rounded-2xl bg-blue-50 hover:bg-blue-100 text-[#0080f6] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Profile</span>
        </button>

        <button
          type="button"
          onClick={handleLogOut}
          className="w-full py-2 px-3 text-slate-600 hover:text-rose-600 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default StudentProfileDropdown;

