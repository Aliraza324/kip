/**
 * Landing & Website Hero Section Routes
 * Endpoints for Landing Content, Hero Sections, Contact Form, and Newsletter Subscription
 */
export const LANDING_ROUTES = {
  CONTENT: "/content",
  HERO: {
    GET_ALL: "/content",
    UPDATE: (section) => `/admin/content/${section}`,
    IMAGE: (section) => `/admin/content/${section}/image`,
    VIDEO: (section) => `/admin/content/${section}/video`,
  },
  CONTACT: {
    SUBMIT: "/contact",
  },
  NEWSLETTER: {
    SUBSCRIBE: "/newsletter",
  },
};

export default LANDING_ROUTES;
