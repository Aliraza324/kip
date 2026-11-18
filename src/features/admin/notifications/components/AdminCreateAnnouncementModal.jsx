import { useState } from "react";
import { X, Megaphone, Users, GraduationCap, Globe, Mail, Send, Loader2 } from "lucide-react";
import { adminAnnouncementService } from "@/service/apiService";
import { playNotificationSound } from "@/utils/notificationSound";
import toast from "react-hot-toast";

const AUDIENCE_OPTIONS = [
  { id: "all", label: "All Users", icon: Globe, desc: "Teachers & Students" },
  { id: "teachers", label: "Teachers Only", icon: GraduationCap, desc: "Only instructors" },
  { id: "students", label: "Students Only", icon: Users, desc: "Only enrolled students" },
];

export const AdminCreateAnnouncementModal = ({ isOpen, onClose, onSuccess }) => {
  const [audience, setAudience] = useState("all");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendEmail, setSendEmail] = useState(true);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter an announcement title.");
      return;
    }
    if (!message.trim()) {
      toast.error("Please enter announcement details.");
      return;
    }

    setLoading(true);
    try {
      const res = await adminAnnouncementService.create({
        audience,
        title: title.trim(),
        message: message.trim(),
        sendEmail,
      });

      playNotificationSound();
      toast.success(
        `Announcement broadcasted to ${res?.data?.recipientsCount ?? "target"} users${
          sendEmail ? " & sent via email!" : "!"
        }`
      );
      onSuccess?.(res?.data);
      onClose();
      setTitle("");
      setMessage("");
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to broadcast announcement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100 bg-[#f8fbfe]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#0080f6] flex items-center justify-center shadow-xs">
              <Megaphone className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Create Announcement
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Broadcast announcement to dashboards & emails
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5">
          {/* Target Audience */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Target Audience
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {AUDIENCE_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = audience === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAudience(opt.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-[#0080f6] bg-blue-50/70 shadow-2xs"
                        : "border-slate-200/80 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon
                        className={`w-4 h-4 ${isSelected ? "text-[#0080f6]" : "text-slate-400"}`}
                      />
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isSelected ? "bg-[#0080f6]" : "bg-transparent"
                        }`}
                      />
                    </div>
                    <div className="mt-2.5">
                      <div
                        className={`text-xs font-bold ${
                          isSelected ? "text-blue-900" : "text-slate-700"
                        }`}
                      >
                        {opt.label}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">{opt.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Announcement Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Announcement Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Schedule Update for Online Classes & Examinations"
              maxLength={150}
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              disabled={loading}
              required
            />
          </div>

          {/* Announcement Message */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Message Content *
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type announcement details here. This message will be sent to the selected dashboard(s) and emailed to all matching users."
              className="w-full p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 transition-all font-medium resize-none leading-relaxed"
              disabled={loading}
              required
            />
          </div>

          {/* Email Notification Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100/70 text-[#0080f6] flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Send Email Notification</p>
                <p className="text-[11px] text-slate-500 font-medium">
                  Deliver email copy directly to each recipient's registered email
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={sendEmail}
                onChange={(e) => setSendEmail(e.target.checked)}
                className="sr-only peer"
                disabled={loading}
              />
              <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0080f6]"></div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Broadcasting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Broadcast Announcement</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateAnnouncementModal;
