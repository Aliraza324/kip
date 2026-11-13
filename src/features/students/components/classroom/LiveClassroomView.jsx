import { useState } from "react";
import toast from "react-hot-toast";
import { ClassroomTopBar } from "./ClassroomTopBar";
import { ClassroomWhiteboardPresentation } from "./ClassroomWhiteboardPresentation";
import { ClassroomExcalidrawWhiteboard } from "./ClassroomExcalidrawWhiteboard";
import { ClassroomVideoFeeds } from "./ClassroomVideoFeeds";
import { ClassroomChatPanel } from "./ClassroomChatPanel";
import { ClassroomParticipantsPanel } from "./ClassroomParticipantsPanel";
import { ClassroomBottomToolbar } from "./ClassroomBottomToolbar";
import { LeaveClassModal } from "./LeaveClassModal";

export const LiveClassroomView = ({
  onLeaveClass,
  title = "Mathematics – Live Class",
  participantsCount = 24,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  // Default to showing participants (students) when joining class as requested
  const [activePanel, setActivePanel] = useState("participants");

  const handleTogglePanel = (panelName) => {
    setActivePanel((prev) => (prev === panelName ? null : panelName));
  };

  const handleToggleWhiteboard = () => {
    const next = !isWhiteboardOpen;
    setIsWhiteboardOpen(next);
    if (next) {
      setActivePanel(null);
    }
    toast(next ? "Excalidraw Whiteboard opened" : "Returned to presentation slides", {
      icon: next ? "🎨" : "📊",
    });
  };

  const handleToggleScreenShare = () => {
    const nextState = !isScreenSharing;
    setIsScreenSharing(nextState);
    if (nextState) {
      toast.success("You started presenting your screen", { icon: "💻" });
    } else {
      toast("You stopped presenting", { icon: "🛑" });
    }
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    toast(next ? "Microphone muted" : "Microphone unmuted", { icon: next ? "🔇" : "🎙️" });
  };

  const handleToggleCamera = () => {
    const next = !isCameraOn;
    setIsCameraOn(next);
    toast(next ? "Camera turned on" : "Camera turned off", { icon: next ? "📹" : "📷" });
  };

  const handleToggleHand = () => {
    const next = !isHandRaised;
    setIsHandRaised(next);
    toast(next ? "Hand raised! Teacher notified." : "Hand lowered", { icon: "✋" });
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
    <div className="space-y-3.5 sm:space-y-4 max-w-[1600px] mx-auto min-h-full flex flex-col justify-between">
      {/* Top Header Bar */}
      <ClassroomTopBar
        title={title}
        participantsCount={participantsCount}
        onLeave={() => setIsLeaveModalOpen(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onToggleParticipants={() => handleTogglePanel("participants")}
      />

      {/* Main Classroom Stage */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch gap-3.5 sm:gap-5 min-h-[440px] relative">
        {/* Toggle between Full-Stage Excalidraw Whiteboard and Slides Presentation */}
        {isWhiteboardOpen ? (
          <ClassroomExcalidrawWhiteboard
            title={`${title} • Whiteboard`}
            onClose={() => setIsWhiteboardOpen(false)}
          />
        ) : (
          <>
            <ClassroomWhiteboardPresentation
              isScreenSharing={isScreenSharing}
              onStopScreenShare={() => {
                setIsScreenSharing(false);
                toast("You stopped presenting", { icon: "🛑" });
              }}
            />

            {/* Video Feeds (Teacher + Student) */}
            <ClassroomVideoFeeds
              isStudentMuted={isMuted}
              isStudentCameraOn={isCameraOn}
              isStudentHandRaised={isHandRaised}
            />

            {/* Desktop Side Panels (Google Meet style) */}
            {activePanel === "chat" && (
              <div className="hidden lg:block shrink-0 animate-in fade-in slide-in-from-right-4 duration-200">
                <ClassroomChatPanel onClose={() => setActivePanel(null)} />
              </div>
            )}

            {activePanel === "participants" && (
              <div className="hidden lg:block shrink-0 animate-in fade-in slide-in-from-right-4 duration-200">
                <ClassroomParticipantsPanel
                  isStudentHandRaised={isHandRaised}
                  onClose={() => setActivePanel(null)}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile Modal Drawer for Chat / Participants (Google Meet mobile sheet) */}
      {activePanel && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end p-2.5 animate-in fade-in duration-200">
          <div className="w-full max-h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-6 duration-200 flex flex-col">
            {activePanel === "chat" ? (
              <ClassroomChatPanel onClose={() => setActivePanel(null)} />
            ) : (
              <ClassroomParticipantsPanel
                isStudentHandRaised={isHandRaised}
                onClose={() => setActivePanel(null)}
              />
            )}
          </div>
        </div>
      )}

      {/* Bottom Floating Quick Actions Toolbar */}
      <ClassroomBottomToolbar
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isCameraOn={isCameraOn}
        onToggleCamera={handleToggleCamera}
        isHandRaised={isHandRaised}
        onToggleHand={handleToggleHand}
        isScreenSharing={isScreenSharing}
        onToggleScreenShare={handleToggleScreenShare}
        isWhiteboardOpen={isWhiteboardOpen}
        onToggleWhiteboard={handleToggleWhiteboard}
        activePanel={activePanel}
        onTogglePanel={handleTogglePanel}
        onLeaveClass={() => setIsLeaveModalOpen(true)}
      />

      {/* Confirmation Leave Class Modal */}
      <LeaveClassModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirm={() => {
          setIsLeaveModalOpen(false);
          onLeaveClass?.();
        }}
      />
    </div>
  );
};

export default LiveClassroomView;