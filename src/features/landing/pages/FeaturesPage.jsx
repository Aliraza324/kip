import {
  FeaturesHeroSection,
  FeaturesSuiteSection,
  FeaturesActionSection,
} from "../components/features";

export const FeaturesPage = () => {
  return (
    <div className="w-full bg-white text-[#1e293b]">
      {/* 1. Features Hero Section */}
      <FeaturesHeroSection />

      {/* 2. Complete Learning Suite (9 Feature Cards Grid) */}
      <FeaturesSuiteSection />

      {/* 3. See KIPClassin in Action */}
      <FeaturesActionSection />
    </div>
  );
};

export default FeaturesPage;
