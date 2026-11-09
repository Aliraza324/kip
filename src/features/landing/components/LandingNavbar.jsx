import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import logoImg from "@/assets/images/KIPClassin logo.png";
import { landingNavLinksMock } from "@/mocks";

export const LandingNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-30 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        {/* Brand Logo & Subtle Vertical Divider */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center focus:outline-none">
            <img
              src={logoImg}
              alt="KIPClassin Logo"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>
          <div className="hidden md:block h-6 w-px bg-slate-300/80 ml-6" aria-hidden="true" />
        </div>

        {/* Desktop Navigation Links - Exact Match to Reference Image */}
        <div className="hidden items-center gap-7 lg:gap-9 md:flex">
          {landingNavLinksMock.map((item) => {
            const isHome = item.label === "Home";
            return isHome ? (
              <NavLink
                key={item.label}
                to={item.href}
                end
                className="inline-flex items-center justify-center rounded-2xl bg-[#d6ebff] px-6 py-2 text-sm font-bold text-[#0054da] shadow-xs select-none"
              >
                {item.label}
              </NavLink>
            ) : (
              <NavLink
                key={item.label}
                to={item.href}
                className="inline-flex items-center justify-center text-sm font-bold text-[#17295f] transition-colors duration-200 hover:text-[#0054da] select-none"
              >
                {item.label}
              </NavLink>
            );
          })}
        </div>

        {/* Desktop Login Action */}
        <div className="hidden md:flex items-center">
          <Link
            to="/auth/login"
            className="inline-flex items-center gap-2 rounded-full bg-[#007be3] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:bg-[#0066c0] hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            <User className="h-4 w-4" />
            <span>Login</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-xl p-2 text-[#17295f] hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-b border-slate-200 px-6 py-4 shadow-xl">
          <div className="flex flex-col gap-2">
            {landingNavLinksMock.map((item) => {
              const isHome = item.label === "Home";
              return isHome ? (
                <NavLink
                  key={item.label}
                  to={item.href}
                  end
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-[#d6ebff] px-4 py-2.5 text-base font-bold text-[#0054da]"
                >
                  {item.label}
                </NavLink>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-base font-bold text-[#17295f] hover:text-[#0054da] transition-colors"
                >
                  {item.label}
                </NavLink>
              );
            })}
            <Link
              to="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#007be3] px-4 py-3 text-base font-bold text-white shadow-md"
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
