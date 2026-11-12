import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ScreenShare,
  Hand,
  MessageSquare,
  Users,
  MoreHorizontal,
} from "lucide-react";

export const ClassroomBottomToolbar = ({
  isMuted,
  onToggleMute,
  isCameraOn,
  onToggleCamera,
  isHandRaised,
  onToggleHand,
  isScreenSharing,
  onToggleScreenShare,
  activePanel, // "chat" | "participants" | null
  onTogglePanel, // (panelName) => void
  onLeaveClass,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-3 sm:p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
      {/* Left / Center Quick Controls */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
        {/* Mic Toggle */}
        <button
          type="button"
          onClick={onToggleMute}
          title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
            isMuted
              ? "bg-rose-50 text-rose-500 hover:bg-rose-100"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Camera Toggle */}
        <button
          type="button"
          onClick={onToggleCamera}
          title={isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
            isCameraOn
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
              : "bg-rose-50 text-rose-500 hover:bg-rose-100"
          }`}
        >
          {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        {/* Share Screen */}
        <button
          type="button"
          onClick={onToggleScreenShare}
          className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl transition-all cursor-pointer ${
            isScreenSharing
              ? "bg-blue-50 text-[#0080f6]"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <ScreenShare className="w-5 h-5" />
          <span className="text-[10px] font-semibold hidden sm:inline">Share Screen</span>
        </button>

        {/* Raise Hand */}
        <button
          type="button"
          onClick={onToggleHand}
          className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl transition-all cursor-pointer ${
            isHandRaised
              ? "bg-amber-100 text-amber-700 font-bold"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Hand className={`w-5 h-5 ${isHandRaised ? "fill-amber-500" : ""}`} />
          <span className="text-[10px] font-semibold hidden sm:inline">
            {isHandRaised ? "Hand Raised" : "Raise Hand"}
          </span>
        </button>

        {/* Messages Toggle */}
        <button
          type="button"
          onClick={() => onTogglePanel("chat")}
          className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl transition-all cursor-pointer ${
            activePanel === "chat"
              ? "bg-blue-50 text-[#0080f6] font-bold"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-semibold hidden sm:inline">Messages</span>
        </button>

        {/* Participants Toggle */}
        <button
          type="button"
          onClick={() => onTogglePanel("participants")}
          className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl transition-all cursor-pointer ${
            activePanel === "participants"
              ? "bg-blue-50 text-[#0080f6] font-bold"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-semibold hidden sm:inline">Participants</span>
        </button>

        {/* More Options */}
        <button
          type="button"
          className="w-10 h-10 rounded-2xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Right: Leave Class Button Matching Image */}
      <div>
        <button
          type="button"
          onClick={onLeaveClass}
          className="py-2.5 px-6 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-95 shadow-2xs"
        >
          Leave Class
        </button>
      </div>
    </div>
  );
};

export default ClassroomBottomToolbar;

