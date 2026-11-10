import { Sparkles, Headphones, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import heroBgImg from "@/assets/images/heroBg.png";
import contactHeroImg from "@/assets/images/bdc52ba98dfa4db546d0c25918ce17bb6487f413.png";
import { contactHeroMock } from "@/mocks";
import { fadeInUp, scaleIn, staggerContainer } from "@/animations";

const iconMap = {
  Headphones,
  MessageCircle,
};

export const ContactHeroSection = () => {
  const {
    badge,
    headingLine1,
    headingLine2Prefix,
    headingLine2Accent,
    description,
    pills,
  } = contactHeroMock;

  return (
    <section
      id="contact-hero"
      className="relative min-h-[calc(100vh-76px)] w-full flex items-center justify-center overflow-x-clip bg-[#fdfdfd] bg-no-repeat bg-center py-10 lg:py-16"
      style={{
        backgroundImage: `url("${heroBgImg}")`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Content Column (Order 2 on mobile, Order 1 on desktop) */}
          <motion.div
            variants={staggerContainer(0.12, 0.05)}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1 lg:col-span-6 xl:col-span-5 text-left"
          >
            {/* Category Pill Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-4 py-1.5 shadow-xs mb-5"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#007be3]" />
              <span className="text-xs font-bold tracking-wider text-[#007be3] uppercase">
                {badge}
              </span>
            </motion.div>

            {/* Headline with Radiating Spark Rays */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-5xl lg:text-[52px] xl:text-[56px] font-extrabold tracking-tight text-[#01287b] leading-[1.12] break-words"
            >
              {/* Line 1: Let's Talk! + Spark Rays */}
              <div>
                <span className="relative inline-block pr-6 sm:pr-8">
                  {headingLine1}
                  {/* Radiating 3 Yellow Spark Rays */}
                  <svg
                    className="absolute -top-3.5 right-0.5 sm:-top-5 sm:-right-1.5 w-6 h-6 sm:w-8 sm:h-8 text-[#febf11] pointer-events-none"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <line x1="8" y1="26" x2="6" y2="8" />
                    <line x1="15" y1="26" x2="25" y2="12" />
                    <line x1="22" y1="27" x2="31" y2="21" />
                  </svg>
                </span>
              </div>

              {/* Line 2: We're Here to Help. */}
              <div className="mt-1">
                <span>{headingLine2Prefix}</span>
                <span className="text-[#007be3]">{headingLine2Accent}</span>
              </div>
            </motion.h1>

            {/* Description Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="mt-5 text-sm sm:text-base lg:text-[17px] leading-relaxed text-slate-600 max-w-lg"
            >
              {description}
            </motion.p>

            {/* Feature Mini Pills */}
            <motion.div
              variants={fadeInUp}
              className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              {pills.map((item) => {
                const IconComponent = iconMap[item.iconType] || Sparkles;
                return (
                  <div
                    key={item.id}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs"
                  >
                    <IconComponent
                      className="h-4 w-4"
                      style={{ color: item.color }}
                    />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Image Column (Order 1 on mobile, Order 2 on desktop) */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="order-1 lg:order-2 lg:col-span-6 xl:col-span-7 flex items-center justify-center lg:justify-end"
          >
            <img
              src={contactHeroImg}
              alt="Let's Talk! We're Here to Help - KIPClassin"
              className="relative z-10 w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-auto object-contain select-none drop-shadow-md transition-transform duration-300 hover:scale-[1.01]"
              fetchPriority="high"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;

