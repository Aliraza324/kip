import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import calendarIcon from "@/assets/images/Calendar illustration.png";
import demoIllustration from "@/assets/images/b58e334b69cf4c6922d77d48dc1ea4603c997701.png";
import { contactDemoBannerMock } from "@/mocks";
import { fadeInUp } from "@/animations";

export const ContactDemoSection = () => {
  const { title, description, buttonText, buttonHref } = contactDemoBannerMock;

  return (
    <section id="contact-demo-banner" className="w-full pb-16 sm:pb-20 lg:pb-24 pt-4 sm:pt-6 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative w-full rounded-[28px] sm:rounded-[36px] bg-[#f8faff] border border-[#e2edfa] overflow-hidden p-6 sm:p-8 lg:p-0 lg:pl-10 lg:pr-4 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 shadow-xs"
        >
          {/* Left Block: 3D Calendar + Text */}
          <div className="flex items-center gap-4 sm:gap-5 max-w-lg text-left w-full lg:w-auto">
            <img
              src={calendarIcon}
              alt="Calendar Icon"
              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain shrink-0"
            />
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#01287b] leading-tight tracking-tight">
                {title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Center Action: Schedule a Demo Button */}
          <div className="shrink-0 w-full sm:w-auto flex justify-start sm:justify-center">
            <a
              href={buttonHref}
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#0060d0] via-[#007be3] to-[#0092ff] hover:from-[#0050b5] hover:to-[#007be3] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#007be3]/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right Block: 3D Laptop with Class Session Illustration */}
          <div className="w-full lg:w-auto max-w-sm sm:max-w-md lg:max-w-[420px] xl:max-w-[460px] flex justify-center lg:justify-end items-end self-center lg:self-end">
            <img
              src={demoIllustration}
              alt="KIPClassin Interactive Class Demo"
              className="h-44 sm:h-52 lg:h-56 xl:h-60 w-auto object-contain object-bottom select-none drop-shadow-xs"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactDemoSection;

