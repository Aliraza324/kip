import heroBgImg from "@/assets/images/heroBg.png";
import {
  LandingHero,
  LandingPortalCardsSection,
  LandingHowItWorksSection,
  LandingWhatYouCanDoSection,
  LandingVirtualClassroomExperienceSection,
  LandingMoreThanClassroomSection,
  LandingTestimonialsSliderSection,
  LandingTrustedBannerSection,
  LandingFaqSection,
  LandingNextExperienceSection,
} from "../components/home";

export const LandingPage = () => {
  return (
    <div className="w-full bg-white text-[#1e293b]">
      {/* 1. Hero Viewport with Exact Brand Background */}
      <section
        id="hero-banner"
        className="relative min-h-[calc(100vh-76px)] w-full flex items-center justify-center overflow-x-clip bg-[#fdfdfd] bg-no-repeat bg-center py-8 lg:py-12"
        style={{
          backgroundImage: `url("${heroBgImg}")`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <LandingHero />
        </div>
      </section>

      {/* 2. Choose Your Portal Section (Student & Teacher Interactive Cards) */}
      <LandingPortalCardsSection />

      {/* 3. How It Works Section (Create Account, Get Connected, Start Learning) */}
      <LandingHowItWorksSection />

      {/* 4. What You Can Do Section (Everything You Need for A Better Virtual Classroom) */}
      <LandingWhatYouCanDoSection />

      {/* 5. Virtual Classroom Experience Section (Laptop, Chips, Watch Demo) */}
      <LandingVirtualClassroomExperienceSection />

      {/* 6. More Than a Virtual Classroom Section (AI Learning, Assessments, Progress) */}
      <LandingMoreThanClassroomSection />

      {/* 7. Testimonials Slider Section (User Reviews with Decorative Backdrop) */}
      <LandingTestimonialsSliderSection />

      {/* 8. Trusted by Educators & Students Metrics Banner */}
      <LandingTrustedBannerSection />

      {/* 9. Frequently Asked Questions (FAQ) Section */}
      <LandingFaqSection />

      {/* 10. Next Learning Experience Call to Action Banner */}
      <LandingNextExperienceSection />
    </div>
  );
};

export default LandingPage;
