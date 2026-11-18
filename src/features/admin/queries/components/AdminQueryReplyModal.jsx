import { useState, useEffect } from "react";
import { X, Mail, Send, CheckCircle2, Clock, Calendar, User, MessageSquare, Loader2 } from "lucide-react";
import { useAdminReplyContactMessage } from "@/hooks/admin/useAdminContactQueries";
import toast from "react-hot-toast";

export const AdminQueryReplyModal = ({ isOpen, onClose, query, onReplySuccess }) => {
  const [replyText, setReplyText] = useState("");
  const replyMutation = useAdminReplyContactMessage();

  useEffect(() => {
    if (query?.replyMessage) {
      setReplyText(query.replyMessage);
    } else {
      setReplyText("");
    }
  }, [query]);

  if (!isOpen || !query) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = replyText.trim();
    if (!trimmed || trimmed.length < 2) {
      toast.error("Please enter a response message.");
      return;
    }

    try {
      const res = await replyMutation.mutateAsync({
        messageId: query.id,
        replyMessage: trimmed,
      });
      onReplySuccess?.(res?.data || { ...query, isReplied: true, replyMessage: trimmed, repliedAt: new Date() });
      onClose();
    } catch {
      // Error handled by mutation hook
    }
  };

  const formattedDate = query.createdAt
    ? new Date(query.createdAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Recently";

  const formattedRepliedDate = query.repliedAt
    ? new Date(query.repliedAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#f8fbfe]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Contact Query Details
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Review user query and send a response directly to their email.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Sender & Query Info Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#0080f6] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                  {query.firstName?.[0] || "U"}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {query.fullName || `${query.firstName} ${query.lastName}`}
                  </h4>
                  <a
                    href={`mailto:${query.email}`}
                    className="text-xs font-semibold text-[#0080f6] hover:underline flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" />
                    {query.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-[#0080f6]">
                  {query.subject || "General"}
                </span>
                {query.isReplied ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="w-3 h-3" /> Replied
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600">
                    <Clock className="w-3 h-3" /> Pending
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
              <Calendar className="w-3 h-3" />
              <span>Received: {formattedDate}</span>
            </div>

            {/* Query Message Box */}
            <div className="pt-2 border-t border-slate-200/70">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                User's Inquiry / Message
              </label>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap bg-white p-3.5 rounded-xl border border-slate-200/80">
                {query.message}
              </p>
            </div>
          </div>

          {/* Previous Response Banner if replied */}
          {query.isReplied && formattedRepliedDate && (
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Response Sent to User via Email
                </span>
                <span className="text-[11px] font-medium text-emerald-600">{formattedRepliedDate}</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed whitespace-pre-wrap bg-white/80 p-3 rounded-xl border border-emerald-100">
                {query.replyMessage}
              </p>
            </div>
          )}

          {/* Response Form */}
          <form id="reply-form" onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-[#0080f6]" />
                {query.isReplied ? "Send Another / Updated Response" : "Write Response (Will be emailed directly to user)"}
              </label>
            </div>

            <textarea
              rows={5}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your response to the user here. They will receive this via email with their inquiry details..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs sm:text-sm resize-none leading-relaxed"
              required
            />
          </form>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-[#f8fbfe]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="submit"
            form="reply-form"
            disabled={replyMutation.isLoading}
            className="px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
          >
            {replyMutation.isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Email...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{query.isReplied ? "Send Updated Email" : "Send Response via Email"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminQueryReplyModal;
