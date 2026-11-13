import toast from "react-hot-toast";

/**
 * Standard Toast Notification Utilities for KIPClassin
 */
export const showToast = {
  success: (message, options = {}) => {
    return toast.success(message, {
      duration: 3000,
      style: {
        borderRadius: "14px",
        background: "#0f172a",
        color: "#f8fafc",
        border: "1px solid rgba(255,255,255,0.12)",
        fontSize: "13px",
        fontWeight: "600",
      },
      ...options,
    });
  },

  error: (message, options = {}) => {
    return toast.error(message, {
      duration: 4000,
      style: {
        borderRadius: "14px",
        background: "#0f172a",
        color: "#f8fafc",
        border: "1px solid rgba(244,63,94,0.3)",
        fontSize: "13px",
        fontWeight: "600",
      },
      ...options,
    });
  },

  info: (message, options = {}) => {
    return toast(message, {
      icon: "ℹ️",
      duration: 3500,
      style: {
        borderRadius: "14px",
        background: "#0f172a",
        color: "#f8fafc",
        border: "1px solid rgba(56,189,248,0.3)",
        fontSize: "13px",
        fontWeight: "600",
      },
      ...options,
    });
  },

  verificationInProgress: (
    message = "Verification in progress. Your account is being reviewed by administration."
  ) => {
    return toast(message, {
      icon: "⏳",
      duration: 4500,
      style: {
        borderRadius: "14px",
        background: "#1e293b",
        color: "#f8fafc",
        border: "1px solid rgba(251,191,36,0.35)",
        fontSize: "13px",
        fontWeight: "600",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
      },
    });
  },

  welcomeDashboard: (message = "Welcome to Dashboard!") => {
    return toast.success(message, {
      duration: 3500,
      style: {
        borderRadius: "14px",
        background: "#0f172a",
        color: "#f8fafc",
        border: "1px solid rgba(34,197,94,0.35)",
        fontSize: "13px",
        fontWeight: "600",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
      },
    });
  },
};

export default showToast;

