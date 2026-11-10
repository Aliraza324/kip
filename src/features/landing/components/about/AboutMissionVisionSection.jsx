import { Target, Eye } from "lucide-react";
import { motion } from "framer-motion";
import missionTargetImg from "@/assets/images/image 87.png";
import visionBulbImg from "@/assets/images/blub.png";
import { aboutMissionVisionMock } from "@/mocks";
import { fadeInUp, staggerContainer, scrollViewport } from "@/animations";

const badgeIcons = {
  Target,
  Eye,
};

const illustrationMap = {
  mission: missionTargetImg,
  vision: visionBulbImg,
};

export const AboutMissionVisionSection = () => {
  return (
    <section
      id="about-mission-vision"
      className="relative z-10 w-full bg-white py-12 sm:py-16 lg:py-20 overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* 2 Side-by-Side Mission & Vision Cards */}
        <motion.div
          variants={staggerContainer(0.16)}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
        >
          {aboutMissionVisionMock.map((card) => {
            const BadgeIcon = badgeIcons[card.iconType] || Target;
            const imgSrc = illustrationMap[card.imageKey];

            return (
              <motion.div
                key={card.id}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between rounded-[32px] sm:rounded-[36px] bg-[#f4f9ff] border border-[#e2eefc] p-7 sm:p-9 lg:p-10 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200/90"
              >
                {/* Left Content: Badge, Heading, Description */}
                <div className="flex-1 text-left pt-3 sm:pt-0">
                  {/* Top Pill Badge */}
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d2e6fc] bg-[#e3effd] px-3.5 py-1.5 shadow-xs mb-4">
                    <BadgeIcon className="h-3.5 w-3.5 text-[#007be3]" />
                    <span className="text-xs font-bold text-[#01287b]">
                      {card.badge}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-extrabold text-[#01287b] leading-[1.2] tracking-tight">
                    <div>{card.headingLine1}</div>
                    <div className="mt-0.5">
                      <span>{card.headingLine2}</span>
                      {card.accentWord && (
                        <span className="text-[#007be3]">{card.accentWord}</span>
                      )}
                    </div>
                  </h3>

                  {/* Description */}
                  <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-[#475569] max-w-sm">
                    {card.description}
                  </p>
                </div>

                {/* Right Illustration: 3D Target Bullseye / Glowing Lightbulb */}
                <div className="w-24 sm:w-32 lg:w-36 shrink-0 self-center sm:self-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={imgSrc}
                    alt={card.badge}
                    className="w-full h-auto object-contain select-none drop-shadow-sm"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMissionVisionSection;

