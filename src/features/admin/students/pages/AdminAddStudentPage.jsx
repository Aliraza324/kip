import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AdminAddStudentForm, AdminStudentSuccessModal } from "../components";

export const AdminAddStudentPage = () => {
  const [createdStudent, setCreatedStudent] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSuccess = (studentData) => {
    setCreatedStudent(studentData);
    setShowSuccessModal(true);
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
            Create a student account and add their personal details.
          </p>
        </div>
      </div>

      {/* Form */}
      <AdminAddStudentForm onSuccess={handleSuccess} />

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
