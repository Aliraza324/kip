import { useMutation } from "../useMutation";
import { authService } from "@/service/apiService";
import { getAuthUser, getAuthToken } from "@/service/apiClient";

/**
 * Mutation hook for Admin Login
 */
export function useAdminLogin(options = {}) {
  return useMutation(
    (credentials) => authService.adminLogin(credentials),
    options
  );
}

/**
 * Mutation hook for Admin Logout
 */
export function useAdminLogout(options = {}) {
  return useMutation(
    () => authService.logout(),
    options
  );
}

/**
 * Combined Admin Auth Hook
 */
export function useAdminAuth() {
  const loginMutation = useAdminLogin();
  const logoutMutation = useAdminLogout();
  const currentUser = getAuthUser();
  const token = getAuthToken();
  const isAuthenticated = Boolean(token && currentUser?.role === "admin");

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

export default useAdminAuth;
