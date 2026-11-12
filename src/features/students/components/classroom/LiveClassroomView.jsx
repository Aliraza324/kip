import { useState } from "react";
import { ClassroomTopBar } from "./ClassroomTopBar";
import { ClassroomWhiteboardPresentation } from "./ClassroomWhiteboardPresentation";
import { ClassroomVideoFeeds } from "./ClassroomVideoFeeds";
import { ClassroomChatPanel } from "./ClassroomChatPanel";
import { ClassroomParticipantsPanel } from "./ClassroomParticipantsPanel";
import { ClassroomBottomToolbar } from "./ClassroomBottomToolbar";

export const LiveClassroomView = ({ onLeaveClass }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Default to chat open as shown in reference image
  const [activePanel, setActivePanel] = useState("chat");

  const handleTogglePanel = (panelName) => {
    setActivePanel((prev) => (prev === panelName ? null : panelName));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto min-h-full flex flex-col justify-between">
      {/* Top Header Bar with Live Indicator & Timer */}
      <ClassroomTopBar
        title="Mathematics – Live Class"
        participantsCount={24}
        onLeave={onLeaveClass}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Main Classroom Stage */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch gap-4 sm:gap-5 min-h-[460px]">
        {/* Whiteboard Presentation Screen */}
        <ClassroomWhiteboardPresentation />

        {/* Video Feeds (Teacher + Student) */}
        <ClassroomVideoFeeds
          isStudentMuted={isMuted}
          isStudentCameraOn={isCameraOn}
        />

        {/* Dynamic Right Side Panel (Google Meet style: Messages / Participants) */}
        {activePanel === "chat" && (
          <div className="shrink-0 animate-in fade-in slide-in-from-right-4 duration-200">
            <ClassroomChatPanel onClose={() => setActivePanel(null)} />
          </div>
        )}

        {activePanel === "participants" && (
          <div className="shrink-0 animate-in fade-in slide-in-from-right-4 duration-200">
            <ClassroomParticipantsPanel
              isStudentHandRaised={isHandRaised}
              onClose={() => setActivePanel(null)}
            />
          </div>
        )}
      </div>

      {/* Bottom Floating Quick Actions Toolbar */}
      <ClassroomBottomToolbar
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        isCameraOn={isCameraOn}
        onToggleCamera={() => setIsCameraOn(!isCameraOn)}
        isHandRaised={isHandRaised}
        onToggleHand={() => setIsHandRaised(!isHandRaised)}
        isScreenSharing={isScreenSharing}
        onToggleScreenShare={() => setIsScreenSharing(!isScreenSharing)}
        activePanel={activePanel}
        onTogglePanel={handleTogglePanel}
        onLeaveClass={onLeaveClass}
      />
    </div>
  );
};

export default LiveClassroomView;

