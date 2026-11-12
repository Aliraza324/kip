import { useState } from "react";
import { Monitor, ChevronLeft, ChevronRight, Minus, Plus, Maximize } from "lucide-react";
import { classroomMock } from "@/mocks";

export const ClassroomWhiteboardPresentation = () => {
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

  return (
    <div className="relative flex-1 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xs flex flex-col justify-between overflow-hidden min-h-[360px] sm:min-h-[440px]">
      {/* Top Banner: Presenter Info & Fullscreen */}
      <div className="flex items-center justify-between z-10">
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
        className="my-auto py-10 flex flex-col items-center justify-center text-center select-none transition-transform duration-200"
        style={{ transform: `scale(${zoomLevel / 100})` }}
      >
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {currentSlide.topic}
        </h2>

        <div className="relative mt-6 sm:mt-8 inline-block px-4">
          <p className="text-xl sm:text-3xl font-extrabold text-slate-800 font-mono tracking-wide">
            {currentSlide.formula}
          </p>

          {/* Hand-drawn curved blue underline matching image */}
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

        <p className="text-xs text-slate-400 mt-4 font-medium">
          {currentSlide.note}
        </p>
      </div>

      {/* Bottom Controls: Slide Navigation & Zoom Pill Controls */}
      <div className="flex items-center justify-between z-10 pt-4">
        {/* Pagination Pill */}
        <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs">
          <button
            type="button"
            onClick={handlePrevSlide}
            className="p-0.5 rounded-full hover:bg-white text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span>
            {currentSlideIndex + 1} / 12
          </span>
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

