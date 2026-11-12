import { useState } from "react";
import { User } from "lucide-react";
import { studentProfileMock } from "@/mocks";
import {
  StudentProfileHeroCard,
  StudentPersonalInfoCard,
  StudentProfilePhotoCard,
  StudentAccountSecurityCard,
} from "../components/profile";

export const StudentProfilePage = () => {
  const [profile, setProfile] = useState(studentProfileMock);

  const handleUpdateProfile = (updatedFields) => {
    setProfile((prev) => ({ ...prev, ...updatedFields }));
  };

  const handleAvatarChange = (newAvatarUrl) => {
    setProfile((prev) => ({
      ...prev,
      avatar: newAvatarUrl || studentProfileMock.avatar,
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Subtitle Matching Image 2 */}
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

      {/* Hero Banner Card */}
      <StudentProfileHeroCard profile={profile} />

      {/* Main Two-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Personal Information & Profile Photo */}
        <div className="lg:col-span-7 space-y-6">
          <StudentPersonalInfoCard
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />

          <StudentProfilePhotoCard
            avatar={profile.avatar}
            onAvatarChange={handleAvatarChange}
          />
        </div>

        {/* Right Column: Account & Security */}
        <div className="lg:col-span-5">
          <StudentAccountSecurityCard />
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;

