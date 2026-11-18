import { useState } from "react";
import { Layers, Info, LayoutGrid, Mail, Video, ExternalLink, Play } from "lucide-react";
import VideoModal from "@/features/landing/components/shared/VideoModal";

const iconMap = {
  home: Layers,
  about: Info,
  features: LayoutGrid,
  "how-it-works": Layers,
  contact: Mail,
};

export const AdminSectionHeroForm = ({ tabKey, sectionTitle, sectionSub, data = {}, onChange }) => {
  const Icon = iconMap[tabKey] || Layers;
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const videoUrl = data?.videoUrl || "";

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0 mt-0.5">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {sectionTitle}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">{sectionSub}</p>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-4 text-xs sm:text-sm">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">
            Section Title (Small Badge)
          </label>
          <input
            type="text"
            name="badge"
            value={data.badge || ""}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all uppercase tracking-wider font-semibold"
            placeholder="e.g. YOUR ONLINE LEARNING SPACE"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Main Heading</label>
          <input
            type="text"
            name="title"
            value={data.title || ""}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all font-bold"
            placeholder="e.g. Learn Together. Grow Together."
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Description</label>
          <textarea
            name="description"
            rows={3}
            value={data.description || ""}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none leading-relaxed"
            placeholder="Write section description..."
          />
        </div>

        {/* Buttons Links */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold text-slate-700 block">Hero Buttons</label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                Primary Button Text
              </span>
              <input
                type="text"
                name="btn1Text"
                value={data.btn1Text || ""}
                onChange={onChange}
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 focus:border-[#0080f6] outline-none"
                placeholder="e.g. Get Started Free"
              />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                Primary Button Link
              </span>
              <input
                type="text"
                name="btn1Link"
                value={data.btn1Link || ""}
                onChange={onChange}
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 focus:border-[#0080f6] outline-none"
                placeholder="e.g. /auth/login"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                Secondary Button Text (Triggers Video / Action)
              </span>
              <input
                type="text"
                name="btn2Text"
                value={data.btn2Text || ""}
                onChange={onChange}
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 focus:border-[#0080f6] outline-none"
                placeholder="e.g. Watch Demo"
              />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                Secondary Button Link (Optional override)
              </span>
              <input
                type="text"
                name="btn2Link"
                value={data.btn2Link || ""}
                onChange={onChange}
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 focus:border-[#0080f6] outline-none"
                placeholder="Leave blank to play demo video"
              />
            </div>
          </div>
        </div>

        {/* Demo Video URL Field */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-[#0080f6]" />
              Demo Video Link (YouTube / Vimeo / MP4 URL)
            </label>
            {videoUrl && (
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0080f6] hover:underline cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                Preview Video
              </button>
            )}
          </div>
          <input
            type="url"
            name="videoUrl"
            value={videoUrl}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all font-mono text-xs"
            placeholder="e.g. https://www.youtube.com/watch?v=k3_tw44QsZQ or direct MP4 link"
          />
          <p className="text-[11px] text-slate-400">
            Paste a YouTube/Vimeo/direct video link here, or upload a video file using the Section Video card on the right.
          </p>
        </div>
      </div>

      {/* Video Modal Preview */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={videoUrl}
        title={`${sectionTitle} – Demo Video Preview`}
      />
    </div>
  );
};

export default AdminSectionHeroForm;
