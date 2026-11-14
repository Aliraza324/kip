import { GraduationCap, Users, ClipboardList, CheckCircle2 } from "lucide-react";

export const AdminClassDetailStats = ({
  grade = "Grade 9",
  status = "Active",
  totalStudents = 32,
  assignedTeachers = 4,
  pendingAssignments = 6,
  completedAssignments = 24,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 xl:gap-3.5 items-stretch">
      {/* 1. Class Info Card */}
      <div className="bg-white rounded-2xl h-[68px] sm:h-[72px] px-3 sm:px-3.5 flex items-center gap-3 border border-slate-100 shadow-2xs">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#edf6fe] text-[#0080f6] flex items-center justify-center shrink-0">
          <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
        </div>
        <div className="flex flex-col items-start justify-center min-w-0">
          <h4 className="text-sm sm:text-base font-bold text-[#0c1a40] tracking-tight leading-tight whitespace-nowrap">
            {grade}
          </h4>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#e8faee] text-[#16a34a] text-[10px] sm:text-[11px] font-semibold mt-0.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
            <span>{status}</span>
          </span>
        </div>
      </div>

      {/* 2. Total Students Card */}
      <div className="bg-[#edf6fe] rounded-2xl h-[68px] sm:h-[72px] px-3 sm:px-3.5 flex items-center justify-between gap-3 border border-blue-100/40 shadow-2xs transition-transform hover:-translate-y-0.5">
        <Users className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-[#0080f6] stroke-[1.8] shrink-0 ml-0.5" />
        <div className="flex flex-col items-end text-right min-w-0">
          <p className="text-[10px] sm:text-[10.5px] xl:text-[11px] font-semibold text-[#0c1a40] tracking-tight whitespace-nowrap">
            Total Students
          </p>
          <p className="text-xl sm:text-2xl font-bold text-[#0c1a40] leading-none mt-1">
            {totalStudents}
          </p>
        </div>
      </div>

      {/* 3. Assigned Teachers Card */}
      <div className="bg-[#f4eeff] rounded-2xl h-[68px] sm:h-[72px] px-3 sm:px-3.5 flex items-center justify-between gap-3 border border-purple-100/40 shadow-2xs transition-transform hover:-translate-y-0.5">
        <Users className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-[#9333ea] stroke-[1.8] shrink-0 ml-0.5" />
        <div className="flex flex-col items-end text-right min-w-0">
          <p className="text-[10px] sm:text-[10.5px] xl:text-[11px] font-semibold text-[#0c1a40] tracking-tight whitespace-nowrap">
            Assigned Teachers
          </p>
          <p className="text-xl sm:text-2xl font-bold text-[#0c1a40] leading-none mt-1">
            {assignedTeachers}
          </p>
        </div>
      </div>

      {/* 4. Pending Assignments Card */}
      <div className="bg-[#fff1eb] rounded-2xl h-[68px] sm:h-[72px] px-3 sm:px-3.5 flex items-center justify-between gap-3 border border-orange-100/40 shadow-2xs transition-transform hover:-translate-y-0.5">
        <ClipboardList className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-[#ea580c] stroke-[1.8] shrink-0 ml-0.5" />
        <div className="flex flex-col items-end text-right min-w-0">
          <p className="text-[10px] sm:text-[10.5px] xl:text-[11px] font-semibold text-[#0c1a40] tracking-tight whitespace-nowrap">
            Pending Assignments
          </p>
          <p className="text-xl sm:text-2xl font-bold text-[#ea580c] leading-none mt-1">
            {pendingAssignments}
          </p>
        </div>
      </div>

      {/* 5. Completed Assignments Card */}
      <div className="bg-[#eefaf1] rounded-2xl h-[68px] sm:h-[72px] px-3 sm:px-3.5 flex items-center justify-between gap-3 border border-emerald-100/40 shadow-2xs transition-transform hover:-translate-y-0.5">
        <CheckCircle2 className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-[#16a34a] stroke-[1.8] shrink-0 ml-0.5" />
        <div className="flex flex-col items-end text-right min-w-0">
          <p className="text-[10px] sm:text-[10.5px] xl:text-[11px] font-semibold text-[#0c1a40] tracking-tight whitespace-nowrap">
            Completed Assignments
          </p>
          <p className="text-xl sm:text-2xl font-bold text-[#16a34a] leading-none mt-1">
            {completedAssignments}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminClassDetailStats;
