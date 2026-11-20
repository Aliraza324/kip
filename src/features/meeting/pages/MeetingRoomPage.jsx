import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWebRTC } from "../hooks/useWebRTC";
import { VideoGrid } from "../components/VideoGrid";
import { MeetingControls } from "../components/MeetingControls";
import { ParticipantsList } from "../components/ParticipantsList";
import { MeetingChat } from "../components/MeetingChat";
import { getSocket } from "@/service/socket";
import { api } from "@/service/apiClient";
import { Mic, MicOff, Video, VideoOff, Check, X, UserPlus, AlertCircle } from "lucide-react";

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
  const storedUser = useMemo(() => getStoredUser(), []);

  const isTeacher = storedUser?.role?.toLowerCase() === "teacher";
  const userInfo = useMemo(
    () => ({
      userId: storedUser?.id || storedUser?._id || "unknown",
      name: storedUser?.fullName || "Unknown",
      role: storedUser?.role?.toLowerCase() || "student",
    }),
    [storedUser]
  );

  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [unreadChat, setUnreadChat] = useState(0);

  const {
    localStream, remoteStreams, participants,
    chatMessages, isAudioOn, isVideoOn,
    isScreenSharing, isRecording, handRaised,
    isKicked, meetingEnded, error,
    waitingToJoin, wasDenied, joinRequests,
    admitStudent, denyStudent,
    toggleAudio, toggleVideo, toggleScreenShare,
    startRecording, stopRecording,
    toggleHand, sendChat,
    muteUser, kickUser,
    leaveRoom, endMeeting,
    screenSharerSocketId,
  } = useWebRTC({ roomId, userInfo, isTeacher });

  // Waiting room preview video ref
  const previewVideoRef = useRef(null);
  useEffect(() => {
    if (previewVideoRef.current && localStream) {
      previewVideoRef.current.srcObject = localStream;
    }
  }, [localStream, waitingToJoin]);

  // Track unread messages when chat is closed
  useEffect(() => {
    if (!showChat && chatMessages.length > 0) {
      setUnreadChat((prev) => prev + 1);
    }
  }, [chatMessages.length, showChat]);

  const handleToggleChat = useCallback(() => {
    setShowChat((prev) => {
      if (!prev) setUnreadChat(0);
      return !prev;
    });
  }, []);

  // Auto-start live class session on backend if teacher joins
  useEffect(() => {
    if (isTeacher && roomId) {
      api.post(`/teacher/sessions/${roomId}/start`, { title: "Live Class" }).catch(() => {});
    }
  }, [isTeacher, roomId]);

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

  const handleLeave = useCallback(() => {
    leaveRoom();
    navigate(-1);
  }, [leaveRoom, navigate]);

  const handleEnd = useCallback(async () => {
    try {
      if (isTeacher && roomId) {
        await api.post(`/teacher/sessions/${roomId}/end`).catch(() => {});
      }
    } finally {
      endMeeting();
    }
  }, [isTeacher, roomId, endMeeting]);

  // ── ERROR SCREEN ────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto text-3xl">
            ⚠️
          </div>
          <h2 className="text-white font-bold text-lg">Could Not Join Meeting</h2>
          <p className="text-white/60 text-xs sm:text-sm">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ── STUDENT DENIED SCREEN ──────────────────────────────────────────────
  if (wasDenied) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Entry Denied</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
              The teacher did not admit you to this class session. Please contact your teacher if you believe this is a mistake.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/student/classes")}
            className="w-full py-2.5 sm:py-3 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md shadow-blue-500/20"
          >
            Back to My Classes
          </button>
        </div>
      </div>
    );
  }

  // ── STUDENT WAITING ROOM SCREEN (Google Meet Style) ──────────────────────
  if (!isTeacher && waitingToJoin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-5 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span>Waiting Room</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
              Asking to join...
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              You&apos;ll join the class once the teacher admits you.
            </p>
          </div>

          {/* Self-preview Camera Box */}
          <div className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden flex items-center justify-center">
            {localStream && isVideoOn ? (
              <video
                ref={previewVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-xl">
                  {userInfo.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-slate-400 text-xs">Camera is off</span>
              </div>
            )}

            {/* Quick Preview Controls (Mic / Camera) */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full">
              <button
                type="button"
                onClick={toggleAudio}
                className={`p-2 rounded-full transition-colors ${
                  isAudioOn ? "bg-white/20 text-white hover:bg-white/30" : "bg-red-500 text-white"
                }`}
                title={isAudioOn ? "Mute Microphone" : "Unmute Microphone"}
              >
                {isAudioOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={toggleVideo}
                className={`p-2 rounded-full transition-colors ${
                  isVideoOn ? "bg-white/20 text-white hover:bg-white/30" : "bg-red-500 text-white"
                }`}
                title={isVideoOn ? "Turn off Camera" : "Turn on Camera"}
              >
                {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Student Info & Cancel Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-400">
              Joining as <span className="font-bold text-white">{userInfo.name}</span>
            </span>
            <button
              type="button"
              onClick={handleLeave}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/20 text-slate-300 hover:text-white hover:bg-white/10 text-xs font-bold transition-all cursor-pointer"
            >
              Cancel & Leave
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── ACTIVE LIVE MEETING ROOM ────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col overflow-hidden relative">
      {/* ── Teacher Floating Join Request Notification Popup ─────────────── */}
      {isTeacher && joinRequests.length > 0 && (
        <div className="absolute top-16 right-4 sm:right-6 z-50 max-w-sm w-full space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {joinRequests.slice(0, 3).map((req) => (
            <div
              key={req.socketId}
              className="bg-slate-900/95 border border-blue-500/40 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl flex items-center justify-between gap-3"
            >
              <div className="min-w-0 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold text-xs truncate">{req.name}</p>
                  <p className="text-slate-400 text-[10px]">Wants to join this class</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => denyStudent(req.socketId)}
                  className="px-2.5 py-1.5 rounded-xl border border-white/20 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Deny
                </button>
                <button
                  type="button"
                  onClick={() => admitStudent(req.socketId)}
                  className="px-3 py-1.5 rounded-xl bg-[#0080f6] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Admit</span>
                </button>
              </div>
            </div>
          ))}
          {joinRequests.length > 3 && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowParticipants(true)}
                className="text-[11px] text-blue-400 hover:underline font-semibold bg-slate-900/80 px-3 py-1 rounded-full border border-blue-500/20"
              >
                +{joinRequests.length - 3} more waiting (open People)
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Top Bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900/95 border-b border-white/5">
        <div className="flex items-center gap-3">
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
            isScreenSharing={isScreenSharing}
            screenSharerSocketId={screenSharerSocketId}
          />
        </div>

        {/* Side Panels */}
        {(showParticipants || showChat) && (
          <div className="w-72 sm:w-80 border-l border-white/5 flex flex-col p-3 gap-3 overflow-hidden">
            {showParticipants && (
              <div className="flex-1 min-h-0">
                <ParticipantsList
                  participants={participants}
                  joinRequests={joinRequests}
                  isTeacher={isTeacher}
                  onAdmit={admitStudent}
                  onDeny={denyStudent}
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
