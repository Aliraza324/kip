import { VideoTile } from "./VideoTile";
import { getSocket } from "@/service/socket";

/**
 * Responsive video grid: teacher large on left, students in a grid on right.
 */
export const VideoGrid = ({
  localStream,
  remoteStreams,
  participants,
  localUser,
  isTeacher,
}) => {
  const mySocketId = getSocket()?.id;

  // Filter out the local user so we never duplicate local tiles
  const remoteParticipants = (participants || []).filter(
    (p) => p.socketId !== mySocketId && String(p.userId) !== String(localUser?.userId)
  );

  // Identify teacher participant for student view (or fallback to host/first remote user)
  const teacherParticipant = isTeacher
    ? null
    : remoteParticipants.find((p) => p.role?.toLowerCase() === "teacher") ||
      remoteParticipants.find((p) => p.role?.toLowerCase() === "host") ||
      remoteParticipants[0];

  // Students list for side grid
  const studentParticipants = isTeacher
    ? remoteParticipants
    : remoteParticipants.filter((p) => p.socketId !== teacherParticipant?.socketId);

  return (
    <div className="flex flex-col lg:flex-row gap-3 h-full min-h-0">
      {/* Main tile: teacher view (large) */}
      <div className="lg:flex-[2] min-h-0 flex items-center justify-center">
        {isTeacher ? (
          <VideoTile
            stream={localStream}
            name={localUser.name}
            role="teacher"
            isAudioOn={true}
            isVideoOn={true}
            isLocal
            isMain
          />
        ) : teacherParticipant ? (
          <VideoTile
            stream={remoteStreams[teacherParticipant.socketId]}
            name={teacherParticipant.name}
            role="teacher"
            isAudioOn={teacherParticipant.isAudioOn ?? true}
            isVideoOn={teacherParticipant.isVideoOn ?? true}
            handRaised={teacherParticipant.handRaised}
            isMain
          />
        ) : (
          <div className="w-full aspect-video bg-slate-800 rounded-2xl flex items-center justify-center">
            <p className="text-white/40 text-sm">Waiting for teacher...</p>
          </div>
        )}
      </div>

      {/* Side grid: students */}
      <div className="lg:flex-1 min-h-0 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          {/* Local tile (student) */}
          {!isTeacher && (
            <VideoTile
              stream={localStream}
              name={localUser.name}
              role={localUser.role}
              isLocal
            />
          )}

          {/* Remote student participants */}
          {studentParticipants.map((p) => (
            <VideoTile
              key={p.socketId}
              stream={remoteStreams[p.socketId]}
              name={p.name}
              role={p.role}
              isAudioOn={p.isAudioOn ?? true}
              isVideoOn={p.isVideoOn ?? true}
              handRaised={p.handRaised}
            />
          ))}

          {/* Empty state */}
          {studentParticipants.length === 0 && isTeacher && (
            <div className="col-span-2 bg-slate-800/60 border border-white/5 rounded-2xl aspect-video flex items-center justify-center">
              <p className="text-white/40 text-xs text-center px-4">
                No students have joined yet
              </p>
            </div>
          )}

          {studentParticipants.length === 0 && !isTeacher && !teacherParticipant && (
            <div className="col-span-2 bg-slate-800/60 border border-white/5 rounded-2xl aspect-video flex items-center justify-center">
              <p className="text-white/40 text-xs text-center px-4">
                No other participants yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGrid;
