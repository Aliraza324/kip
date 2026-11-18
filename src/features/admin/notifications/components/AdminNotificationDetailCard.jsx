import {
  X,
  FileText,
  Calendar,
  Clock,
  Award,
  ClipboardList,
  Paperclip,
  ExternalLink,
  AlertTriangle,
  GraduationCap,
  MessageSquare,
  Megaphone,
  Mail,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";

export const AdminNotificationDetailCard = ({
  notification,
  onClose,
  onActionClick,
  onReachOut,
}) => {
  if (!notification) return null;

  const details = notification.details || {};
  const meta = notification.meta || {};
  const metaType = meta.type;
  const messageText = notification.message || notification.description;
  const timeText = notification.time || (notification.createdAt ? new Date(notification.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "Today");

  // Determine Icon & theme
  let Icon = FileText;
  let iconBg = "bg-blue-50 text-[#0080f6]";
  if (metaType === "low_progress") {
    Icon = AlertTriangle;
    iconBg = "bg-amber-100 text-amber-600";
  } else if (metaType === "teacher_registration") {
    Icon = GraduationCap;
    iconBg = "bg-purple-100 text-purple-600";
  } else if (metaType === "contact_query") {
    Icon = MessageSquare;
    iconBg = "bg-sky-100 text-sky-600";
  } else if (notification.category === "announcements") {
    Icon = Megaphone;
    iconBg = "bg-blue-100 text-[#0080f6]";
  }

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
        <div className={`w-10 h-10 rounded-2xl ${iconBg} flex items-center justify-center shrink-0 shadow-xs`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
            {notification.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">{timeText}</span>
            {metaType === "low_progress" && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                Progress Alert (&lt;70%)
              </span>
            )}
            {metaType === "teacher_registration" && (
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200">
                Pending Approval
              </span>
            )}
            {metaType === "contact_query" && (
              <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[10px] font-bold border border-sky-200">
                Contact Query
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Message / Description */}
      <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100/90 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
        {messageText}
      </div>

      {/* Low Progress Dedicated Card */}
      {metaType === "low_progress" && (
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
              Student Metrics
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-xs font-black">
              {meta.progress != null ? `${meta.progress}%` : "<70%"}
            </span>
          </div>

          <div className="space-y-1 text-xs text-slate-700 font-medium">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Student:</span>
              <span className="font-bold text-slate-900">{meta.studentName || "Student"}</span>
            </div>
            {meta.code && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Student Code:</span>
                <span className="font-semibold text-slate-800">{meta.code}</span>
              </div>
            )}
            {meta.email && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="text-blue-600 font-medium">{meta.email}</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onReachOut?.(meta)}
            className="w-full py-2.5 px-4 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Reach Out to Student (Email & Dashboard)</span>
          </button>
        </div>
      )}

      {/* Teacher Registration Info */}
      {metaType === "teacher_registration" && (
        <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs text-purple-900 font-medium space-y-2">
          <p>
            An independent instructor has registered and verified their email. They are currently awaiting administrative approval before accessing teacher features.
          </p>
        </div>
      )}

      {/* Contact Query Info */}
      {metaType === "contact_query" && meta.email && (
        <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs text-sky-900 font-medium space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sky-600">Sender Email:</span>
            <span className="font-bold text-slate-800">{meta.email}</span>
          </div>
          {meta.subject && (
            <div className="flex items-center justify-between">
              <span className="text-sky-600">Subject:</span>
              <span className="font-semibold text-slate-800">{meta.subject}</span>
            </div>
          )}
        </div>
      )}

      {/* Meta 3-Column Box (for assignment / due date items) */}
      {details.dueDate && (
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
      )}

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
      {(notification.link || details.actionUrl) && (
        <button
          type="button"
          onClick={() => onActionClick?.(notification.link || details.actionUrl)}
          className="w-full py-3 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
          <span>
            {metaType === "teacher_registration"
              ? "Review Teacher Application"
              : metaType === "contact_query"
              ? "View & Reply Query"
              : details.actionLabel || "View Details"}
          </span>
        </button>
      )}
    </div>
  );
};

export default AdminNotificationDetailCard;
