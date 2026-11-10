import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import liveImg from "@/assets/images/ri_live-fill.png";
import aiOperatorImg from "@/assets/images/eos-icons_ai-operator.png";
import whiteboardImg from "@/assets/images/boxicons_whiteboard-filled.png";
import calendarImg from "@/assets/images/fluent_calendar-agenda-clock-16-filled.png";
import machineLearningImg from "@/assets/images/eos-icons_machine-learning.png";
import usersImg from "@/assets/images/clarity_users-solid.png";
import barGraphImg from "@/assets/images/entypo_bar-graph.png";
import assignmentImg from "@/assets/images/ic_baseline-assignment.png";
import securityImg from "@/assets/images/streamline_user-protection-2shield-secure-security-profile-person-remix.png";
import { featuresSuiteMock } from "@/mocks";
import { fadeInUp, staggerContainer, scrollViewport } from "@/animations";

const iconMap = {
  "ri_live-fill": liveImg,
  "eos-icons_ai-operator": aiOperatorImg,
  "boxicons_whiteboard-filled": whiteboardImg,
  "fluent_calendar-agenda-clock-16-filled": calendarImg,
  "eos-icons_machine-learning": machineLearningImg,
  "clarity_users-solid": usersImg,
  "entypo_bar-graph": barGraphImg,
  "ic_baseline-assignment": assignmentImg,
  "streamline_user-protection-2shield-secure-security-profile-person-remix": securityImg,
};

export const FeaturesSuiteSection = () => {
  const {
    badge,
    headingLine1Prefix,
    headingLine1Accent,
    headingLine2Prefix,
    headingLine2Accent,
    description,
    features,
  } = featuresSuiteMock;

  return (
    <section
      id="features-suite"
      className="relative z-10 w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Category Pill Badge */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="inline-flex items-center gap-2 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-4 py-1.5 shadow-xs mb-4"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#007be3]" />
          <span className="text-xs font-bold tracking-wider text-[#007be3] uppercase">
            {badge}
          </span>
        </motion.div>

        {/* Section Heading with Radiating Spark Rays */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#01287b] leading-[1.18]"
        >
          <div>
            <span>{headingLine1Prefix}</span>
            <span className="relative inline-block pr-6 sm:pr-8">
              {headingLine1Accent}
              {/* Radiating 3 Yellow Spark Rays */}
              <svg
                className="absolute -top-3.5 right-0 sm:-top-5 sm:-right-1.5 w-6 h-6 sm:w-8 sm:h-8 text-[#febf11] pointer-events-none"
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
          <div className="mt-1">
            <span>{headingLine2Prefix}</span>
            <span className="text-[#007be3]">{headingLine2Accent}</span>
          </div>
        </motion.h2>

        {/* Section Description */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        {/* 9 Feature Cards Grid (3x3 on Desktop) */}
        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 text-left"
        >
          {features.map((item) => {
            const iconSrc = iconMap[item.imageKey];
            const isAmber = item.theme === "amber";

            return (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className={`relative rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  isAmber
                    ? "bg-[#fffbf0] border border-[#fdeecb]/80 hover:border-[#fcd98a]"
                    : "bg-[#f4f9ff] border border-[#e1eeff] hover:border-[#c5dfff]"
                }`}
              >
                {/* Feature Icon (PNG) */}
                <div className="flex items-center justify-start h-12 w-12">
                  <img
                    src={iconSrc}
                    alt={item.title}
                    className="h-10 w-10 sm:h-11 sm:w-11 object-contain select-none"
                    loading="lazy"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg sm:text-[19px] font-bold text-[#01287b] tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSuiteSection;

