/**
 * Mock data for Contact Landing Page
 * Synchronized with KIPClassin visual specifications
 */
export const contactHeroMock = {
  badge: "CONTACT US",
  headingLine1: "Let's Talk!",
  headingLine2Prefix: "We're Here to ",
  headingLine2Accent: "Help.",
  description:
    "Have questions, need support, or want to learn more about KIPClassin? Reach out to our team — we'd love to hear from you.",
  pills: [
    {
      id: "quick_support",
      label: "Quick Support",
      iconType: "Headphones",
      color: "#febf11",
    },
    {
      id: "helpful_guidance",
      label: "Helpful Guidance",
      iconType: "MessageCircle",
      color: "#007be3",
    },
  ],
};

export const contactFormSectionMock = {
  form: {
    title: "Send Us a Message",
    subtitle:
      "Fill out the form below and our team will get back to you as soon as possible.",
    fields: {
      firstName: {
        id: "firstName",
        placeholder: "First Name *",
        type: "text",
        required: true,
      },
      lastName: {
        id: "lastName",
        placeholder: "Last Name *",
        type: "text",
        required: true,
      },
      email: {
        id: "email",
        placeholder: "Email Address *",
        type: "email",
        required: true,
      },
      subject: {
        id: "subject",
        placeholder: "Subject *",
        required: true,
        options: [
          { value: "", label: "Subject *" },
          { value: "general", label: "General Inquiry" },
          { value: "support", label: "Technical Support" },
          { value: "courses", label: "Courses & Programs" },
          { value: "billing", label: "Billing & Subscriptions" },
          { value: "partnership", label: "Partnership" },
        ],
      },
      message: {
        id: "message",
        placeholder: "Your Message *",
        required: true,
        rows: 4,
      },
    },
    submitButton: {
      label: "Send Message",
    },
    successMessage: "Thank you! Your message has been sent successfully.",
    validation: {
      firstNameRequired: "First name is required",
      lastNameRequired: "Last name is required",
      emailRequired: "Email address is required",
      emailInvalid: "Please enter a valid email address",
      subjectRequired: "Please select a subject",
      messageRequired: "Message is required",
      messageMin: "Message must be at least 10 characters",
    },
  },
  channels: {
    title: "Other Ways to Reach Us",
    items: [
      {
        id: "live_support",
        title: "Live Support",
        description: "Chat with our support team in real time.",
        imageKey: "headset",
        href: "#",
      },
      {
        id: "email_us",
        title: "Email Us",
        description: "support@kipclassin.com",
        imageKey: "envelope",
        href: "mailto:support@kipclassin.com",
      },
      {
        id: "call_us",
        title: "Call Us",
        description: "+1 (800) 123-4567",
        imageKey: "phone",
        href: "tel:+18001234567",
      },
      {
        id: "our_location",
        title: "Our Location",
        description: "123 Learning Ave, Toronto, ON, Canada",
        imageKey: "location",
        href: "https://maps.google.com/?q=Toronto+ON+Canada",
      },
    ],
  },
};


