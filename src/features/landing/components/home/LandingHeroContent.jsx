import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { landingHeroMock } from "@/mocks";
import { useLiveContent } from "@/hooks/useDataSync";
import { fadeInUp, staggerContainer } from "@/animations";
import VideoModal from "@/features/landing/components/shared/VideoModal";

export const LandingHeroContent = () => {
  const navigate = useNavigate();
  const liveHome = useLiveContent("home");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const badge = liveHome?.badge || landingHeroMock.badge;
  const description = liveHome?.description || landingHeroMock.description;

  const rawTitle = liveHome?.title || `${landingHeroMock.headingLine1} ${landingHeroMock.headingLine2}`;
  // Split title intelligently across 2 lines for design symmetry
  let headingLine1 = landingHeroMock.headingLine1;
  let headingLine2 = landingHeroMock.headingLine2;

  if (liveHome?.title) {
    if (liveHome.title.includes(".")) {
      const parts = liveHome.title.split(".").map((p) => p.trim()).filter(Boolean);
      headingLine1 = parts[0] ? `${parts[0]}.` : "";
      headingLine2 = parts.slice(1).join(". ") ? `${parts.slice(1).join(". ")}` : "";
    } else if (liveHome.title.includes(",")) {
      const parts = liveHome.title.split(",").map((p) => p.trim()).filter(Boolean);
      headingLine1 = parts[0] ? `${parts[0]},` : "";
      headingLine2 = parts.slice(1).join(", ");
    } else {
      const words = liveHome.title.split(" ");
      if (words.length > 3) {
        const mid = Math.ceil(words.length / 2);
        headingLine1 = words.slice(0, mid).join(" ");
        headingLine2 = words.slice(mid).join(" ");
      } else {
        headingLine1 = liveHome.title;
        headingLine2 = "";
      }
    }
  }

  const primaryText = liveHome?.btn1Text || landingHeroMock.primaryCta.text;
  const primaryLink = liveHome?.btn1Link || landingHeroMock.primaryCta.href || "/auth/login";

  const secondaryText = liveHome?.btn2Text || landingHeroMock.secondaryCta.text || "Watch Demo";
  const secondaryLink = liveHome?.btn2Link || "";
  const videoUrl = liveHome?.videoUrl || liveHome?.video?.url || "https://www.youtube.com/watch?v=k3_tw44QsZQ";

  const handleSecondaryClick = (e) => {
    e.preventDefault();
    // If a secondary link was explicitly specified and does not point to video
    if (secondaryLink && !secondaryLink.includes("youtube") && !secondaryLink.includes("vimeo") && !secondaryLink.endsWith(".mp4")) {
      if (secondaryLink.startsWith("http")) {
        window.open(secondaryLink, "_blank", "noopener,noreferrer");
      } else {
        navigate(secondaryLink);
      }
      return;
    }
    // Otherwise open the video modal
    setIsVideoModalOpen(true);
  };

  return (
    <>
      <motion.div
        variants={staggerContainer(0.12, 0.05)}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-xl mx-auto lg:mx-0 w-full"
      >
        {/* Category Pill Badge */}
        <motion.div
          variants={fadeInUp}
          className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-3.5 sm:px-4 py-1.5 shadow-xs"
        >
          <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#007be3]" />
          <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#007be3] uppercase">
            {badge}
          </span>
        </motion.div>

        {/* Main Hero Headline */}
        <motion.div variants={fadeInUp} className="relative">
          {/* Yellow Spark Accent above headline */}
          <div className="absolute -top-7 right-6 hidden sm:block" aria-hidden="true">
            <svg
              className="w-8 h-8 text-[#febf11]"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            >
              <line x1="16" y1="28" x2="16" y2="10" />
              <line x1="8" y1="26" x2="3" y2="13" />
              <line x1="24" y1="26" x2="29" y2="13" />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#01287b] sm:text-5xl lg:text-6xl leading-[1.15]">
            <span>{headingLine1}</span>
            {headingLine2 && (
              <>
                <br />
                <span className="relative inline-block mt-1">
                  {headingLine2}
                  {/* Playful Yellow Swoosh Underline */}
                  <svg
                    className="absolute left-0 -bottom-2 w-full h-3 text-[#febf11]"
                    viewBox="0 0 280 16"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 12C65 3 175 3 276 12"
                      stroke="#febf11"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </>
            )}
          </h1>
        </motion.div>

        {/* Subtitle Paragraph */}
        <motion.p
          variants={fadeInUp}
          className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 max-w-lg"
        >
          {description}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          variants={fadeInUp}
          className="mt-6 sm:mt-8 flex flex-row flex-nowrap items-center justify-center lg:justify-start gap-2 sm:gap-4 w-full"
        >
          <Link
            to={primaryLink}
            className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-1 sm:gap-2 rounded-xl bg-[#007be3] px-2.5 sm:px-5 lg:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm lg:text-base font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-[#0066c0] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{primaryText}</span>
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
          </Link>

          <button
            type="button"
            onClick={handleSecondaryClick}
            className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-1 sm:gap-2 rounded-xl border-2 border-[#007be3] bg-white/95 px-2.5 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-semibold text-[#01287b] shadow-xs transition-all hover:bg-blue-50 hover:border-[#0066c0] focus:outline-none focus:ring-2 focus:ring-blue-300 whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span className="flex h-3.5 w-3.5 sm:h-5 sm:w-5 items-center justify-center rounded-full border border-[#007be3] text-[#007be3] shrink-0">
              <Play className="h-2 w-2 sm:h-2.5 sm:w-2.5 fill-current ml-0.5" />
            </span>
            <span>{secondaryText}</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={videoUrl}
        title="KIPClassin Platform Demo"
      />
    </>
  );
};

export default LandingHeroContent;
