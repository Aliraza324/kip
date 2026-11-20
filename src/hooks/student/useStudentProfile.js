import { useState, useEffect, useCallback } from "react";
import { studentProfileService } from "@/service/apiService";
import { getAuthUser, setAuthUser } from "@/service/apiClient";
import { studentProfileMock } from "@/mocks";
import toast from "react-hot-toast";

/**
 * Hook to manage Student Profile (fetch, update info, change password, upload avatar to Cloudinary).
 */
export function useStudentProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const formatStudentProfile = (data) => {
    if (!data) return studentProfileMock;

    const currentAuth = getAuthUser() || {};
    const fullName = data.fullName || data.name || currentAuth.fullName || currentAuth.name || "Alex Student";
    const rawUsername = data.username || currentAuth.username || "alexstudent";
    const username = rawUsername.startsWith("@") ? rawUsername : `@${rawUsername}`;

    // Derive class/section label (e.g. "Grade 9 • Section A")
    let gradeLabel = "";
    if (data.class?.name || data.class?.grade) {
      const g = data.class.grade || data.class.name;
      const s = data.section || data.class.section;
      gradeLabel = s ? `${g} • ${s}` : g;
    } else if (data.grade) {
      gradeLabel = data.grade;
    } else if (data.section) {
      gradeLabel = data.section;
    } else {
      gradeLabel = "Student";
    }

    return {
      id: data.id || currentAuth.id,
      name: fullName,
      fullName: fullName,
      username: username,
      rawUsername: rawUsername.replace(/^@/, ""),
      email: data.email || currentAuth.email || "alex.student@kipclassin.com",
      phone: data.phone || currentAuth.phone || "+92 300 1234567",
      dob: data.dob || "Mar 15, 2011",
      gender: data.gender || "Male",
      grade: gradeLabel,
      role: "Student",
      avatar: data.avatar || currentAuth.avatar || studentProfileMock.avatar,
      rawClass: data.class,
    };
  };

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await studentProfileService.getProfile();
      const formatted = formatStudentProfile(data);
      setProfile(formatted);

      if (data) {
        const current = getAuthUser() || {};
        setAuthUser({
          ...current,
          ...data,
          id: data.id || current.id,
          name: formatted.name,
          fullName: formatted.fullName,
          avatar: formatted.avatar,
          role: "student",
        });
        window.dispatchEvent(new Event("kip:user:updated"));
      }
    } catch (err) {
      console.error("useStudentProfile fetch error:", err);
      setError(err);
      const fallback = formatStudentProfile(getAuthUser() || studentProfileMock);
      setProfile(fallback);
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
      const payload = {
        fullName: changes.name || changes.fullName,
        username: changes.username ? changes.username.replace(/^@/, "") : undefined,
        email: changes.email,
        phone: changes.phone,
        dob: changes.dob,
        gender: changes.gender,
      };

      // Clean undefined
      Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

      const updated = await studentProfileService.updateProfile(payload);
      const formatted = formatStudentProfile(updated);
      setProfile(formatted);

      const current = getAuthUser() || {};
      setAuthUser({
        ...current,
        ...updated,
        name: formatted.name,
        fullName: formatted.fullName,
        avatar: formatted.avatar,
      });
      window.dispatchEvent(new Event("kip:user:updated"));

      toast.success("Profile saved successfully!");
      return formatted;
    } catch (err) {
      console.error("useStudentProfile updateProfile error:", err);
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
      const res = await studentProfileService.changePassword({ newPassword, confirmPassword });
      toast.success("Password updated successfully! Previous password will no longer work.");
      return res;
    } catch (err) {
      console.error("useStudentProfile changePassword error:", err);
      const msg = err.response?.data?.message || err.message || "Failed to change password.";
      toast.error(msg);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const updateAvatar = useCallback(async (file) => {
    setIsUploadingAvatar(true);
    try {
      const res = await studentProfileService.updateAvatar(file);
      const newAvatarUrl = res?.avatar || res?.data?.avatar;

      setProfile((prev) => (prev ? { ...prev, avatar: newAvatarUrl || prev.avatar } : prev));

      const current = getAuthUser() || {};
      setAuthUser({
        ...current,
        avatar: newAvatarUrl || current.avatar,
      });
      window.dispatchEvent(new Event("kip:user:updated"));

      toast.success("Profile photo updated on Cloudinary!");
      return res;
    } catch (err) {
      console.error("useStudentProfile updateAvatar error:", err);
      const msg = err.response?.data?.message || err.message || "Failed to upload avatar.";
      toast.error(msg);
      throw err;
    } finally {
      setIsUploadingAvatar(false);
    }
  }, []);

  const removeAvatar = useCallback(async () => {
    setIsUploadingAvatar(true);
    try {
      await studentProfileService.removeAvatar();
      setProfile((prev) => (prev ? { ...prev, avatar: studentProfileMock.avatar } : prev));

      const current = getAuthUser() || {};
      setAuthUser({
        ...current,
        avatar: null,
      });
      window.dispatchEvent(new Event("kip:user:updated"));

      toast.success("Profile photo removed.");
    } catch (err) {
      console.error("useStudentProfile removeAvatar error:", err);
      const msg = err.response?.data?.message || err.message || "Failed to remove avatar.";
      toast.error(msg);
      throw err;
    } finally {
      setIsUploadingAvatar(false);
    }
  }, []);

  return {
    profile: profile || studentProfileMock,
    isLoading,
    isUpdating,
    isUploadingAvatar,
    error,
    refetch: fetchProfile,
    updateProfile,
    changePassword,
    updateAvatar,
    removeAvatar,
  };
}

export default useStudentProfile;
