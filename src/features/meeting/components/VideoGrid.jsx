import { VideoTile } from "./VideoTile";

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
  // Find teacher participant (or treat local as teacher if isTeacher)
  const remoteList = participants.filter((p) => p.role !== "teacher");
  const teacherParticipant = isTeacher
    ? null
    : participants.find((p) => p.role === "teacher");

  return (
    <div className="flex flex-col lg:flex-row gap-3 h-full min-h-0">
      {/* Main tile: teacher view (large) */}
      <div className="lg:flex-[2] min-h-0">
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
            isAudioOn={teacherParticipant.isAudioOn}
            isVideoOn={teacherParticipant.isVideoOn}
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

          {/* Remote participants */}
          {isTeacher
            ? participants.map((p) => (
                <VideoTile
                  key={p.socketId}
                  stream={remoteStreams[p.socketId]}
                  name={p.name}
                  role={p.role}
                  isAudioOn={p.isAudioOn}
                  isVideoOn={p.isVideoOn}
                  handRaised={p.handRaised}
                />
              ))
            : remoteList.map((p) => (
                <VideoTile
                  key={p.socketId}
                  stream={remoteStreams[p.socketId]}
                  name={p.name}
                  role={p.role}
                  isAudioOn={p.isAudioOn}
                  isVideoOn={p.isVideoOn}
                  handRaised={p.handRaised}
                />
              ))}

          {/* Empty state */}
          {participants.length === 0 && !isTeacher && (
            <div className="col-span-2 bg-slate-800 rounded-2xl aspect-video flex items-center justify-center">
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
