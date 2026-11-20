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
  isMain = false, // larger hero tile for teacher
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`relative bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center ${
        isMain ? "aspect-video" : "aspect-video"
      }`}
    >
      {/* Video element */}
      {stream && isVideoOn ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <span className="text-white font-bold text-xl">{initials}</span>
          </div>
          <span className="text-white/60 text-xs">{isVideoOn ? "No stream" : "Camera off"}</span>
        </div>
      )}

      {/* Overlay: name + badges */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-between">
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
      {role === "teacher" && (
        <div className="absolute top-2 left-2 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs font-bold shadow">
          Teacher
        </div>
      )}
    </div>
  );
};

export default VideoTile;
