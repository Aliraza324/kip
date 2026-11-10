import { Video, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import girlImg from "@/assets/images/girl.png";
import { scaleIn } from "@/animations";

export const LandingHeroImage = () => {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="relative flex items-center justify-center lg:justify-end w-full"
    >
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        {/* Floating Card 1: Live Online Classes (Top-Left of Girl - Smooth Levitation) */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] sm:top-[15%] lg:top-[18%] -left-1 sm:-left-4 lg:-left-8 z-20 flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 rounded-xl sm:rounded-2xl bg-white px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 shadow-lg sm:shadow-xl shadow-blue-950/10 border border-slate-100/90 transition-transform duration-300 hover:scale-105 select-none"
        >
          <div className="flex h-6 w-6 sm:h-8 sm:w-8 lg:h-11 lg:w-11 shrink-0 items-center justify-center rounded-md sm:rounded-lg lg:rounded-xl bg-[#007be3] text-white shadow-xs">
            <Video className="h-3 w-3 sm:h-4 sm:w-4 lg:h-6 lg:w-6 stroke-[2.2]" />
          </div>
          <div className="text-left leading-none sm:leading-tight">
            <span className="block text-[9px] sm:text-xs lg:text-sm font-extrabold text-[#01287b] tracking-tight">
              Live Online
            </span>
            <span className="block text-[9px] sm:text-xs lg:text-sm font-extrabold text-[#01287b] tracking-tight">
              Classes
            </span>
          </div>
        </motion.div>

        {/* Floating Card 2: Interactive Learning (Top-Right of Girl - Smooth Levitation) */}
        <motion.div
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[22%] sm:top-[24%] lg:top-[26%] -right-1 sm:-right-4 lg:-right-8 z-20 flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 rounded-xl sm:rounded-2xl bg-white px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 shadow-lg sm:shadow-xl shadow-blue-950/10 border border-slate-100/90 transition-transform duration-300 hover:scale-105 select-none"
        >
          <div className="flex h-6 w-6 sm:h-8 sm:w-8 lg:h-11 lg:w-11 shrink-0 items-center justify-center rounded-md sm:rounded-lg lg:rounded-xl bg-[#febf11] text-white shadow-xs">
            <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 lg:h-6 lg:w-6 stroke-[2.2]" />
          </div>
          <div className="text-left leading-none sm:leading-tight">
            <span className="block text-[9px] sm:text-xs lg:text-sm font-extrabold text-[#01287b] tracking-tight">
              Interactive
            </span>
            <span className="block text-[9px] sm:text-xs lg:text-sm font-extrabold text-[#01287b] tracking-tight">
              Learning
            </span>
          </div>
        </motion.div>

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
    </motion.div>
  );
};

export default LandingHeroImage;
