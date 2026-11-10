import { useState } from "react";
import { HelpCircle } from "lucide-react";
import decorativeBgImg from "@/assets/images/Decorative.png";
import faqIllustrationImg from "@/assets/images/Frame 10.png";
import { landingFaqMock } from "@/mocks";
import { FaqItem } from "./FaqItem";

export const LandingFaqSection = () => {
  const {
    badge,
    headingLine1,
    headingLine2Prefix,
    headingLine2Accent,
    subtitle,
    items,
  } = landingFaqMock;

  const [openId, setOpenId] = useState(items[0]?.id || null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative z-10 w-full py-16 sm:py-24 border-t border-slate-100 bg-[#fbfdff] bg-no-repeat bg-center"
      style={{
        backgroundImage: `url("${decorativeBgImg}")`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, Details, and 3D Mortarboard/Chat Illustration */}
          <div className="lg:col-span-5 text-left">
            {/* Top FAQ Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-3.5 py-1.5 shadow-xs mb-4">
              <HelpCircle className="h-4 w-4 text-[#007be3]" />
              <span className="text-xs font-bold tracking-wide text-[#007be3]">
                {badge}
              </span>
            </div>

            {/* Heading with Radiating Rays & Playful Swoosh */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
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
            <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-sm">
              {subtitle}
            </p>

            {/* Left 3D Illustration (Frame 10.png) */}
            <div className="mt-8 sm:mt-10 flex justify-start">
              <img
                src={faqIllustrationImg}
                alt="Frequently Asked Questions"
                className="w-64 sm:w-72 lg:w-80 h-auto object-contain select-none drop-shadow-sm"
              />
            </div>
          </div>

          {/* Right Column: 7 Interactive Accordion Cards */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-3.5">
            {items.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFaqSection;

