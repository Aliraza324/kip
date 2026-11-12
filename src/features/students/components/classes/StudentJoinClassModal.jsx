import { useState } from "react";
import { Video, Calendar, Clock, X, AlertCircle } from "lucide-react";

export const StudentJoinClassModal = ({ isOpen, onClose, classData, onJoinSuccess }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [activeOverride, setActiveOverride] = useState(null);

  if (!isOpen || !classData) return null;

  const isTimeActive =
    activeOverride !== null ? activeOverride : Boolean(classData.isClassTimeActive);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3.5 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-5 sm:p-7 shadow-2xl text-center space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-5 sm:top-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Icon Header */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center mx-auto shadow-2xs">
          <Video className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.2} />
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            Join {classData.subject} Class?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            You&apos;re about to join the live class with {classData.teacher}.
          </p>
        </div>

        {/* Schedule Container: Clean, Never Awkwardly Breaks Lines on Mobile */}
        <div className="rounded-2xl sm:rounded-full bg-slate-50 border border-slate-100/90 py-2.5 px-3 sm:px-4 flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 sm:gap-3 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Calendar className="w-3.5 h-3.5 text-[#0080f6] shrink-0" />
            <span>{classData.nextClassDate}</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-[#0080f6] shrink-0" />
            <span>{classData.scheduleTime}</span>
          </div>
        </div>

        {/* Time condition status feedback */}
        {!isTimeActive && (
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/70 text-left flex items-start gap-2.5 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Class Not Started Yet</p>
              <p className="text-[11px] text-amber-700 mt-0.5 leading-relaxed">
                Join Class will activate when the scheduled session begins ({classData.scheduleTime}).
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons: Neatly Fit Side-by-Side Without Text Wrap */}
        <div className="pt-2 flex items-center justify-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-3 sm:px-5 rounded-full border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
          >
            Cancel
          </button>

          {isTimeActive ? (
            <button
              type="button"
              onClick={() => {
                setIsJoined(true);
                setTimeout(() => {
                  onJoinSuccess?.(classData);
                  onClose();
                }, 300);
              }}
              className="flex-1 py-2.5 px-3 sm:px-5 rounded-full bg-gradient-to-r from-[#0060d0] to-[#0080f6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 sm:gap-2 hover:opacity-95 transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              <Video className="w-4 h-4 shrink-0" />
              <span>{isJoined ? "Connecting..." : "Join Class"}</span>
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="flex-1 py-2.5 px-3 sm:px-5 rounded-full bg-slate-100 text-slate-400 text-xs sm:text-sm font-bold cursor-not-allowed border border-slate-200/60 whitespace-nowrap"
            >
              Class Not Ready
            </button>
          )}
        </div>

        {/* Dev / Test simulator toggle */}
        <div className="pt-0.5">
          <button
            type="button"
            onClick={() => setActiveOverride(!isTimeActive)}
            className="text-[10px] text-slate-400 hover:text-[#0080f6] underline transition-colors cursor-pointer"
          >
            Test condition: Toggle time state ({isTimeActive ? "Now Active" : "Scheduled Later"})
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentJoinClassModal;