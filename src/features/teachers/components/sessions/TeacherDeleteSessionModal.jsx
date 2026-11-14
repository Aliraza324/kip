import { X, Trash2, Calendar } from "lucide-react";
import toast from "react-hot-toast";

export const TeacherDeleteSessionModal = ({ isOpen, onClose, onConfirm, session }) => {
  if (!isOpen || !session) return null;

  const handleDelete = () => {
    onConfirm(session.id);
    toast.success("Session deleted successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-sm sm:max-w-md rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-4 sm:p-6 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Danger Icon */}
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3.5 shadow-2xs">
          <Trash2 className="w-7 h-7 stroke-[2.2]" />
        </div>

        {/* Title & Description */}
        <div className="text-center space-y-1">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Delete Session?
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            Are you sure you want to delete this session? This action can't be undone.
          </p>
        </div>

        {/* Session Card Info */}
        <div className="my-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-slate-900 truncate">
              {session.title}
            </h4>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
              <span>📅 {session.scheduleDate || "Nov 12, 2026"}</span>
              <span>🕒 {session.duration || "10:00 AM – 11:00 AM"}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md shadow-rose-500/25 flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDeleteSessionModal;

