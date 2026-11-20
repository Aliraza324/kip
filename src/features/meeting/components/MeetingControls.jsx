import {
  Mic, MicOff, Video, VideoOff, MonitorUp, MonitorOff,
  Hand, PhoneOff, MessageSquare, Users, Circle,
  CircleStop, BookOpen,
} from "lucide-react";

const ControlBtn = ({ onClick, active, danger, disabled, title, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all cursor-pointer disabled:opacity-40
      ${danger
        ? "bg-red-500 hover:bg-red-600 text-white"
        : active
        ? "bg-white/20 text-white hover:bg-white/30"
        : "bg-white/10 text-white/70 hover:bg-white/20"
      }`}
  >
    {children}
  </button>
);

export const MeetingControls = ({
  isTeacher,
  isAudioOn,
  isVideoOn,
  isScreenSharing,
  isRecording,
  handRaised,
  onToggleAudio,
  onToggleVideo,
  onToggleScreen,
  onToggleHand,
  onStartRecording,
  onStopRecording,
  onToggleChat,
  onToggleParticipants,
  onToggleMaterials,
  showMaterials = false,
  materialsCount = 0,
  onLeave,
  onEnd,
  participantsCount = 0,
  unreadChat = 0,
}) => (
  <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap px-4 py-3 bg-slate-900/95 backdrop-blur-sm">
    {/* Mic */}
    <ControlBtn onClick={onToggleAudio} active={isAudioOn} title={isAudioOn ? "Mute" : "Unmute"}>
      {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5 text-red-400" />}
      <span className="text-[10px] hidden sm:block">{isAudioOn ? "Mute" : "Unmute"}</span>
    </ControlBtn>

    {/* Camera */}
    <ControlBtn onClick={onToggleVideo} active={isVideoOn} title={isVideoOn ? "Stop Video" : "Start Video"}>
      {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5 text-red-400" />}
      <span className="text-[10px] hidden sm:block">{isVideoOn ? "Stop Video" : "Start Video"}</span>
    </ControlBtn>

    {/* Screen Share */}
    <ControlBtn onClick={onToggleScreen} active={isScreenSharing} title={isScreenSharing ? "Stop Sharing" : "Share Screen"}>
      {isScreenSharing ? <MonitorOff className="w-5 h-5 text-green-400" /> : <MonitorUp className="w-5 h-5" />}
      <span className="text-[10px] hidden sm:block">{isScreenSharing ? "Stop Share" : "Share Screen"}</span>
    </ControlBtn>

    {/* Recording (teacher only) */}
    {isTeacher && (
      <ControlBtn
        onClick={isRecording ? onStopRecording : onStartRecording}
        active={isRecording}
        title={isRecording ? "Stop Recording" : "Record"}
      >
        {isRecording
          ? <CircleStop className="w-5 h-5 text-red-400 animate-pulse" />
          : <Circle className="w-5 h-5" />}
        <span className="text-[10px] hidden sm:block">{isRecording ? "Stop Rec" : "Record"}</span>
      </ControlBtn>
    )}

    {/* Raise Hand (student only) */}
    {!isTeacher && (
      <ControlBtn onClick={onToggleHand} active={handRaised} title={handRaised ? "Lower Hand" : "Raise Hand"}>
        <Hand className={`w-5 h-5 ${handRaised ? "text-yellow-400" : ""}`} />
        <span className="text-[10px] hidden sm:block">{handRaised ? "Lower Hand" : "Raise Hand"}</span>
      </ControlBtn>
    )}

    {/* Participants */}
    <ControlBtn onClick={onToggleParticipants} title="Participants">
      <div className="relative">
        <Users className="w-5 h-5" />
        {participantsCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
            {participantsCount > 9 ? "9+" : participantsCount}
          </span>
        )}
      </div>
      <span className="text-[10px] hidden sm:block">People</span>
    </ControlBtn>

    {/* Chat */}
    <ControlBtn onClick={onToggleChat} title="Chat">
      <div className="relative">
        <MessageSquare className="w-5 h-5" />
        {unreadChat > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
            {unreadChat > 9 ? "9+" : unreadChat}
          </span>
        )}
      </div>
      <span className="text-[10px] hidden sm:block">Chat</span>
    </ControlBtn>

    {/* Class Notes / Materials */}
    <ControlBtn
      onClick={onToggleMaterials}
      active={showMaterials}
      title="Class Notes & Materials"
    >
      <div className="relative">
        <BookOpen className={`w-5 h-5 ${showMaterials ? "text-amber-400" : ""}`} />
        {materialsCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
            {materialsCount}
          </span>
        )}
      </div>
      <span className="text-[10px] hidden sm:block">Notes</span>
    </ControlBtn>

    {/* Divider */}
    <div className="w-px h-10 bg-white/10 mx-1 hidden sm:block" />

    {/* Leave / End */}
    {isTeacher ? (
      <ControlBtn onClick={onEnd} danger title="End Class for Everyone">
        <PhoneOff className="w-5 h-5" />
        <span className="text-[10px] hidden sm:block">End Class</span>
      </ControlBtn>
    ) : (
      <ControlBtn onClick={onLeave} danger title="Leave Class">
        <PhoneOff className="w-5 h-5" />
        <span className="text-[10px] hidden sm:block">Leave</span>
      </ControlBtn>
    )}
  </div>
);

export default MeetingControls;
