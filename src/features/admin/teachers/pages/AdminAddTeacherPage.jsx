import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { teacherService } from "@/service/apiService";
import { AdminAddTeacherForm, AdminTeacherSuccessModal } from "../components";

export const AdminAddTeacherPage = () => {
  const [createdTeacher, setCreatedTeacher] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSuccess = async (teacherData) => {
    setIsSubmitting(true);
    try {
      const saved = await teacherService.create(teacherData);
      setCreatedTeacher(saved || teacherData);
      setShowSuccessModal(true);
      toast.success("Teacher created successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to create teacher");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setShowSuccessModal(false);
    setCreatedTeacher(null);
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/admin/teachers"
          className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 text-[#0080f6] flex items-center justify-center hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Add New Teacher
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Create a teacher account, add their details, assign classes, and subjects.
          </p>
        </div>
      </div>

      {/* Form */}
      <AdminAddTeacherForm onSuccess={handleSuccess} isSubmitting={isSubmitting} />

      {/* Success Modal */}
      <AdminTeacherSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        teacherData={createdTeacher}
        onResetForm={handleReset}
      />
    </div>
  );
};

export default AdminAddTeacherPage;
