import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  Home,
  Layers,
  ClipboardList,
  BookOpen,
  BarChart2,
  Bell,
  Search,
  Headphones,
  User,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import logoImg from "@/assets/images/KIPClassin logo.png";
import { studentDashboardMock } from "@/mocks";

const navItems = [
  { label: "Dashboard", href: "/student", icon: Home, end: true },
  { label: "My Classes", href: "/student/classes", icon: Layers },
  { label: "Assignments", href: "/student/assignments", icon: ClipboardList },
  { label: "Learning Materials", href: "/student/materials", icon: BookOpen },
  { label: "My Progress", href: "/student/progress", icon: BarChart2 },
];

export const StudentLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, helpCard } = studentDashboardMock;

  return (
    <div className="min-h-screen w-full bg-[#f8fbfe] text-[#0f172a] flex flex-col lg:flex-row font-sans">
      {/* Mobile Top Header */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200/70 sticky top-0 z-40">
        <Link to="/student" className="flex items-center">
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

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 p-5 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Brand Logo in Desktop Sidebar */}
          <div className="hidden lg:flex items-center pb-2">
            <Link to="/">
              <img src={logoImg} alt="KIPClassin Logo" className="h-8 w-auto object-contain" />
            </Link>
          </div>

          {/* Navigation Links Matching Reference Design */}
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
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#0060d0] to-[#0080f6] text-white shadow-md shadow-blue-500/20"
                        : "text-[#334155] hover:bg-slate-50 hover:text-[#0060d0]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? "text-white" : "text-[#0080f6]"
                        }`}
                      />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom "Need Help?" Card Matching Reference Mockup */}
        <div className="mt-6 rounded-2xl bg-gradient-to-b from-[#eaf4ff]/70 to-[#f5f9ff] border border-blue-100/70 p-4">
          <div className="w-8 h-8 rounded-full bg-blue-100/80 text-[#0060d0] flex items-center justify-center">
            <Headphones className="w-4 h-4" />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-2.5">
            {helpCard.title}
          </h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            {helpCard.subtitle}
          </p>
          <Link
            to={helpCard.link}
            className="mt-3.5 inline-flex items-center justify-between w-full px-3.5 py-1.5 rounded-full bg-white text-xs font-bold text-[#0060d0] border border-blue-100/80 shadow-2xs hover:shadow-xs hover:border-blue-200 transition-all"
          >
            <span>{helpCard.buttonText.replace(" →", "")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Header Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-3.5 bg-transparent sticky top-0 z-30">
          {/* Search Bar Matching Reference Design */}
          <div className="relative w-80 lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search your classes, materials, or assignments..."
              className="w-full bg-white border border-slate-200/80 rounded-full pl-10 pr-4 py-2 text-xs text-slate-700 outline-none focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100/40 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Right Header: Notification & User Profile */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative p-2 rounded-full text-slate-500 hover:bg-white hover:shadow-2xs transition-all cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-[#0080f6]" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
            </button>

            {/* Profile Avatar & Name */}
            <div className="flex items-center gap-2 cursor-pointer pl-1">
              <div className="w-8 h-8 rounded-full bg-[#0080f6] text-white flex items-center justify-center shrink-0 shadow-xs">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                {user.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Viewport Outlet */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-8 pt-2 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs lg:hidden"
        />
      )}
    </div>
  );
};

export default StudentLayout;
