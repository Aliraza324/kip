import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import logoImg from "@/assets/images/KIPClassin logo.png";
import { loaderMock } from "@/mocks";

export const CountingLoader = ({ duration = 1800, onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrameId;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth sinusoidal ease-out for natural deceleration near 100%
      const easedProgress = Math.sin((progress * Math.PI) / 2);
      const currentCount = Math.floor(easedProgress * 100);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setCount(100);
        if (onComplete) {
          setTimeout(onComplete, 400);
        }
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [duration, onComplete]);

  // Derive status text based on current count threshold
  const currentStatus = useMemo(() => {
    const matching = [...loaderMock.steps]
      .reverse()
      .find((step) => count >= step.threshold);
    return matching ? matching.text : loaderMock.steps[0].text;
  }, [count]);

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{
        y: "-100%",
        transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fcfdff] select-none overflow-hidden"
    >
      {/* Soft Background Decorative Glows */}
      <div className="absolute -top-32 -left-32 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

      {/* Main Content Box */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        {/* Brand Logo */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={logoImg}
          alt={loaderMock.brandName}
          className="h-10 sm:h-12 w-auto object-contain mb-8 sm:mb-10 drop-shadow-xs"
        />

        {/* Numeric Counting Percentage */}
        <div className="flex items-baseline justify-center">
          <span className="text-7xl sm:text-9xl font-black text-[#01287b] tracking-tighter tabular-nums font-mono">
            {count}
          </span>
          <span className="text-3xl sm:text-5xl font-extrabold text-[#007be3] ml-1.5 sm:ml-2">
            %
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-64 sm:w-80 h-2 bg-slate-100/90 rounded-full overflow-hidden border border-slate-200/70 p-[1px] mt-6 sm:mt-8 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#0060d0] via-[#007be3] to-[#febf11] rounded-full transition-all duration-75 ease-out shadow-xs"
            style={{ width: `${count}%` }}
          />
        </div>

        {/* Dynamic Status Text */}
        <p className="mt-4 text-xs sm:text-sm font-semibold tracking-wider text-slate-500 uppercase">
          {currentStatus}
        </p>
      </div>
    </motion.div>
  );
};

export default CountingLoader;

