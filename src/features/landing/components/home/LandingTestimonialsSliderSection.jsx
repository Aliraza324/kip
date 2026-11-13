import { useState, useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import backdropBgImg from "@/assets/images/Decorative backdrop.png";
import danielImg from "@/assets/images/Reference photograph.png";
import aishaImg from "@/assets/images/Reference photograph (1).png";
import omarImg from "@/assets/images/Reference photograph (2).png";
import { landingTestimonialsSliderMock } from "@/mocks";
import { fadeInUp, scaleIn, scrollViewport } from "@/animations";
import { TestimonialCard } from "./TestimonialCard";

const testimonialImages = { daniel: danielImg, aisha: aishaImg, omar: omarImg };

export const LandingTestimonialsSliderSection = () => {
  const { badge, headingMain, headingAccent, subtitle, testimonials } =
    landingTestimonialsSliderMock;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCards);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Touch Swipe Handlers for mobile & tablet
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
  };

  const totalDots = maxIndex + 1;

  return (
    <section
      id="testimonials"
      className="relative z-10 w-full py-16 sm:py-24 border-t border-slate-100 bg-[#fbfdff] bg-no-repeat bg-center overflow-hidden"
      style={{
        backgroundImage: `url("${backdropBgImg}")`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mx-auto max-w-3xl text-center mb-12 sm:mb-16"
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-4 py-1.5 shadow-xs mb-3">
            <svg
              className="w-3.5 h-3.5 text-[#007be3] fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <span className="text-xs font-semibold text-[#007be3]">
              {badge}
            </span>
          </div>

          {/* Heading with Yellow Spark Rays */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#01287b] leading-tight break-words">
            <span>{headingMain}</span>
            <span className="relative inline-block text-[#007be3] pr-4 sm:pr-8">
              {headingAccent}
              {/* Radiating 3 Yellow Spark Rays */}
              <svg
                className="absolute -top-3.5 right-0 sm:-top-5 sm:-right-2 w-5 h-5 sm:w-8 sm:h-8 text-[#febf11] pointer-events-none"
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
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Carousel Slider Viewport */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="overflow-hidden w-full max-w-6xl mx-auto py-2"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Animated Slider Track that physically slides horizontally */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3 sm:px-3.5"
              >
                <TestimonialCard
                  item={item}
                  imgSrc={testimonialImages[item.imageKey]}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Carousel Controls: Prev, Dots, Next */}
        <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
          <button
            onClick={handlePrev}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-blue-200 bg-white text-[#007be3] transition-all duration-200 hover:bg-blue-50 active:scale-95 cursor-pointer shadow-xs"
            aria-label="Previous testimonials"
          >
            <ArrowLeft className="h-4 w-4 stroke-[2.2]" />
          </button>

          {/* Indicator Dots */}
          <div className="flex items-center gap-2">
            {[...Array(totalDots)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "h-2.5 w-2.5 bg-[#007be3]"
                    : "h-2 w-2 bg-blue-200 hover:bg-blue-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#007be3] text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:bg-[#006ee6] active:scale-95 cursor-pointer"
            aria-label="Next testimonials"
          >
            <ArrowRight className="h-4 w-4 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandingTestimonialsSliderSection;
