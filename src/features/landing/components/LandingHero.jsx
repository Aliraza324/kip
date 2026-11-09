import { LandingHeroContent } from "./LandingHeroContent";
import { LandingHeroImage } from "./LandingHeroImage";

export const LandingHero = () => {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8 w-full flex items-center justify-center my-auto">
      <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-12 w-full">
        {/* Left Column: Heading, Badge, Description, CTA Buttons */}
        <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-start w-full">
          <LandingHeroContent />
        </div>

        {/* Right Column: Hero Illustration with Girl & Floating Badges */}
        <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end items-center w-full">
          <LandingHeroImage />
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
