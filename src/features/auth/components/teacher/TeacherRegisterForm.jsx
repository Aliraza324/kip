import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  GraduationCap,
  BookOpen,
  Layers,
  Users,
} from "lucide-react";
import logoImg from "@/assets/images/KIPClassin logo.png";
import { teacherAuthMock } from "@/mocks";
import { showToast } from "@/utils";
import { useTeacherRegister } from "@/hooks/teacher";
import { CreatableTagSelect } from "./CreatableTagSelect";

const QUALIFICATION_OPTIONS = [
  "BS Computer Science",
  "BS Mathematics",
  "BS Physics",
  "BS Chemistry",
  "BS English",
  "BS Biology",
  "MS / M.Phil",
  "PhD",
  "B.Ed / M.Ed",
  "Master of Arts (MA)",
  "Master of Science (MSc)",
  "Bachelor of Arts (BA)",
  "Bachelor of Science (BSc)",
];

const GENDER_OPTIONS = ["Male", "Female", "Other"];

const SUBJECT_OPTIONS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English Language",
  "English Literature",
  "Urdu",
  "Islamiat",
  "Pakistan Studies",
  "General Science",
  "Economics",
  "Accounting",
  "Statistics",
];

const CLASS_OPTIONS = [
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9 (Matric 1)",
  "Grade 10 (Matric 2)",
  "O Level (Year 1)",
  "O Level (Year 2)",
  "A Level (Year 1)",
  "A Level (Year 2)",
  "FSc Pre-Engineering Part 1",
  "FSc Pre-Engineering Part 2",
  "FSc Pre-Medical Part 1",
  "FSc Pre-Medical Part 2",
  "ICS (Computer Science)",
  "I.Com",
];

export const TeacherRegisterForm = ({ onNavigateLogin, onRegisterSuccess }) => {
  const { register } = teacherAuthMock;
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [qualification, setQualification] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [preferredClasses, setPreferredClasses] = useState([]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { mutateAsync: registerTeacher, isPending: isSubmitting } = useTeacherRegister({
    onSuccess: (res, vars) => {
      showToast.success(res?.message || "Verification code sent to your email!");
      onRegisterSuccess(vars);
    },
    onError: (err) => {
      showToast.error(err?.message || "Registration failed. Please try again.");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) return showToast.error("Please enter your full name.");
    if (!phoneNumber.trim()) return showToast.error("Please enter your phone number.");
    if (!email.trim() || !email.includes("@")) return showToast.error("Please enter a valid email address.");

    if (!gender) return showToast.error("Please select your gender.");
    if (!qualification || qualification.length === 0) {
      return showToast.error("Please select or type at least one qualification.");
    }
    if (!subjects || subjects.length === 0) {
      return showToast.error("Please select or type at least one subject.");
    }
    if (!preferredClasses || preferredClasses.length === 0) {
      return showToast.error("Please select or type at least one preferred class.");
    }

    if (!password || password.length < 6) return showToast.error("Password must be at least 6 characters.");
    if (password !== confirmPassword) return showToast.error("Passwords do not match.");
    if (!agreeTerms) return showToast.error("Please agree to the Terms of Service and Privacy Policy.");

    try {
      await registerTeacher({
        fullName,
        phoneNumber,
        email,
        password,
        confirmPassword,
        gender,
        qualification,
        subjects,
        preferredClasses,
        agreeTerms,
      });
    } catch {
      // Handled in onError
    }
  };

  return (
    <div className="space-y-3 sm:space-y-3.5 text-left">
      {/* Brand Logo */}
      <div className="flex items-center">
        <img
          src={logoImg}
          alt="KIPClassin Logo"
          className="h-7 sm:h-8 w-auto object-contain drop-shadow-md"
        />
      </div>

      {/* Heading & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {register.title}
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-200/90 mt-0.5">
          {register.subtitle}
        </p>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-2.5">
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

        {/* Row 3: Gender & Qualification */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <CreatableTagSelect
            icon={Users}
            placeholder="Gender"
            options={GENDER_OPTIONS}
            value={gender}
            onChange={setGender}
            isSingle={true}
          />

          <CreatableTagSelect
            icon={GraduationCap}
            placeholder="Qualification"
            options={QUALIFICATION_OPTIONS}
            value={qualification}
            onChange={setQualification}
          />
        </div>

        {/* Row 4: Subject(s) Dropdown / Creatable Array */}
        <CreatableTagSelect
          icon={BookOpen}
          placeholder="Subjects"
          options={SUBJECT_OPTIONS}
          value={subjects}
          onChange={setSubjects}
        />

        {/* Row 5: Preferred Classes Dropdown / Creatable Array */}
        <CreatableTagSelect
          icon={Layers}
          placeholder="Preferred Classes"
          options={CLASS_OPTIONS}
          value={preferredClasses}
          onChange={setPreferredClasses}
        />

        {/* Row 6: Password & Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {/* Create Password */}
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

          {/* Confirm Password */}
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
