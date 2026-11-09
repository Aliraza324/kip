import { Link } from "react-router-dom";
import { User, GraduationCap, Presentation, Users } from "lucide-react";
import boyImg from "@/assets/images/image 13.png";
import teacherImg from "@/assets/images/image 14.png";
import { teachingLearningPortalsMock } from "@/mocks";

const roleImages = {
  boy: boyImg,
  teacher: teacherImg,
};

const roleIcons = {
  GraduationCap,
  Presentation,
};

export const LandingPortalCardsSection = () => {
  const { badge, headingLine1, headingLine2Prefix, headingLine2Accent, cards } =
    teachingLearningPortalsMock;

  return (
    <section className="relative z-10 bg-white py-14 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-14">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-4 py-1.5 shadow-xs mb-3">
            <Users className="h-3.5 w-3.5 text-[#007be3]" />
            <span className="text-xs font-bold tracking-wider text-[#007be3] uppercase">
              {badge}
            </span>
          </div>

          {/* Section Main Title with Sparkle Rays */}
          <h2 className="text-3xl font-extrabold tracking-tight text-[#01287b] sm:text-4xl lg:text-5xl leading-tight">
            <span className="relative inline-block">
              {headingLine1}
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
            </span>
            <br />
            <span>{headingLine2Prefix}</span>
            <span className="text-[#007be3]">{headingLine2Accent}</span>
          </h2>
        </div>

        {/* Portals Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {cards.map((card) => {
            const Icon = roleIcons[card.iconType] || GraduationCap;
            const imgSrc = roleImages[card.imageType];

            return (
              <div
                key={card.id}
                className={`relative flex flex-col sm:flex-row items-end justify-between overflow-hidden rounded-3xl border ${card.borderColor} p-6 sm:p-7 sm:pt-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                style={{ backgroundColor: card.bgColor }}
              >
                {/* Left Side: Avatar Illustration Anchored to Bottom */}
                <div className="order-2 sm:order-1 w-full sm:w-5/12 flex items-end justify-center self-end pt-4 sm:pt-0">
                  <img
                    src={imgSrc}
                    alt={`${card.role} Portal`}
                    loading="lazy"
                    className="w-40 sm:w-48 md:w-52 h-auto object-contain object-bottom select-none block"
                  />
                </div>

                {/* Right Side: Content, Button, and Registration Link */}
                <div className="order-1 sm:order-2 w-full sm:w-7/12 flex flex-col items-start text-left sm:pl-4 pb-2 sm:pb-3">
                  {/* Icon Squircle */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-sm ${card.iconBg} mb-4`}
                  >
                    <Icon className="h-6 w-6 stroke-[2.2]" />
                  </div>

                  {/* Role Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#01287b]">
                    <span>{card.prefix} </span>
                    <span className="text-[#007be3]">{card.role}</span>
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-xs">
                    {card.description}
                  </p>

                  {/* Login Action Button */}
                  <Link
                    to={card.loginLink}
                    className={`mt-6 inline-flex w-full max-w-[230px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 ${card.btnStyle}`}
                  >
                    <User className="h-4 w-4 shrink-0" />
                    <span>{card.loginText}</span>
                  </Link>

                  {/* Registration Prompt Link */}
                  <div className="mt-3 text-xs text-slate-600">
                    <span>{card.registerPrompt} </span>
                    <Link
                      to={card.registerLink}
                      className="font-semibold text-[#007be3] underline hover:text-[#0054da] transition-colors"
                    >
                      {card.registerText}
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

export default LandingPortalCardsSection;

