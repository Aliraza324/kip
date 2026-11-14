import { Camera, Check } from "lucide-react";

export const TeacherProfileHeroCard = ({ profile, onAvatarClick }) => {
  return (
    <div className="relative rounded-[32px] bg-gradient-to-r from-[#eef7ff] via-[#f5f9ff] to-[#e8f3fe] p-6 sm:p-8 border border-blue-100/80 shadow-2xs overflow-hidden flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
      {/* Decorative Wave/Glow */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-200/30 to-transparent pointer-events-none" />

      {/* Avatar with Camera Overlay Button matching SS 2 */}
      <div className="relative shrink-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white border-2 border-blue-100 shadow-md overflow-hidden">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <button
          type="button"
          onClick={onAvatarClick}
          className="absolute bottom-0.5 right-0.5 w-8 h-8 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white flex items-center justify-center shadow-md border-2 border-white transition-transform hover:scale-110 cursor-pointer"
          title="Change profile photo"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>

      {/* Name, Username, and 3 Badges matching SS 2 */}
      <div className="space-y-2 text-center sm:text-left min-w-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {profile.name}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-400">
            {profile.username}
          </p>
        </div>

        {/* 3 Badges: Teacher, Mathematics, Verified */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0080f6] border border-blue-100/80 shadow-2xs">
            {profile.role || "Teacher"}
          </span>

          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 shadow-2xs">
            {profile.subject || "Mathematics"}
          </span>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/70 shadow-2xs">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Verified</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileHeroCard;
