import {
  BookOpen,
  User,
  Video,
  Laptop,
  Calendar,
  CreditCard,
  Headphones,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const iconMap = {
  BookOpen,
  User,
  Video,
  Laptop,
  Calendar,
  CreditCard,
  Headphones,
};

export const FaqItem = ({ item, isOpen, onToggle }) => {
  const IconComponent = iconMap[item.icon] || BookOpen;
  const isYellow = item.theme === "yellow";

  return (
    <div
      className={`rounded-2xl transition-all duration-300 overflow-hidden ${
        isOpen
          ? "bg-[#eef7ff] border border-[#bfe0fc] shadow-sm"
          : "bg-white border border-[#e8f1fc] shadow-xs hover:border-[#bfe0fc]/80"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3.5 sm:p-4.5 text-left cursor-pointer focus:outline-hidden transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 sm:gap-4 pr-3 min-w-0">
          {/* Custom Theme Icon Badge */}
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              isYellow
                ? "bg-[#fef8e7] text-[#febf11]"
                : "bg-[#dcedfd] text-[#007be3]"
            }`}
          >
            <IconComponent className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </div>

          {/* Question Title */}
          <span className="font-bold text-[#01287b] text-sm sm:text-base leading-snug">
            {item.question}
          </span>
        </div>

        {/* Right Chevron Action Button */}
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen
              ? "bg-[#007be3] text-white shadow-xs"
              : "bg-[#f1f6fc] text-[#007be3] hover:bg-[#e4effc]"
          }`}
        >
          {isOpen ? (
            <ChevronUp className="h-4 w-4 stroke-[2.5]" />
          ) : (
            <ChevronDown className="h-4 w-4 stroke-[2.5]" />
          )}
        </div>
      </button>

      {/* Answer Body with Smooth Expansion */}
      {isOpen && (
        <div className="px-3.5 pb-4 sm:px-4.5 sm:pb-4.5 pt-0 animate-fadeIn">
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pl-12 sm:pl-14">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default FaqItem;

