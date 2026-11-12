export const StudentProfileHeroCard = ({ profile }) => {
  return (
    <div className="relative rounded-3xl bg-gradient-to-r from-blue-50/70 via-white to-blue-50/40 p-6 sm:p-7 border border-slate-100 shadow-2xs overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-5">
      {/* Decorative Wave/Background Element */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-100/30 to-transparent pointer-events-none rounded-r-3xl" />

      {/* Avatar Image */}
      <img
        src={profile.avatar}
        alt={profile.name}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md object-cover shrink-0 relative z-10"
      />

      {/* Profile Name, Username, and Grade Pill */}
      <div className="text-center sm:text-left space-y-1 relative z-10">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {profile.name}
        </h2>
        <p className="text-xs sm:text-sm font-medium text-slate-400">
          {profile.username}
        </p>
        <div className="pt-1">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0080f6] border border-blue-200/60 shadow-2xs">
            {profile.grade}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileHeroCard;

