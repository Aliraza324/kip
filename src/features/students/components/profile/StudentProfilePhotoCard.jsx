import { useRef } from "react";
import { Image, Upload, X } from "lucide-react";
import toast from "react-hot-toast";

export const StudentProfilePhotoCard = ({ avatar, onAvatarChange }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Photo exceeds the 5MB size limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onAvatarChange(event.target.result);
      toast.success("Profile photo updated successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onAvatarChange(null);
    toast.success("Profile photo removed");
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-100 shadow-2xs space-y-3.5">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
        <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
          <Image className="w-4 h-4 stroke-[2.2]" />
        </div>
        <div>
          <h3 className="text-sm sm:text-lg font-bold text-slate-900 leading-tight">
            Profile Photo
          </h3>
          <p className="text-[11px] text-slate-400">
            Upload a new photo (PNG, JPG, max 5MB)
          </p>
        </div>
      </div>

      {/* Centered Avatar + Action Buttons Matching Image 3 */}
      <div className="flex flex-col items-center justify-center pt-2 pb-1 space-y-4">
        <div className="w-24 h-24 rounded-full bg-[#e0f2fe] flex items-center justify-center p-1 shadow-xs">
          <img
            src={avatar}
            alt="Avatar Preview"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          className="hidden"
          onChange={handleFileSelect}
        />

        <div className="flex items-center justify-center gap-3 w-full">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-5 py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Change Photo</span>
          </button>

          <button
            type="button"
            onClick={handleRemove}
            className="px-5 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
          >
            <X className="w-3.5 h-3.5 text-slate-500" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePhotoCard;
