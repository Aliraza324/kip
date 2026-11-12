import { LogOut, X } from "lucide-react";

export const LeaveClassModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-2xl text-center space-y-4 sm:space-y-5 animate-in zoom-in-95 duration-200">
        {/* Top-Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Soft Red/Rose Icon Circle */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
          <LogOut className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
        </div>

        {/* Title & Prompt */}
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Leave Class?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Are you sure you want to leave this class?
          </p>
        </div>

        {/* Action Buttons: Cancel & Leave Class */}
        <div className="pt-2 flex items-center justify-center gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-full border border-slate-200 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-3 px-6 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs sm:text-sm shadow-md shadow-rose-500/25 transition-all cursor-pointer active:scale-95"
          >
            Leave Class
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveClassModal;

