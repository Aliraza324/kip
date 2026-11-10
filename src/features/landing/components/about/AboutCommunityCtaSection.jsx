import { Link } from "react-router-dom";
import { ArrowRight, User } from "lucide-react";
import { motion } from "framer-motion";
import laptopAiRobotImg from "@/assets/images/814e7c81306a9dc78cb889016d03719415eae21a.png";
import { aboutCommunityCtaMock } from "@/mocks";
import { fadeInUp, scaleIn, scrollViewport } from "@/animations";

export const AboutCommunityCtaSection = () => {
  const { headingLine1, headingAccent, description, primaryCta, secondaryCta } =
    aboutCommunityCtaMock;

  return (
    <section
      id="about-community-cta"
      className="relative z-10 w-full bg-white py-8 sm:py-12 lg:py-14 overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Sleek Compact Gradient Card Container */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-gradient-to-r from-[#004bb7] via-[#0060d4] to-[#007be3] px-6 py-7 sm:px-10 sm:py-8 lg:px-12 lg:py-9 shadow-xl shadow-blue-950/15"
        >
          {/* Bottom-Left Yellow Brand Swoosh Accent */}
          <div className="absolute -bottom-0.5 -left-0.5 w-20 sm:w-28 lg:w-32 h-20 sm:h-28 lg:h-32 pointer-events-none select-none z-0">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <path
                d="M 0 120 L 0 42 Q 18 92 92 120 Z"
                fill="#FFD000"
              />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Heading, Subtitle, & Call-to-Action Buttons */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-6 xl:col-span-5 text-left"
            >
              {/* Heading with Yellow Accent & Spark Rays */}
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-bold tracking-tight text-white leading-[1.18] break-words">
                <div>{headingLine1}</div>
                <div className="mt-0.5">
                  <span className="relative inline-block text-[#febf11] pr-7 sm:pr-8">
                    {headingAccent}
                    {/* Radiating 3 Yellow Spark Rays */}
                    <svg
                      className="absolute -top-2 right-0.5 sm:-top-3 sm:right-0.5 w-5 h-5 sm:w-6 sm:h-6 text-[#febf11] pointer-events-none"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <line x1="8" y1="26" x2="3" y2="12" />
                      <line x1="16" y1="28" x2="16" y2="9" />
                      <line x1="24" y1="26" x2="29" y2="12" />
                    </svg>
                  </span>
                </div>
              </h2>

              {/* Subtitle Description */}
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm lg:text-[14px] text-white/90 leading-relaxed max-w-[420px]">
                {description}
              </p>

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-7 flex flex-row flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 whitespace-nowrap">
                {/* Primary Button */}
                <Link
                  to={primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFE976] hover:bg-[#FFD000] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#01287b] shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-hidden select-none"
                >
                  <span>{primaryCta.text}</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </Link>

                {/* Secondary Button */}
                <Link
                  to={secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white hover:bg-white/15 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-hidden select-none backdrop-blur-xs"
                >
                  <User className="h-4 w-4 text-white" />
                  <span>{secondaryCta.text}</span>
                </Link>
              </div>
            </motion.div>

            {/* Right Column: 3D Laptop, Plant, Books, & AI Robot Illustration */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-6 xl:col-span-7 flex items-center justify-center lg:justify-end"
            >
              <img
                src={laptopAiRobotImg}
                alt="Join Our Learning Community - KIPClassin"
                className="w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[560px] xl:max-w-[620px] max-h-[240px] sm:max-h-[280px] lg:max-h-[300px] object-contain select-none drop-shadow-xl transition-transform duration-300 hover:scale-[1.01]"
                loading="lazy"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCommunityCtaSection;

