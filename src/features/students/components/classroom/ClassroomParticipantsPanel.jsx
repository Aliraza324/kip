import { useState } from "react";
import { Users, X, Search, Mic, MicOff, Hand, Video, VideoOff } from "lucide-react";
import { classroomMock } from "@/mocks";

export const ClassroomParticipantsPanel = ({ onClose, isStudentHandRaised = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const participants = classroomMock.participants;

  const filtered = participants.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full lg:w-80 xl:w-96 bg-white border border-slate-100 rounded-3xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between h-full min-h-[500px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900">
            <Users className="w-5 h-5 text-[#0080f6]" />
            <h3 className="font-bold text-base">Participants ({participants.length})</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close participants"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search participants..."
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 outline-none focus:border-[#0080f6] focus:bg-white transition-all"
          />
        </div>

        {/* Participants List */}
        <div className="mt-4 space-y-2 overflow-y-auto max-h-[380px] pr-1">
          {filtered.map((p) => {
            const handRaised = p.isHost ? false : p.name.includes("You") ? isStudentHandRaised : p.isHandRaised;

            return (
              <div
                key={p.id}
                className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${p.avatarColor}`}
                  >
                    {p.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">{p.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Hand Raised Indicator */}
                  {handRaised && (
                    <div className="p-1 rounded-md bg-amber-100 text-amber-700" title="Hand Raised">
                      <Hand className="w-3.5 h-3.5 fill-amber-500" />
                    </div>
                  )}

                  {/* Video Status */}
                  <div className="text-slate-400">
                    {p.isCameraOn ? (
                      <Video className="w-3.5 h-3.5 text-slate-500" />
                    ) : (
                      <VideoOff className="w-3.5 h-3.5 text-slate-300" />
                    )}
                  </div>

                  {/* Mic Status */}
                  <div className="text-slate-400">
                    {p.isMuted ? (
                      <MicOff className="w-3.5 h-3.5 text-rose-500" />
                    ) : (
                      <Mic className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 text-center text-[11px] text-slate-400 font-medium">
        Live classroom audio & video are encrypted.
      </div>
    </div>
  );
};

export default ClassroomParticipantsPanel;

