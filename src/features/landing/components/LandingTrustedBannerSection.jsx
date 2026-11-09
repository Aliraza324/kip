import { ChevronRight } from "lucide-react";
import pillBgImg from "@/assets/images/Background+Border+Shadow.png";
import studentsIconImg from "@/assets/images/Background.png";
import teachersIconImg from "@/assets/images/Background (1).png";
import classesIconImg from "@/assets/images/Background (2).png";
import demoIconImg from "@/assets/images/Background (3).png";
import { landingTrustedBannerMock } from "@/mocks";

const iconMap = {
  students: studentsIconImg,
  teachers: teachersIconImg,
  classes: classesIconImg,
  demo: demoIconImg,
};

export const LandingTrustedBannerSection = () => {
  const { badge, items } = landingTrustedBannerMock;

  const handleDemoClick = (href) => {
    if (!href) return;
    const target =
      document.querySelector(href) ||
      document.querySelector("#classroom-experience");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="trusted-banner"
      className="relative z-10 w-full bg-white py-12 sm:py-16 overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Centered Pill Badge with Radiating Yellow Rays */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="relative inline-flex items-center">
            {/* Pill Container */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-5 py-2 shadow-xs">
              <svg
                className="h-4.5 w-4.5 text-[#007be3] shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 14.5l-4-4 1.41-1.41L11 13.67l6.59-6.59L19 8.5l-8 8z" />
              </svg>
              <span className="text-xs sm:text-sm font-bold text-[#01287b] tracking-wide">
                {badge}
              </span>
            </div>

            {/* Radiating 3 Yellow Spark Rays */}
            <svg
              className="absolute -top-3.5 -right-5 sm:-top-4 sm:-right-6 w-6 h-6 sm:w-7 sm:h-7 text-[#febf11] pointer-events-none"
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
          </div>
        </div>

        {/* Desktop & Tablet Stadium Pill Container (md+) */}
        <div className="hidden md:block relative w-full aspect-[1253/287]">
          {/* Exact Background Pill Graphic with Border, Shadow, and Corner Accents */}
          <img
            src={pillBgImg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none drop-shadow-xs"
          />

          {/* 4 Metric Items Row with Dividers */}
          <div className="absolute inset-0 flex items-center justify-between px-10 lg:px-16">
            {items.map((item, index) => {
              const content = (
                <>
                  <div className="transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={iconMap[item.imageKey]}
                      alt={item.label}
                      className="h-12 md:h-14 lg:h-16 w-auto object-contain"
                    />
                  </div>
                  <div className="mt-2.5 flex items-center justify-center gap-1.5">
                    <span className="text-sm md:text-base lg:text-lg font-bold text-[#01287b] tracking-tight group-hover:text-[#007be3] transition-colors">
                      {item.label}
                    </span>
                    {item.hasArrow && (
                      <span className="flex h-4.5 w-4.5 lg:h-5 lg:w-5 items-center justify-center rounded-full bg-[#febf11] text-white shadow-xs group-hover:translate-x-0.5 transition-transform">
                        <ChevronRight className="h-2.5 w-2.5 lg:h-3 lg:w-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </>
              );

              return (
                <div
                  key={item.id}
                  className="flex-1 flex items-center justify-center h-full"
                >
                  {item.href ? (
                    <button
                      type="button"
                      onClick={() => handleDemoClick(item.href)}
                      className="flex-1 flex flex-col items-center justify-center text-center px-2 group cursor-pointer focus:outline-hidden"
                      aria-label={item.label}
                    >
                      {content}
                    </button>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center px-2 group cursor-default">
                      {content}
                    </div>
                  )}

                  {index < items.length - 1 && (
                    <div
                      className="h-12 lg:h-16 w-px bg-slate-200/90 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View (2x2 Grid Card) */}
        <div className="md:hidden relative w-full rounded-3xl bg-white border border-[#e2e8f0] p-6 shadow-lg shadow-blue-500/5 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#febf11]/15 blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-[#007be3]/15 blur-xl pointer-events-none" />

          <div className="grid grid-cols-2 gap-y-6 gap-x-4 relative z-10">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center p-2 group"
              >
                <div className="transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={iconMap[item.imageKey]}
                    alt={item.label}
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <div className="mt-2 flex items-center justify-center gap-1">
                  <span className="text-xs sm:text-sm font-bold text-[#01287b]">
                    {item.label}
                  </span>
                  {item.hasArrow && (
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#febf11] text-white shadow-xs">
                      <ChevronRight className="h-2 w-2 stroke-[3]" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingTrustedBannerSection;
