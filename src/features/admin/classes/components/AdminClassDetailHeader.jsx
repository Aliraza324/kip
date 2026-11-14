import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const AdminClassDetailHeader = ({
  activeTab = "teachers",
  className = "Grade 9",
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case "students":
        return `Class Students - ${className}`;
      case "assignments":
        return `Class Assignments - ${className}`;
      case "teachers":
      default:
        return `Class Teachers - ${className}`;
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Back Button */}
      <Link
        to="/admin/classes"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-slate-200/80 shadow-2xs text-[#0080f6] flex items-center justify-center shrink-0 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
        aria-label="Back to Classes"
      >
        <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
      </Link>

      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
          {getTabTitle()}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          View complete class details, assigned teachers, students, and assignments.
        </p>
      </div>
    </div>
  );
};

export default AdminClassDetailHeader;

