import heroBgImg from "@/assets/images/heroBg.png";
import { LandingNavbar } from "../components/LandingNavbar";
import { LandingHero } from "../components/LandingHero";
import { LandingPortalCardsSection } from "../components/LandingPortalCardsSection";
import { LandingHowItWorksSection } from "../components/LandingHowItWorksSection";
import { LandingWhatYouCanDoSection } from "../components/LandingWhatYouCanDoSection";
import { LandingVirtualClassroomExperienceSection } from "../components/LandingVirtualClassroomExperienceSection";
import { LandingMoreThanClassroomSection } from "../components/LandingMoreThanClassroomSection";
import { LandingTestimonialsSliderSection } from "../components/LandingTestimonialsSliderSection";
import { LandingTrustedBannerSection } from "../components/LandingTrustedBannerSection";
import { LandingFooter } from "../components/LandingFooter";

export const LandingPage = () => {
  return (
    <div className="w-full bg-white text-[#1e293b]">
      {/* 1. Hero Viewport with Exact Brand Background */}
      <div
        className="relative min-h-screen lg:h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#fdfdfd] bg-no-repeat bg-center"
        style={{
          backgroundImage: `url("${heroBgImg}")`,
          backgroundSize: "100% 100%",
        }}
      >
        <LandingNavbar />
        <main className="flex-1 flex items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-2 lg:py-4">
          <LandingHero />
        </main>
      </div>

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

      {/* 9. Campus Footer */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
