import {
  FileText,
  X,
  Calendar,
  Clock,
  ExternalLink,
  User,
  Layers,
} from "lucide-react";

export const TeacherNotificationDetailCard = ({
  notification,
  onClose,
  onActionClick,
}) => {
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
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${notification.badgeColor}`}
              >
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

      {/* Message Body */}
      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
        {notification.message}
      </p>

      {/* Dynamic Metadata Cards */}
      {meta?.studentName && (
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <User className="w-4 h-4 text-[#0080f6]" />
              <span>Student</span>
            </div>
            <span className="font-bold text-slate-900">{meta.studentName}</span>
          </div>
          {meta.class && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <Layers className="w-4 h-4 text-[#0080f6]" />
                <span>Class</span>
              </div>
              <span className="font-bold text-slate-900">{meta.class}</span>
            </div>
          )}
          {meta.submittedFile && (
            <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
              <span className="text-slate-400 font-medium">Attached File:</span>
              <span className="font-bold text-[#0080f6]">{meta.submittedFile}</span>
            </div>
          )}
        </div>
      )}

      {/* Action Instructions if present */}
      {meta?.instructions && (
        <div className="space-y-1.5 pt-1">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Teacher Notes:
          </h4>
          <ul className="space-y-1 text-xs text-slate-600">
            {meta.instructions.map((inst, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#0080f6] font-bold">•</span>
                <span>{inst}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Button */}
      {notification.redirectUrl && (
        <button
          type="button"
          onClick={() => onActionClick(notification.redirectUrl)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
        >
          <span>{notification.redirectButtonLabel || "View Details"}</span>
          <ExternalLink className="w-4 h-4 stroke-[2.2]" />
        </button>
      )}
    </div>
  );
};

export default TeacherNotificationDetailCard;
