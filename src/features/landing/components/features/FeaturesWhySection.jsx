import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import lightningImg from "@/assets/images/image 29.png";
import gridImg from "@/assets/images/image 29 (1).png";
import usersImg from "@/assets/images/image 27 (1).png";
import shieldImg from "@/assets/images/image 27 (3).png";
import { featuresWhyMock } from "@/mocks";
import { fadeInUp, staggerContainer, scrollViewport } from "@/animations";

const iconMap = {
  "image 29": lightningImg,
  "image 29 (1)": gridImg,
  "image 27 (1)": usersImg,
  "image 27 (3)": shieldImg,
};

export const FeaturesWhySection = () => {
  const { badge, headingPrefix, headingAccent, cards } = featuresWhyMock;

  return (
    <section
      id="features-why"
      className="relative z-10 w-full bg-white py-12 sm:py-16 lg:py-20 overflow-hidden"
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
          <Sparkles className="h-3.5 w-3.5 text-[#007be3]" />
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
          <span>{headingPrefix}</span>
          <span className="relative inline-block text-[#007be3] pr-6 sm:pr-8">
            {headingAccent}
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

        {/* 4 Feature Cards Grid */}
        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((item) => {
            const iconSrc = iconMap[item.imageKey];

            return (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="relative rounded-[24px] sm:rounded-[28px] border border-[#e1eeff] bg-[#f4f9ff] p-6 sm:p-7 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#c5dfff]"
              >
                {/* 3D Icon */}
                <div className="flex items-center justify-center h-12 w-12">
                  <img
                    src={iconSrc}
                    alt={item.title}
                    className="h-10 w-10 sm:h-11 sm:w-11 object-contain select-none"
                    loading="lazy"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-base sm:text-lg font-bold text-[#01287b] tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-[13.5px] text-slate-600 leading-relaxed max-w-[220px]">
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

export default FeaturesWhySection;

