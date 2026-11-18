import { useState, useRef } from "react";
import { Edit3, Video, UploadCloud, Play, Loader2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import VideoModal from "@/features/landing/components/shared/VideoModal";

export const AdminSectionMediaCard = ({
  data = {},
  onImageUpload,
  onVideoUpload,
}) => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const imageUrl = typeof data?.image === "string" ? data.image : data?.image?.url || "";
  const imageName = data?.image?.name || data?.imageName || "section-image.png";
  const imageSize = data?.image?.size
    ? `${(data.image.size / (1024 * 1024)).toFixed(1)} MB`
    : data?.imageMeta || "Cloudinary Image";

  const videoUrl = data?.videoUrl || data?.video?.url || "";
  const videoName = data?.video?.name || (videoUrl ? "Configured Video Link" : "No video uploaded");
  const videoSize = data?.video?.size ? `${(data.video.size / (1024 * 1024)).toFixed(1)} MB` : null;

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPG, PNG, WEBP, GIF, SVG).");
      return;
    }

    try {
      setIsUploadingImage(true);
      await onImageUpload?.(file);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error(err?.message || "Failed to upload image.");
    } finally {
      setIsUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  const handleVideoFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file (MP4, WebM, QuickTime).");
      return;
    }

    try {
      setIsUploadingVideo(true);
      await onVideoUpload?.(file);
      toast.success("Video uploaded and synced successfully!");
    } catch (err) {
      toast.error(err?.message || "Failed to upload video.");
    } finally {
      setIsUploadingVideo(false);
      if (videoInputRef.current) videoInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-5">
      {/* Hidden file inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageFileChange}
        className="hidden"
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        onChange={handleVideoFileChange}
        className="hidden"
      />

      {/* Section Image Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-[#0080f6]" />
            Section Image
          </h4>
          {isUploadingImage && (
            <span className="flex items-center gap-1 text-xs text-[#0080f6] font-semibold">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...
            </span>
          )}
        </div>

        <div className="rounded-2xl border border-slate-100 overflow-hidden bg-slate-50/50 p-3">
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-slate-100 flex items-center justify-center group">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Section Preview"
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
              />
            ) : (
              <div className="text-slate-400 text-xs flex flex-col items-center gap-1">
                <ImageIcon className="w-8 h-8 opacity-40" />
                <span>No image available</span>
              </div>
            )}
            <div
              onClick={() => imageInputRef.current?.click()}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white text-xs font-semibold gap-1.5"
            >
              <Edit3 className="w-4 h-4" /> Change Image
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="truncate">
              <span className="text-xs font-bold text-slate-900 block leading-tight truncate">
                {imageName}
              </span>
              <span className="text-[11px] text-slate-400 font-medium truncate block">
                {imageSize}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                disabled={isUploadingImage}
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#0080f6] hover:bg-blue-50 transition-colors cursor-pointer"
                title="Change Image"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Video Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Video className="w-4 h-4 text-[#0080f6]" />
            Section Demo Video
          </h4>
          {isUploadingVideo && (
            <span className="flex items-center gap-1 text-xs text-[#0080f6] font-semibold">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...
            </span>
          )}
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-900 block truncate">
                {videoName}
              </span>
              <span className="text-[11px] text-slate-400 font-medium block truncate">
                {videoSize ? `${videoSize} • Cloud Storage` : videoUrl ? "Configured URL" : "No video configured"}
              </span>
            </div>
            {videoUrl && (
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#0080f6] text-xs font-bold hover:bg-blue-100 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" /> Play
              </button>
            )}
          </div>

          <button
            type="button"
            disabled={isUploadingVideo}
            onClick={() => videoInputRef.current?.click()}
            className="w-full py-2.5 px-3 rounded-xl border border-dashed border-[#0080f6]/50 bg-blue-50/50 hover:bg-blue-50 text-[#0080f6] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isUploadingVideo ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Uploading Video to Cloud...
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                Upload New Video File
              </>
            )}
          </button>
          <p className="text-[10px] text-slate-400 text-center">
            Supports MP4, WebM up to 200MB. Admin can also paste a YouTube/Vimeo link in the form.
          </p>
        </div>
      </div>

      {/* Video Modal Preview */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={videoUrl}
        title="Hero Demo Video Preview"
      />
    </div>
  );
};

export default AdminSectionMediaCard;
