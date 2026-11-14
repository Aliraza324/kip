import { useState, useRef, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  Home, Calendar, Layers, Users, ClipboardList,
  User, Bell, Search, Headphones, ChevronDown, Menu, X, ArrowRight,
} from "lucide-react";
import logoImg from "@/assets/images/KIPClassin logo.png";
import { teacherDashboardMock } from "@/mocks";
import { TeacherProfileDropdown } from "@/features/teachers/components/TeacherProfileDropdown";

const navItems = [
  { label: "Dashboard", href: "/teacher", icon: Home, end: true },
  { label: "Sessions", href: "/teacher/sessions", icon: Calendar },
  { label: "Class", href: "/teacher/classes", icon: Layers },
  { label: "Students", href: "/teacher/students", icon: Users },
  { label: "Assignments", href: "/teacher/assignments", icon: ClipboardList },
  { label: "My Profile", href: "/teacher/profile", icon: User },
  { label: "Notifications", href: "/teacher/notifications", icon: Bell },
];

export const TeacherLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { teacher, helpCard } = teacherDashboardMock;

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="h-screen w-full bg-[#f8fbfe] text-[#0f172a] flex flex-col lg:flex-row font-sans overflow-hidden">
      {/* Mobile Top Header */}
      <header className="lg:hidden shrink-0 flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200/70 z-40">
        <Link to="/teacher">
          <img src={logoImg} alt="KIPClassin" className="h-7 w-auto object-contain" />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Fixed Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 p-5 lg:p-6 flex flex-col justify-between transition-transform duration-300 lg:static lg:h-full lg:shrink-0 lg:translate-x-0 overflow-y-auto no-scrollbar ${
          mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-between pb-1">
            <Link to="/">
              <img src={logoImg} alt="KIPClassin Logo" className="h-8 w-auto object-contain" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#0060d0] to-[#0080f6] text-white shadow-md shadow-blue-500/25 font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-[#0080f6]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-5 h-5 shrink-0 ${
                          isActive ? "text-white" : "text-[#0080f6]"
                        }`}
                        strokeWidth={isActive ? 2.2 : 2}
                      />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom "Need Help?" Card */}
        <div className="mt-4 rounded-3xl bg-gradient-to-b from-[#e8f4fd]/90 to-[#f5f9ff] border border-blue-100/60 p-4 shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0080f6] flex items-center justify-center mb-2">
            <Headphones className="w-4 h-4" strokeWidth={2.2} />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900">{helpCard.title}</h4>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{helpCard.subtitle}</p>
          <Link
            to={helpCard.link}
            className="mt-3 inline-flex items-center justify-between w-full px-3.5 py-1.5 rounded-full bg-white text-xs font-bold text-[#0080f6] border border-blue-100/80 shadow-2xs hover:shadow-xs transition-all"
          >
            <span>{helpCard.buttonText.replace(" →", "")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Viewport Container */}
      <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden">
        {/* Desktop Header */}
        <header className="hidden lg:flex shrink-0 items-center justify-between px-8 py-3 bg-[#f8fbfe] border-b border-slate-100/60 z-20">
          <div className="relative w-full max-w-lg xl:max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search your classes, materials, or assignments..."
              className="w-full bg-[#f0f4fa]/70 hover:bg-white focus:bg-white border border-slate-200/70 rounded-2xl pl-11 pr-4 py-2.5 text-xs sm:text-sm text-slate-700 outline-none focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100/50 transition-all placeholder:text-slate-400 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-4 ml-6">
            <Link
              to="/teacher/notifications"
              className="relative p-2.5 rounded-xl hover:bg-white hover:shadow-2xs text-[#0080f6] transition-all"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" strokeWidth={2} />
              <span className="w-2 h-2 rounded-full bg-[#0080f6] absolute top-2 right-2" />
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 py-1 px-2 rounded-2xl hover:bg-white/80 transition-all cursor-pointer select-none"
              >
                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="w-9 h-9 rounded-full object-cover shrink-0 shadow-xs border border-blue-200"
                />
                <span className="text-sm font-bold text-slate-800 whitespace-nowrap">
                  {teacher.name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform ${
                    profileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              <TeacherProfileDropdown
                isOpen={profileDropdownOpen}
                onClose={() => setProfileDropdownOpen(false)}
                user={teacher}
              />
            </div>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 sm:px-6 lg:px-8 pb-8 pt-3 sm:pt-4">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs lg:hidden"
        />
      )}
    </div>
  );
};

export default TeacherLayout;
