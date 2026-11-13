export const StudentProfileHeroCard = ({ profile }) => {
  return (
    <div className="relative rounded-[28px] bg-gradient-to-b from-[#f0f7ff] via-white to-[#f4f8fe] p-6 sm:p-7 border border-blue-100/70 shadow-2xs overflow-hidden flex flex-col items-center text-center">
      {/* Decorative Subtle Background Glow */}
      <div className="absolute inset-0 bg-radial from-blue-100/40 via-transparent to-transparent pointer-events-none" />

      {/* Avatar Image with Sky Blue Circular Container */}
      <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#e0f2fe] flex items-center justify-center p-1 shadow-xs">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      {/* Profile Name, Username, and Grade Pill */}
      <div className="mt-4 space-y-1 relative z-10">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {profile.name}
        </h2>
        <p className="text-xs sm:text-sm font-medium text-slate-400">
          {profile.username}
        </p>
        <div className="pt-2">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-white text-[#0080f6] border border-blue-200/80 shadow-2xs">
            {profile.grade}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileHeroCard;
