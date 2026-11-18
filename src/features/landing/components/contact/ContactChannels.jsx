import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import headsetImg from "@/assets/images/image 36.png";
import envelopeImg from "@/assets/images/image 37.png";
import phoneImg from "@/assets/images/image 36 (1).png";
import locationImg from "@/assets/images/image 36 (2).png";
import { useLiveContent } from "@/hooks/useDataSync";
import { fadeInUp, staggerContainer } from "@/animations";

const channelImages = {
  headset: headsetImg,
  envelope: envelopeImg,
  phone: phoneImg,
  location: locationImg,
};

export const ContactChannels = () => {
  const liveContact = useLiveContent("contact");
  const details = liveContact?.details || {};

  const email = details.email || "support@kipclassin.com";
  const phone = details.phone || "+1 (647) 555-0199";
  const address = details.address || "Toronto, Ontario, Canada";

  const items = [
    {
      id: "live_support",
      title: "Live Support",
      description: "Chat with our support team in real time.",
      imageKey: "headset",
      href: "#contact-form",
      target: "_self",
    },
    {
      id: "email_us",
      title: "Email Us",
      description: email,
      imageKey: "envelope",
      href: `mailto:${email}`,
      target: "_self",
    },
    {
      id: "call_us",
      title: "Call Us",
      description: phone,
      imageKey: "phone",
      href: `tel:${phone.replace(/[^\d+]/g, "")}`,
      target: "_self",
    },
    {
      id: "our_location",
      title: "Our Location",
      description: address,
      imageKey: "location",
      href: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      target: "_blank",
    },
  ];

  return (
    <div className="lg:col-span-5">
      <h2 className="text-2xl sm:text-[28px] font-bold text-[#01287b] leading-tight mb-6 sm:mb-7">
        Other Ways to Reach Us
      </h2>

      <motion.div
        variants={staggerContainer(0.1, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-3.5 sm:space-y-4"
      >
        {items.map((item) => (
          <motion.a
            key={item.id}
            href={item.href}
            target={item.target || "_self"}
            rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
            variants={fadeInUp}
            className="group flex items-center justify-between gap-4 p-4 sm:p-4.5 rounded-2xl sm:rounded-[22px] bg-[#f8faff] border border-[#e2edfa] hover:border-[#bfdbfe] hover:bg-[#eef6ff] hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <img
                src={channelImages[item.imageKey]}
                alt={item.title}
                className="w-11 h-11 sm:w-12 sm:h-12 object-contain shrink-0 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-[#01287b] group-hover:text-[#007be3] transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 truncate sm:whitespace-normal font-normal">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#e3efff] text-[#007be3] flex items-center justify-center shrink-0 group-hover:bg-[#007be3] group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200 shadow-2xs">
              <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default ContactChannels;
