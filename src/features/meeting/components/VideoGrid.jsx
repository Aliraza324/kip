import { useState } from "react";
import { VideoTile } from "./VideoTile";
import { getSocket } from "@/service/socket";

/**
 * Responsive meeting video grid (Google Meet / Zoom style):
 * - If anyone is screen sharing (local or remote), that screen share takes the large MAIN view!
 * - In 1-on-1 meeting (no screen share), the REMOTE participant is in the large MAIN view!
 * - Local user is in the side/corner thumbnail.
 * - Clicking any tile toggles PIN to make it the MAIN view!
 */
export const VideoGrid = ({
  localStream,
  remoteStreams,
  participants,
  localUser,
  isTeacher,
  isScreenSharing = false,
  screenSharerSocketId = null,
}) => {
  const mySocketId = getSocket()?.id;

  // Filter out the local user so we never duplicate local tiles in remote list
  const remoteParticipants = (participants || []).filter(
    (p) => p.socketId !== mySocketId && String(p.userId) !== String(localUser?.userId)
  );

  // Manual pin state: clicking any tile pins/unpins it to the main view
  const [pinnedId, setPinnedId] = useState(null); // 'local' or socketId

  // Detect if any remote participant is sharing screen (via socket or stream settings)
  const remoteScreenSharer = remoteParticipants.find(
    (p) =>
      p.socketId === screenSharerSocketId ||
      remoteStreams[p.socketId]?.getVideoTracks()?.some(
        (t) =>
          t.label.toLowerCase().includes("screen") ||
          t.label.toLowerCase().includes("display") ||
          t.contentHint === "detail"
      )
  );

  // Determine who should be in the MAIN tile:
  // 1. Screen Share (highest priority for meeting presentation)
  // 2. Manual Pin (user explicitly wanted to focus on someone)
  // 3. Remote partner (in 1-on-1, you want to see the person you are talking to large)
  // 4. Local (if alone in the room)
  let effectiveMainId = null;
  let isMainScreenShare = false;

  if (isScreenSharing || screenSharerSocketId === "local") {
    effectiveMainId = "local";
    isMainScreenShare = true;
  } else if (remoteScreenSharer) {
    effectiveMainId = remoteScreenSharer.socketId;
    isMainScreenShare = true;
  } else if (pinnedId) {
    effectiveMainId = pinnedId;
  } else if (remoteParticipants.length > 0) {
    // Show the remote person (e.g. Teacher sees Student, Student sees Teacher)
    const preferredRemote = isTeacher
      ? remoteParticipants[0]
      : remoteParticipants.find((p) => p.role?.toLowerCase() === "teacher") || remoteParticipants[0];
    effectiveMainId = preferredRemote?.socketId || "local";
  } else {
    // Alone in room
    effectiveMainId = "local";
  }

  const handleTileClick = (id) => {
    // Toggle pin
    setPinnedId((prev) => (prev === id ? null : id));
  };

  // Find data for main tile
  const isMainLocal = effectiveMainId === "local";
  const mainRemoteParticipant = !isMainLocal
    ? remoteParticipants.find((p) => p.socketId === effectiveMainId)
    : null;

  // Remaining participants for side grid (must exclude whoever is in the main tile)
  const sideParticipants = remoteParticipants.filter((p) => p.socketId !== effectiveMainId);
  const showLocalInSide = !isMainLocal;

  return (
    <div className="flex flex-col lg:flex-row gap-3 h-full min-h-0">
      {/* ── MAIN HERO TILE ──────────────────────────────────────────────── */}
      <div className="lg:flex-[3] min-h-0 flex items-center justify-center">
        {isMainLocal ? (
          <VideoTile
            stream={localStream}
            name={localUser.name}
            role={localUser.role}
            isAudioOn={true}
            isVideoOn={true}
            isLocal
            isMain
            isScreenShare={isMainScreenShare || isScreenSharing}
            isPinned={pinnedId === "local"}
            onClick={() => handleTileClick("local")}
          />
        ) : mainRemoteParticipant ? (
          <VideoTile
            stream={remoteStreams[mainRemoteParticipant.socketId]}
            name={mainRemoteParticipant.name}
            role={mainRemoteParticipant.role}
            isAudioOn={mainRemoteParticipant.isAudioOn ?? true}
            isVideoOn={mainRemoteParticipant.isVideoOn ?? true}
            handRaised={mainRemoteParticipant.handRaised}
            isMain
            isScreenShare={isMainScreenShare || mainRemoteParticipant.socketId === screenSharerSocketId}
            isPinned={pinnedId === mainRemoteParticipant.socketId}
            onClick={() => handleTileClick(mainRemoteParticipant.socketId)}
          />
        ) : (
          <div className="w-full aspect-video bg-slate-800 rounded-2xl flex items-center justify-center">
            <p className="text-white/40 text-sm">Connecting...</p>
          </div>
        )}
      </div>

      {/* ── SIDE GRID: OTHER PARTICIPANTS & THUMBNAILS ─────────────────── */}
      <div className="lg:flex-1 min-h-0 overflow-y-auto">
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          {/* Local user tile in side grid (if main is showing remote user) */}
          {showLocalInSide && (
            <VideoTile
              stream={localStream}
              name={localUser.name}
              role={localUser.role}
              isLocal
              isPinned={pinnedId === "local"}
              onClick={() => handleTileClick("local")}
            />
          )}

          {/* Other remote participants in side grid */}
          {sideParticipants.map((p) => (
            <VideoTile
              key={p.socketId}
              stream={remoteStreams[p.socketId]}
              name={p.name}
              role={p.role}
              isAudioOn={p.isAudioOn ?? true}
              isVideoOn={p.isVideoOn ?? true}
              handRaised={p.handRaised}
              isScreenShare={p.socketId === screenSharerSocketId}
              isPinned={pinnedId === p.socketId}
              onClick={() => handleTileClick(p.socketId)}
            />
          ))}

          {/* Empty state: alone in meeting */}
          {sideParticipants.length === 0 && !showLocalInSide && (
            <div className="col-span-2 lg:col-span-1 bg-slate-800/60 border border-white/5 rounded-2xl aspect-video flex items-center justify-center p-4">
              <p className="text-white/40 text-xs text-center">
                {isTeacher ? "Waiting for students to join..." : "Waiting for teacher to join..."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGrid;
