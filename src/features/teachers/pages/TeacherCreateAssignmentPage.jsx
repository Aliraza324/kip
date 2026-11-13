import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { teacherAssignClassesMock } from "@/mocks";
import {
  TeacherCreateAssignmentForm,
  TeacherCreateAssignmentSidebar,
} from "../components/assignments";

export const TeacherCreateAssignmentPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "Quadratic Equations – Practice Problems",
    subject: "Algebra",
    description: "Solve the given quadratic equations and show complete steps.",
    dueDate: "Nov 12, 2026",
    dueTime: "11:59 PM",
    totalMarks: "100",
  });

  const [materials, setMaterials] = useState([
    { name: "Practice_Sheet.pdf", size: "1.2 MB" },
  ]);

  const [selectedClasses, setSelectedClasses] = useState(["cls-1"]);
  const [notifyStudents, setNotifyStudents] = useState(true);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddMaterial = () => {
    const newDocName = `Worksheet_${materials.length + 1}.pdf`;
    setMaterials((prev) => [...prev, { name: newDocName, size: "1.5 MB" }]);
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

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    navigate("/teacher/assignments");
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
              materials={materials}
              onAddMaterial={handleAddMaterial}
              onRemoveMaterial={handleRemoveMaterial}
            />
          </div>

          {/* Right Column: Assign To & Settings */}
          <div className="lg:col-span-4">
            <TeacherCreateAssignmentSidebar
              classes={teacherAssignClassesMock}
              selectedClasses={selectedClasses}
              onToggleClass={handleToggleClass}
              notifyStudents={notifyStudents}
              onToggleNotify={() => setNotifyStudents((prev) => !prev)}
            />
          </div>
        </div>

        {/* Bottom Actions Row matching SS 2 */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/teacher/assignments")}
            className="px-6 py-2.5 rounded-full border border-slate-200 hover:border-slate-300 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-800 bg-white transition-all cursor-pointer shadow-2xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-7 py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer"
          >
            Create Assignment
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherCreateAssignmentPage;

