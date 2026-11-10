import {
  HowItWorksHeroSection,
  HowItWorksProcessSection,
  HowItWorksRolesSection,
} from "../components/how-it-works";
import { FeaturesWhySection } from "../components/features";
import { AboutCommunityCtaSection, LandingNextExperienceSection } from "../components/about";
export const HowItWorksPage = () => {
  return (
    <div className="w-full bg-white text-[#1e293b]">
      {/* 1. How It Works Hero Section */}
      <HowItWorksHeroSection />

      {/* 2. The Process: How KIPClassin Works (4 Step Cards) */}
      <HowItWorksProcessSection />

      {/* 3. For Teachers & For Students (Roles Showcase) */}
      <HowItWorksRolesSection />
      <FeaturesWhySection />
      <AboutCommunityCtaSection />
      <LandingNextExperienceSection />
    </div>
  );
};

export default HowItWorksPage;
