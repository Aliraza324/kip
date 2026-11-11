import { motion } from "framer-motion";
import { studentDashboardMock } from "@/mocks";
import { staggerContainer, fadeInUp } from "@/animations";
import {
  StudentKpiStats,
  StudentUpcomingClassCard,
  StudentMyClassesCard,
  StudentRecentAssignmentsCard,
  StudentLearningMaterialsCard,
} from "../components";

export const StudentDashboardPage = () => {
  const {
    greeting,
    subtitle,
    stats,
    upcomingClass,
    myClasses,
    recentAssignments,
    learningMaterials,
  } = studentDashboardMock;

  return (
    <motion.div
      variants={staggerContainer(0.06, 0.04)}
      initial="hidden"
      animate="visible"
      className="space-y-5 sm:space-y-6 max-w-7xl mx-auto"
    >
      {/* Welcome Banner */}
      <motion.div variants={fadeInUp} className="pt-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
          {greeting}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 font-normal">
          {subtitle}
        </p>
      </motion.div>

      {/* Top 4 KPI Metric Cards */}
      <StudentKpiStats stats={stats} />

      {/* 2-Column Dashboard Grid Matching Reference Design */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-start">
        {/* Left Column: Upcoming Class & Recent Assignments */}
        <div className="space-y-5 sm:space-y-6">
          <StudentUpcomingClassCard upcomingClass={upcomingClass} />
          <StudentRecentAssignmentsCard recentAssignments={recentAssignments} />
        </div>

        {/* Right Column: My Classes & Learning Materials */}
        <div className="space-y-5 sm:space-y-6">
          <StudentMyClassesCard myClasses={myClasses} />
          <StudentLearningMaterialsCard learningMaterials={learningMaterials} />
        </div>
      </div>
    </motion.div>
  );
};

export default StudentDashboardPage;
