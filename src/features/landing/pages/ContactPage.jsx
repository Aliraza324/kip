import { ContactHeroSection, ContactFormSection } from "../components/contact";

export const ContactPage = () => {
  return (
    <div className="w-full bg-white text-[#1e293b]">
      {/* 1. Contact Hero Section */}
      <ContactHeroSection />

      {/* 2. Contact Form & Reach Us Section */}
      <ContactFormSection />
    </div>
  );
};

export default ContactPage;
