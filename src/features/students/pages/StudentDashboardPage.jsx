import {
  GraduationCap,
  FileText,
  TrendingUp,
  Award,
  Video,
  ArrowRight,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  studentDashboardMock,
  studentCoursesMock,
  studentAssignmentsMock,
} from "@/mocks";
import { fadeInUp, staggerContainer } from "@/animations";

const statIconMap = {
  GraduationCap,
  FileText,
  TrendingUp,
  Award,
};

export const StudentDashboardPage = () => {
  const { greeting, subtitle, stats, upcomingClass } = studentDashboardMock;

  return (
    <motion.div
      variants={staggerContainer(0.08, 0.05)}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8 max-w-7xl mx-auto"
    >
      {/* Welcome Banner */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#01287b] tracking-tight">
            {greeting}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">{subtitle}</p>
        </div>
      </motion.div>

      {/* Top 4 Stat Widgets */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5"
      >
        {stats.map((item) => {
          const Icon = statIconMap[item.icon] || Award;
          return (
            <div
              key={item.id}
              className="rounded-2xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-2xs hover:shadow-sm transition-all"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: item.bg, color: item.color }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-500">{item.label}</p>
              <p className="text-xl sm:text-2xl font-black text-slate-800 mt-1">{item.value}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Upcoming Live Class Spotlight Banner */}
      <motion.div
        variants={fadeInUp}
        className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#01287b] via-[#0060d0] to-[#007be3] p-5 sm:p-7 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Live Class
            </div>
            <h2 className="text-lg sm:text-xl font-bold">{upcomingClass.subject}</h2>
            <div className="flex items-center gap-3 mt-1 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {upcomingClass.time}
              </span>
              <span>•</span>
              <span>{upcomingClass.instructor}</span>
            </div>
          </div>
        </div>

        <button className="rounded-full bg-white text-[#007be3] hover:bg-white/90 font-bold px-6 py-3 text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95 shrink-0">
          <span>{upcomingClass.actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Grid: Ongoing Courses & Pending Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left: Ongoing Classes */}
        <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-800">My Classes</h2>
            <span className="text-xs font-semibold text-[#007be3] hover:underline cursor-pointer">
              View All
            </span>
          </div>

          <div className="space-y-3.5">
            {studentCoursesMock.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-2xs hover:border-blue-200 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#007be3] uppercase tracking-wider">
                      {course.code}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{course.instructor}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-[#007be3]">
                    {course.grade}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#007be3]"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Upcoming Assignments */}
        <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-800">Assignments</h2>
            <span className="text-xs font-semibold text-[#007be3] hover:underline cursor-pointer">
              View All
            </span>
          </div>

          <div className="space-y-3.5">
            {studentAssignmentsMock.map((asg) => (
              <div
                key={asg.id}
                className="rounded-2xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#007be3]">{asg.course}</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase ${
                      asg.status === "submitted"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {asg.status}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-2">
                  {asg.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                  <span>Points: {asg.points}</span>
                  <span>Due: {new Date(asg.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudentDashboardPage;

