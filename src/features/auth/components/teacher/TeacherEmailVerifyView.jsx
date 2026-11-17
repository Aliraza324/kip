import { useState, useRef, useEffect } from "react";
import { Check, ArrowLeft } from "lucide-react";
import logoImg from "@/assets/images/KIPClassin logo.png";
import { teacherAuthMock } from "@/mocks";
import { showToast } from "@/utils";
import { useTeacherVerifyEmail, useTeacherResendOtp } from "@/hooks/teacher";

export const TeacherEmailVerifyView = ({
  email = "teacher@domain.com",
  title,
  subtitle,
  buttonLabel,
  onVerifySuccess,
  onBack,
}) => {
  const { verify } = teacherAuthMock;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);

  const { mutateAsync: verifyEmailMutation, isPending: isVerifying } = useTeacherVerifyEmail({
    onSuccess: (res) => {
      showToast.success(res?.message || "Verification successful!");
      onVerifySuccess?.(otp.join(""), res?.data);
    },
    onError: (err) => {
      showToast.error(err?.message || "Verification failed. Invalid or expired OTP.");
    },
  });

  const { mutateAsync: resendOtpMutation, isPending: isResending } = useTeacherResendOtp({
    onSuccess: (res) => {
      setTimer(60);
      showToast.success(res?.message || "New 6-digit verification code sent to your email!");
    },
    onError: (err) => {
      showToast.error(err?.message || "Failed to resend verification code.");
    },
  });

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData) {
      const newOtp = pastedData.split("");
      while (newOtp.length < 6) newOtp.push("");
      setOtp(newOtp);
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleResend = async () => {
    if (timer > 0 || isResending) return;
    try {
      await resendOtpMutation({ email, purpose: "verify_email" });
    } catch {
      // Handled in onError
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      showToast.error("Please enter the complete 6-digit verification code.");
      return;
    }

    try {
      await verifyEmailMutation({ email, otp: code });
    } catch {
      // Handled in onError
    }
  };

  const formattedTimer = `00:${timer < 10 ? `0${timer}` : timer}`;

  return (
    <div className="space-y-5 text-left">
      {/* Brand Logo & Optional Back Button */}
      <div className="flex items-center justify-between">
        <img
          src={logoImg}
          alt="KIPClassin Logo"
          className="h-8 sm:h-9 w-auto object-contain drop-shadow-md"
        />
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="p-1 rounded-full text-white/70 hover:text-white cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Heading & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {title || verify.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-200/90 mt-1.5 leading-relaxed">
          {subtitle || (
            <>
              {verify.subtitlePrefix}{" "}
              <span className="font-bold text-white underline">{email}</span>.{" "}
              {verify.subtitleSuffix}
            </>
          )}
        </p>
      </div>

      {/* 6-Digit OTP Cells Matching Reference Image 3 */}
      <form onSubmit={handleVerify} className="space-y-5 pt-1">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2.5" onPaste={handlePaste}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-11 sm:w-14 h-13 sm:h-16 rounded-xl sm:rounded-2xl bg-white/10 border border-white/30 text-white text-xl sm:text-2xl font-black text-center focus:border-blue-400 focus:bg-white/20 outline-none transition-all shadow-inner"
            />
          ))}
        </div>

        {/* Verify Account Button */}
        <button
          type="submit"
          disabled={isVerifying}
          className="w-full py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#0099ff] to-[#0066ee] hover:from-[#008ae6] hover:to-[#0055dd] text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-60"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>{isVerifying ? "Verifying..." : buttonLabel || verify.verifyButtonText}</span>
        </button>

        {/* Resend Code Link with Timer */}
        <p className="text-xs text-white/80 text-center pt-1">
          {verify.resendPrefix}{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={timer > 0}
            className={`font-bold transition-colors ${
              timer > 0
                ? "text-[#f5a623] cursor-not-allowed opacity-90"
                : "text-[#f5a623] hover:underline cursor-pointer"
            }`}
          >
            {verify.resendLink} {timer > 0 && `(${formattedTimer})`}
          </button>
        </p>
      </form>
    </div>
  );
};

export default TeacherEmailVerifyView;

