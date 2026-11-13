import { Check, X } from "lucide-react";

export const TeacherInviteSuccessModal = ({
  isOpen,
  onClose,
  studentName = "",
  invitedCount = 1,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-slate-100 p-6 relative text-center animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-xs">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          Invitation Sent!
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
          {studentName
            ? `Class invitation has been sent to ${studentName}.`
            : `Class invitation has been sent to ${invitedCount} student${
                invitedCount > 1 ? "s" : ""
              }.`}
        </p>

        {/* Done Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-95"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TeacherInviteSuccessModal;

