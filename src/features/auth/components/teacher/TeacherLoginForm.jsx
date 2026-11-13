import { useState } from "react";
import { User, Lock, Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import logoImg from "@/assets/images/KIPClassin logo.png";
import { teacherAuthMock } from "@/mocks";

export const TeacherLoginForm = ({
  onNavigateRegister,
  onNavigateForgot,
  onLoginSuccess,
  prefilledUsername = "",
  initialStatus = "approved",
}) => {
  const { login, demoAccounts } = teacherAuthMock;
  const [username, setUsername] = useState(prefilledUsername || demoAccounts.approved.username);
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testStatus, setTestStatus] = useState(initialStatus); // "approved" | "pending"

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error("Please enter your username or email.");
      return;
    }
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Determine if approved or pending review per Requirement 6
      const isPending =
        testStatus === "pending" ||
        username.toLowerCase().includes("domain.com") ||
        username.toLowerCase() === demoAccounts.pending.username.toLowerCase();

      if (isPending) {
        toast("Verification in progress. Your account is being reviewed by administration.", {
          icon: "⏳",
          duration: 4000,
          style: {
            borderRadius: "14px",
            background: "#1e293b",
            color: "#f8fafc",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        });
      } else {
        toast.success("Welcome to Dashboard!", {
          duration: 3000,
        });
        onLoginSuccess?.();
      }
    }, 450);
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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {login.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-200/90 mt-1">
          {login.subtitle}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-3 sm:space-y-3.5">
        {/* Username Input */}
        <div className="relative">
          <User className="w-4 h-4 text-white/70 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={login.usernamePlaceholder}
            className="w-full rounded-full bg-white/10 border border-white/25 text-white placeholder-white/55 pl-11 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-blue-400 focus:bg-white/15 transition-all shadow-inner"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <Lock className="w-4 h-4 text-white/70 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={login.passwordPlaceholder}
            className="w-full rounded-full bg-white/10 border border-white/25 text-white placeholder-white/55 pl-11 pr-11 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-blue-400 focus:bg-white/15 transition-all shadow-inner"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end pt-0.5">
          <button
            type="button"
            onClick={onNavigateForgot}
            className="text-xs font-medium text-white/80 hover:text-white hover:underline transition-colors cursor-pointer"
          >
            {login.forgotPasswordText}
          </button>
        </div>

        {/* Log In Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#0099ff] to-[#0066ee] hover:from-[#008ae6] hover:to-[#0055dd] text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-60"
        >
          <LogIn className="w-4 h-4" />
          <span>{isSubmitting ? "Logging In..." : login.loginButtonText}</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center py-1">
          <div className="border-t border-white/20 w-full" />
          <span className="bg-transparent px-3 text-[11px] uppercase tracking-wider text-white/60 font-medium">
            {login.orText}
          </span>
          <div className="border-t border-white/20 w-full" />
        </div>

        {/* Register as Independent Teacher Button */}
        <button
          type="button"
          onClick={onNavigateRegister}
          className="w-full py-2.5 sm:py-3 rounded-full bg-[#f5a623] hover:bg-[#e69818] text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
        >
          <UserPlus className="w-4 h-4 text-white" />
          <span>{login.registerButtonText}</span>
        </button>

        {/* Institution Notice */}
        <p className="text-[11px] leading-relaxed text-white/65 text-center pt-1">
          {login.institutionNotice}
        </p>

        {/* Test condition simulator for Requirement 6 */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
          <span>Test condition:</span>
          <button
            type="button"
            onClick={() => {
              const next = testStatus === "approved" ? "pending" : "approved";
              setTestStatus(next);
              setUsername(demoAccounts[next].username);
              toast(`Switched test condition to: ${next.toUpperCase()}`, { icon: "⚙️" });
            }}
            className="text-amber-300 hover:underline font-bold cursor-pointer"
          >
            {testStatus === "approved" ? "Status: Approved (Click for Pending)" : "Status: Pending (Click for Approved)"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherLoginForm;

