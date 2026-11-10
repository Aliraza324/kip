import {
  FeaturesHeroSection,
  FeaturesSuiteSection,
  FeaturesActionSection,
  FeaturesWhySection,
} from "../components/features";
import { LandingNextExperienceSection } from "../components/home";
export const FeaturesPage = () => {
  return (
    <div className="w-full bg-white text-[#1e293b]">
      {/* 1. Features Hero Section */}
      <FeaturesHeroSection />

      {/* 2. Complete Learning Suite (9 Feature Cards Grid) */}
      <FeaturesSuiteSection />

      {/* 3. See KIPClassin in Action */}
      <FeaturesActionSection />

      {/* 4. Why Choose KIPClassin? (4 Pillars Cards) */}
      <FeaturesWhySection />
      <LandingNextExperienceSection />
    </div>
  );
};

export default FeaturesPage;
