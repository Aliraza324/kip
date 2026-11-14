import teacherAvatarImg from "@/assets/images/Reference photograph.png";

export const TeacherGreetingHeroCard = ({
  displayName = "Ms. Sarah",
  subtitle = "Here's your teaching overview for today.",
}) => {
  return (
    <div className="flex items-center gap-3 sm:gap-5 py-1 sm:py-2">
      {/* Teacher Avatar with subtle glow */}
      <div className="relative shrink-0">
        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 p-0.5 shadow-sm">
          <img
            src={teacherAvatarImg}
            alt={displayName}
            className="w-full h-full rounded-full object-cover bg-amber-50"
          />
        </div>
      </div>

      {/* Greeting Title & Subtitle */}
      <div className="min-w-0 flex-1">
        <h1 className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span>Good Morning, {displayName}</span>
          <span className="text-xl sm:text-3xl animate-bounce">👏</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 sm:mt-1 truncate sm:whitespace-normal">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default TeacherGreetingHeroCard;
