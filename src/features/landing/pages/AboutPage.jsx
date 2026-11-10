import {
  AboutHeroSection,
  AboutHighlightsBannerSection,
  AboutMissionVisionSection,
} from "../components/about";

export const AboutPage = () => {
  return (
    <div className="w-full bg-white text-[#1e293b]">
      {/* 1. About Hero Section */}
      <AboutHeroSection />

      {/* 2. Highlights Banner (Smart Learning, Built for All, All-in-One, Secure) */}
      <AboutHighlightsBannerSection />

      {/* 3. Our Mission & Vision Cards (Quality Education & Smarter Learning World) */}
      <AboutMissionVisionSection />
    </div>
  );
};

export default AboutPage;
