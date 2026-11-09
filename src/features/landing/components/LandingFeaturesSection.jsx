import { Video, ShieldCheck, Layers, BarChart3, Sparkles, CheckCircle2 } from "lucide-react";
import { landingFeaturesMock } from "@/mocks";

const featureIcons = {
  Video,
  ShieldCheck,
  Layers,
  BarChart3,
};

export const LandingFeaturesSection = () => {
  return (
    <section id="features" className="relative z-10 bg-[#fbfdff] py-16 sm:py-24 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#fde68a] bg-[#fffbeb] px-4 py-1.5 shadow-xs mb-3">
            <Sparkles className="h-3.5 w-3.5 text-[#febf11]" />
            <span className="text-xs font-bold tracking-wider text-[#b45309] uppercase">
              Platform Capabilities
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#01287b] sm:text-4xl lg:text-5xl leading-tight">
            Everything You Need for Modern Learning
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 max-w-xl mx-auto">
            A high-performance cloud ecosystem tailored for real-time collaboration between students, teachers, and school leadership.
          </p>
        </div>

        {/* Feature Cards 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {landingFeaturesMock.map((feature) => {
            const Icon = featureIcons[feature.icon] || Video;

            return (
              <div
                key={feature.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#007be3] text-white shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#007be3] bg-blue-50 px-3 py-1 rounded-full">
                      {feature.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#01287b] group-hover:text-[#007be3] transition-colors">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <CheckCircle2 className="h-4 w-4 text-[#007be3] shrink-0" />
                  <span>Fully integrated with active class roster</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingFeaturesSection;

