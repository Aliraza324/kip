import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import heroBgImg from "@/assets/images/heroBg.png";
import howItWorksHeroImg from "@/assets/images/83d6c22f34e948cfe652d3581d04560b8fe7ebf4.png";
import { howItWorksHeroMock } from "@/mocks";
import { useLiveContent } from "@/hooks/useDataSync";
import { fadeInUp, scaleIn, staggerContainer } from "@/animations";
import VideoModal from "@/features/landing/components/shared/VideoModal";

export const HowItWorksHeroSection = () => {
  const navigate = useNavigate();
  const liveHow = useLiveContent("howItWorks");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const badge = liveHow?.badge || howItWorksHeroMock.badge;
  const description = liveHow?.description || howItWorksHeroMock.description;

  const rawTitle = liveHow?.title || "See How KIPClassin Works in Simple Steps.";

  let headingLine1Prefix = howItWorksHeroMock.headingLine1Prefix;
  let headingLine1Accent = howItWorksHeroMock.headingLine1Accent;
  let headingLine2Prefix = howItWorksHeroMock.headingLine2Prefix;
  let headingLine2Accent = howItWorksHeroMock.headingLine2Accent;
  let headingLine3Accent = howItWorksHeroMock.headingLine3Accent;

  if (liveHow?.title) {
    const words = liveHow.title.split(" ");
    if (words.length >= 5) {
      headingLine1Prefix = words.slice(0, 2).join(" ");
      headingLine1Accent = words.slice(2, 3).join(" ");
      headingLine2Prefix = words.slice(3, words.length - 1).join(" ");
      headingLine2Accent = "";
      headingLine3Accent = words.slice(words.length - 1).join(" ");
    } else {
      headingLine1Prefix = "";
      headingLine1Accent = words.slice(0, 1).join(" ");
      headingLine2Prefix = words.slice(1, words.length - 1).join(" ");
      headingLine2Accent = "";
      headingLine3Accent = words.slice(words.length - 1).join(" ");
    }
  }

  const primaryText = liveHow?.btn1Text || howItWorksHeroMock.primaryCta.text;
  const primaryLink = liveHow?.btn1Link || howItWorksHeroMock.primaryCta.href || "/auth/login";

  const secondaryText = liveHow?.btn2Text || howItWorksHeroMock.secondaryCta.text || "Watch Demo";
  const secondaryLink = liveHow?.btn2Link || "";
  const videoUrl = liveHow?.videoUrl || liveHow?.video?.url || "https://www.youtube.com/watch?v=k3_tw44QsZQ";

  const heroImage =
    (typeof liveHow?.image === "string" ? liveHow.image : liveHow?.image?.url) ||
    howItWorksHeroImg;

  const handleSecondaryClick = (e) => {
    e.preventDefault();
    if (
      secondaryLink &&
      !secondaryLink.includes("youtube") &&
      !secondaryLink.includes("vimeo") &&
      !secondaryLink.endsWith(".mp4")
    ) {
      if (secondaryLink.startsWith("http")) {
        window.open(secondaryLink, "_blank", "noopener,noreferrer");
      } else {
        navigate(secondaryLink);
      }
      return;
    }
    setIsVideoModalOpen(true);
  };

  return (
    <>
      <section
        id="how-it-works-hero"
        className="relative min-h-[calc(100vh-76px)] w-full flex items-center justify-center overflow-x-clip bg-[#fdfdfd] bg-no-repeat bg-center py-10 lg:py-16"
        style={{
          backgroundImage: `url("${heroBgImg}")`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Content Column */}
            <motion.div
              variants={staggerContainer(0.12, 0.05)}
              initial="hidden"
              animate="visible"
              className="order-2 lg:order-1 lg:col-span-7 xl:col-span-6 text-left"
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

              {/* Headline */}
              <motion.h1
                variants={fadeInUp}
                className="text-[28px] xs:text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] xl:text-[50px] font-extrabold tracking-tight text-[#01287b] leading-[1.14] break-words"
              >
                {/* Line 1 */}
                <div className="sm:whitespace-nowrap">
                  {headingLine1Prefix && <span>{headingLine1Prefix} </span>}
                  <span className="relative inline-block pr-6 sm:pr-8">
                    {headingLine1Accent}
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

                {/* Line 2 */}
                {(headingLine2Prefix || headingLine2Accent) && (
                  <div className="sm:whitespace-nowrap mt-0.5 sm:mt-1">
                    {headingLine2Prefix && <span>{headingLine2Prefix} </span>}
                    {headingLine2Accent && <span className="text-[#007be3]">{headingLine2Accent}</span>}
                  </div>
                )}

                {/* Line 3 with Curved Swoosh Underline */}
                {headingLine3Accent && (
                  <div className="sm:whitespace-nowrap mt-0.5 sm:mt-1">
                    <span className="relative inline-block text-[#007be3]">
                      {headingLine3Accent}
                      {/* Playful Yellow Curved Swoosh Underline */}
                      <svg
                        className="absolute left-0 -bottom-2 w-full h-3.5 text-[#febf11] pointer-events-none"
                        viewBox="0 0 160 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M 4 8 C 45 13 115 13 156 5"
                          stroke="currentColor"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>
                )}
              </motion.h1>

              {/* Description Subtitle */}
              <motion.p
                variants={fadeInUp}
                className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-[17px] leading-relaxed text-slate-600 max-w-xl"
              >
                {description}
              </motion.p>

              {/* Call to Action Buttons */}
              <motion.div
                variants={fadeInUp}
                className="mt-7 sm:mt-8 flex flex-row flex-nowrap items-center gap-2 sm:gap-4"
              >
                <Link
                  to={primaryLink}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#007be3] hover:bg-[#0066c0] px-3.5 sm:px-7 lg:px-8 py-2.5 sm:py-3.5 text-xs sm:text-base font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-hidden whitespace-nowrap shrink-0"
                >
                  <span>{primaryText}</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5] shrink-0" />
                </Link>

                <button
                  type="button"
                  onClick={handleSecondaryClick}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border-2 border-slate-300 hover:border-[#007be3] bg-white hover:bg-slate-50 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 text-xs sm:text-base font-bold text-[#01287b] transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-hidden whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#007be3] fill-[#007be3]/15 stroke-[2.2] shrink-0" />
                  <span>{secondaryText}</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Image Column */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="order-1 lg:order-2 lg:col-span-5 xl:col-span-6 flex items-center justify-center lg:justify-end"
            >
              <img
                src={heroImage}
                alt={rawTitle}
                className="relative z-10 w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-auto object-contain select-none drop-shadow-md transition-transform duration-300 hover:scale-[1.01]"
                fetchPriority="high"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={videoUrl}
        title="How KIPClassin Works - Demo"
      />
    </>
  );
};

export default HowItWorksHeroSection;
