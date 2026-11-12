import { useRef } from "react";
import { MicOff, Wifi, User, Hand, ChevronLeft, ChevronRight } from "lucide-react";
import teacherImg from "@/assets/images/Reference photograph.png";
import studentImg from "@/assets/images/Reference photograph (2).png";
import student2Img from "@/assets/images/Reference photograph (1).png";

export const ClassroomVideoFeeds = ({
  isStudentMuted = true,
  isStudentCameraOn = true,
  isStudentHandRaised = false,
}) => {
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -180 : 180;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const feeds = [
    {
      id: "teacher",
      name: "Mr. James Wilson",
      img: teacherImg,
      isMuted: false,
      isCameraOn: true,
      isHandRaised: false,
      isTeacher: true,
    },
    {
      id: "me",
      name: "Alex (You)",
      img: studentImg,
      isMuted: isStudentMuted,
      isCameraOn: isStudentCameraOn,
      isHandRaised: isStudentHandRaised,
      isMe: true,
    },
    {
      id: "student-2",
      name: "Sarah Jenkins",
      img: student2Img,
      isMuted: true,
      isCameraOn: true,
      isHandRaised: false,
    },
    {
      id: "student-3",
      name: "Daniel Lee",
      initials: "DL",
      avatarColor: "bg-emerald-600 text-white",
      isMuted: true,
      isCameraOn: false,
      isHandRaised: true,
    },
    {
      id: "student-4",
      name: "Emma Scott",
      initials: "ES",
      avatarColor: "bg-purple-600 text-white",
      isMuted: true,
      isCameraOn: false,
      isHandRaised: false,
    },
  ];

  return (
    <div className="relative w-full lg:w-60 xl:w-64 shrink-0">
      {/* Slider Scroll Buttons for Mobile */}
      <div className="flex lg:hidden items-center justify-between px-1 mb-1.5 text-xs text-slate-500 font-semibold">
        <span>Participants ({feeds.length})</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => scrollSlider("left")}
            className="p-1 rounded-full bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-600 shadow-2xs cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => scrollSlider("right")}
            className="p-1 rounded-full bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-600 shadow-2xs cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Video Feeds Slider: 1 Single Line on Mobile, Column on Desktop */}
      <div
        ref={sliderRef}
        className="flex flex-row lg:flex-col gap-2.5 sm:gap-3 overflow-x-auto lg:overflow-x-visible no-scrollbar snap-x snap-mandatory py-1 w-full"
      >
        {feeds.map((feed) => (
          <div
            key={feed.id}
            className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 shadow-2xs w-36 sm:w-44 lg:w-full h-24 sm:h-28 lg:h-36 shrink-0 snap-start group select-none"
          >
            {/* Hand Raised Badge */}
            {feed.isHandRaised && (
              <div
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-400 text-slate-950 shadow-md flex items-center justify-center z-10 ring-2 ring-amber-300/60 animate-bounce"
                title="Hand Raised"
              >
                <Hand className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
              </div>
            )}

            {/* Video Image or Camera-Off Placeholder */}
            {feed.isCameraOn ? (
              <img
                src={feed.img}
                alt={feed.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white">
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm border border-white/20 ${feed.avatarColor}`}
                >
                  {feed.initials || <User className="w-5 h-5 text-slate-400" />}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Camera Off</p>
              </div>
            )}

            {/* Bottom Participant Tag */}
            <div className="absolute inset-x-2 bottom-2 px-2 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-white flex items-center justify-between text-[11px] font-semibold">
              <div className="flex items-center gap-1.5 min-w-0 pr-1">
                <Wifi className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                <span className="truncate text-[10px] sm:text-[11px]">{feed.name}</span>
              </div>
              {feed.isMuted ? (
                <div className="w-4 h-4 rounded-md bg-rose-500/20 text-rose-500 flex items-center justify-center shrink-0">
                  <MicOff className="w-2.5 h-2.5" />
                </div>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassroomVideoFeeds;