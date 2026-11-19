import { Loader2, User } from "lucide-react";
import { useTeacherProfile } from "@/hooks";
import {
  TeacherProfileHeroCard,
  TeacherPersonalInfoCard,
  TeacherProfilePhotoCard,
  TeacherNotificationAlertsCard,
  TeacherAccountSecurityCard,
} from "../components/profile";

export const TeacherProfilePage = () => {
  const {
    profile,
    isLoading,
    isUpdating,
    updateProfile,
    changePassword,
    updateAvatar,
    removeAvatar,
  } = useTeacherProfile();

  if (isLoading && !profile) {
    return (
      <div className="bg-white rounded-3xl p-16 flex flex-col items-center justify-center border border-slate-100 shadow-2xs max-w-7xl mx-auto">
        <Loader2 className="w-8 h-8 text-[#0080f6] animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading profile details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-14">
      {/* Header Banner matching SS 2 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
          <User className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            View and manage your personal details, account, and preferences.
          </p>
        </div>
      </div>

      {/* Hero Banner Card matching SS 2 */}
      <TeacherProfileHeroCard
        profile={profile}
        onAvatarClick={() => {
          document.querySelector('input[type="file"]')?.click();
        }}
      />

      {/* 2-Column Grid Layout matching SS 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Personal Info, Photo, Notification Alerts */}
        <div className="lg:col-span-7 space-y-6">
          <TeacherPersonalInfoCard
            profile={profile}
            onUpdateProfile={updateProfile}
            isUpdating={isUpdating}
          />

          <TeacherProfilePhotoCard
            avatar={profile?.avatar}
            onAvatarUpload={updateAvatar}
            onAvatarRemove={removeAvatar}
            isUpdating={isUpdating}
          />

          <TeacherNotificationAlertsCard
            initialEnabled={profile?.notificationAlerts}
            onToggle={(val) => updateProfile({ notificationAlerts: val })}
          />
        </div>

        {/* Right Column: Account & Security (Current Password input removed) */}
        <div className="lg:col-span-5">
          <TeacherAccountSecurityCard
            onChangePassword={changePassword}
            isUpdating={isUpdating}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherProfilePage;
