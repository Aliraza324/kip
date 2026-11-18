import { useState, useEffect } from "react";
import { X, AlertTriangle, Users, Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import { adminLowProgressService } from "@/service/apiService";
import { playNotificationSound } from "@/utils/notificationSound";
import toast from "react-hot-toast";

const DEFAULT_SUBJECT = "Academic Guidance & Learning Support";
const DEFAULT_MESSAGE =
  "We noticed that your overall academic progress is currently below the recommended 70% milestone. Our educators and academic mentors are here to assist you. Please review your recent lecture materials and assignment feedback, and reach out to your instructor for any one-on-one help you may need.";

export const AdminReachOutStudentModal = ({
  isOpen,
  onClose,
  initialStudent = null,
  onSuccess,
}) => {
  const [mode, setMode] = useState("single"); // "single" | "all" | "select"
  const [lowStudents, setLowStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (initialStudent?.studentId || initialStudent?.id) {
      const sId = initialStudent.studentId || initialStudent.id;
      setSelectedStudentIds([sId]);
      setMode("single");
    } else {
      setMode("all");
    }

    // Fetch low progress students list
    setLoadingList(true);
    adminLowProgressService
      .getLowProgress()
      .then((res) => {
        const items = res?.data?.items || res?.items || [];
        setLowStudents(items);
        if (!initialStudent?.studentId && !initialStudent?.id && items.length > 0) {
          setSelectedStudentIds(items.map((s) => s.id));
        }
      })
      .catch((err) => {
        console.warn("Could not load low progress students:", err.message);
      })
      .finally(() => {
        setLoadingList(false);
      });
  }, [isOpen, initialStudent]);

  if (!isOpen) return null;

  const handleToggleStudent = (id) => {
    setSelectedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedStudentIds(lowStudents.map((s) => s.id));
  };

  const handleDeselectAll = () => {
    setSelectedStudentIds([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter a guidance message.");
      return;
    }

    if (mode === "single" && !selectedStudentIds.length && !initialStudent) {
      toast.error("Please select a student.");
      return;
    }

    if (mode === "select" && !selectedStudentIds.length) {
      toast.error("Please select at least one student.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        targetAllLowProgress: mode === "all",
        studentIds:
          mode === "all"
            ? []
            : mode === "single"
            ? [initialStudent?.studentId || initialStudent?.id || selectedStudentIds[0]].filter(Boolean)
            : selectedStudentIds,
        subject: subject.trim(),
        message: message.trim(),
      };

      const res = await adminLowProgressService.reachOut(payload);

      playNotificationSound();
      toast.success(
        `Guidance delivered to ${res?.data?.recipientsCount ?? "student(s)"} dashboard & email!`
      );
      onSuccess?.(res?.data);
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to deliver guidance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100 bg-[#f8fbfe]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-xs">
              <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Reach Out to Low Progress Student(s)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Send academic guidance directly to student dashboard & email
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5">
          {/* Target Audience Mode */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Audience Selection
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {initialStudent && (
                <button
                  type="button"
                  onClick={() => setMode("single")}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    mode === "single"
                      ? "border-[#0080f6] bg-blue-50/70 font-bold text-blue-900 shadow-2xs"
                      : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="text-xs">Selected Student</div>
                  <div className="text-[11px] text-slate-400 font-medium truncate">
                    {initialStudent.studentName || initialStudent.fullName || "Current"}
                  </div>
                </button>
              )}

              <button
                type="button"
                onClick={() => setMode("all")}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  mode === "all"
                    ? "border-[#0080f6] bg-blue-50/70 font-bold text-blue-900 shadow-2xs"
                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="text-xs">All Students (&lt;70%)</div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {loadingList ? "Loading..." : `${lowStudents.length} Students`}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMode("select")}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  mode === "select"
                    ? "border-[#0080f6] bg-blue-50/70 font-bold text-blue-900 shadow-2xs"
                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="text-xs">Select Manually</div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {selectedStudentIds.length} Selected
                </div>
              </button>
            </div>
          </div>

          {/* Student selection preview / picker */}
          {mode === "single" && initialStudent && (
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    {initialStudent.studentName || initialStudent.fullName}
                  </span>
                  {(initialStudent.code || initialStudent.email) && (
                    <span className="text-[11px] text-slate-500">
                      ({initialStudent.code || initialStudent.email})
                    </span>
                  )}
                </div>
                <div className="text-xs text-amber-700 font-medium mt-0.5">
                  Current progress:{" "}
                  <b className="font-bold">
                    {initialStudent.progress != null ? `${initialStudent.progress}%` : "<70%"}
                  </b>{" "}
                  (Under 70% threshold)
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                Low Progress
              </span>
            </div>
          )}

          {mode === "select" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>Select Students Below 70% ({lowStudents.length} total)</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="text-[#0080f6] hover:underline cursor-pointer"
                  >
                    Select All
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={handleDeselectAll}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-2xl divide-y divide-slate-100 p-1">
                {lowStudents.map((st) => {
                  const isChecked = selectedStudentIds.includes(st.id);
                  return (
                    <div
                      key={st.id}
                      onClick={() => handleToggleStudent(st.id)}
                      className={`p-2.5 flex items-center justify-between rounded-xl cursor-pointer transition-colors ${
                        isChecked ? "bg-blue-50/70" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 text-[#0080f6] rounded border-slate-300 pointer-events-none"
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-800 block truncate">
                            {st.fullName} {st.code ? `(${st.code})` : ""}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium block truncate">
                            {st.email || "No email"}
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[11px] font-bold shrink-0">
                        {st.overallProgress}%
                      </span>
                    </div>
                  );
                })}

                {lowStudents.length === 0 && !loadingList && (
                  <div className="p-4 text-center text-xs text-slate-400 font-medium">
                    No active students found with progress below 70%.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Subject Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Subject Line *
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Academic Support & Guidance"
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              disabled={loading}
              required
            />
          </div>

          {/* Guidance Message Content */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Guidance Message *
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write guidance notes, instructions, and next steps for the student..."
              className="w-full p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 transition-all font-medium resize-none leading-relaxed"
              disabled={loading}
              required
            />
          </div>

          {/* Delivery Note */}
          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100/80 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#0080f6] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 font-medium leading-relaxed">
              This guidance will be dispatched instantly to the student's <b>Notification Center</b> and sent directly to their <b>registered email address</b>.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Delivering...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Guidance Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminReachOutStudentModal;
