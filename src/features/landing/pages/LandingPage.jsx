import heroBgImg from "@/assets/images/heroBg.png";
import { LandingNavbar } from "../components/LandingNavbar";
import { LandingHero } from "../components/LandingHero";

export const LandingPage = () => {
  return (
    <div
      className="relative min-h-screen lg:h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#fdfdfd] bg-no-repeat bg-center"
      style={{
        backgroundImage: `url("${heroBgImg}")`,
        backgroundSize: "100% 100%",
      }}
    >
      {/* Platform Navigation Header */}
      <LandingNavbar />

      {/* Main Hero Viewport - Vertically Centered */}
      <main className="flex-1 flex items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-2 lg:py-4">
        <LandingHero />
      </main>
    </div>
  );
};

export default LandingPage;
