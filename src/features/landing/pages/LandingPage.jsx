import heroBgImg from "@/assets/images/heroBg.png";
import { LandingNavbar } from "../components/LandingNavbar";
import { LandingHero } from "../components/LandingHero";
import { LandingPortalCardsSection } from "../components/LandingPortalCardsSection";
import { LandingHowItWorksSection } from "../components/LandingHowItWorksSection";

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
    </div>
  );
};

export default LandingPage;
