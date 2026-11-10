import { motion } from "framer-motion";
import { landingWhatYouCanDoMock } from "@/mocks";
import { fadeInUp, staggerContainer, viewportConfig } from "@/animations";
import { WhatYouCanDoCardIcon } from "./WhatYouCanDoIcons";

export const LandingWhatYouCanDoSection = () => {
  const { badge, headingMain, headingAccent1, headingAccent2, cards } =
    landingWhatYouCanDoMock;

  return (
    <section
      id="what-you-can-do"
      className="relative z-10 bg-white py-16 sm:py-24 border-t border-slate-100 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mx-auto max-w-3xl text-center mb-12 sm:mb-16"
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-4 py-1.5 shadow-xs mb-4">
            <svg
              className="w-3.5 h-3.5 text-[#007be3]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span className="text-xs font-bold tracking-wider text-[#007be3] uppercase">
              {badge}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-tight break-words">
            <span className="text-[#01287b]">{headingMain}</span>
            <span className="text-[#007be3]">{headingAccent1}</span>
            <div className="text-[#007be3] mt-1">{headingAccent2}</div>
          </h2>
        </motion.div>

        {/* 6 Feature Cards Grid */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 max-w-6xl mx-auto"
        >
          {cards.map((card) => {
            const isBlue = card.theme === "blue";

            return (
              <motion.div
                key={card.id}
                variants={fadeInUp}
                className={`group relative flex flex-col items-center text-center p-8 sm:p-9 rounded-[32px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                  isBlue
                    ? "bg-[#f4f9ff] border border-[#e3effd] shadow-xs hover:border-blue-200 hover:shadow-blue-500/10"
                    : "bg-[#fffdf5] border border-[#fef3c7]/80 shadow-xs hover:border-amber-200 hover:shadow-amber-500/10"
                }`}
              >
                {/* Squircle Icon Container */}
                <div
                  className={`w-16 h-16 rounded-[22px] flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105 ${
                    isBlue
                      ? "bg-gradient-to-b from-[#0086f8] to-[#006ee6] shadow-lg shadow-blue-500/25"
                      : "bg-[#febf11] shadow-lg shadow-amber-500/25"
                  }`}
                >
                  <WhatYouCanDoCardIcon type={card.iconType} />
                </div>

                {/* Card Title */}
                <h3 className="text-xl sm:text-[22px] font-extrabold text-[#01287b] mb-3 tracking-tight">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-sm sm:text-[15px] leading-relaxed text-slate-500 max-w-[280px] mx-auto">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default LandingWhatYouCanDoSection;
