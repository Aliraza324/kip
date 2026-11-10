import { Link } from "react-router-dom";
import { ArrowRight, User } from "lucide-react";
import decorativeBgImg from "@/assets/images/Decorative.png";
import logoImg from "@/assets/images/KIPClassin logo.png";
import laptopCompositeImg from "@/assets/images/b58e334b69cf4c6922d77d48dc1ea4603c997701.png";
import { landingNextLearningExperienceMock } from "@/mocks";

export const LandingNextExperienceSection = () => {
  const {
    headingLine1,
    headingLine2Prefix,
    headingLine2Accent,
    subtitle,
    primaryCta,
    secondaryCta,
  } = landingNextLearningExperienceMock;

  return (
    <section
      id="next-learning-experience"
      className="relative z-10 w-full py-16 sm:py-24 border-t border-slate-100 bg-[#fbfdff] bg-no-repeat bg-center overflow-hidden"
      style={{
        backgroundImage: `url("${decorativeBgImg}")`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Logo, Heading, Details, and CTA Buttons */}
          <div className="lg:col-span-5 xl:col-span-5 text-left">
            {/* KIPClassin Brand Logo */}
            <div className="mb-6 flex justify-start">
              <img
                src={logoImg}
                alt="KIPClassin Logo"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>

            {/* Headline with Radiating Rays & Playful Swoosh */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold tracking-tight leading-[1.18]">
              <div className="text-[#01287b]">{headingLine1}</div>
              <div className="mt-1">
                <span className="text-[#01287b]">{headingLine2Prefix}</span>
                <span className="relative inline-block text-[#007be3]">
                  {headingLine2Accent}
                  {/* Radiating 3 Yellow Spark Rays */}
                  <svg
                    className="absolute -top-4 -right-6 sm:-top-5 sm:-right-8 w-7 h-7 sm:w-8 sm:h-8 text-[#febf11]"
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
                  {/* Playful Yellow Curved Swoosh */}
                  <svg
                    className="absolute left-0 -bottom-2.5 w-full h-3 text-[#febf11]"
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
              </div>
            </h2>

            {/* Description Subtitle */}
            <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
              {subtitle}
            </p>

            {/* CTA Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <Link
                to={primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#007be3] hover:bg-[#0066c0] px-6 sm:px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-md shadow-blue-500/25 transition-all focus:outline-hidden"
              >
                <span>{primaryCta.text}</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </Link>

              <Link
                to={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 px-6 sm:px-7 py-3.5 text-sm sm:text-base font-bold text-[#01287b] transition-all focus:outline-hidden"
              >
                <User className="h-4 w-4 text-[#01287b]" />
                <span>{secondaryCta.text}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Laptop Composite with Concentric Circular Backdrop */}
          <div className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-center lg:justify-end">
            {/* Outer Golden-Yellow Circular Ring Accent */}
            <div
              className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px] xl:w-[540px] xl:h-[540px] rounded-full border-[7px] lg:border-[8px] border-[#febf11] pointer-events-none translate-x-4 lg:translate-x-10 -translate-y-2 opacity-95"
              aria-hidden="true"
            />

            {/* Inner Vibrant Blue Circular Disc Accent */}
            <div
              className="absolute w-[270px] h-[270px] sm:w-[370px] sm:h-[370px] lg:w-[430px] lg:h-[430px] xl:w-[480px] xl:h-[480px] rounded-full bg-[#007be3] pointer-events-none translate-x-8 lg:translate-x-16"
              aria-hidden="true"
            />

            {/* 3D Laptop Composite Illustration (Plant, Laptop, Books, Mortarboard) */}
            <img
              src={laptopCompositeImg}
              alt="Interactive Virtual Classroom Experience"
              className="relative z-10 w-full max-w-lg lg:max-w-2xl xl:max-w-3xl h-auto object-contain select-none drop-shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingNextExperienceSection;
