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
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 focus:outline-none">
          <img
            src={logoImg}
            alt="KIPClassin Logo"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 md:flex">
          <div className="h-5 w-px bg-slate-300 mx-4" aria-hidden="true" />
          {landingNavLinksMock.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  item.isHome || isActive
                    ? "bg-[#eaf4fe] text-[#007be3] font-semibold"
                    : "text-slate-700 hover:text-[#007be3] hover:bg-slate-100/70"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Login Button */}
        <div className="hidden md:flex items-center">
          <Link
            to="/auth/login"
            className="inline-flex items-center gap-2 rounded-full bg-[#007be3] px-6 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0066c0] hover:shadow-md"
          >
            <User className="h-4 w-4" />
            <span>Login</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 shadow-lg">
          <div className="flex flex-col gap-2">
            {landingNavLinksMock.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-base font-medium ${
                    item.isHome || isActive
                      ? "bg-[#eaf4fe] text-[#007be3] font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#007be3] px-4 py-2.5 text-base font-semibold text-white"
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

