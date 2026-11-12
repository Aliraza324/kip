import { useState } from "react";
import { Video, Calendar, Clock, X, AlertCircle } from "lucide-react";

export const StudentJoinClassModal = ({ isOpen, onClose, classData, onJoinSuccess }) => {
  const [isJoined, setIsJoined] = useState(false);
  // Allow toggling for testing time conditions
  const [activeOverride, setActiveOverride] = useState(null);

  if (!isOpen || !classData) return null;

  const isTimeActive =
    activeOverride !== null ? activeOverride : Boolean(classData.isClassTimeActive);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl text-center space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Icon Header */}
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center mx-auto">
          <Video className="w-7 h-7" strokeWidth={2.2} />
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Join {classData.subject} Class?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            You&apos;re about to join the live class with {classData.teacher}.
          </p>
        </div>

        {/* Schedule Pill Container */}
        <div className="rounded-full bg-slate-50 border border-slate-100/90 py-2.5 px-4 flex items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{classData.nextClassDate}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{classData.scheduleTime}</span>
          </div>
        </div>

        {/* Time condition status feedback */}
        {!isTimeActive && (
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/70 text-left flex items-start gap-2.5 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Class Not Started Yet</p>
              <p className="text-[11px] text-amber-700 mt-0.5">
                Join Class will be activated automatically once the scheduled session begins ({classData.scheduleTime}).
              </p>
            </div>
          </div>
        )}

        {/* Buttons: Join Class button ONLY shown if class time is active */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-5 rounded-full border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
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
              className="flex-1 py-2.5 px-5 rounded-full bg-gradient-to-r from-[#0060d0] to-[#0080f6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 hover:opacity-95 transition-all cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>{isJoined ? "Connecting..." : "Join Class"}</span>
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="flex-1 py-2.5 px-5 rounded-full bg-slate-100 text-slate-400 text-xs sm:text-sm font-bold cursor-not-allowed border border-slate-200/60"
            >
              Class Not Ready
            </button>
          )}
        </div>

        {/* Dev / Test simulator toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setActiveOverride(!isTimeActive)}
            className="text-[10px] text-slate-400 hover:text-[#0080f6] underline cursor-pointer"
          >
            Test condition: Toggle time state ({isTimeActive ? "Now Active" : "Scheduled Later"})
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentJoinClassModal;

