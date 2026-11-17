import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail, Phone, Calendar, User, Plus, Layers, Edit2, Trash2, X, Check, BookOpen,
} from "lucide-react";
import toast from "react-hot-toast";
import { classService } from "@/service/apiService";

const COMMON_SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
  "General Science",
  "History",
  "Urdu",
  "Islamiat",
  "Economics",
  "Accounting",
];

export const AdminTeacherDetailCard = ({ teacher = {}, onRefresh }) => {
  const teacherName = teacher.fullName || teacher.name || "Teacher";
  const teacherCode = teacher.code || teacher.teacherId || "—";
  const teacherId = teacher.id || teacher._id;
  const avatarUrl =
    typeof teacher.avatar === "string"
      ? teacher.avatar
      : teacher.avatar?.url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(teacherName)}&background=eaf4fe&color=0080f6`;

  const assigned = Array.isArray(teacher.assignedClasses) ? teacher.assignedClasses : [];

  const [editingCls, setEditingCls] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleOpenEdit = (cls) => {
    setEditingCls(cls);
    const existing = cls.subject || "";
    if (COMMON_SUBJECTS.includes(existing)) {
      setSelectedSubject(existing);
      setCustomSubject("");
    } else if (existing) {
      setSelectedSubject("__custom__");
      setCustomSubject(existing);
    } else {
      setSelectedSubject("Mathematics");
      setCustomSubject("");
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingCls) return;

    const finalSubject = selectedSubject === "__custom__" ? customSubject.trim() : selectedSubject;
    if (selectedSubject === "__custom__" && !finalSubject) {
      toast.error("Please enter a subject name.");
      return;
    }

    setIsSaving(true);
    try {
      await classService.updateTeacherAssignment(
        editingCls.classId,
        editingCls.assignmentId || teacherId,
        { subject: finalSubject || undefined }
      );
      toast.success("Assigned subject updated successfully!");
      setEditingCls(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to update assigned class.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (cls) => {
    const className = cls.className || cls.label || "this class";
    const confirmed = window.confirm(
      `Are you sure you want to remove ${teacherName} from ${className}?`
    );
    if (!confirmed) return;

    const targetId = cls.assignmentId || cls.id || teacherId;
    setDeletingId(targetId);
    try {
      await classService.removeTeacher(cls.classId, cls.assignmentId || teacherId);
      toast.success(`Removed from ${className}!`);
      if (onRefresh) onRefresh();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to remove assignment.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Profile Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4 sm:gap-5">
          <img
            src={avatarUrl}
            alt={teacherName}
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-slate-200 shadow-xs shrink-0"
          />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {teacherName}
            </h2>
            <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-blue-50 text-[#0080f6] text-xs font-bold">
              {teacherCode}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs sm:text-sm text-slate-600 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{teacher.email || "—"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="font-medium">
              {teacher.dob ? new Date(teacher.dob).toLocaleDateString() : "—"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{teacher.phone || "—"}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{teacher.gender || "—"}</span>
          </div>
        </div>
      </div>

      {/* Assigned Classes Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0 mt-0.5">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Assigned Classes ({assigned.length})
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Classes allocated to this teacher.
              </p>
            </div>
          </div>

          <Link
            to={`/admin/teachers/${teacherId || teacherCode}/assign-class`}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Assign New Class</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Section</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Assigned On</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
              {assigned.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No classes assigned to this teacher yet.
                  </td>
                </tr>
              ) : (
                assigned.map((cls, idx) => (
                  <tr key={cls.assignmentId || cls.id || idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-center text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {cls.className || cls.class || cls.grade || "Class"}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{cls.section || "—"}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0080f6] text-xs font-semibold">
                        {cls.subject || "General"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {cls.assignedOn || (cls.assignedAt ? new Date(cls.assignedAt).toLocaleDateString() : "Active")}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(cls)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit Assigned Subject"
                        >
                          <Edit2 className="w-4 h-4 stroke-[2]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(cls)}
                          disabled={deletingId === (cls.assignmentId || cls.id || teacherId)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                          title="Remove Class Assignment"
                        >
                          <Trash2 className="w-4 h-4 stroke-[2]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Assigned Subject Modal */}
      {editingCls && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setEditingCls(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Edit Assigned Subject</h3>
                <p className="text-xs text-slate-500">
                  {editingCls.className || editingCls.label || "Class"} {editingCls.section ? `(${editingCls.section})` : ""}
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Subject <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6]"
                >
                  {COMMON_SUBJECTS.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                  <option value="__custom__">+ Other / Custom Subject</option>
                </select>

                {selectedSubject === "__custom__" && (
                  <input
                    type="text"
                    placeholder="Enter subject name..."
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="mt-2 w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0080f6]"
                    required
                  />
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingCls(null)}
                  disabled={isSaving}
                  className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/25 cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeacherDetailCard;
