import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, ChevronDown, X, Check, Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { teacherService, classService } from "@/service/apiService";

const COMMON_SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
  "History",
  "Urdu",
  "Islamiat",
  "Economics",
  "Accounting",
];

export const AdminAssignClassForm = ({ teacher }) => {
  const navigate = useNavigate();
  const [classesList, setClassesList] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [customSubject, setCustomSubject] = useState("");
  const [showSubjectMenu, setShowSubjectMenu] = useState(false);
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const teacherName = teacher?.fullName || teacher?.name || "Teacher";
  const teacherCode = teacher?.code || teacher?.teacherId || "—";
  const teacherId = teacher?.id || teacher?._id;
  const avatarUrl =
    typeof teacher?.avatar === "string"
      ? teacher.avatar
      : teacher?.avatar?.url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(teacherName)}&background=eaf4fe&color=0080f6`;

  useEffect(() => {
    // Initialize subjects from teacher's existing subjects or default
    if (teacher?.subjects && Array.isArray(teacher.subjects) && teacher.subjects.length > 0) {
      setSubjects([...teacher.subjects]);
    } else {
      setSubjects(["Mathematics"]);
    }
  }, [teacher]);

  useEffect(() => {
    const loadClasses = async () => {
      setIsLoadingClasses(true);
      try {
        const list = await classService.getAll({ limit: 100 });
        const items = Array.isArray(list) ? list : list?.items || list?.data || [];
        setClassesList(items);
        if (items.length > 0) {
          setSelectedClassId(items[0].id || items[0]._id);
        }
      } catch (err) {
        console.error("Failed to load classes:", err);
      } finally {
        setIsLoadingClasses(false);
      }
    };
    loadClasses();
  }, []);

  const removeSubject = (s) => setSubjects((prev) => prev.filter((item) => item !== s));

  const addSubject = (sub) => {
    const trimmed = sub.trim();
    if (!trimmed) return;
    if (!subjects.includes(trimmed)) {
      setSubjects((prev) => [...prev, trimmed]);
    }
    setCustomSubject("");
    setShowSubjectMenu(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClassId) {
      toast.error("Please select a class.");
      return;
    }
    if (subjects.length === 0) {
      toast.error("Please select or add at least one subject.");
      return;
    }

    setIsSubmitting(true);
    try {
      await teacherService.assignClass(teacherId, {
        classId: selectedClassId,
        subjects: subjects,
      });
      toast.success(`New class assigned to ${teacherName}!`);
      navigate(`/admin/teachers/${teacherId}`);
    } catch (err) {
      console.error("Assign class error:", err);
      toast.error(err.message || "Failed to assign class.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Strip */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl}
            alt={teacherName}
            className="w-14 h-14 rounded-full object-cover border-2 border-slate-200 shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">{teacherName}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0080f6] text-xs font-bold">
                {teacherCode}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {teacher?.email || "No email"}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {teacher?.phone || "No phone"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-5">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Select Class *</label>
          <div className="relative">
            {isLoadingClasses ? (
              <div className="w-full px-4 py-2.5 rounded-full border border-slate-200 bg-slate-50 text-xs text-slate-400 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#0080f6]" />
                <span>Loading classes...</span>
              </div>
            ) : (
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 appearance-none bg-white focus:border-[#0080f6] outline-none cursor-pointer"
              >
                {classesList.length === 0 ? (
                  <option value="">No classes available</option>
                ) : (
                  classesList.map((cls) => (
                    <option key={cls.id || cls._id} value={cls.id || cls._id}>
                      {cls.label || `${cls.name} ${cls.section ? `– ${cls.section}` : ""}`}
                    </option>
                  ))
                )}
              </select>
            )}
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Subjects Selection (Array type with custom typing & chips) */}
        <div className="relative">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700">Select Subject(s) *</label>
            <button
              type="button"
              onClick={() => setShowSubjectMenu(!showSubjectMenu)}
              className="text-[11px] font-bold text-[#0080f6] hover:underline cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Subject
            </button>
          </div>

          <div className="w-full min-h-[44px] px-3 py-1.5 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-1.5 bg-white">
            {subjects.map((sub) => (
              <span
                key={sub}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-[#0080f6] font-semibold text-xs"
              >
                <span>{sub}</span>
                <button
                  type="button"
                  onClick={() => removeSubject(sub)}
                  className="hover:text-blue-800 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
            {subjects.length === 0 && (
              <span className="text-xs text-slate-400">Please add at least one subject</span>
            )}
          </div>

          {/* Dropdown for selecting or typing custom subject */}
          {showSubjectMenu && (
            <div className="absolute left-0 right-0 top-full mt-1.5 z-20 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 space-y-2 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSubject(customSubject);
                    }
                  }}
                  placeholder="Type custom subject & press Enter..."
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0080f6]"
                />
                <button
                  type="button"
                  onClick={() => addSubject(customSubject)}
                  className="px-3 py-1.5 rounded-xl bg-[#0080f6] text-white text-xs font-bold cursor-pointer hover:bg-blue-600 transition-colors"
                >
                  Add
                </button>
              </div>

              <div className="max-h-36 overflow-y-auto space-y-1 pt-1">
                {COMMON_SUBJECTS.filter((s) => !subjects.includes(s)).map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => addSubject(sub)}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-[#0080f6] transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{sub}</span>
                    <Plus className="w-3.5 h-3.5 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <Link
          to={`/admin/teachers/${teacherId}`}
          className="px-6 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting || isLoadingClasses}
          className="px-7 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/25 cursor-pointer transition-colors flex items-center gap-1.5"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Assigning...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Assign Class</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AdminAssignClassForm;