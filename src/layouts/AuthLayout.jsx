import { Link, Outlet } from "react-router-dom";
import logoImg from "@/assets/images/KIPClassin logo.png";

export const AuthLayout = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#f8fbfe] text-[#1e293b] overflow-x-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* Header with Brand Logo */}
      <header className="relative z-10 w-full px-4 sm:px-8 py-5 flex items-center justify-between max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center transition-opacity hover:opacity-90"
        >
          <img
            src={logoImg}
            alt="KIPClassin Logo"
            className="h-9 sm:h-10 w-auto object-contain"
          />
        </Link>

        <Link
          to="/"
          className="text-xs sm:text-sm font-semibold text-[#007be3] hover:text-[#01287b] transition-colors"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Main Outlet Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* Minimal Auth Footer */}
      <footer className="relative z-10 py-5 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} KIPClassin Learning Systems. Secure Academic Authentication.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;

