import { useRef, useMemo, useEffect } from "react";
import { User, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

export const AdminStudentProfilePhotoCard = ({ avatarFile, onAvatarChange }) => {
  const fileInputRef = useRef(null);

  const previewUrl = useMemo(() => {
    if (!avatarFile) return null;
    return URL.createObjectURL(avatarFile);
  }, [avatarFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      return;
    }
    onAvatarChange(file);
    toast.success("Photo selected! Will be uploaded to Cloudinary.");
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <User className="w-5 h-5 text-slate-700" />
        <h3 className="text-base sm:text-lg font-bold text-slate-900">Profile Photo</h3>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {previewUrl ? (
        <div className="relative border-2 border-blue-100 rounded-2xl p-4 bg-blue-50/30 flex items-center gap-4">
          <img
            src={previewUrl}
            alt="Student Preview"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-xs shrink-0"
          />
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {avatarFile?.name}
              </p>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {(avatarFile?.size / 1024).toFixed(0)} KB • Cloudinary Ready
            </p>
            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-[#0080f6] hover:underline cursor-pointer"
              >
                Change
              </button>
              <button
                type="button"
                onClick={() => onAvatarChange(null)}
                className="text-xs font-bold text-red-500 hover:underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
          }}
          className="border-2 border-dashed border-blue-200/90 rounded-2xl p-6 text-center bg-blue-50/20 hover:bg-blue-50/40 transition-colors cursor-pointer group"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 group-hover:bg-blue-100 text-[#0080f6] flex items-center justify-center mb-2 transition-colors">
            <UploadCloud className="w-6 h-6 stroke-[2]" />
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-800">Upload Student Photo</p>
          <p className="text-[11px] text-slate-400 mt-1">JPG, PNG (Max 5 MB)</p>
        </div>
      )}
    </div>
  );
};

export default AdminStudentProfilePhotoCard;
