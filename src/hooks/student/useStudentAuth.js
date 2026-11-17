import { useMutation } from "../useMutation";
import { authService } from "@/service/apiService";
import { getAuthUser, getAuthToken } from "@/service/apiClient";

/**
 * Mutation hook for Student Login
 * @param {Object} options - { onSuccess, onError }
 */
export function useStudentLogin(options = {}) {
  return useMutation(
    (credentials) => authService.studentLogin(credentials),
    options
  );
}

/**
 * Mutation hook for Student Logout
 * @param {Object} options - { onSuccess, onError }
 */
export function useStudentLogout(options = {}) {
  return useMutation(
    () => authService.logout(),
    options
  );
}

/**
 * Combined Student Auth Hook
 */
export function useStudentAuth() {
  const loginMutation = useStudentLogin();
  const logoutMutation = useStudentLogout();
  const currentUser = getAuthUser();
  const token = getAuthToken();
  const isAuthenticated = Boolean(token && currentUser?.role === "student");

  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    loginData: loginMutation.data,

    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,

    user: currentUser,
    token,
    isAuthenticated,
  };
}

export default useStudentAuth;
