import { X, MicOff, Hand, Shield } from "lucide-react";

export const ParticipantsList = ({
  participants = [],
  isTeacher = false,
  onMuteUser,
  onKickUser,
  onClose,
}) => (
  <div className="flex flex-col h-full bg-slate-800 rounded-2xl overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between p-4 border-b border-white/10">
      <h3 className="text-white font-bold text-sm">
        Participants ({participants.length})
      </h3>
      <button onClick={onClose} className="text-white/50 hover:text-white transition-colors cursor-pointer">
        <X className="w-4 h-4" />
      </button>
    </div>

    {/* List */}
    <div className="flex-1 overflow-y-auto p-3 space-y-2">
      {participants.length === 0 ? (
        <p className="text-white/40 text-xs text-center pt-8">No participants yet</p>
      ) : (
        participants.map((p) => (
          <div
            key={p.socketId}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs">
                {p.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
              </span>
            </div>

            {/* Name + badges */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-white text-xs font-semibold truncate">{p.name}</span>
                {p.role === "teacher" && (
                  <Shield className="w-3 h-3 text-blue-400 shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                {!p.isAudioOn && <MicOff className="w-3 h-3 text-red-400" />}
                {p.handRaised && <Hand className="w-3 h-3 text-yellow-400" />}
              </div>
            </div>

            {/* Teacher actions */}
            {isTeacher && p.role !== "teacher" && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onMuteUser?.(p.userId, !p.isAudioOn)}
                  title={p.isAudioOn ? "Mute" : "Unmute"}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <MicOff className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onKickUser?.(p.socketId)}
                  title="Remove from call"
                  className="p-1 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  </div>
);

export default ParticipantsList;
