import {
  ContactHeroSection,
  ContactFormSection,
  ContactDemoSection,
} from "../components/contact";

export const ContactPage = () => {
  return (
    <div className="w-full bg-white text-[#1e293b]">
      {/* 1. Contact Hero Section */}
      <ContactHeroSection />

      {/* 2. Contact Form & Reach Us Section */}
      <ContactFormSection />

      {/* 3. Book a Quick Demo Banner Section */}
      <ContactDemoSection />
    </div>
  );
};

export default ContactPage;
