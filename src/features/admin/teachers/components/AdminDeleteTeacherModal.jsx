import { useState } from "react";
import { Trash2, AlertTriangle, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { teacherService } from "@/service/apiService";

export const AdminDeleteTeacherModal = ({ isOpen, onClose, teacher, onDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !teacher) return null;

  const teacherId = teacher.id || teacher._id;
  const teacherName = teacher.fullName || teacher.name || "Teacher";
  const teacherCode = teacher.code || teacher.teacherId || "";

  const handleDelete = async () => {
    if (!teacherId) return;
    setIsDeleting(true);
    try {
      await teacherService.delete(teacherId);
      toast.success(`Teacher "${teacherName}" deleted successfully.`);
      onDeleted?.();
      onClose();
    } catch (err) {
      console.error("Delete teacher error:", err);
      toast.error(err.message || "Failed to delete teacher.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-7 text-center border border-slate-100 animate-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="absolute right-4 top-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4 border border-rose-100">
          <Trash2 className="w-7 h-7 stroke-[2]" />
        </div>

        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          Delete Teacher?
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
          Are you sure you want to permanently delete{" "}
          <strong className="text-slate-800">{teacherName}</strong>
          {teacherCode ? ` (${teacherCode})` : ""}? This will remove their account and unlink any class assignments.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-5 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-500/25 transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteTeacherModal;