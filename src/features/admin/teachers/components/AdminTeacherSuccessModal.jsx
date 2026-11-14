import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Key, User, Lock, Copy, CheckCheck, ArrowRight, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export const AdminTeacherSuccessModal = ({ isOpen, onClose, teacherData, onResetForm }) => {
  const [copiedUser, setCopiedUser] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const username = teacherData?.username || "ahmed.raza";
  const password = teacherData?.password || "Kip@1234";

  const handleCopyUser = () => {
    navigator.clipboard.writeText(username);
    setCopiedUser(true);
    toast.success("Username copied!");
    setTimeout(() => setCopiedUser(false), 2000);
  };

  const handleCopyPass = () => {
    navigator.clipboard.writeText(password);
    setCopiedPass(true);
    toast.success("Password copied!");
    setTimeout(() => setCopiedPass(false), 2000);
  };

  const handleViewTeachers = () => {
    onClose();
    navigate("/admin/teachers");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl p-6 sm:p-8 text-center border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Animated Icon */}
        <div className="relative mx-auto w-20 h-20 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-100/60 animate-ping opacity-30" />
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          <Sparkles className="w-5 h-5 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
        </div>

        {/* Modal Titles */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Teacher Added Successfully!
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
          The teacher account has been created and is ready to use.
        </p>

        {/* Credentials Box */}
        <div className="mt-6 rounded-2xl bg-[#f0f7fe] border border-blue-100/80 p-4 text-left space-y-3">
          <div className="flex items-center gap-2 text-[#0080f6] font-bold text-xs sm:text-sm">
            <Key className="w-4 h-4" />
            <span>Login Details</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-blue-50">
              <div className="flex items-center gap-2 text-slate-600">
                <User className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-500">Username</span>
                <span className="font-bold text-slate-900 ml-2">{username}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyUser}
                className="p-1 rounded-md text-slate-400 hover:text-[#0080f6] cursor-pointer"
                title="Copy Username"
              >
                {copiedUser ? <CheckCheck className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-blue-50">
              <div className="flex items-center gap-2 text-slate-600">
                <Lock className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-500">Password</span>
                <span className="font-bold text-slate-900 ml-2">{password}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyPass}
                className="p-1 rounded-md text-slate-400 hover:text-[#0080f6] cursor-pointer"
                title="Copy Password"
              >
                {copiedPass ? <CheckCheck className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Green Alert Banner */}
        <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-2">
          <span>ⓘ Share these login details with the teacher to access their account.</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onResetForm}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            Add Another Teacher
          </button>
          <button
            type="button"
            onClick={handleViewTeachers}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>View Teachers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTeacherSuccessModal;
