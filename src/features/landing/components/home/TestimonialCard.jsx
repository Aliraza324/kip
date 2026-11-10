import { Star } from "lucide-react";

export const TestimonialCard = ({ item, imgSrc }) => {
  const isFeatured = item.featured;

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 ${
        isFeatured
          ? "border-2 border-[#fef08a] shadow-lg shadow-amber-500/5 ring-1 ring-amber-100"
          : "border border-slate-100 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Top Part: Avatar + Rating + Quote */}
      <div className="flex items-start gap-4 sm:gap-5">
        {/* Left: Circular Avatar */}
        <div
          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${item.circleBg} flex items-center justify-center shrink-0 overflow-hidden`}
        >
          <img
            src={imgSrc}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Stars + Quote Icon + Text */}
        <div className="flex-1 text-left">
          <div className="flex items-center justify-between mb-2">
            {/* 5 Golden Stars */}
            <div className="flex items-center gap-0.5">
              {[...Array(item.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-[#febf11] text-[#febf11]"
                />
              ))}
            </div>

            {/* Soft Light Blue Double Quote Icon */}
            <svg
              className="w-5 h-5 text-[#cde5fe] fill-current shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Quote Description */}
          <p className="text-xs sm:text-[13px] leading-relaxed text-slate-600 font-normal">
            “{item.quote}”
          </p>
        </div>
      </div>

      {/* Bottom Part: Centered Name & Role */}
      <div className="border-t border-slate-100 mt-6 pt-4 text-center">
        <h3 className="text-base sm:text-lg font-bold text-[#01287b]">
          {item.name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{item.role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
