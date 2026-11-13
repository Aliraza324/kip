import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, KeyRound, ArrowLeft, Send, Check } from "lucide-react";
import logoImg from "@/assets/images/KIPClassin logo.png";
import { teacherAuthMock } from "@/mocks";
import { showToast } from "@/utils";
import { TeacherEmailVerifyView } from "./TeacherEmailVerifyView";

export const TeacherForgotPasswordView = ({ onBackToLogin }) => {
  const { forgot } = teacherAuthMock;
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      showToast.error("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast.success(`Verification code sent to ${email}`);
      setStep(2);
    }, 400);
  };

  const handleVerifyOtpSuccess = () => {
    showToast.success("Code verified! Set your new password.");
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showToast.error("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast.success("Password reset successfully! Please log in with your new credentials.");
      onBackToLogin();
    }, 450);
  };

  // Step 2: OTP Verification using the matching 6-digit squircle layout
  if (step === 2) {
    return (
      <TeacherEmailVerifyView
        email={email}
        title={forgot.verifyTitle}
        subtitle={`We've sent a 6-digit reset code to ${email}. Enter the code below to reset your password.`}
        buttonLabel={forgot.verifyButtonText}
        onVerifySuccess={handleVerifyOtpSuccess}
        onBack={() => setStep(1)}
      />
    );
  }

  // Step 3: New Password & Confirm Password
  if (step === 3) {
    return (
      <div className="space-y-5 text-left">
        <div className="flex items-center justify-between">
          <img src={logoImg} alt="KIPClassin Logo" className="h-8 sm:h-9 object-contain drop-shadow-md" />
          <button
            type="button"
            onClick={() => setStep(2)}
            className="p-1 rounded-full text-white/70 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{forgot.resetTitle}</h1>
          <p className="text-xs sm:text-sm text-slate-200/90 mt-1">{forgot.resetSubtitle}</p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-3.5">
          <div className="relative">
            <Lock className="w-4 h-4 text-white/70 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPass ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-full bg-white/10 border border-white/25 text-white placeholder-white/55 pl-11 pr-11 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-blue-400 focus:bg-white/15 transition-all shadow-inner"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white cursor-pointer"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 text-white/70 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-full bg-white/10 border border-white/25 text-white placeholder-white/55 pl-11 pr-11 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-blue-400 focus:bg-white/15 transition-all shadow-inner"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white cursor-pointer"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#0099ff] to-[#0066ee] hover:from-[#008ae6] hover:to-[#0055dd] text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-60"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>{isSubmitting ? "Updating..." : forgot.resetButtonText}</span>
          </button>
        </form>
      </div>
    );
  }

  // Step 1: Request Email
  return (
    <div className="space-y-5 text-left">
      <div className="flex items-center justify-between">
        <img src={logoImg} alt="KIPClassin Logo" className="h-8 sm:h-9 object-contain drop-shadow-md" />
        <button
          type="button"
          onClick={onBackToLogin}
          className="p-1 rounded-full text-white/70 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{forgot.title}</h1>
        <p className="text-xs sm:text-sm text-slate-200/90 mt-1">{forgot.subtitle}</p>
      </div>

      <form onSubmit={handleSendCode} className="space-y-4">
        <div className="relative">
          <Mail className="w-4 h-4 text-white/70 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email address"
            className="w-full rounded-full bg-white/10 border border-white/25 text-white placeholder-white/55 pl-11 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-blue-400 focus:bg-white/15 transition-all shadow-inner"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#0099ff] to-[#0066ee] hover:from-[#008ae6] hover:to-[#0055dd] text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-60"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? "Sending Code..." : forgot.sendCodeButtonText}</span>
        </button>

        <p className="text-xs text-white/80 text-center pt-1">
          Remember your password?{" "}
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-[#f5a623] font-bold hover:underline cursor-pointer"
          >
            {forgot.backToLogin}
          </button>
        </p>
      </form>
    </div>
  );
};

export default TeacherForgotPasswordView;

