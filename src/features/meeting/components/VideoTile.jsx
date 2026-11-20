import { useRef, useEffect } from "react";
import { MicOff, VideoOff, Hand } from "lucide-react";

/**
 * Single participant video tile.
 * Pass `stream` for a live MediaStream, or leave null to show avatar fallback.
 */
export const VideoTile = ({
  stream,
  name = "Unknown",
  role = "student",
  isAudioOn = true,
  isVideoOn = true,
  handRaised = false,
  isLocal = false,
  isMain = false, // larger hero tile for teacher or screen share
  isScreenShare = false,
  isPinned = false,
  onClick = null,
}) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  // Check if stream looks like screen share
  const isScreenTrack =
    isScreenShare ||
    Boolean(
      stream
        ?.getVideoTracks()
        ?.some(
          (t) =>
            t.label.toLowerCase().includes("screen") ||
            t.label.toLowerCase().includes("display") ||
            t.contentHint === "detail"
        )
    );

  useEffect(() => {
    const node = videoRef.current;
    if (node && stream && node.srcObject !== stream) {
      node.srcObject = stream;
      node.onloadedmetadata = () => {
        node.play().catch(() => {});
      };
      node.play().catch(() => {});
    }
  }, [stream, isVideoOn]);

  useEffect(() => {
    const node = audioRef.current;
    if (node && stream && !isLocal && node.srcObject !== stream) {
      node.srcObject = stream;
      node.play().catch(() => {});
    }
  }, [stream, isLocal]);

  // Unlock remote audio on any user gesture if initially blocked by browser autoplay policy
  useEffect(() => {
    const handleGesture = () => {
      if (audioRef.current && stream && !isLocal) {
        audioRef.current.play().catch(() => {});
      }
    };
    window.addEventListener("click", handleGesture, { once: true });
    window.addEventListener("touchstart", handleGesture, { once: true });
    return () => {
      window.removeEventListener("click", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
    };
  }, [stream, isLocal]);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      onClick={onClick}
      className={`relative bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center transition-all ${
        isMain ? "aspect-video w-full h-full" : "aspect-video cursor-pointer hover:ring-2 hover:ring-blue-500/60"
      } ${isPinned && !isMain ? "ring-2 ring-blue-500" : ""}`}
    >
      {/* Remote Audio output guarantee */}
      {!isLocal && stream && (
        <audio ref={audioRef} autoPlay playsInline />
      )}

      {/* Video element: always kept mounted in DOM to prevent React re-mount blinking */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full ${
          stream && isVideoOn ? "block" : "hidden"
        } ${
          isScreenTrack || (isMain && !isLocal)
            ? "object-contain bg-black"
            : isLocal
            ? "object-cover scale-x-[-1]"
            : "object-cover"
        }`}
      />

      {/* Fallback avatar when stream not ready or camera off */}
      {(!stream || !isVideoOn) && (
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <span className="text-white font-bold text-xl">{initials}</span>
          </div>
          <span className="text-white/60 text-xs">{isVideoOn ? "Connecting..." : "Camera off"}</span>
        </div>
      )}

      {/* Overlay: name + badges */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-between pointer-events-none">
        <span className="text-white text-xs font-semibold truncate max-w-[70%]">
          {isLocal ? `${name} (You)` : name}
        </span>
        <div className="flex items-center gap-1">
          {!isAudioOn && <MicOff className="w-3.5 h-3.5 text-red-400" />}
          {!isVideoOn && <VideoOff className="w-3.5 h-3.5 text-red-400" />}
        </div>
      </div>

      {/* Hand raised badge */}
      {handRaised && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 rounded-full px-2 py-0.5 text-xs font-bold flex items-center gap-1 shadow">
          <Hand className="w-3 h-3" /> ✋
        </div>
      )}

      {/* Teacher badge */}
      {role?.toLowerCase() === "teacher" && (
        <div className="absolute top-2 left-2 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs font-bold shadow">
          Teacher
        </div>
      )}

      {/* Screen share presenting badge */}
      {isScreenTrack && (
        <div className="absolute top-2 right-2 bg-emerald-600/90 text-white rounded-full px-2.5 py-0.5 text-xs font-bold shadow flex items-center gap-1 z-10">
          <span>🖥️</span>
          <span>{isLocal ? "Your Screen" : `${name}'s Screen`}</span>
        </div>
      )}

      {/* Pinned indicator */}
      {isPinned && !isScreenTrack && (
        <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] rounded-full px-2 py-0.5 shadow flex items-center gap-1 z-10">
          <span>📌</span>
          <span>Pinned</span>
        </div>
      )}
    </div>
  );
};

export default VideoTile;
