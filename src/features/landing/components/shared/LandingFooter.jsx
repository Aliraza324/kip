import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Send,
  GraduationCap,
  Users,
  UserPlus,
  HelpCircle,
} from "lucide-react";
import footerBgImg from "@/assets/images/KIPClassin footer.png";
import logoImg from "@/assets/images/KIPClassin logo.png";
import { landingFooterMock } from "@/mocks";
import { FooterSocialIcon } from "./FooterSocialIcons";

const userIconMap = {
  GraduationCap,
  Users,
  UserPlus,
  HelpCircle,
};

export const LandingFooter = () => {
  const {
    description,
    socials,
    quickLinks,
    userLinks,
    companyLinks,
    newsletter,
    copyright,
  } = landingFooterMock;

  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer
      className="relative z-10 w-full bg-[#001940] bg-no-repeat bg-top text-white overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-8"
      style={{
        backgroundImage: `url("${footerBgImg}")`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row with 5 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 items-start pb-10">
          {/* Column 1: Brand Info & Socials (3 cols) */}
          <div className="lg:col-span-3 text-left">
            <Link to="/" className="inline-block transition-opacity hover:opacity-90">
              <img
                src={logoImg}
                alt="KIPClassin Logo"
                className="h-8 sm:h-9 w-auto object-contain brightness-110"
              />
            </Link>

            <p className="mt-4 text-xs sm:text-sm text-blue-100/80 leading-relaxed max-w-xs">
              {description}
            </p>

            <div className="mt-5 flex items-center gap-2">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all focus:outline-hidden"
                >
                  <FooterSocialIcon type={item.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 text-left lg:border-l lg:border-white/10 lg:pl-6">
            <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-blue-100/75 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For Users with Yellow Icons (2 cols) */}
          <div className="lg:col-span-2 text-left lg:border-l lg:border-white/10 lg:pl-6">
            <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">
              For Users
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {userLinks.map((item) => {
                const IconComponent = userIconMap[item.icon] || Users;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="inline-flex items-center gap-2 text-blue-100/75 hover:text-white transition-colors"
                    >
                      <IconComponent className="h-4 w-4 text-[#febf11] shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Company (2 cols) */}
          <div className="lg:col-span-2 text-left lg:border-l lg:border-white/10 lg:pl-6">
            <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-blue-100/75 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Stay in the Loop Card (3 cols) */}
          <div className="lg:col-span-3 text-left">
            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xs p-5 sm:p-5.5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-5 w-5 text-[#febf11]" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {newsletter.title}
                </h3>
              </div>

              <p className="text-xs text-blue-100/75 leading-relaxed mb-4">
                {newsletter.subtitle}
              </p>

              <form onSubmit={handleSubscribe} className="relative flex items-center bg-white rounded-full p-1 pl-3.5 shadow-xs">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={newsletter.placeholder}
                  className="w-full bg-transparent text-slate-800 text-xs placeholder:text-slate-400 focus:outline-hidden pr-2"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="h-8 w-8 rounded-full bg-[#febf11] hover:bg-[#e5ab0f] text-[#01287b] font-bold flex items-center justify-center shrink-0 shadow-xs transition-transform active:scale-95 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-white/10 pt-5 text-left">
          <p className="text-xs text-blue-100/60">{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
