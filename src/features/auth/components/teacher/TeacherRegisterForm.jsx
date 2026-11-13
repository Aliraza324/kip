import { useState } from "react";
import { User, Phone, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import logoImg from "@/assets/images/KIPClassin logo.png";
import { teacherAuthMock } from "@/mocks";

export const TeacherRegisterForm = ({ onNavigateLogin, onRegisterSuccess }) => {
  const { register } = teacherAuthMock;
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim()) return toast.error("Please enter your full name.");
    if (!phoneNumber.trim()) return toast.error("Please enter your phone number.");
    if (!email.trim() || !email.includes("@")) return toast.error("Please enter a valid email address.");
    if (!password || password.length < 6) return toast.error("Password must be at least 6 characters.");
    if (password !== confirmPassword) return toast.error("Passwords do not match.");
    if (!agreeTerms) return toast.error("Please agree to the Terms of Service and Privacy Policy.");

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Verification code sent to your email!");
      onRegisterSuccess({ fullName, phoneNumber, email, password });
    }, 400);
  };

  return (
    <div className="space-y-4 sm:space-y-5 text-left">
      {/* Brand Logo */}
      <div className="flex items-center">
        <img
          src={logoImg}
          alt="KIPClassin Logo"
          className="h-8 sm:h-9 w-auto object-contain drop-shadow-md"
        />
      </div>

      {/* Heading & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {register.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-200/90 mt-1">
          {register.subtitle}
        </p>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Row 1: Full Name & Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <div className="relative">
            <User className="w-4 h-4 text-white/70 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={register.fullNamePlaceholder}
              className="w-full rounded-full bg-white/10 border border-white/25 text-white placeholder-white/55 pl-11 pr-4 py-2.5 text-xs sm:text-sm outline-none focus:border-blue-400 focus:bg-white/15 transition-all shadow-inner"
            />
          </div>

          <div className="relative">
            <Phone className="w-4 h-4 text-white/70 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={register.phonePlaceholder}
              className="w-full rounded-full bg-white/10 border border-white/25 text-white placeholder-white/55 pl-11 pr-4 py-2.5 text-xs sm:text-sm outline-none focus:border-blue-400 focus:bg-white/15 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Row 2: Email Address */}
        <div className="relative">
          <Mail className="w-4 h-4 text-white/70 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={register.emailPlaceholder}
            className="w-full rounded-full bg-white/10 border border-white/25 text-white placeholder-white/55 pl-11 pr-4 py-2.5 text-xs sm:text-sm outline-none focus:border-blue-400 focus:bg-white/15 transition-all shadow-inner"
          />
        </div>

        {/* Row 3: Create Password */}
        <div className="relative">
          <Lock className="w-4 h-4 text-white/70 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={register.createPasswordPlaceholder}
            className="w-full rounded-full bg-white/10 border border-white/25 text-white placeholder-white/55 pl-11 pr-11 py-2.5 text-xs sm:text-sm outline-none focus:border-blue-400 focus:bg-white/15 transition-all shadow-inner"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white cursor-pointer"
          >
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Row 4: Confirm Password */}
        <div className="relative">
          <Lock className="w-4 h-4 text-white/70 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type={showConfirmPass ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={register.confirmPasswordPlaceholder}
            className="w-full rounded-full bg-white/10 border border-white/25 text-white placeholder-white/55 pl-11 pr-11 py-2.5 text-xs sm:text-sm outline-none focus:border-blue-400 focus:bg-white/15 transition-all shadow-inner"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPass(!showConfirmPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white cursor-pointer"
          >
            {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Checkbox: Terms of Service & Privacy Policy */}
        <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-white/40 accent-[#f5a623] cursor-pointer"
          />
          <span className="text-[11px] sm:text-xs text-white/80 leading-snug">
            I agree to the{" "}
            <span className="text-[#f5a623] font-bold hover:underline">Terms of Service</span>{" "}
            and{" "}
            <span className="text-[#f5a623] font-bold hover:underline">Privacy Policy</span>.
          </span>
        </label>

        {/* Create Account Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 sm:py-3 mt-2 rounded-full bg-gradient-to-r from-[#0099ff] to-[#0066ee] hover:from-[#008ae6] hover:to-[#0055dd] text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-60"
        >
          <UserPlus className="w-4 h-4" />
          <span>{isSubmitting ? "Creating Account..." : register.createAccountButtonText}</span>
        </button>

        {/* Bottom Login Link */}
        <p className="text-xs text-white/80 text-center pt-2">
          {register.alreadyHaveAccount}{" "}
          <button
            type="button"
            onClick={onNavigateLogin}
            className="text-[#f5a623] font-bold hover:underline cursor-pointer"
          >
            {register.loginLink}
          </button>
        </p>
      </form>
    </div>
  );
};

export default TeacherRegisterForm;

