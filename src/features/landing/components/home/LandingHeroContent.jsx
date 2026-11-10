import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { landingHeroMock } from "@/mocks";
import { fadeInUp, staggerContainer } from "@/animations";

export const LandingHeroContent = () => {
  const { badge, headingLine1, headingLine2, description, primaryCta, secondaryCta } =
    landingHeroMock;

  return (
    <motion.div
      variants={staggerContainer(0.12, 0.05)}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-xl mx-auto lg:mx-0 w-full"
    >
      {/* Category Pill Badge */}
      <motion.div
        variants={fadeInUp}
        className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-3.5 sm:px-4 py-1.5 shadow-xs"
      >
        <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#007be3]" />
        <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#007be3] uppercase">
          {badge}
        </span>
      </motion.div>

      {/* Main Hero Headline */}
      <motion.div variants={fadeInUp} className="relative">
        {/* Yellow Spark Accent above headline */}
        <div className="absolute -top-7 right-6 hidden sm:block" aria-hidden="true">
          <svg
            className="w-8 h-8 text-[#febf11]"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          >
            <line x1="16" y1="28" x2="16" y2="10" />
            <line x1="8" y1="26" x2="3" y2="13" />
            <line x1="24" y1="26" x2="29" y2="13" />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-[#01287b] sm:text-5xl lg:text-6xl leading-[1.15]">
          <span>{headingLine1}</span>
          <br />
          <span className="relative inline-block mt-1">
            {headingLine2}
            {/* Playful Yellow Swoosh Underline */}
            <svg
              className="absolute left-0 -bottom-2 w-full h-3 text-[#febf11]"
              viewBox="0 0 280 16"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M4 12C65 3 175 3 276 12"
                stroke="#febf11"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>
      </motion.div>

      {/* Subtitle Paragraph */}
      <motion.p
        variants={fadeInUp}
        className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 max-w-lg"
      >
        {description}
      </motion.p>

      {/* Call to Action Buttons */}
      <motion.div
        variants={fadeInUp}
        className="mt-6 sm:mt-8 flex flex-row flex-nowrap items-center justify-center lg:justify-start gap-2 sm:gap-4 w-full"
      >
        <Link
          to={primaryCta.href}
          className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-1 sm:gap-2 rounded-xl bg-[#007be3] px-2.5 sm:px-5 lg:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm lg:text-base font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-[#0066c0] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>{primaryCta.text}</span>
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
        </Link>

        <Link
          to={secondaryCta.href}
          className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-1 sm:gap-2 rounded-xl border-2 border-[#007be3] bg-white/95 px-2.5 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-semibold text-[#01287b] shadow-xs transition-all hover:bg-blue-50 hover:border-[#0066c0] focus:outline-none focus:ring-2 focus:ring-blue-300 whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="flex h-3.5 w-3.5 sm:h-5 sm:w-5 items-center justify-center rounded-full border border-[#007be3] text-[#007be3] shrink-0">
            <Play className="h-2 w-2 sm:h-2.5 sm:w-2.5 fill-current ml-0.5" />
          </span>
          <span>{secondaryCta.text}</span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default LandingHeroContent;
