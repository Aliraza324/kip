import { useState, useEffect, useCallback, useRef } from "react";
import {
  BookOpen, FileText, Download, Share2, UploadCloud,
  X, Check, ExternalLink, Loader2, Trash2,
} from "lucide-react";
import { api } from "@/service/apiClient";
import toast from "react-hot-toast";

export const MeetingMaterialsPanel = ({
  roomId,
  isTeacher = false,
  onClose,
  onShareToChat,
}) => {
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [sharedIds, setSharedIds] = useState(new Set());
  const fileInputRef = useRef(null);

  const fetchMaterials = useCallback(async () => {
    if (!roomId) return;
    try {
      setIsLoading(true);
      // Teacher endpoint vs Student endpoint
      const endpoint = isTeacher
        ? `/teacher/sessions/${roomId}`
        : `/student/classes/${roomId}`;
      const res = await api.get(endpoint);
      const list = res?.data?.materials || [];
      setMaterials(list);
    } catch (err) {
      console.warn("Could not load class materials:", err);
    } finally {
      setIsLoading(false);
    }
  }, [roomId, isTeacher]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  // Teacher uploads additional notes / files directly during live meeting
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));

      await api.post(`/teacher/sessions/${roomId}/materials`, formData);
      toast.success(`${files.length} material(s) uploaded!`);
      await fetchMaterials();
    } catch (err) {
      toast.error(err?.message || "Failed to upload material.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleShare = (m) => {
    const fileUrl = m.url || m.file?.url || "";
    onShareToChat?.({
      id: m.id,
      title: m.title,
      url: fileUrl,
    });
    setSharedIds((prev) => new Set([...prev, m.id]));
    toast.success(`"${m.title}" link shared to in-class chat!`);
  };

  return (
    <div className="flex flex-col h-full bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-white/10 bg-slate-800/90">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <h3 className="text-white font-bold text-sm">
            Class Notes & Materials ({materials.length})
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-white/50 hover:text-white transition-colors cursor-pointer p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ── Teacher Quick Upload Box ────────────────────────────────────── */}
      {isTeacher && (
        <div className="p-3 bg-amber-500/10 border-b border-amber-500/20">
          <label className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-dashed border-amber-400/50 hover:border-amber-400 hover:bg-amber-500/15 text-amber-300 text-xs font-bold transition-all cursor-pointer">
            {isUploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Uploading to Class...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                <span>Upload Notes / File (PDF, DOC, PPT)</span>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              disabled={isUploading}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* ── Materials List ──────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-white/40 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
            <p className="text-xs">Loading materials...</p>
          </div>
        ) : materials.length === 0 ? (
          <div className="text-center py-10 px-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-white/30 mb-2">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-white/60 text-xs font-semibold">No materials attached yet</p>
            <p className="text-white/30 text-[11px] mt-1">
              {isTeacher
                ? "Use the upload button above to attach notes for this class."
                : "The teacher has not uploaded any files for this class yet."}
            </p>
          </div>
        ) : (
          materials.map((m) => {
            const fileUrl = m.url || m.file?.url || "";
            const isShared = sharedIds.has(m.id);

            return (
              <div
                key={m.id}
                className="bg-slate-900/70 border border-white/5 hover:border-white/10 rounded-xl p-2.5 flex flex-col gap-2 transition-all"
              >
                {/* File Info */}
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-xs font-bold truncate leading-tight">
                      {m.title}
                    </p>
                    <p className="text-white/40 text-[10px] mt-0.5">
                      {m.meta || `${m.format || "File"} ${m.size ? "• " + m.size : ""}`}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1.5 pt-1 border-t border-white/5">
                  {/* Download / Open in Browser */}
                  {fileUrl && (
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Open / Save</span>
                    </a>
                  )}

                  {/* Teacher: Share to In-Meeting Chat */}
                  {isTeacher && fileUrl && (
                    <button
                      type="button"
                      onClick={() => handleShare(m)}
                      className={`py-1 px-2.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        isShared
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-blue-600 hover:bg-blue-500 text-white shadow-xs"
                      }`}
                      title="Share link into meeting chat"
                    >
                      {isShared ? (
                        <>
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Shared</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3 h-3" />
                          <span>Share</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MeetingMaterialsPanel;
