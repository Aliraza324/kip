import { Link } from "react-router-dom";
import { GraduationCap, BookOpenCheck, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";
import { landingPortalsMock } from "@/mocks";

const iconMap = {
  GraduationCap,
  BookOpenCheck,
  ShieldAlert,
};

export const LandingPortalsSection = () => {
  return (
    <section id="portals" className="relative z-10 bg-slate-50/70 py-16 sm:py-24 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#007be3] mb-3">
            <span>Specialized Portals</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#01287b] sm:text-4xl">
            Tailored Experiences for Every Role
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Select your dedicated workspace designed specifically to streamline your daily academic workflow.
          </p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {landingPortalsMock.map((portal) => {
            const IconComponent = iconMap[portal.iconName] || GraduationCap;
            return (
              <div
                key={portal.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-300"
              >
                <div>
                  {/* Top Bar with Icon and Role Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: portal.accentColor }}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {portal.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#01287b]">{portal.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#007be3]">
                    {portal.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {portal.description}
                  </p>

                  {/* Feature Bullets */}
                  <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
                    {portal.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#007be3] mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Action Link */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <Link
                    to={portal.link}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-[#01287b] transition-all hover:bg-[#007be3] hover:text-white group-hover:bg-[#007be3] group-hover:text-white"
                  >
                    <span>Enter {portal.title}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingPortalsSection;
