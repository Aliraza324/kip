import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  TeacherAuthLayout,
  TeacherLoginForm,
  TeacherRegisterForm,
  TeacherEmailVerifyView,
  TeacherSuccessView,
  TeacherForgotPasswordView,
} from "../components/teacher";

export const TeacherAuthPage = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Resolve screen mode from explicit prop, path, or query
  const resolveScreen = () => {
    if (mode) return mode;
    const path = location.pathname.toLowerCase();
    if (path.includes("register")) return "register";
    if (path.includes("verify")) return "verify";
    if (path.includes("success")) return "success";
    if (path.includes("forgot")) return "forgot";
    if (searchParams.get("mode") === "register") return "register";
    return "login";
  };

  const currentScreen = resolveScreen();
  const email = location.state?.email || "teacher@domain.com";
  const prefilledUsername = location.state?.prefilledUsername || "";
  const initialStatus = location.state?.status || "approved";

  const handleRegisterSuccess = (data) => {
    navigate("/auth/teacher-verify", {
      state: { email: data.email, registeredData: data },
    });
  };

  const handleVerifySuccess = () => {
    navigate("/auth/teacher-success", {
      state: { email },
    });
  };

  const handleGoToDashboard = () => {
    // Per Requirement 6: Redirect to login with pre-filled email and pending review status
    navigate("/auth/teacher-login", {
      state: { prefilledUsername: email, status: "pending" },
    });
  };

  const handleLoginSuccess = () => {
    navigate("/teacher");
  };

  return (
    <TeacherAuthLayout>
      {currentScreen === "login" && (
        <TeacherLoginForm
          onNavigateRegister={() => navigate("/auth/teacher-register")}
          onNavigateForgot={() => navigate("/auth/teacher-forgot-password")}
          onLoginSuccess={handleLoginSuccess}
          prefilledUsername={prefilledUsername}
          initialStatus={initialStatus}
        />
      )}

      {currentScreen === "register" && (
        <TeacherRegisterForm
          onNavigateLogin={() => navigate("/auth/teacher-login")}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {currentScreen === "verify" && (
        <TeacherEmailVerifyView
          email={email}
          onVerifySuccess={handleVerifySuccess}
          onBack={() => navigate("/auth/teacher-register")}
        />
      )}

      {currentScreen === "success" && (
        <TeacherSuccessView onGoToDashboard={handleGoToDashboard} />
      )}

      {currentScreen === "forgot" && (
        <TeacherForgotPasswordView
          onBackToLogin={() => navigate("/auth/teacher-login")}
        />
      )}
    </TeacherAuthLayout>
  );
};

export default TeacherAuthPage;
