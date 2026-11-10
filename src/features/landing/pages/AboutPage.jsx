import {
  AboutHeroSection,
  AboutHighlightsBannerSection,
  AboutMissionVisionSection,
  AboutValuesSection,
  AboutCommunityCtaSection,
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

      {/* 4. The Values We Stand For (Accessibility, Collaboration, Reliability, Growth) */}
      <AboutValuesSection />

      {/* 5. Join Our Learning Community CTA Banner */}
      <AboutCommunityCtaSection />
    </div>
  );
};

export default AboutPage;
