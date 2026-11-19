import { useState, useEffect, useCallback } from "react";
import { teacherProfileService } from "@/service/apiService";
import { getAuthUser, setAuthUser } from "@/service/apiClient";
import toast from "react-hot-toast";

/**
 * Hook to manage Teacher Profile (fetch, update info, change password, update/remove avatar).
 */
export function useTeacherProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await teacherProfileService.getProfile();
      setProfile(data);
      if (data) {
        const current = getAuthUser() || {};
        setAuthUser({
          ...current,
          ...data,
          id: data.id || current.id,
          name: data.fullName || current.name,
          role: data.role || "teacher",
        });
      }
    } catch (err) {
      console.error("useTeacherProfile fetch error:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (changes) => {
    setIsUpdating(true);
    try {
      const updated = await teacherProfileService.updateProfile(changes);
      setProfile(updated);
      toast.success("Profile saved successfully!");
      return updated;
    } catch (err) {
      console.error("useTeacherProfile updateProfile error:", err);
      const msg = err.response?.data?.message || err.message || "Failed to update profile.";
      toast.error(msg);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const changePassword = useCallback(async ({ newPassword, confirmPassword }) => {
    setIsUpdating(true);
    try {
      const res = await teacherProfileService.changePassword({ newPassword, confirmPassword });
      toast.success("Password updated successfully! Previous password will no longer work.");
      return res;
    } catch (err) {
      console.error("useTeacherProfile changePassword error:", err);
      const msg = err.response?.data?.message || err.message || "Failed to change password.";
      toast.error(msg);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const updateAvatar = useCallback(async (file) => {
    setIsUpdating(true);
    try {
      const res = await teacherProfileService.updateAvatar(file);
      setProfile((prev) => (prev ? { ...prev, avatar: res?.avatar || prev.avatar } : prev));
      toast.success("Profile photo updated!");
      return res;
    } catch (err) {
      console.error("useTeacherProfile updateAvatar error:", err);
      const msg = err.response?.data?.message || err.message || "Failed to upload avatar.";
      toast.error(msg);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const removeAvatar = useCallback(async () => {
    setIsUpdating(true);
    try {
      await teacherProfileService.removeAvatar();
      setProfile((prev) => (prev ? { ...prev, avatar: null } : prev));
      toast.success("Profile photo removed.");
    } catch (err) {
      console.error("useTeacherProfile removeAvatar error:", err);
      const msg = err.response?.data?.message || err.message || "Failed to remove avatar.";
      toast.error(msg);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  return {
    profile,
    isLoading,
    isUpdating,
    isError: Boolean(error),
    error,
    refetch: fetchProfile,
    updateProfile,
    changePassword,
    updateAvatar,
    removeAvatar,
  };
}

export default useTeacherProfile;
