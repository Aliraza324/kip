import React, { useEffect } from "react";
import { X, Play } from "lucide-react";

/**
 * Parses a video URL and returns embed details.
 * Supports: YouTube, Vimeo, direct video (MP4/WebM), Cloudinary video.
 */
function resolveVideoSource(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();

  // YouTube
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (ytMatch) {
    return {
      type: "iframe",
      src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }

  // Vimeo
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return {
      type: "iframe",
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  // Direct video file or Cloudinary
  return {
    type: "video",
    src: trimmed,
  };
}

export default function VideoModal({ isOpen, onClose, videoUrl, title = "Watch Demo" }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const source = resolveVideoSource(videoUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
              <Play className="w-4 h-4 fill-current" />
            </span>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Body */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          {source?.type === "iframe" ? (
            <iframe
              src={source.src}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : source?.type === "video" ? (
            <video
              src={source.src}
              controls
              autoPlay
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="p-8 text-center text-gray-400">
              <p className="text-sm font-medium">No video URL configured yet.</p>
              <p className="text-xs text-gray-500 mt-1">
                You can add or update the demo video in the Admin Content Manager.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
