import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Lock, Eye, EyeOff, ArrowRight, Loader2, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import logoImg from "@/assets/images/KIPClassin logo.png";
import { adminLoginMock } from "@/mocks";
import { adminLoginSchema } from "../schemas/login.schema";
import { fadeInUp } from "@/animations";

export const AdminLoginForm = () => {
  const { title, subtitle, fields, submitButton, credentials } = adminLoginMock;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: credentials?.username || "admin",
      password: credentials?.password || "password123",
    },
  });

  const onSubmit = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      toast.success("Welcome back, Administrator!");
      navigate("/admin");
    }, 500);
  };

  const handleQuickFill = () => {
    setValue("username", credentials.username);
    setValue("password", credentials.password);
    toast.success("Demo credentials loaded!");
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="relative z-20 w-full max-w-[420px] sm:max-w-[440px] rounded-[28px] sm:rounded-[36px] backdrop-blur-xl bg-white/20 sm:bg-white/25 border border-white/40 shadow-2xl p-6 sm:p-9 text-left"
    >
      {/* Brand Logo */}
      <div className="flex items-center">
        <img
          src={logoImg}
          alt="KIPClassin Logo"
          className="h-8 sm:h-9 w-auto object-contain drop-shadow-xs"
        />
      </div>

      {/* Heading & Subtitle */}
      <h1 className="text-2xl sm:text-[28px] lg:text-3xl font-extrabold text-white tracking-tight mt-4 sm:mt-5 leading-tight drop-shadow-xs">
        {title}
      </h1>
      <p className="mt-1.5 text-xs sm:text-sm text-white/90 font-normal leading-relaxed drop-shadow-2xs">
        {subtitle}
      </p>

      {/* Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 sm:mt-7 space-y-3.5 sm:space-y-4" noValidate>
        {/* Username Field */}
        <div>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/80 pointer-events-none" />
            <input
              type={fields.username.type}
              placeholder={fields.username.placeholder}
              {...register("username")}
              className={`w-full rounded-full bg-white/25 border text-white placeholder:text-white/70 px-4 py-3 sm:py-3.5 pl-11 text-xs sm:text-sm outline-none backdrop-blur-md focus:border-white focus:bg-white/35 transition-all shadow-inner ${
                errors.username ? "border-rose-400" : "border-white/35"
              }`}
            />
          </div>
          {errors.username && (
            <p className="mt-1 ml-4 text-xs text-rose-200 font-medium">{errors.username.message}</p>
          )}
        </div>

        {/* Password Field with Hide/Show Toggle */}
        <div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/80 pointer-events-none" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder={fields.password.placeholder}
              {...register("password")}
              className={`w-full rounded-full bg-white/25 border text-white placeholder:text-white/70 px-4 py-3 sm:py-3.5 pl-11 pr-11 text-xs sm:text-sm outline-none backdrop-blur-md focus:border-white focus:bg-white/35 transition-all shadow-inner ${
                errors.password ? "border-rose-400" : "border-white/35"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors cursor-pointer p-0.5"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 ml-4 text-xs text-rose-200 font-medium">{errors.password.message}</p>
          )}
        </div>

        {/* Action Button: Login to Dashboard */}
        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full mt-2 rounded-full py-3.5 sm:py-4 px-6 bg-gradient-to-r from-[#0060d0] via-[#007be3] to-[#0092ff] hover:from-[#0050b5] hover:to-[#007be3] text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/35 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-75"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <span>{submitButton.label}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Demo Credentials Helper Pill */}
        <div
          onClick={handleQuickFill}
          className="mt-3 py-2 px-3.5 rounded-2xl bg-black/20 hover:bg-black/30 border border-white/20 backdrop-blur-md flex items-center justify-between text-[11px] text-white/90 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-amber-300" />
            <span><strong>User:</strong> admin &bull; <strong>Pass:</strong> password123</span>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">Auto Fill</span>
        </div>
      </form>
    </motion.div>
  );
};

export default AdminLoginForm;
