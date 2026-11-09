import { Video, BookOpen } from "lucide-react";
import girlImg from "@/assets/images/girl.png";

export const LandingHeroImage = () => {
  return (
    <div className="relative flex items-center justify-center lg:justify-end w-full">
      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
        {/* Floating Card 1: Live Online Classes (Top-Left of Girl) */}
        <div className="absolute top-[18%] -left-2 sm:-left-6 lg:-left-10 z-20 flex items-center gap-2.5 sm:gap-3 rounded-2xl bg-white px-3 sm:px-4 py-2 sm:py-2.5 shadow-xl shadow-blue-950/10 border border-slate-100 transition-transform duration-300 hover:scale-105 select-none">
          <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-[#007be3] text-white shadow-sm">
            <Video className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
          </div>
          <div className="text-left leading-tight">
            <span className="block text-xs sm:text-sm font-extrabold text-[#01287b] tracking-tight">
              Live Online
            </span>
            <span className="block text-xs sm:text-sm font-extrabold text-[#01287b] tracking-tight">
              Classes
            </span>
          </div>
        </div>

        {/* Floating Card 2: Interactive Learning (Top-Right of Girl) */}
        <div className="absolute top-[26%] -right-2 sm:-right-4 lg:-right-8 z-20 flex items-center gap-2.5 sm:gap-3 rounded-2xl bg-white px-3 sm:px-4 py-2 sm:py-2.5 shadow-xl shadow-blue-950/10 border border-slate-100 transition-transform duration-300 hover:scale-105 select-none">
          <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-[#febf11] text-white shadow-sm">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
          </div>
          <div className="text-left leading-tight">
            <span className="block text-xs sm:text-sm font-extrabold text-[#01287b] tracking-tight">
              Interactive
            </span>
            <span className="block text-xs sm:text-sm font-extrabold text-[#01287b] tracking-tight">
              Learning
            </span>
          </div>
        </div>

        {/* Main Girl Illustration */}
        <img
          src={girlImg}
          alt="Student learning online with KIPClassin"
          loading="eager"
          fetchPriority="high"
          width={1536}
          height={1024}
          className="w-full h-auto object-contain select-none block drop-shadow-sm"
        />
      </div>
    </div>
  );
};

export default LandingHeroImage;
