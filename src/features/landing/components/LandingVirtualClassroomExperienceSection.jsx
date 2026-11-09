import { ArrowRight, Monitor } from "lucide-react";
import classroomBgImg from "@/assets/images/A better virtual classroom.png";
import classroomLaptopImg from "@/assets/images/image 19.png";
import { landingVirtualClassroomExperienceMock } from "@/mocks";
import { ClassroomChipIcon } from "./ClassroomChipIcons";

export const LandingVirtualClassroomExperienceSection = () => {
  const {
    badge,
    headingPart1,
    headingPart2,
    headingPart3,
    headingPart4,
    subtitle,
    buttonText,
    buttonLink,
    chips,
  } = landingVirtualClassroomExperienceMock;

  return (
    <section
      id="classroom-experience"
      className="relative z-10 w-full py-16 sm:py-24 border-t border-slate-100 bg-[#fbfdff] bg-no-repeat bg-center"
      style={{
        backgroundImage: `url("${classroomBgImg}")`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Content, Chips, CTA */}
          <div className="lg:col-span-6 xl:col-span-5 text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-4 py-1.5 shadow-xs mb-4">
              <Monitor className="h-3.5 w-3.5 text-[#007be3]" />
              <span className="text-xs font-semibold text-[#007be3]">
                {badge}
              </span>
            </div>

            {/* Headline with Yellow Rays & Swoosh */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              <div>
                <span className="text-[#01287b]">{headingPart1}</span>
                <span className="text-[#007be3]">{headingPart2}</span>
              </div>
              <div className="relative inline-block mt-1">
                <span className="text-[#007be3]">{headingPart3}</span>
                <span className="text-[#01287b]">{headingPart4}</span>

                {/* Radiating Yellow Rays */}
                <svg
                  className="absolute -top-5 -right-6 sm:-top-6 sm:-right-7 w-7 h-7 sm:w-8 sm:h-8 text-[#febf11]"
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
                  className="absolute left-1/3 -bottom-2.5 w-2/3 h-3 text-[#febf11]"
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
              </div>
            </h2>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
              {subtitle}
            </p>

            {/* 6 Feature Chips Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5 my-7 max-w-lg">
              {chips.map((chip) => (
                <div
                  key={chip.id}
                  className="flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-white/95 px-3 py-2.5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-blue-100 hover:-translate-y-0.5"
                >
                  <ClassroomChipIcon type={chip.icon} color={chip.color} />
                  <div className="text-left leading-tight">
                    <div className="text-xs font-bold text-[#01287b]">
                      {chip.line1}
                    </div>
                    <div className="text-xs font-bold text-[#01287b]">
                      {chip.line2}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <a
                href={buttonLink}
                className="inline-flex items-center gap-2 rounded-full bg-[#007be3] px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:bg-[#006ee6] hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{buttonText}</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </a>
            </div>
          </div>

          {/* Right Column: Exact Aspect Ratio Image (908 / 606) */}
          <div className="lg:col-span-6 xl:col-span-7 flex items-center justify-center">
            <div className="w-full aspect-[908/606] max-w-2xl lg:max-w-none flex items-center justify-center">
              <img
                src={classroomLaptopImg}
                alt="KIPClassin Virtual Classroom Experience"
                loading="lazy"
                className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingVirtualClassroomExperienceSection;
