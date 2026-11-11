import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  BookOpen,
  BarChart2,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import logoImg from "@/assets/images/KIPClassin logo.png";

const navItems = [
  { label: "Dashboard", href: "/student", icon: LayoutDashboard, end: true },
  { label: "Classes", href: "/student/classes", icon: GraduationCap },
  { label: "Assignments", href: "/student/assignments", icon: FileText },
  { label: "Resources", href: "/student/resources", icon: BookOpen },
  { label: "Reports", href: "/student/reports", icon: BarChart2 },
];

export const StudentLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fbfe] text-[#1e293b] flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3.5 bg-white border-b border-slate-200/80 sticky top-0 z-40">
        <Link to="/student" className="flex items-center">
          <img src={logoImg} alt="KIPClassin" className="h-7 w-auto object-contain" />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 p-5 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Logo in Desktop Sidebar */}
          <div className="hidden lg:flex items-center pb-6 border-b border-slate-100">
            <Link to="/">
              <img src={logoImg} alt="KIPClassin Logo" className="h-8 w-auto object-contain" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#007be3] text-white shadow-sm shadow-blue-500/20"
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-[#01287b]"
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile & Logout */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-[#007be3] font-bold flex items-center justify-center text-xs shrink-0">
              AL
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">Alex Morgan</p>
              <p className="text-[11px] text-slate-400 truncate">Student</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Header Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200/80 sticky top-0 z-30">
          {/* Search Bar */}
          <div className="relative w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search classes, notes, materials..."
              className="w-full bg-[#f8fbfe] border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs text-slate-700 outline-none focus:border-[#007be3] focus:bg-white transition-all"
            />
          </div>

          {/* Right Header Icons */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#007be3]" />
            </button>
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#007be3] text-white font-bold flex items-center justify-center text-xs">
                A
              </div>
              <span className="text-xs font-semibold text-slate-700">Alex</span>
            </div>
          </div>
        </header>

        {/* Viewport Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
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

