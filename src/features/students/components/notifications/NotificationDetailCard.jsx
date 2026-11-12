import {
  FileText,
  X,
  Calendar,
  Clock,
  Award,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";

export const NotificationDetailCard = ({ notification, onClose, onActionClick }) => {
  if (!notification) return null;

  const { meta } = notification;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xs space-y-5 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5 min-w-0">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${notification.iconBg}`}
          >
            <FileText className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {notification.title}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-slate-400">
                {notification.dateText}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${notification.badgeColor}`}>
                {notification.badgeLabel}
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
        {notification.message}
      </p>

      {/* Metadata Card (Due Date, Time, Marks) */}
      {meta?.dueDate && (
        <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-400 uppercase">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>Due Date</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
              {meta.dueDate}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-400 uppercase">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Due Time</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
              {meta.dueTime}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-400 uppercase">
              <Award className="w-3 h-3 text-slate-400" />
              <span>Total Marks</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
              {meta.totalMarks}
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      {meta?.instructions && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900">
            <FileText className="w-4 h-4 text-blue-500" />
            <span>Instructions</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
            {meta.instructions.map((inst, i) => (
              <li key={i} className="leading-relaxed">
                {inst}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Attachment */}
      {meta?.attachment && (
        <div className="space-y-2">
          <p className="font-bold text-xs sm:text-sm text-slate-900">
            Attachment
          </p>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <FileText className="w-4 h-4 text-rose-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {meta.attachment.name}
                </p>
                <p className="text-[10px] text-slate-400">
                  {meta.attachment.size}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toast.success("Opening attached guidelines...")}
              className="px-3.5 py-1 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer shrink-0"
            >
              View PDF
            </button>
          </div>
        </div>
      )}

      {/* Bottom Action Button (Redirects to target screen) */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => onActionClick(notification.redirectUrl)}
          className="w-full py-3 px-6 rounded-2xl bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
        >
          <ExternalLink className="w-4 h-4" />
          <span>{notification.redirectButtonLabel || "View Details"}</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationDetailCard;

