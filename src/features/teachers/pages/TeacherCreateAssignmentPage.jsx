import { useState, useMemo, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useTeacherClasses, useTeacherCreateAssignment } from "@/hooks";
import {
  TeacherCreateAssignmentForm,
  TeacherCreateAssignmentSidebar,
} from "../components/assignments";

const parseDueAt = (dateStr, timeStr) => {
  if (!dateStr) return null;
  let d = new Date(`${dateStr} ${timeStr || "23:59"}`);
  if (!isNaN(d.getTime())) return d.toISOString();
  d = new Date(`${dateStr}T${timeStr || "23:59"}:00`);
  if (!isNaN(d.getTime())) return d.toISOString();
  d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d.toISOString();
  return null;
};

export const TeacherCreateAssignmentPage = () => {
  const navigate = useNavigate();
  const { classes = [], isLoading: isLoadingClasses } = useTeacherClasses();
  const { createAssignment, isSubmitting } = useTeacherCreateAssignment();

  // Default due date = 7 days from today
  const defaultDueDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    dueDate: defaultDueDate,
    dueTime: "23:59",
    totalMarks: "100",
  });

  const [materials, setMaterials] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [notifyStudents, setNotifyStudents] = useState(true);

  // Auto-select first class when classes load
  useEffect(() => {
    if (classes.length > 0 && selectedClasses.length === 0) {
      setSelectedClasses([classes[0].id]);
    }
  }, [classes, selectedClasses.length]);

  // Compute available subjects for selected classes
  const availableSubjects = useMemo(() => {
    const subSet = new Set();
    classes
      .filter((c) => selectedClasses.includes(c.id))
      .forEach((c) => {
        if (Array.isArray(c.subjects)) {
          c.subjects.forEach((s) => {
            const name = typeof s === "string" ? s : s?.name;
            if (name) subSet.add(name);
          });
        }
      });
    return Array.from(subSet);
  }, [classes, selectedClasses]);

  // Auto-select subject when availableSubjects changes
  useEffect(() => {
    if (availableSubjects.length > 0 && (!formData.subject || !availableSubjects.includes(formData.subject))) {
      setFormData((prev) => ({ ...prev, subject: availableSubjects[0] }));
    }
  }, [availableSubjects, formData.subject]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddFiles = (newFiles) => {
    setMaterials((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveMaterial = (index) => {
    setMaterials((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleClass = (classId) => {
    setSelectedClasses((prev) =>
      prev.includes(classId)
        ? prev.filter((id) => id !== classId)
        : [...prev, classId]
    );
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please enter assignment title.");
      return;
    }
    if (!formData.subject) {
      toast.error("Please select a subject.");
      return;
    }
    if (selectedClasses.length === 0) {
      toast.error("Please select at least one class to assign.");
      return;
    }
    if (!formData.dueDate || !formData.dueTime) {
      toast.error("Please specify due date and time.");
      return;
    }

    try {
      const dueAt = parseDueAt(formData.dueDate, formData.dueTime);
      if (!dueAt) {
        toast.error("Please enter a valid due date and time.");
        return;
      }

      const postData = new FormData();
      postData.append("title", formData.title.trim());
      postData.append("subject", formData.subject.trim());
      postData.append("description", formData.description.trim());
      postData.append("dueAt", dueAt);
      postData.append("totalMarks", String(Number(formData.totalMarks) || 100));
      postData.append("notifyStudents", String(notifyStudents));

      // Append class IDs
      selectedClasses.forEach((cid) => {
        postData.append("classIds", cid);
      });

      // Append material files
      materials.forEach((file) => {
        postData.append("attachments", file);
      });

      await createAssignment(postData);
      navigate("/teacher/assignments");
    } catch {
      // Error handled in hook toast
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-14">
      {/* Page Header matching SS 2 */}
      <div className="flex items-center gap-3">
        <Link
          to="/teacher/assignments"
          className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-2xs hover:shadow-xs flex items-center justify-center text-slate-600 hover:text-[#0080f6] transition-all cursor-pointer shrink-0"
          title="Back to Assignments"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Create Assignment
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Create and send a new assignment to selected students or classes.
          </p>
        </div>
      </div>

      {/* Main Form 2-Column Layout */}
      <form onSubmit={handleCreateAssignment} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-8">
            <TeacherCreateAssignmentForm
              formData={formData}
              onChange={handleFieldChange}
              availableSubjects={availableSubjects}
              materials={materials}
              onAddFiles={handleAddFiles}
              onRemoveMaterial={handleRemoveMaterial}
            />
          </div>

          {/* Right Column: Assign To & Settings */}
          <div className="lg:col-span-4">
            <TeacherCreateAssignmentSidebar
              classes={classes}
              selectedClasses={selectedClasses}
              onToggleClass={handleToggleClass}
              notifyStudents={notifyStudents}
              onToggleNotify={() => setNotifyStudents((v) => !v)}
              isLoading={isLoadingClasses}
            />
          </div>
        </div>

        {/* Action Buttons matching SS 2 */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Link
            to="/teacher/assignments"
            className="px-6 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-2xl bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-95"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isSubmitting ? "Creating..." : "Create Assignment"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherCreateAssignmentPage;
