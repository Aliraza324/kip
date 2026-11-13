import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Lazy-loaded route chunks adhering to design.md code-splitting rules
const PublicLayout = lazy(() => import("@/layouts/PublicLayout"));
const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));
const AboutPage = lazy(() => import("@/features/landing/pages/AboutPage"));
const FeaturesPage = lazy(() => import("@/features/landing/pages/FeaturesPage"));
const HowItWorksPage = lazy(() => import("@/features/landing/pages/HowItWorksPage"));
const ContactPage = lazy(() => import("@/features/landing/pages/ContactPage"));

// Auth Routes
const StudentLoginPage = lazy(() => import("@/features/auth/pages/StudentLoginPage"));
const TeacherAuthPage = lazy(() => import("@/features/auth/pages/TeacherAuthPage"));

// Teacher Portal Routes
const TeacherLayout = lazy(() => import("@/layouts/TeacherLayout"));
const TeacherDashboardPage = lazy(() => import("@/features/teachers/pages/TeacherDashboardPage"));
const TeacherSessionsPage = lazy(() => import("@/features/teachers/pages/TeacherSessionsPage"));
const TeacherSessionDetailPage = lazy(() => import("@/features/teachers/pages/TeacherSessionDetailPage"));
const TeacherClassesPage = lazy(() => import("@/features/teachers/pages/TeacherClassesPage"));
const TeacherClassDetailPage = lazy(() => import("@/features/teachers/pages/TeacherClassDetailPage"));
const TeacherAssignmentsPage = lazy(() => import("@/features/teachers/pages/TeacherAssignmentsPage"));
const TeacherCreateAssignmentPage = lazy(() => import("@/features/teachers/pages/TeacherCreateAssignmentPage"));
const TeacherAssignmentSubmissionsPage = lazy(() => import("@/features/teachers/pages/TeacherAssignmentSubmissionsPage"));
const TeacherGradeSubmissionPage = lazy(() => import("@/features/teachers/pages/TeacherGradeSubmissionPage"));
const TeacherStudentsPage = lazy(() => import("@/features/teachers/pages/TeacherStudentsPage"));
const TeacherClassStudentsListPage = lazy(() => import("@/features/teachers/pages/TeacherClassStudentsListPage"));
const TeacherStudentDetailPage = lazy(() => import("@/features/teachers/pages/TeacherStudentDetailPage"));

// Student Portal Routes
const StudentLayout = lazy(() => import("@/layouts/StudentLayout"));
const StudentDashboardPage = lazy(() => import("@/features/students/pages/StudentDashboardPage"));
const StudentClassesPage = lazy(() => import("@/features/students/pages/StudentClassesPage"));
const StudentAssignmentsPage = lazy(() => import("@/features/students/pages/StudentAssignmentsPage"));
const StudentMaterialsPage = lazy(() => import("@/features/students/pages/StudentMaterialsPage"));
const StudentProgressPage = lazy(() => import("@/features/students/pages/StudentProgressPage"));
const StudentProfilePage = lazy(() => import("@/features/students/pages/StudentProfilePage"));
const StudentNotificationsPage = lazy(() => import("@/features/students/pages/StudentNotificationsPage"));

// Clean fallback loader complying with Core Web Vitals (prevents layout shift)
const PageFallbackLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#007be3]" />
      <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
        Loading KIPClassin...
      </span>
    </div>
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallbackLoader />}>
        <Routes>
          {/* Public Landing Pages with Shared Navbar & Footer Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Authentication Routes */}
          <Route path="/auth/login" element={<StudentLoginPage />} />
          <Route path="/auth/student-login" element={<StudentLoginPage />} />
          <Route path="/login" element={<StudentLoginPage />} />

          {/* Teacher Authentication Routes */}
          <Route path="/auth/teacher-login" element={<TeacherAuthPage mode="login" />} />
          <Route path="/auth/teacher-register" element={<TeacherAuthPage mode="register" />} />
          <Route path="/auth/teacher-verify" element={<TeacherAuthPage mode="verify" />} />
          <Route path="/auth/teacher-success" element={<TeacherAuthPage mode="success" />} />
          <Route path="/auth/teacher-forgot-password" element={<TeacherAuthPage mode="forgot" />} />

          {/* Teacher Portal Protected Workspace */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<TeacherDashboardPage />} />
            <Route path="dashboard" element={<TeacherDashboardPage />} />
            <Route path="sessions" element={<TeacherSessionsPage />} />
            <Route path="sessions/:sessionId" element={<TeacherSessionDetailPage />} />
            <Route path="classes" element={<TeacherClassesPage />} />
            <Route path="classes/:classId" element={<TeacherClassDetailPage />} />
            <Route path="assignments" element={<TeacherAssignmentsPage />} />
            <Route path="assignments/create" element={<TeacherCreateAssignmentPage />} />
            <Route path="assignments/:assignmentId/submissions" element={<TeacherAssignmentSubmissionsPage />} />
            <Route path="assignments/:assignmentId/submissions/:submissionId/grade" element={<TeacherGradeSubmissionPage />} />
            <Route path="students" element={<TeacherStudentsPage />} />
            <Route path="students/class/:classId" element={<TeacherClassStudentsListPage />} />
            <Route path="students/class/:classId/:studentId" element={<TeacherStudentDetailPage />} />
            <Route path="students/detail/:studentId" element={<TeacherStudentDetailPage />} />
            <Route path="*" element={<Navigate to="/teacher" replace />} />
          </Route>

          {/* Student Portal Protected Workspace */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboardPage />} />
            <Route path="classes" element={<StudentClassesPage />} />
            <Route path="assignments" element={<StudentAssignmentsPage />} />
            <Route path="materials" element={<StudentMaterialsPage />} />
            <Route path="progress" element={<StudentProgressPage />} />
            <Route path="profile" element={<StudentProfilePage />} />
            <Route path="notifications" element={<StudentNotificationsPage />} />
            <Route path="*" element={<Navigate to="/student" replace />} />
          </Route>

          {/* Fallback Catch-All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
