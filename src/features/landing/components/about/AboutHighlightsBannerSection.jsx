import { motion } from "framer-motion";
import pillBgImg from "@/assets/images/Background+Border+Shadow.png";
import smartLearningImg from "@/assets/images/image 27.png";
import builtForImg from "@/assets/images/image 27 (1).png";
import allInOneImg from "@/assets/images/image 27 (2).png";
import secureReliableImg from "@/assets/images/image 27 (3).png";
import { aboutHighlightsMock } from "@/mocks";
import { scaleIn, scrollViewport } from "@/animations";

const iconMap = {
  smart_learning: smartLearningImg,
  built_for: builtForImg,
  all_in_one: allInOneImg,
  secure_reliable: secureReliableImg,
};

export const AboutHighlightsBannerSection = () => {
  return (
    <section
      id="about-highlights"
      className="relative z-10 w-full bg-white py-10 sm:py-14 lg:py-16 overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Desktop & Tablet Stadium Pill Container (md+) */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="hidden md:block relative w-full aspect-[1253/287]"
        >
          {/* Exact Background Pill Graphic with Border, Shadow, and Corner Accents */}
          <img
            src={pillBgImg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none drop-shadow-xs"
          />

          {/* 4 Feature Items Row with Subtle Dividers */}
          <div className="absolute inset-0 flex items-center justify-between px-8 lg:px-14">
            {aboutHighlightsMock.map((item, index) => (
              <div
                key={item.id}
                className="flex-1 flex items-center justify-center h-full"
              >
                <div className="flex-1 flex flex-col items-center justify-center text-center px-2 group cursor-default">
                  {/* Icon with Subtle Hover Lift */}
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={iconMap[item.imageKey]}
                      alt={`${item.titleLine1} ${item.titleLine2}`}
                      className="h-10 md:h-12 lg:h-14 w-auto object-contain select-none"
                    />
                  </div>

                  {/* 2-Line Bold Heading */}
                  <div className="mt-2.5 sm:mt-3 text-center leading-tight">
                    <span className="block text-xs sm:text-sm lg:text-[15px] font-extrabold text-[#01287b] tracking-tight group-hover:text-[#007be3] transition-colors">
                      {item.titleLine1}
                    </span>
                    <span className="block text-xs sm:text-sm lg:text-[15px] font-extrabold text-[#01287b] tracking-tight group-hover:text-[#007be3] transition-colors">
                      {item.titleLine2}
                    </span>
                  </div>
                </div>

                {/* Vertical Divider Line */}
                {index < aboutHighlightsMock.length - 1 && (
                  <div
                    className="h-12 lg:h-14 w-px bg-slate-200/90 shrink-0"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile View (2x2 Grid Card - 320px Safe) */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="md:hidden relative w-full rounded-3xl bg-white border border-[#e2e8f0] p-6 shadow-lg shadow-blue-500/5 overflow-hidden"
        >
          {/* Subtle Ambient Decorative Corner Glows */}
          <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#febf11]/15 blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-[#007be3]/15 blur-xl pointer-events-none" />

          <div className="grid grid-cols-2 gap-y-6 gap-x-4 relative z-10">
            {aboutHighlightsMock.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center p-2 group"
              >
                <div className="transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={iconMap[item.imageKey]}
                    alt={`${item.titleLine1} ${item.titleLine2}`}
                    className="h-10 w-auto object-contain select-none"
                  />
                </div>
                <div className="mt-2 text-center leading-tight">
                  <span className="block text-xs font-bold text-[#01287b]">
                    {item.titleLine1}
                  </span>
                  <span className="block text-xs font-bold text-[#01287b]">
                    {item.titleLine2}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHighlightsBannerSection;

