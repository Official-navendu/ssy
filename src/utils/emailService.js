import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "../config/emailjsConfig";

// Keep track of submission timestamps per form type for rate limiting
const lastSubmissionTimestamps = {};

/**
 * Validates an email address format.
 */
export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase().trim());
};

/**
 * Trims and checks if a value is empty.
 */
export const isRequiredFieldEmpty = (value) => {
  if (value === null || value === undefined) return true;
  return String(value).trim() === "";
};

/**
 * Reusable service function to submit form data to EmailJS.
 * 
 * @param {string} formKey - Key matching EMAILJS_CONFIG (e.g. 'BOOKING_FORM' or 'CONTACT_FORM')
 * @param {Object} templateParams - Key-value parameters matching the EmailJS template variables
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const sendEmailParams = async (formKey, templateParams) => {
  const formConfig = EMAILJS_CONFIG[formKey];
  const { debug, rateLimitDurationMs, timeoutMs } = EMAILJS_CONFIG.COMMON;

  if (!formConfig) {
    const errorMsg = `EmailJS Configuration Error: Key "${formKey}" is missing.`;
    if (debug) console.error(errorMsg);
    return { success: false, error: "System configuration error. Please try again later." };
  }

  const { publicKey, serviceId, templateId } = formConfig;

  // 1. Check if EmailJS credentials are set
  if (!publicKey || !serviceId || !templateId) {
    const errorMsg = `EmailJS Configuration Warning: Missing credentials in ${formKey}. Please edit "src/config/emailjsConfig.js".`;
    if (debug) {
      console.warn(errorMsg);
      console.log("Mocking successful email submit in development mode with parameters:", templateParams);
      // Simulate network delay and return mock success for smooth development testing
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true };
    }
    return { success: false, error: "Email service is temporarily unavailable. Please try again later." };
  }

  // 2. Prevent duplicate clicks / rate limiting
  const now = Date.now();
  const lastTime = lastSubmissionTimestamps[formKey] || 0;
  if (now - lastTime < rateLimitDurationMs) {
    const remainingSecs = Math.ceil((rateLimitDurationMs - (now - lastTime)) / 1000);
    return { 
      success: false, 
      error: `Please wait ${remainingSecs} second${remainingSecs > 1 ? "s" : ""} before submitting again.` 
    };
  }

  try {
    // 3. Initialize EmailJS with Public Key
    emailjs.init(publicKey);

    // 4. Create timeout promise to prevent infinite hanging
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
    );

    // 5. Submit to EmailJS, raced with timeout
    if (debug) console.log(`Sending EmailJS request for ${formKey} with params:`, templateParams);
    
    await Promise.race([
      emailjs.send(serviceId, templateId, templateParams),
      timeoutPromise
    ]);

    // Record submission time on success
    lastSubmissionTimestamps[formKey] = now;
    
    if (debug) console.log(`EmailJS request for ${formKey} sent successfully.`);
    return { success: true };

  } catch (error) {
    if (debug) console.error(`EmailJS error sending ${formKey}:`, error);
    
    const friendlyError = error?.message === "Request timed out"
      ? "Connection timed out. Please check your network and try again."
      : "Failed to send message. Please verify your connection or try again later.";

    return { success: false, error: friendlyError };
  }
};
