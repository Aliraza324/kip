import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { studentService } from "@/service/apiService";
import { AdminAddStudentForm, AdminStudentSuccessModal } from "../components";

export const AdminAddStudentPage = () => {
  const [createdStudent, setCreatedStudent] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSuccess = async (formDataPayload, formRawData) => {
    setIsSubmitting(true);
    try {
      const res = await studentService.create(formDataPayload);
      const student = res?.data?.student || res?.student || res?.data || res;
      const credentials = res?.data?.credentials || res?.credentials || {
        username: formRawData?.username || student?.username,
        password: formRawData?.password || "—",
      };

      setCreatedStudent({
        ...student,
        credentials,
        emailSent: Boolean(formRawData?.email),
        targetEmail: formRawData?.email,
      });
      setShowSuccessModal(true);
      toast.success(`Student "${student.fullName || formRawData?.fullName}" created successfully!`);
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to create student");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setShowSuccessModal(false);
    setCreatedStudent(null);
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/admin/students"
          className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 text-[#0080f6] flex items-center justify-center hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Add New Student
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Create a student account, upload photo, and assign class and section.
          </p>
        </div>
      </div>

      {/* Form */}
      <AdminAddStudentForm onSuccess={handleSuccess} isSubmitting={isSubmitting} />

      {/* Success Modal */}
      <AdminStudentSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        studentData={createdStudent}
        onResetForm={handleReset}
      />
    </div>
  );
};

export default AdminAddStudentPage;
