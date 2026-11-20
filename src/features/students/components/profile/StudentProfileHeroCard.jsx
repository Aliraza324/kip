import { useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import defaultStudentAvatar from "@/assets/images/Reference photograph (2).png";

export const StudentProfileHeroCard = ({
  profile = {},
  onAvatarChange,
  isUploadingAvatar = false,
}) => {
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onAvatarChange) {
      onAvatarChange(file);
    }
    // Reset file input so user can choose same file again if desired
    e.target.value = "";
  };

  const name = profile?.name || profile?.fullName || "Alex Student";
  const username = profile?.username || "@alexstudent";
  const grade = profile?.grade || "Grade 9 • Section A";
  const avatar = profile?.avatar || defaultStudentAvatar;

  return (
    <div className="relative rounded-[28px] bg-gradient-to-b from-[#f0f7ff] via-white to-[#f4f8fe] p-6 sm:p-7 border border-blue-100/70 shadow-2xs overflow-hidden flex flex-col items-center text-center">
      {/* Decorative Subtle Background Glow */}
      <div className="absolute inset-0 bg-radial from-blue-100/40 via-transparent to-transparent pointer-events-none" />

      {/* Hidden File Input for Cloudinary Profile Photo Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Avatar Image with Sky Blue Circular Container & Camera Action Overlay */}
      <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#e0f2fe] flex items-center justify-center p-1 shadow-xs group">
        <img
          src={avatar}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />

        {/* Loading Spinner during Cloudinary upload */}
        {isUploadingAvatar ? (
          <div className="absolute inset-0 rounded-full bg-slate-900/50 flex items-center justify-center text-white">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          /* Camera Button Overlay */
          <button
            type="button"
            onClick={handleAvatarClick}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white flex items-center justify-center shadow-md border-2 border-white transition-transform hover:scale-110 cursor-pointer"
            title="Upload profile photo to Cloudinary"
          >
            <Camera className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Profile Name, Username, and Grade Pill */}
      <div className="mt-4 space-y-1 relative z-10">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {name}
        </h2>
        <p className="text-xs sm:text-sm font-medium text-slate-400">
          {username}
        </p>
        <div className="pt-2">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-white text-[#0080f6] border border-blue-200/80 shadow-2xs">
            {grade}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileHeroCard;
