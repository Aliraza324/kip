import { Link } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";
import step1Img from "@/assets/images/image 33.png";
import step2Img from "@/assets/images/image 34.png";
import step3Img from "@/assets/images/image 35.png";
import { landingHowItWorksMock } from "@/mocks";

const stepImages = {
  step1: step1Img,
  step2: step2Img,
  step3: step3Img,
};

export const LandingHowItWorksSection = () => {
  const { badge, headingLine1, headingAccent, subtitle, steps } =
    landingHowItWorksMock;

  return (
    <section id="how-it-works" className="relative z-10 bg-white py-16 sm:py-24 border-t border-slate-100 overflow-hidden">
      {/* Decorative Corner Ambient Glows */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-sky-100/40 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-14 sm:mb-20">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-4 py-1.5 shadow-xs mb-3">
            <Zap className="h-3.5 w-3.5 text-[#007be3] fill-[#007be3]" />
            <span className="text-xs font-bold tracking-wider text-[#007be3] uppercase">
              {badge}
            </span>
          </div>

          {/* Headline with Yellow Spark & Swoosh */}
          <h2 className="text-3xl font-extrabold tracking-tight text-[#01287b] sm:text-4xl lg:text-5xl leading-tight">
            <span>{headingLine1}</span>
            <span className="relative inline-block text-[#007be3]">
              {headingAccent}
              {/* Radiating Yellow Spark Rays */}
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
              {/* Playful Yellow Swoosh Underline */}
              <svg
                className="absolute left-0 -bottom-2 w-full h-3 text-[#febf11]"
                viewBox="0 0 160 14"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M3 10C45 2 115 2 157 10"
                  stroke="#febf11"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            {subtitle}
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto relative">
          {steps.map((step, idx) => {
            const imgSrc = stepImages[step.imageKey];
            const hasNext = idx < steps.length - 1;

            return (
              <div key={step.id} className="relative">
                {/* Curved Dashed Connector Arrow between cards (Matching Reference Exactly) */}
                {hasNext && (
                  <div
                    className="hidden md:flex items-center justify-center absolute left-full w-6 sm:w-8 lg:w-10 top-[90px] sm:top-[98px] -translate-y-1/2 z-20 pointer-events-none"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-14 sm:w-16 h-auto text-[#007be3] shrink-0"
                      viewBox="0 0 64 34"
                      fill="none"
                    >
                      {/* Curved Dashed Arc matching zoomed reference */}
                      <path
                        d="M 6 30 C 14 10, 36 8, 52 18"
                        stroke="#007be3"
                        strokeWidth="3.2"
                        strokeDasharray="5 5"
                        strokeLinecap="round"
                      />
                      {/* Down-Right Arrowhead Chevron */}
                      <path
                        d="M 44 12 L 54 19 L 46 27"
                        stroke="#007be3"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                {/* Card Container */}
                <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1.5 h-full">
                  {/* Step Image */}
                  <div className="flex items-center justify-center mb-8 pt-2">
                    <img
                      src={imgSrc}
                      alt={step.title}
                      loading="lazy"
                      className="h-28 sm:h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Bottom Text & Action Arrow Row */}
                  <div className="flex items-end justify-between gap-3 pt-4 border-t border-slate-50">
                    <div className="text-left">
                      <h3 className="text-xl font-extrabold text-[#01287b]">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500 max-w-[190px]">
                        {step.description}
                      </p>
                    </div>

                    {/* Circular Action Arrow Button */}
                    <Link
                      to={step.link}
                      className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#007be3] text-[#007be3] transition-all duration-200 hover:bg-[#007be3] hover:text-white shadow-xs group-hover:border-[#007be3]"
                      aria-label={step.title}
                    >
                      <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingHowItWorksSection;
