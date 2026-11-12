import {
  Mic, MicOff, Video, VideoOff, ScreenShare, Hand, MessageSquare, Users, MoreHorizontal,
} from "lucide-react";

export const ClassroomBottomToolbar = ({
  isMuted, onToggleMute, isCameraOn, onToggleCamera,
  isHandRaised, onToggleHand, isScreenSharing, onToggleScreenShare,
  activePanel, onTogglePanel, onLeaveClass,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-3 sm:p-4 shadow-2xs">
      {/* Mobile 3-Row Layout Matching Image 2 */}
      <div className="flex flex-col gap-3 sm:hidden">
        {/* Row 1: 5 Core Action Buttons */}
        <div className="flex items-center justify-between px-1">
          <button
            type="button"
            onClick={onToggleMute}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              isMuted ? "bg-rose-50 text-rose-500 shadow-2xs" : "bg-slate-100 text-slate-700"
            }`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={onToggleCamera}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              isCameraOn ? "bg-blue-50/70 text-[#0080f6]" : "bg-rose-50 text-rose-500"
            }`}
          >
            {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={onToggleScreenShare}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              isScreenSharing ? "bg-blue-500 text-white shadow-md shadow-blue-500/25" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <ScreenShare className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={onToggleHand}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              isHandRaised ? "bg-amber-100 text-amber-700 shadow-2xs" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Hand className={`w-5 h-5 ${isHandRaised ? "fill-amber-500" : ""}`} />
          </button>

          <button
            type="button"
            onClick={() => onTogglePanel("chat")}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              activePanel === "chat" ? "bg-blue-50 text-[#0080f6] shadow-2xs" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>

        {/* Row 2: Participants & More Options */}
        <div className="flex items-center gap-4 px-2">
          <button
            type="button"
            onClick={() => onTogglePanel("participants")}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              activePanel === "participants" ? "bg-blue-50 text-[#0080f6]" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Users className="w-5 h-5" />
          </button>
          <button type="button" className="w-10 h-10 rounded-2xl text-slate-500 hover:bg-slate-50 flex items-center justify-center cursor-pointer">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Row 3: Leave Class Button */}
        <div>
          <button
            type="button"
            onClick={onLeaveClass}
            className="w-full py-2.5 px-6 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs transition-all cursor-pointer shadow-2xs"
          >
            Leave Class
          </button>
        </div>
      </div>

      {/* Desktop Layout: Sleek Horizontal Toolbar */}
      <div className="hidden sm:flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 lg:gap-3.5">
          <button
            type="button"
            onClick={onToggleMute}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer ${
              isMuted ? "bg-rose-50 text-rose-500" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onToggleCamera}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer ${
              isCameraOn ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-rose-50 text-rose-500"
            }`}
          >
            {isCameraOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onToggleScreenShare}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl cursor-pointer text-xs font-semibold ${
              isScreenSharing ? "bg-blue-500 text-white shadow-xs" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <ScreenShare className="w-4 h-4" />
            <span>{isScreenSharing ? "Sharing" : "Share Screen"}</span>
          </button>

          <button
            type="button"
            onClick={onToggleHand}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl cursor-pointer text-xs font-semibold ${
              isHandRaised ? "bg-amber-100 text-amber-700" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Hand className={`w-4 h-4 ${isHandRaised ? "fill-amber-500" : ""}`} />
            <span>{isHandRaised ? "Hand Raised" : "Raise Hand"}</span>
          </button>

          <button
            type="button"
            onClick={() => onTogglePanel("chat")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl cursor-pointer text-xs font-semibold ${
              activePanel === "chat" ? "bg-blue-50 text-[#0080f6]" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Messages</span>
          </button>

          <button
            type="button"
            onClick={() => onTogglePanel("participants")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl cursor-pointer text-xs font-semibold ${
              activePanel === "participants" ? "bg-blue-50 text-[#0080f6]" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Participants</span>
          </button>

          <button type="button" className="w-9 h-9 rounded-2xl text-slate-500 hover:bg-slate-100 flex items-center justify-center cursor-pointer">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={onLeaveClass}
          className="py-2 px-5 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs cursor-pointer shadow-2xs"
        >
          Leave Class
        </button>
      </div>
    </div>
  );
};

export default ClassroomBottomToolbar;