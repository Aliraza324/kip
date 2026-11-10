/**
 * Global Framer Motion Animation Variants & Helpers
 * Tailored for KIPClassin EdTech Landing Pages - On-Scroll Animations
 */

// Viewport configuration for scroll-triggered animations
// once: false allows animations to trigger on scroll up & down
export const scrollViewport = {
  once: false,
  amount: 0.15,
};

export const scrollViewportOnce = {
  once: true,
  amount: 0.15,
};

// Default alias
export const viewportConfig = scrollViewport;

export const TRANSITION_SMOOTH = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1],
};

export const TRANSITION_SPRING = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

// Scroll Reveal: Fade In
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: TRANSITION_SMOOTH,
  },
};

// Scroll Reveal: Fade In Up (Smooth elevation on scroll)
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_SMOOTH,
  },
};

// Scroll Reveal: Fade In Down
export const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_SMOOTH,
  },
};

// Scroll Reveal: Fade In from Left
export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: TRANSITION_SMOOTH,
  },
};

// Scroll Reveal: Fade In from Right
export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: TRANSITION_SMOOTH,
  },
};

// Scroll Reveal: Scale & Zoom In
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: TRANSITION_SMOOTH,
  },
};

// Scroll Stagger Container (Parent wrapper that staggers its children on scroll)
export const staggerContainer = (staggerChildren = 0.14, delayChildren = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Floating Badge Animation (Infinite subtle levitation loop)
export const floatingBadge = (offset = 6, duration = 3.5) => ({
  animate: {
    y: [-offset, offset, -offset],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});

// Card Hover & Tap Micro-interactions
export const cardHover = {
  rest: { y: 0 },
  hover: {
    y: -6,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  tap: { scale: 0.98 },
};

// Button Micro-interactions
export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.2 } },
  tap: { scale: 0.96 },
};
