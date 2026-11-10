import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import laptopImg from "@/assets/images/laptop.png";
import liveLaptopImg from "@/assets/images/image 33 (1).png";
import whiteboardImg from "@/assets/images/stats.png";
import uptrendImg from "@/assets/images/uptrend.png";
import { howItWorksProcessMock } from "@/mocks";
import { fadeInUp, staggerContainer, scrollViewport } from "@/animations";

const iconMap = {
  laptop: laptopImg,
  "image 33 (1)": liveLaptopImg,
  stats: whiteboardImg,
  uptrend: uptrendImg,
};

export const HowItWorksProcessSection = () => {
  const { badge, heading, description, steps } = howItWorksProcessMock;

  return (
    <section
      id="how-it-works-process"
      className="relative z-10 w-full bg-white py-14 sm:py-18 lg:py-22 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Category Pill Badge */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="inline-flex items-center gap-2 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-4 py-1.5 shadow-xs mb-4"
        >
          <Trophy className="h-3.5 w-3.5 text-[#007be3]" />
          <span className="text-xs font-bold tracking-wider text-[#007be3] uppercase">
            {badge}
          </span>
        </motion.div>

        {/* Section Heading with Radiating Spark Rays */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#01287b] leading-[1.18]"
        >
          <span className="relative inline-block pr-6 sm:pr-8">
            {heading}
            {/* Radiating 3 Yellow Spark Rays */}
            <svg
              className="absolute -top-3.5 right-0.5 sm:-top-5 sm:-right-1.5 w-6 h-6 sm:w-8 sm:h-8 text-[#febf11] pointer-events-none"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="8" y1="26" x2="6" y2="8" />
              <line x1="15" y1="26" x2="25" y2="12" />
              <line x1="22" y1="27" x2="31" y2="21" />
            </svg>
          </span>
        </motion.h2>

        {/* Section Description */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        {/* 4 Process Step Cards Grid */}
        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((item) => {
            const iconSrc = iconMap[item.imageKey];

            return (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                className="relative rounded-[24px] sm:rounded-[28px] border border-[#e1eeff] bg-[#f4f9ff] p-6 sm:p-7 pt-12 sm:pt-14 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#c5dfff]"
              >
                {/* Step Number Badge */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#007be3] text-[11px] sm:text-xs font-bold text-white shadow-xs">
                  {item.step}
                </div>

                {/* 3D Illustration */}
                <div className="flex items-center justify-center h-20 sm:h-24 w-full">
                  <img
                    src={iconSrc}
                    alt={item.title}
                    className="max-h-16 sm:max-h-20 w-auto object-contain select-none"
                    loading="lazy"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-base sm:text-lg font-bold text-[#01287b] tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-[210px]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksProcessSection;

