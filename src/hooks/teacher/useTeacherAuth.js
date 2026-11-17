import { useMutation } from "../useMutation";
import { authService } from "@/service/apiService";
import { getAuthUser, getAuthToken } from "@/service/apiClient";

/**
 * Mutation hook for Teacher Login
 */
export function useTeacherLogin(options = {}) {
  return useMutation(
    (credentials) => authService.teacherLogin(credentials),
    options
  );
}

/**
 * Mutation hook for Teacher Registration (Self-Registration)
 */
export function useTeacherRegister(options = {}) {
  return useMutation(
    (data) => authService.registerTeacher(data),
    options
  );
}

/**
 * Mutation hook for Teacher Email Verification (OTP)
 */
export function useTeacherVerifyEmail(options = {}) {
  return useMutation(
    (data) => authService.verifyTeacherEmail(data),
    options
  );
}

/**
 * Mutation hook for Resending OTP Code
 */
export function useTeacherResendOtp(options = {}) {
  return useMutation(
    (data) => authService.resendOtp(data),
    options
  );
}

/**
 * Mutation hook for Forgot Password (Email OTP request)
 */
export function useTeacherForgotPassword(options = {}) {
  return useMutation(
    (data) => authService.forgotPassword(data),
    options
  );
}

/**
 * Mutation hook for Verifying Reset Password OTP
 */
export function useTeacherVerifyResetOtp(options = {}) {
  return useMutation(
    (data) => authService.verifyResetOtp(data),
    options
  );
}

/**
 * Mutation hook for Resetting Password with Reset Token
 */
export function useTeacherResetPassword(options = {}) {
  return useMutation(
    (data) => authService.resetPassword(data),
    options
  );
}

/**
 * Mutation hook for Teacher Logout
 */
export function useTeacherLogout(options = {}) {
  return useMutation(
    () => authService.logout(),
    options
  );
}

/**
 * Combined Teacher Auth Hook
 */
export function useTeacherAuth() {
  const loginMutation = useTeacherLogin();
  const registerMutation = useTeacherRegister();
  const verifyEmailMutation = useTeacherVerifyEmail();
  const resendOtpMutation = useTeacherResendOtp();
  const forgotPasswordMutation = useTeacherForgotPassword();
  const verifyResetOtpMutation = useTeacherVerifyResetOtp();
  const resetPasswordMutation = useTeacherResetPassword();
  const logoutMutation = useTeacherLogout();

  const currentUser = getAuthUser();
  const token = getAuthToken();
  const isAuthenticated = Boolean(token && currentUser?.role === "teacher");

  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    verifyEmail: verifyEmailMutation.mutate,
    verifyEmailAsync: verifyEmailMutation.mutateAsync,
    isVerifyingEmail: verifyEmailMutation.isPending,

    resendOtp: resendOtpMutation.mutate,
    resendOtpAsync: resendOtpMutation.mutateAsync,
    isResendingOtp: resendOtpMutation.isPending,

    forgotPassword: forgotPasswordMutation.mutate,
    forgotPasswordAsync: forgotPasswordMutation.mutateAsync,
    isSendingResetCode: forgotPasswordMutation.isPending,

    verifyResetOtp: verifyResetOtpMutation.mutate,
    verifyResetOtpAsync: verifyResetOtpMutation.mutateAsync,
    isVerifyingResetOtp: verifyResetOtpMutation.isPending,

    resetPassword: resetPasswordMutation.mutate,
    resetPasswordAsync: resetPasswordMutation.mutateAsync,
    isResettingPassword: resetPasswordMutation.isPending,

    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,

    user: currentUser,
    token,
    isAuthenticated,
  };
}

export default useTeacherAuth;
