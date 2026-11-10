import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Lazy-loaded route chunks adhering to design.md code-splitting rules
const PublicLayout = lazy(() => import("@/layouts/PublicLayout"));
const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));
const AboutPage = lazy(() => import("@/features/landing/pages/AboutPage"));
const FeaturesPage = lazy(() => import("@/features/landing/pages/FeaturesPage"));
const HowItWorksPage = lazy(() => import("@/features/landing/pages/HowItWorksPage"));
// Clean fallback loader complying with Core Web Vitals (prevents layout shift)
const PageFallbackLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#007be3]" />
      <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
        Loading KIPClassin...
      </span>
    </div>
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallbackLoader />}>
        <Routes>
          {/* Public Landing Pages with Shared Navbar & Footer Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
          </Route>

          {/* Fallback Catch-All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;

