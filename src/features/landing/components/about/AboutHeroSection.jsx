import { Link } from "react-router-dom";
import { Users, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import heroBgImg from "@/assets/images/heroBg.png";
import laptopCompositeImg from "@/assets/images/b58e334b69cf4c6922d77d48dc1ea4603c997701.png";
import { aboutHeroMock } from "@/mocks";
import { fadeInUp, scaleIn, staggerContainer } from "@/animations";

export const AboutHeroSection = () => {
  const {
    badge,
    headingLine1,
    headingLine2Prefix,
    headingLine2Accent,
    description,
    primaryCta,
    secondaryCta,
  } = aboutHeroMock;

  return (
    <section
      id="about-hero"
      className="relative min-h-[calc(100vh-76px)] w-full flex items-center justify-center overflow-x-clip bg-[#fdfdfd] bg-no-repeat bg-center py-10 lg:py-16"
      style={{
        backgroundImage: `url("${heroBgImg}")`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Pill Badge, Story Headline, Description, & CTAs */}
          <motion.div
            variants={staggerContainer(0.12, 0.05)}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-5 text-left"
          >
            {/* Category Pill Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-4 py-1.5 shadow-xs mb-5"
            >
              <Users className="h-3.5 w-3.5 text-[#007be3]" />
              <span className="text-xs font-bold tracking-wider text-[#007be3] uppercase">
                {badge}
              </span>
            </motion.div>

            {/* Headline with Radiating Spark Rays & Curved Swoosh */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold tracking-tight leading-[1.12] break-words"
            >
              <span className="relative inline-block text-[#01287b] pr-4 sm:pr-8">
                {headingLine1}
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
              <br />
              <span className="text-[#01287b]">{headingLine2Prefix}</span>
              <span className="relative inline-block text-[#007be3]">
                {headingLine2Accent}
                {/* Playful Yellow Curved Swoosh Underline */}
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-[#febf11]"
                  viewBox="0 0 160 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 10C45 3 115 3 157 10"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Description Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-[17px] leading-relaxed text-slate-600 max-w-xl"
            >
              {description}
            </motion.p>

            {/* Call to Action Buttons - Single Line on Small Screens down to 320px */}
            <motion.div
              variants={fadeInUp}
              className="mt-7 sm:mt-8 flex flex-row flex-nowrap items-center gap-2 sm:gap-4"
            >
              {/* Primary: Create an Account with Arrow */}
              <Link
                to={primaryCta.href}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#007be3] hover:bg-[#0066c0] px-3 sm:px-7 lg:px-8 py-2.5 sm:py-3.5 text-xs sm:text-base font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-hidden whitespace-nowrap shrink-0"
              >
                <span>{primaryCta.text}</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5] shrink-0" />
              </Link>

              {/* Secondary: Watch Demo with Play Icon */}
              <a
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-full border-2 border-slate-300 hover:border-[#007be3] bg-white hover:bg-slate-50 px-2.5 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 text-xs sm:text-base font-bold text-[#01287b] transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-hidden whitespace-nowrap shrink-0"
              >
                <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#01287b] fill-[#01287b]/10 stroke-[2.2] shrink-0" />
                <span>{secondaryCta.text}</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Laptop Composite with Concentric Circular Backdrop */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-7 flex items-center justify-center lg:justify-end"
          >
            <img
              src={laptopCompositeImg}
              alt="Our Story, Our Purpose, Your Learning - KIPClassin"
              className="relative z-10 w-full max-w-lg lg:max-w-2xl xl:max-w-3xl h-auto object-contain select-none drop-shadow-md"
              fetchPriority="high"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;

