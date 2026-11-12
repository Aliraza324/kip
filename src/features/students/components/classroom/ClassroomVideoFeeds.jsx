import { MicOff, Wifi, User, Hand } from "lucide-react";
import teacherImg from "@/assets/images/Reference photograph.png";
import studentImg from "@/assets/images/Reference photograph (2).png";

export const ClassroomVideoFeeds = ({
  isStudentMuted = true,
  isStudentCameraOn = true,
  isStudentHandRaised = false,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full lg:w-60 xl:w-64 shrink-0">
      {/* Teacher Video Tile */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-100 shadow-2xs aspect-4/3 group">
        <img
          src={teacherImg}
          alt="Mr. James Wilson"
          className="w-full h-full object-cover"
        />
        {/* Bottom Participant Tag */}
        <div className="absolute inset-x-3 bottom-3 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-white flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1.5 min-w-0">
            <Wifi className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">Mr. James Wilson</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* Student Video Tile (Alex You) */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-100 shadow-2xs aspect-4/3 group">
        {/* Hand Raised Badge on Top-Right Corner */}
        {isStudentHandRaised && (
          <div
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-amber-400 text-slate-950 shadow-md flex items-center justify-center z-10 ring-2 ring-amber-300/60 animate-bounce"
            title="Hand Raised"
          >
            <Hand className="w-4 h-4 fill-slate-950 text-slate-950" />
          </div>
        )}

        {isStudentCameraOn ? (
          <img
            src={studentImg}
            alt="Alex (You)"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white">
            <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-lg font-bold border border-slate-700">
              <User className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Camera is Off</p>
          </div>
        )}

        {/* Bottom Participant Tag with Mute Indicator */}
        <div className="absolute inset-x-3 bottom-3 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-white flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1.5 min-w-0">
            <Wifi className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">Alex (You)</span>
          </div>
          {isStudentMuted && (
            <div className="w-5 h-5 rounded-md bg-rose-500/20 text-rose-500 flex items-center justify-center shrink-0">
              <MicOff className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassroomVideoFeeds;

