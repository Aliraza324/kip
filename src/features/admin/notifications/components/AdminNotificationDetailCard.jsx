import {
  X, FileText, Calendar, Clock, Award, ClipboardList,
  Paperclip, ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";

export const AdminNotificationDetailCard = ({ notification, onClose, onActionClick }) => {
  if (!notification) return null;

  const details = notification.details || {};

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-5 relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        aria-label="Close Preview"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Header */}
      <div className="flex items-start gap-3.5 pr-6">
        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {notification.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-400 font-medium">
              {notification.timestamp}
            </span>
            {notification.badge && (
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 text-[10px] font-bold">
                {notification.badge}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
        {notification.description}
      </p>

      {/* Meta 3-Column Box */}
      <div className="grid grid-cols-3 gap-2 p-3 sm:p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 text-center">
        <div>
          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>Due Date</span>
          </div>
          <span className="text-xs sm:text-sm font-bold text-slate-800 block mt-0.5">
            {details.dueDate || "Nov 6, 2026"}
          </span>
        </div>

        <div className="border-x border-slate-200/60">
          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>Due Time</span>
          </div>
          <span className="text-xs sm:text-sm font-bold text-slate-800 block mt-0.5">
            {details.dueTime || "11:59 PM"}
          </span>
        </div>

        <div>
          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>Total Marks</span>
          </div>
          <span className="text-xs sm:text-sm font-bold text-slate-800 block mt-0.5">
            {details.totalMarks ?? 100}
          </span>
        </div>
      </div>

      {/* Instructions */}
      {details.instructions?.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <ClipboardList className="w-4 h-4 text-slate-500" />
            <span>Instructions</span>
          </div>
          <ul className="space-y-1 text-xs text-slate-500 font-medium pl-1">
            {details.instructions.map((inst, idx) => (
              <li key={idx} className="leading-relaxed flex items-start gap-2">
                <span className="text-slate-400">&bull;</span>
                <span>{inst}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Attachment */}
      {details.attachment && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Paperclip className="w-4 h-4 text-slate-500" />
            <span>Attachment</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 min-w-0">
              <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-600 font-bold text-[10px]">
                PDF
              </span>
              <span className="text-xs font-semibold text-slate-800 truncate">
                {details.attachment.name} ({details.attachment.size})
              </span>
            </div>
            <button
              type="button"
              onClick={() => toast.success("Opening PDF preview...")}
              className="text-xs font-bold text-[#0080f6] hover:underline shrink-0 ml-2"
            >
              View PDF
            </button>
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        type="button"
        onClick={() => onActionClick?.(details.actionUrl)}
        className="w-full py-3 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <ExternalLink className="w-4 h-4" />
        <span>{details.actionLabel || "View Assignment"}</span>
      </button>
    </div>
  );
};

export default AdminNotificationDetailCard;
