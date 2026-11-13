import teacherAvatarImg from "@/assets/images/Reference photograph.png";

export const TeacherGreetingHeroCard = ({
  displayName = "Ms. Sarah",
  subtitle = "Here's your teaching overview for today.",
}) => {
  return (
    <div className="flex items-center gap-4 sm:gap-5 py-2">
      {/* Teacher Avatar with subtle glow */}
      <div className="relative shrink-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 p-0.5 shadow-sm">
          <img
            src={teacherAvatarImg}
            alt={displayName}
            className="w-full h-full rounded-full object-cover bg-amber-50"
          />
        </div>
      </div>

      {/* Greeting Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>Good Morning, {displayName}</span>
          <span className="text-2xl sm:text-3xl animate-bounce">👏</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default TeacherGreetingHeroCard;

