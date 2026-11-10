import { Sparkles, Check, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import actionLaptopImg from "@/assets/images/b37ad006267345c7b58006b537b9098c21ff6363.png";
import { featuresActionMock } from "@/mocks";
import { fadeInUp, scaleIn, scrollViewport } from "@/animations";

export const FeaturesActionSection = () => {
  const {
    badge,
    headingLine1,
    headingLine2Prefix,
    headingLine2Accent,
    description,
    checklist,
    cta,
  } = featuresActionMock;

  return (
    <section
      id="features-action"
      className="relative z-10 w-full bg-white pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 lg:pb-20 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Rounded Card Container */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="relative overflow-hidden rounded-[32px] sm:rounded-[44px] lg:rounded-[48px] border border-blue-100/80 bg-[#F7FBFF] p-7 sm:p-12 lg:p-14 shadow-xl shadow-blue-900/5"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Column (Order 2 on mobile, Order 1 on desktop) */}
            <motion.div
              variants={fadeInUp}
              className="order-2 lg:order-1 lg:col-span-6 xl:col-span-5 text-left"
            >
              {/* Category Pill Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-4 py-1.5 shadow-xs mb-4">
                <Sparkles className="h-3.5 w-3.5 text-[#007be3]" />
                <span className="text-xs font-bold tracking-wider text-[#007be3] uppercase">
                  {badge}
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#01287b] leading-[1.15]">
                <div>{headingLine1}</div>
                <div className="mt-0.5">
                  <span>{headingLine2Prefix}</span>
                  <span className="text-[#007be3]">{headingLine2Accent}</span>
                </div>
              </h2>

              {/* Subtitle Description */}
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
                {description}
              </p>

              {/* Feature Checklist with Yellow Circles */}
              <ul className="mt-6 flex flex-col gap-3">
                {checklist.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#febf11] text-[#01287b] shadow-xs">
                      <Check className="h-3 w-3 stroke-[3.5]" />
                    </span>
                    <span className="text-sm sm:text-base font-medium text-slate-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Call to Action Button */}
              <div className="mt-8">
                <a
                  href={cta.href}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#007be3] hover:bg-[#0066c0] px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-hidden"
                >
                  <PlayCircle className="h-4 w-4 stroke-[2.2]" />
                  <span>{cta.text}</span>
                </a>
              </div>
            </motion.div>

            {/* Right Image Column (Order 1 on mobile, Order 2 on desktop) */}
            <motion.div
              variants={fadeInUp}
              className="order-1 lg:order-2 lg:col-span-6 xl:col-span-7 flex items-center justify-center lg:justify-end"
            >
              <img
                src={actionLaptopImg}
                alt="See KIPClassin in Action"
                className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-auto object-contain select-none drop-shadow-md transition-transform duration-300 hover:scale-[1.01]"
                loading="lazy"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesActionSection;

