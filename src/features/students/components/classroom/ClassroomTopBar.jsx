import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Users, Maximize2, Minimize2 } from "lucide-react";

export const ClassroomTopBar = ({
  title = "Mathematics – Live Class",
  participantsCount = 24,
  initialSeconds = 1656,
  onLeave,
  onToggleFullscreen,
  isFullscreen,
  onToggleParticipants,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 bg-white border border-slate-100 rounded-2xl shadow-2xs">
      {/* Left: Back & Class Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          type="button"
          onClick={onLeave}
          title="Exit Classroom"
          className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-5 h-5 sm:w-4 sm:h-4" />
        </button>

        <div className="hidden sm:flex items-center gap-2.5 min-w-0">
          <h1 className="text-sm sm:text-base font-black text-slate-900 truncate">
            {title}
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live</span>
          </span>
        </div>
      </div>

      {/* Right: Timer, Participants & Fullscreen Matching Image 1 */}
      <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold text-slate-600 shrink-0">
        <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200/60 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="font-mono text-slate-800 text-xs font-bold">{formatTimer(seconds)}</span>
        </div>

        <button
          type="button"
          onClick={onToggleParticipants}
          title="View Participants"
          className="flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-full border border-slate-200/60 shadow-2xs hover:border-blue-200 transition-colors cursor-pointer"
        >
          <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="font-bold text-slate-800 text-xs">{participantsCount}</span>
        </button>

        <button
          type="button"
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ClassroomTopBar;