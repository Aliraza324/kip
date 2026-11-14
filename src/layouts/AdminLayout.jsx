import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Home, Users, GraduationCap, Layers, Monitor, Bell, Search,
  Menu, X, LogOut, ChevronDown, User,
} from "lucide-react";
import toast from "react-hot-toast";
import logoImg from "@/assets/images/KIPClassin logo.png";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: Home, end: true },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Teachers", href: "/admin/teachers", icon: GraduationCap },
  { label: "Classes", href: "/admin/classes", icon: Layers },
  { label: "Website Content", href: "/admin/content", icon: Monitor },
  { label: "Notifications", href: "/admin/notifications", icon: Bell, hasBadge: true },
];

export const AdminLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/auth/admin-login");
  };

  return (
    <div className="h-screen w-full bg-[#f8fbfe] text-[#0f172a] flex flex-col lg:flex-row font-sans overflow-hidden">
      {/* Mobile Header */}
      <header className="lg:hidden shrink-0 flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200/70 z-40">
        <Link to="/admin">
          <img src={logoImg} alt="KIPClassin" className="h-7 w-auto object-contain" />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 p-5 lg:p-6 flex flex-col justify-between transition-transform duration-300 lg:static lg:h-full lg:shrink-0 lg:translate-x-0 overflow-y-auto no-scrollbar ${
          mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/admin">
              <img src={logoImg} alt="KIPClassin Logo" className="h-8 w-auto object-contain" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#eaf4fe] text-[#0080f6] border border-blue-100 text-xs font-bold">
              Admin Panel
            </span>
          </div>

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
                    `flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#0060d0] to-[#0080f6] text-white shadow-md shadow-blue-500/25 font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-[#0080f6]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3.5">
                        <Icon
                          className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-[#0080f6]"}`}
                          strokeWidth={isActive ? 2.2 : 2}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.hasBadge && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs sm:text-sm font-bold border border-rose-100 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Viewport */}
      <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden">
        {/* Desktop Header */}
        <header className="hidden lg:flex shrink-0 items-center justify-between px-8 py-3 bg-[#f8fbfe] border-b border-slate-100/60 z-20">
          <div className="relative w-full max-w-lg xl:max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search your classes, materials, or assignments..."
              className="w-full bg-[#f0f4fa]/70 hover:bg-white focus:bg-white border border-slate-200/70 rounded-2xl pl-11 pr-4 py-2 text-xs sm:text-sm text-slate-700 outline-none focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100/50 transition-all placeholder:text-slate-400 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-5 ml-6">
            <button
              className="relative p-2 rounded-xl text-slate-600 hover:text-[#0080f6] hover:bg-white transition-all cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" strokeWidth={2} />
              <span className="w-2 h-2 rounded-full bg-[#0080f6] absolute top-1.5 right-1.5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <div
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 py-1 px-2 rounded-2xl hover:bg-white/80 transition-all cursor-pointer select-none"
              >
                <div className="w-8 h-8 rounded-full bg-[#0080f6] text-white flex items-center justify-center">
                  <User className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 hidden sm:block">
                  Admin
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-6 lg:px-8 pb-8 pt-3 sm:pt-4">
          <Outlet />
        </main>
      </div>

      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs lg:hidden"
        />
      )}
    </div>
  );
};

export default AdminLayout;
