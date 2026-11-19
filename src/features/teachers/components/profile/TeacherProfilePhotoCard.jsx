import { useRef } from "react";
import { Image, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import defaultAvatar from "@/assets/images/image 13.png";

export const TeacherProfilePhotoCard = ({
  avatar,
  onAvatarUpload,
  onAvatarRemove,
  isUpdating = false,
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5 MB.");
      return;
    }

    if (onAvatarUpload) {
      onAvatarUpload(file);
    }
  };

  const displayAvatar = avatar || defaultAvatar;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-4">
      {/* Header matching SS 2 */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
        <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
          <Image className="w-4 h-4 stroke-[2.2]" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            Profile Photo
          </h3>
          <p className="text-[11px] text-slate-400 font-medium">
            Choose a new profile picture. JPG, PNG (max 5 MB)
          </p>
        </div>
      </div>

      {/* Avatar Preview & Actions matching SS 2 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-0.5 bg-blue-50 border-2 border-blue-100 shadow-xs overflow-hidden shrink-0">
          <img
            src={displayAvatar}
            alt="Teacher Avatar Preview"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUpdating}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer text-center disabled:opacity-60 flex items-center justify-center gap-1.5"
          >
            {isUpdating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <span>Change Photo</span>
            )}
          </button>

          <button
            type="button"
            onClick={onAvatarRemove}
            disabled={isUpdating || !avatar}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 text-xs sm:text-sm font-bold transition-all cursor-pointer disabled:opacity-40"
          >
            <X className="w-4 h-4" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfilePhotoCard;
