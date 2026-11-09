import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import logoImg from "@/assets/images/KIPClassin logo.png";
import { landingFooterMock } from "@/mocks";

export const LandingFooter = () => {
  const { aboutText, quickLinks, supportLinks, contact } = landingFooterMock;

  return (
    <footer className="relative z-10 bg-[#091534] text-slate-300 pt-16 pb-10 border-t border-slate-800 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & About (5 cols) */}
          <div className="lg:col-span-5 text-left">
            <Link to="/" className="inline-block bg-white rounded-2xl px-3 py-1.5 shadow-xs transition-opacity hover:opacity-90">
              <img
                src={logoImg}
                alt="KIPClassin Logo"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-sm">
              {aboutText}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900/60 border border-slate-800 px-3 py-2 text-xs text-slate-300">
              <ShieldCheck className="h-4 w-4 text-[#007be3] shrink-0" />
              <span>FERPA & ISO 27001 Certified Campus System</span>
            </div>
          </div>

          {/* Column 2: Portals & Navigation (2 cols) */}
          <div className="lg:col-span-2 text-left">
            <h3 className="text-xs font-bold tracking-widest uppercase text-white mb-4">
              Academic Hubs
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-slate-400 transition-colors duration-200 hover:text-[#febf11]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Governance & Support (2 cols) */}
          <div className="lg:col-span-2 text-left">
            <h3 className="text-xs font-bold tracking-widest uppercase text-white mb-4">
              Governance
            </h3>
            <ul className="space-y-2.5 text-sm">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-slate-400 transition-colors duration-200 hover:text-[#febf11]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Campus Info (3 cols) */}
          <div className="lg:col-span-3 text-left">
            <h3 className="text-xs font-bold tracking-widest uppercase text-white mb-4">
              Campus Liaison
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-[#007be3] shrink-0" />
                  <span>{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-[#febf11] shrink-0" />
                  <span>{contact.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#007be3] shrink-0 mt-0.5" />
                <span className="leading-snug">{contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Operational Status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} KIPClassin Learning Systems. All rights reserved.</p>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-400 font-medium">All Academic Services Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;

