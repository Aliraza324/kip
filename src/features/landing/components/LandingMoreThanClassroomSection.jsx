import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import aiImg from "@/assets/images/Feature illustration.png";
import assessmentsImg from "@/assets/images/Feature illustration (1).png";
import progressImg from "@/assets/images/Feature illustration (2).png";
import { landingMoreThanVirtualClassroomMock } from "@/mocks";

const cardImages = {
  ai: aiImg,
  assessments: assessmentsImg,
  progress: progressImg,
};

export const LandingMoreThanClassroomSection = () => {
  const { badgeAccent, badgeText, headingMain, headingAccent, subtitle, cards } =
    landingMoreThanVirtualClassroomMock;

  return (
    <section
      id="learning-features"
      className="relative z-10 bg-white py-16 sm:py-24 border-t border-slate-100 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-4 py-1.5 shadow-xs mb-3">
            <Sparkles className="h-4 w-4 text-[#007be3] fill-[#007be3]" />
            <span className="text-xs font-bold tracking-wide text-[#007be3]">
              {badgeAccent}
            </span>
            <span className="text-xs font-bold tracking-wide text-[#01287b]">
              {badgeText}
            </span>
          </div>

          {/* Heading with Yellow Spark Rays & Curved Swoosh */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#01287b] leading-tight">
            <span>{headingMain}</span>
            <span className="relative inline-block text-[#007be3]">
              {headingAccent}
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
              {/* Playful Yellow Swoosh Underline */}
              <svg
                className="absolute left-0 -bottom-2.5 w-full h-3 text-[#febf11]"
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

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {cards.map((card) => {
            const imgSrc = cardImages[card.imageKey];

            return (
              <div
                key={card.id}
                className="group relative flex flex-col justify-between rounded-[32px] sm:rounded-[36px] border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1.5 h-full"
              >
                {/* Top Illustration */}
                <div className="flex items-center justify-center mb-6 pt-2">
                  <img
                    src={imgSrc}
                    alt={card.title}
                    loading="lazy"
                    className="h-32 sm:h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content & Action Row */}
                <div>
                  <h3 className="text-xl sm:text-[22px] font-extrabold text-[#01287b] text-left mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] leading-relaxed text-slate-500 text-left mb-6 max-w-[280px]">
                    {card.description}
                  </p>

                  {/* Circular Outline Arrow Button */}
                  <div className="flex justify-end pt-2">
                    <Link
                      to={card.link}
                      className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#007be3] text-[#007be3] transition-all duration-200 hover:bg-[#007be3] hover:text-white shadow-xs group-hover:border-[#007be3]"
                      aria-label={card.title}
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

export default LandingMoreThanClassroomSection;

