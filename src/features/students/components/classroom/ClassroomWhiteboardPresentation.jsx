import { useState } from "react";
import { Monitor, ChevronLeft, ChevronRight, Minus, Plus, Maximize, ScreenShare, StopCircle } from "lucide-react";
import { classroomMock } from "@/mocks";

export const ClassroomWhiteboardPresentation = ({
  isScreenSharing,
  onStopScreenShare,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);

  const slides = classroomMock.slides;
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  if (isScreenSharing) {
    return (
      <div className="relative flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between overflow-hidden min-h-[360px] sm:min-h-[440px] text-white">
        {/* Google Meet Screen Sharing Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 z-10 bg-slate-800/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700/80">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
            <ScreenShare className="w-4 h-4 text-blue-400" />
            <span className="text-xs sm:text-sm font-bold">You are presenting to everyone</span>
          </div>

          <button
            type="button"
            onClick={onStopScreenShare}
            className="px-4 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-rose-500/20 active:scale-95"
          >
            <StopCircle className="w-3.5 h-3.5" />
            <span>Stop Presenting</span>
          </button>
        </div>

        {/* Live Presentation Screen Simulation */}
        <div className="my-auto py-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[#0080f6] shadow-inner">
            <ScreenShare className="w-10 h-10 animate-pulse" />
          </div>

          <div className="space-y-1 max-w-md">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Your Entire Screen is Being Shared
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Everyone in Mathematics Class can see your shared window, code, and tabs in real time.
            </p>
          </div>

          <div className="pt-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Stream Active • 1080p 60fps</span>
            </span>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
          <span>Click &apos;Stop Presenting&apos; whenever you want to return to teacher&apos;s whiteboard.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 bg-white border border-slate-100 rounded-3xl p-5 sm:p-7 shadow-2xs flex flex-col justify-between overflow-hidden min-h-[360px] sm:min-h-[440px]">
      {/* Top Banner: Presenter Info & Fullscreen */}
      <div className="flex items-center justify-between z-10 flex-wrap gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 backdrop-blur-md text-white text-[11px] font-semibold shadow-xs">
          <Monitor className="w-3.5 h-3.5 text-blue-400" />
          <span>Mr. James Wilson is presenting</span>
        </div>

        <button
          type="button"
          title="Expand Presentation"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>

      {/* Main Whiteboard Center Content with formula & blue underline */}
      <div
        className="my-auto py-8 sm:py-10 flex flex-col items-center justify-center text-center select-none transition-transform duration-200"
        style={{ transform: `scale(${zoomLevel / 100})` }}
      >
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {currentSlide.topic}
        </h2>

        <div className="relative mt-5 sm:mt-7 inline-block px-4">
          <p className="text-xl sm:text-3xl font-extrabold text-slate-800 font-mono tracking-wide">
            {currentSlide.formula}
          </p>

          <svg
            className="w-full h-4 mt-2"
            viewBox="0 0 260 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 11C75 4 185 4 257 12"
              stroke="#0080f6"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="text-xs text-slate-400 mt-3 font-medium">
          {currentSlide.note}
        </p>
      </div>

      {/* Bottom Controls: Slide Navigation & Zoom Pill Controls */}
      <div className="flex items-center justify-between z-10 pt-4">
        {/* Pagination Pill */}
        <div className="inline-flex items-center gap-2.5 sm:gap-3 bg-slate-50 border border-slate-200/80 rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs">
          <button
            type="button"
            onClick={handlePrevSlide}
            className="p-0.5 rounded-full hover:bg-white text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span>{currentSlideIndex + 1} / 12</span>
          <button
            type="button"
            onClick={handleNextSlide}
            className="p-0.5 rounded-full hover:bg-white text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Zoom Controls Pill */}
        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(z - 10, 70))}
            className="p-0.5 rounded-full hover:bg-white text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(z + 10, 140))}
            className="p-0.5 rounded-full hover:bg-white text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassroomWhiteboardPresentation;