import { Star } from "lucide-react";
import { motion } from "framer-motion";
import accessibilityImg from "@/assets/images/image 27.png";
import collaborationImg from "@/assets/images/about (1).png";
import reliabilityImg from "@/assets/images/image 27 (3).png";
import continuousGrowthImg from "@/assets/images/about (2).png";
import { aboutValuesMock } from "@/mocks";
import { fadeInUp, staggerContainer, scrollViewport } from "@/animations";

const valueIcons = {
  accessibility: accessibilityImg,
  continuous_growth: collaborationImg,
  reliability: reliabilityImg,
  collaboration: continuousGrowthImg,

};

export const AboutValuesSection = () => {
  const { badge, title, values } = aboutValuesMock;

  return (
    <section
      id="about-values"
      className="relative z-10 w-full bg-white py-14 sm:py-20 lg:py-24 border-t border-slate-100 overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mx-auto max-w-2xl text-center mb-12 sm:mb-16"
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-4 py-1.5 shadow-xs mb-4">
            <Star className="h-3.5 w-3.5 text-[#007be3] fill-[#007be3]/20" />
            <span className="text-xs font-bold tracking-wider text-[#007be3]">
              {badge}
            </span>
          </div>

          {/* Headline with Yellow Spark Rays */}
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#01287b] leading-tight break-words">
            <span className="relative inline-block pr-4 sm:pr-8">
              {title}
              {/* Radiating 3 Yellow Spark Rays */}
              <svg
                className="absolute -top-3.5 right-0 sm:-top-5 sm:-right-2 w-5 h-5 sm:w-8 sm:h-8 text-[#febf11] pointer-events-none"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="16" y1="28" x2="16" y2="10" />
                <line x1="8" y1="26" x2="3" y2="13" />
                <line x1="24" y1="26" x2="29" y2="13" />
              </svg>
            </span>
          </h2>
        </motion.div>

        {/* 4 Values Cards Grid */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
        >
          {values.map((item) => {
            const isBlue = item.theme === "blue";
            const imgSrc = valueIcons[item.imageKey];

            return (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className={`group relative flex flex-col items-center text-center justify-between rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 min-h-[220px] transition-all duration-300 hover:shadow-xl ${isBlue
                  ? "bg-[#f4f9ff] border border-[#e2effd] shadow-xs hover:border-blue-200 hover:shadow-blue-500/10"
                  : "bg-[#fffdf5] border border-[#fef3c7]/80 shadow-xs hover:border-amber-200 hover:shadow-amber-500/10"
                  }`}
              >
                {/* 3D Value Icon */}
                <div className="h-14 sm:h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={imgSrc}
                    alt={item.title}
                    className="max-h-full w-auto object-contain select-none drop-shadow-xs"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="mt-4">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#01287b] tracking-tight group-hover:text-[#007be3] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed max-w-[200px] mx-auto">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutValuesSection;

