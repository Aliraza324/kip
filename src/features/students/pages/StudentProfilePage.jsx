import { User, Loader2 } from "lucide-react";
import { useStudentProfile } from "@/hooks/student";
import {
  StudentProfileHeroCard,
  StudentPersonalInfoCard,
  StudentAccountSecurityCard,
} from "../components/profile";

export const StudentProfilePage = () => {
  const {
    profile,
    isLoading,
    isUpdating,
    isUploadingAvatar,
    updateProfile,
    changePassword,
    updateAvatar,
  } = useStudentProfile();

  if (isLoading && !profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#0080f6] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Subtitle Matching Image */}
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

      {/* Hero Banner Card with Cloudinary Avatar Upload Trigger */}
      <StudentProfileHeroCard
        profile={profile}
        onAvatarChange={updateAvatar}
        isUploadingAvatar={isUploadingAvatar}
      />

      {/* Main Two-Column Grid Layout matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Personal Information */}
        <div className="lg:col-span-7">
          <StudentPersonalInfoCard
            profile={profile}
            onUpdateProfile={updateProfile}
            isUpdating={isUpdating}
          />
        </div>

        {/* Right Column: Account & Security */}
        <div className="lg:col-span-5">
          <StudentAccountSecurityCard
            onUpdatePassword={changePassword}
            isUpdating={isUpdating}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
