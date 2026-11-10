import {
  HowItWorksHeroSection,
  HowItWorksProcessSection,
} from "../components/how-it-works";

export const HowItWorksPage = () => {
  return (
    <div className="w-full bg-white text-[#1e293b]">
      {/* 1. How It Works Hero Section */}
      <HowItWorksHeroSection />

      {/* 2. The Process: How KIPClassin Works (4 Step Cards) */}
      <HowItWorksProcessSection />
    </div>
  );
};

export default HowItWorksPage;
