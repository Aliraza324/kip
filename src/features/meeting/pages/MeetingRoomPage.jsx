import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@/service/apiClient";
import { useWebRTC } from "../hooks/useWebRTC";
import { VideoGrid } from "../components/VideoGrid";
import { MeetingControls } from "../components/MeetingControls";
import { ParticipantsList } from "../components/ParticipantsList";
import { MeetingChat } from "../components/MeetingChat";
import { getSocket } from "@/service/socket";

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("kip_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const MeetingRoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const storedUser = getStoredUser();

  const isTeacher = storedUser?.role === "teacher";
  const userInfo = {
    userId: storedUser?.id || storedUser?._id || "unknown",
    name: storedUser?.fullName || "Unknown",
    role: storedUser?.role || "student",
  };

  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [unreadChat, setUnreadChat] = useState(0);
  const [sessionInfo, setSessionInfo] = useState(null);

  const {
    localStream, remoteStreams, participants,
    chatMessages, isAudioOn, isVideoOn,
    isScreenSharing, isRecording, handRaised,
    isKicked, meetingEnded, error,
    toggleAudio, toggleVideo, toggleScreenShare,
    startRecording, stopRecording,
    toggleHand, sendChat,
    muteUser, kickUser,
    leaveRoom, endMeeting,
  } = useWebRTC({ roomId, userInfo, isTeacher });

  // Track unread messages when chat is closed
  useEffect(() => {
    if (!showChat) {
      setUnreadChat((prev) => prev + 1);
    }
  }, [chatMessages.length]);

  const handleToggleChat = useCallback(() => {
    setShowChat((prev) => {
      if (!prev) setUnreadChat(0);
      return !prev;
    });
  }, []);

  // Handle kicked / meeting ended
  useEffect(() => {
    if (isKicked) {
      alert("You have been removed from the class by the teacher.");
      navigate(-1);
    }
  }, [isKicked, navigate]);

  useEffect(() => {
    if (meetingEnded) {
      alert(isTeacher ? "Class ended successfully." : "The teacher has ended the class.");
      navigate(-1);
    }
  }, [meetingEnded, isTeacher, navigate]);

  // Fetch session title if available
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        // Try teacher route first, fallback to student
        const route = isTeacher
          ? `/teacher/sessions`
          : `/student/classes`;
        // We just use roomId as title fallback
      } catch {}
    };
    fetchInfo();
  }, [roomId, isTeacher]);

  const handleLeave = useCallback(() => {
    leaveRoom();
    navigate(-1);
  }, [leaveRoom, navigate]);

  const handleEnd = useCallback(() => {
    endMeeting();
  }, [endMeeting]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-white font-bold text-lg">Could Not Join Meeting</h2>
          <p className="text-white/60 text-sm max-w-sm">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-sm font-semibold transition-colors cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col overflow-hidden">
      {/* ── Top Bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900/95 border-b border-white/5">
        <div className="flex items-center gap-3">
          {/* KIP Logo */}
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-xs">KIP</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">KIPClassin Live</p>
            <p className="text-white/40 text-[10px]">Room: {roomId?.slice(-8)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Recording indicator */}
          {isRecording && (
            <div className="flex items-center gap-1.5 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              REC
            </div>
          )}
          {/* Participant count */}
          <div className="text-white/50 text-xs">
            👥 {participants.length + 1} in room
          </div>
          {/* Live badge */}
          <div className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full">
            LIVE
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 p-3 sm:p-4 min-h-0 overflow-hidden">
          <VideoGrid
            localStream={localStream}
            remoteStreams={remoteStreams}
            participants={participants}
            localUser={userInfo}
            isTeacher={isTeacher}
          />
        </div>

        {/* Side Panels */}
        {(showParticipants || showChat) && (
          <div className="w-72 sm:w-80 border-l border-white/5 flex flex-col p-3 gap-3 overflow-hidden">
            {showParticipants && (
              <div className="flex-1 min-h-0">
                <ParticipantsList
                  participants={participants}
                  isTeacher={isTeacher}
                  onMuteUser={muteUser}
                  onKickUser={kickUser}
                  onClose={() => setShowParticipants(false)}
                />
              </div>
            )}
            {showChat && (
              <div className="flex-1 min-h-0">
                <MeetingChat
                  messages={chatMessages}
                  onSend={sendChat}
                  onClose={handleToggleChat}
                  currentUserId={getSocket()?.id}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Controls Bar ─────────────────────────────────────────────── */}
      <MeetingControls
        isTeacher={isTeacher}
        isAudioOn={isAudioOn}
        isVideoOn={isVideoOn}
        isScreenSharing={isScreenSharing}
        isRecording={isRecording}
        handRaised={handRaised}
        onToggleAudio={toggleAudio}
        onToggleVideo={toggleVideo}
        onToggleScreen={toggleScreenShare}
        onToggleHand={toggleHand}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onToggleChat={handleToggleChat}
        onToggleParticipants={() => setShowParticipants((p) => !p)}
        onLeave={handleLeave}
        onEnd={handleEnd}
        participantsCount={participants.length}
        unreadChat={showChat ? 0 : unreadChat}
      />
    </div>
  );
};

export default MeetingRoomPage;
