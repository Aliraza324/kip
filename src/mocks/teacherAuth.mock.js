/**
 * Teacher Authentication Mock Data & Presets
 * Faithfully matches user provided screenshots:
 * 1. Teacher Login
 * 2. Register as Independent Teacher
 * 3. Verify Email / OTP Code
 * 4. Account Created Successfully
 * 5. Forgot Password & OTP Reset
 */

export const teacherAuthMock = {
  login: {
    title: "Teacher Login",
    subtitle: "Access your classes, students, and teaching tools.",
    usernamePlaceholder: "Enter your username",
    passwordPlaceholder: "Enter your password",
    forgotPasswordText: "Forgot Password?",
    loginButtonText: "Log In",
    orText: "or",
    registerButtonText: "Register as Independent Teacher",
    institutionNotice:
      "Already have an account? Log in with the credentials provided by your institution.",
  },
  register: {
    title: "Register as Independent Teacher",
    subtitle: "Create your teacher account and start teaching on KIPClassin.",
    fullNamePlaceholder: "Full Name",
    phonePlaceholder: "Phone Number",
    emailPlaceholder: "Email Address",
    createPasswordPlaceholder: "Create Password",
    confirmPasswordPlaceholder: "Confirm Password",
    termsText: "I agree to the Terms of Service and Privacy Policy.",
    createAccountButtonText: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    loginLink: "Log In",
  },
  verify: {
    title: "Verify Your Email",
    subtitlePrefix: "We've sent a 6-digit verification code to",
    subtitleSuffix: "Enter the code below to verify your account.",
    defaultEmail: "teacher@domain.com",
    verifyButtonText: "Verify Account",
    resendPrefix: "Didn't receive the code?",
    resendLink: "Resend Code",
    defaultOtp: "583926",
  },
  success: {
    title: "Account Created Successfully!",
    subtitle:
      "Your teacher account has been verified and is now ready to use.",
    dashboardButtonText: "Go to Dashboard",
  },
  forgot: {
    title: "Forgot Password?",
    subtitle:
      "Enter your registered email address to receive a 6-digit reset code.",
    sendCodeButtonText: "Send Verification Code",
    verifyTitle: "Verify Reset Code",
    verifySubtitle: "Enter the 6-digit reset code sent to your email.",
    verifyButtonText: "Verify Code",
    resetTitle: "Set New Password",
    resetSubtitle: "Create a new strong password for your teacher account.",
    resetButtonText: "Update Password",
    backToLogin: "Back to Log In",
  },
  demoAccounts: {
    approved: {
      username: "teacher@kipclassin.com",
      password: "password123",
      status: "approved",
      name: "Prof. Sarah Jenkins",
    },
    pending: {
      username: "teacher@domain.com",
      password: "password123",
      status: "pending",
      name: "Independent Teacher",
    },
  },
};

export default teacherAuthMock;

