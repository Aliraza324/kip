import { useState } from "react";
import { Shield, Lock, Eye, EyeOff, Check, Info } from "lucide-react";
import toast from "react-hot-toast";

export const TeacherAccountSecurityCard = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const calculateStrength = (pass) => {
    if (!pass) return { score: 0, text: "--", color: "bg-slate-200" };
    const score = [
      pass.length >= 8,
      /[A-Z]/.test(pass),
      /[a-z]/.test(pass),
      /[0-9]/.test(pass),
      /[^A-Za-z0-9]/.test(pass),
    ].filter(Boolean).length;
    if (score <= 2) return { score, text: "Weak", color: "bg-rose-500" };
    if (score <= 4) return { score, text: "Medium", color: "bg-amber-500" };
    return { score, text: "Strong", color: "bg-emerald-500" };
  };

  const strength = calculateStrength(newPassword);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!currentPassword) return toast.error("Please enter your current password.");
    if (!newPassword) return toast.error("Please enter a new password.");
    if (newPassword.length < 8) return toast.error("New password must be at least 8 characters.");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match.");
    toast.success("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
        <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4 stroke-[2.2]" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Account &amp; Security
        </h3>
      </div>

      {/* Password Change Form */}
      <form onSubmit={handleUpdate} className="space-y-3.5">
        {/* Current Password */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Current Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0080f6] focus:bg-white transition-all"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">New Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0080f6] focus:bg-white transition-all"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Strength Bar */}
          <div className="flex items-center justify-between pt-1">
            <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${strength.color}`}
                style={{ width: `${(strength.score / 5) * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Password strength: {strength.text}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Confirm New Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0080f6] focus:bg-white transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Password Requirements Blue Info Box */}
        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-[#0080f6]">
            <Info className="w-3.5 h-3.5" />
            <span>Password must contain:</span>
          </div>
          <ul className="space-y-1 pl-1 text-[11px] text-slate-600 font-medium">
            {[
              "At least 8 characters",
              "One uppercase letter (A–Z)",
              "One lowercase letter (a–z)",
              "One number (0–9)",
              "One special character (e.g. !@#$%)",
            ].map((rule, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-2xl bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            ✓ Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherAccountSecurityCard;
