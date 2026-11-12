import { useState } from "react";
import { Shield, Lock, Eye, EyeOff, Check, Info } from "lucide-react";
import toast from "react-hot-toast";

export const StudentAccountSecurityCard = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const calculateStrength = (pass) => {
    if (!pass) return { score: 0, text: "-" };
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
    if (!newPassword) return toast.error("Please enter a new password.");
    if (newPassword.length < 8) return toast.error("New password must be at least 8 characters.");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match.");
    toast.success("Password updated successfully!");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCancel = () => {
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-1 border-b border-slate-100">
        <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center">
          <Shield className="w-4 h-4 stroke-[2.2]" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Account &amp; Security
        </h3>
      </div>

      {/* Inputs Form */}
      <form onSubmit={handleUpdate} className="space-y-4">
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
              className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6] focus:bg-white transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {newPassword && (
            <div className="flex items-center justify-between pt-1">
              <div className="w-32 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full ${strength.color}`}
                  style={{ width: `${(strength.score / 5) * 100}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400 font-semibold">
                Password strength: {strength.text}
              </span>
            </div>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Confirm New Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6] focus:bg-white transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Password Rules Box Matching Image */}
        <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100 text-[11px] text-slate-600 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <Info className="w-3.5 h-3.5 text-blue-500" />
            <span>Password must contain:</span>
          </div>
          <ul className="space-y-1 text-slate-500 pl-5 list-disc">
            <li>At least 8 characters</li>
            <li>One uppercase letter (A–Z)</li>
            <li>One lowercase letter (a–z)</li>
            <li>One number (0–9)</li>
            <li>One special character (e.g. !@#$%)</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Update Password</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentAccountSecurityCard;