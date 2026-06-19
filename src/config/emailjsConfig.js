/**
 * Centralized EmailJS configuration for Booking and Contact forms.
 * Edit this file to update your Service ID, Template ID, and Public Key.
 */
export const EMAILJS_CONFIG = {
  // Booking a Consultation Form Credentials
  BOOKING_FORM: {
    publicKey: "H8EVaEGdVRWQOiVqB", // Add your EmailJS Public Key here
    serviceId: "service_32ehy3p", // Add your EmailJS Service ID here
    templateId: "template_yt5eagr", // Add your EmailJS Template ID here
  },

  // Contact Page Form Credentials
  CONTACT_FORM: {
    publicKey: "H8EVaEGdVRWQOiVqB", // Add your EmailJS Public Key here
    serviceId: "service_32ehy3p", // Add your EmailJS Service ID here
    templateId: "template_kuhq59d", // Add your EmailJS Template ID here
  },

  // Common settings across both forms
  COMMON: {
    rateLimitDurationMs: 4000,    // Cooldown duration to prevent duplicate submissions
    timeoutMs: 10000,             // API request timeout duration
    successAlertDurationMs: 5000, // Duration to show the success message alert
    debug: process.env.NODE_ENV !== "production", // Enable verbose logging in development
  }
};
