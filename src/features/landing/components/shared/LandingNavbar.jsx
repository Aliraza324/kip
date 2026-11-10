import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/images/KIPClassin logo.png";
import { landingNavLinksMock } from "@/mocks";

export const LandingNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
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

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-7 lg:gap-9 md:flex">
          {landingNavLinksMock.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                isActive
                  ? "inline-flex items-center justify-center rounded-2xl bg-[#d6ebff] px-6 py-2 text-sm font-bold text-[#0054da] shadow-xs select-none transition-colors"
                  : "inline-flex items-center justify-center text-sm font-bold text-[#17295f] transition-colors duration-200 hover:text-[#0054da] select-none"
              }
            >
              {item.label}
            </NavLink>
          ))}
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

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-xl p-2 text-[#17295f] hover:bg-slate-100 focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Slide-in Sidebar (Portaled to body to prevent backdrop-blur stacking context traps) */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-50 md:hidden">
                {/* Backdrop Blur Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
                  aria-hidden="true"
                />

                {/* Slide-in Sidebar Panel */}
                <motion.aside
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 280 }}
                  className="fixed inset-y-0 right-0 z-50 w-[290px] sm:w-[320px] max-w-[85vw] h-dvh bg-white shadow-2xl flex flex-col justify-between p-6 overflow-y-auto"
                  aria-label="Mobile Navigation Sidebar"
                >
                  <div>
                    {/* Sidebar Header: Logo & Close Button */}
                    <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                      <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                        <img
                          src={logoImg}
                          alt="KIPClassin Logo"
                          className="h-7 w-auto object-contain"
                        />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none"
                        aria-label="Close menu"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Sidebar Navigation Links */}
                    <nav className="mt-6 flex flex-col gap-2">
                      {landingNavLinksMock.map((item) => (
                        <NavLink
                          key={item.label}
                          to={item.href}
                          end={item.href === "/"}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            isActive
                              ? "rounded-2xl bg-[#d6ebff] px-5 py-3 text-base font-bold text-[#0054da] transition-colors"
                              : "rounded-2xl px-5 py-3 text-base font-bold text-[#17295f] hover:bg-slate-50 hover:text-[#0054da] transition-colors"
                          }
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </nav>
                  </div>

                  {/* Bottom Login Button */}
                  <div className="pt-6 border-t border-slate-100">
                    <Link
                      to="/auth/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#007be3] hover:bg-[#0066c0] px-5 py-3.5 text-base font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <User className="h-5 w-5" />
                      <span>Login</span>
                    </Link>
                  </div>
                </motion.aside>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
};

export default LandingNavbar;
