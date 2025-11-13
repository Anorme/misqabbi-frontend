import validator from 'validator';
import DOMPurify from 'dompurify';

/**
 * Core sanitization utilities using Validator.js and DOMPurify
 */

/**
 * Sanitizes text input
 * @param {string} text - Text to sanitize
 * @param {object} options - Sanitization options
 * @returns {string} Sanitized text
 */
export const sanitizeText = (text, options = {}) => {
  if (!text || typeof text !== 'string') return '';

  const {
    maxLength = 1000,
    allowNewlines = false,
    normalizeWhitespace = true,
    removeControlChars = true,
  } = options;

  let sanitized = validator.trim(text);

  // Remove control characters (except newlines if allowed)
  if (removeControlChars) {
    sanitized = allowNewlines
      ? validator.stripLow(sanitized, true) // Keep newlines
      : validator.stripLow(sanitized); // Remove all control chars
  }

  // Normalize whitespace
  if (normalizeWhitespace) {
    if (allowNewlines) {
      // Normalize spaces and tabs, limit consecutive newlines
      sanitized = sanitized.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n');
    } else {
      // Replace all whitespace with single space
      sanitized = sanitized.replace(/\s+/g, ' ');
    }
  }

  // Escape HTML to prevent XSS
  sanitized = validator.escape(sanitized);

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
};

/**
 * Sanitizes names (full name, display name, etc.)
 * @param {string} name - Name to sanitize
 * @returns {string} Sanitized name
 */
export const sanitizeName = name => {
  if (!name || typeof name !== 'string') return '';

  let sanitized = validator.trim(name);

  // Remove control characters
  sanitized = validator.stripLow(sanitized);

  // Normalize whitespace
  sanitized = sanitized.replace(/\s+/g, ' ');

  // Escape HTML
  sanitized = validator.escape(sanitized);

  // Limit length (reasonable for names)
  if (sanitized.length > 100) {
    sanitized = sanitized.substring(0, 100);
  }

  return sanitized;
};

/**
 * Sanitizes addresses
 * @param {string} address - Address to sanitize
 * @returns {string} Sanitized address
 */
export const sanitizeAddress = address => {
  if (!address || typeof address !== 'string') return '';

  let sanitized = validator.trim(address);

  // Remove control characters (keep newlines for multi-line addresses)
  sanitized = validator.stripLow(sanitized, true);

  // Normalize whitespace but preserve line breaks
  sanitized = sanitized.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n');

  // Escape HTML
  sanitized = validator.escape(sanitized);

  // Limit length
  if (sanitized.length > 500) {
    sanitized = sanitized.substring(0, 500);
  }

  return sanitized;
};

/**
 * Sanitizes email addresses
 * @param {string} email - Email to sanitize
 * @returns {string} Sanitized email
 */
export const sanitizeEmail = email => {
  if (!email || typeof email !== 'string') return '';

  const trimmed = validator.trim(email);

  // Normalize email (lowercase, remove dots in Gmail, etc.)
  const normalized = validator.normalizeEmail(trimmed, {
    lowercase: true,
    gmail_remove_dots: false, // Keep dots in Gmail addresses
    gmail_remove_subaddress: false, // Keep + aliases
    outlookdotcom_remove_subaddress: false,
    yahoo_remove_subaddress: false,
    icloud_remove_subaddress: false,
  });

  // Return normalized if valid, otherwise return trimmed
  return normalized || trimmed;
};

/**
 * Sanitizes phone numbers
 * Note: This complements the existing formatPhoneNumberForStorage function
 * @param {string} phone - Phone number to sanitize
 * @returns {string} Sanitized phone number
 */
export const sanitizePhoneNumber = phone => {
  if (!phone || typeof phone !== 'string') return '';

  // Remove all non-numeric characters (except + for country codes)
  let sanitized = phone.replace(/[^\d+]/g, '');

  // Trim whitespace (though we've removed spaces above)
  sanitized = validator.trim(sanitized);

  return sanitized;
};

/**
 * Sanitizes numbers
 * @param {string|number} value - Number to sanitize
 * @param {object} options - Sanitization options
 * @returns {string|number} Sanitized number
 */
export const sanitizeNumber = (value, options = {}) => {
  const { min, max, decimals = 0, allowNegative = false, returnAsString = false } = options;

  if (value === '' || value === null || value === undefined) return returnAsString ? '' : '';

  // Convert to string and remove non-numeric characters (except decimal and minus)
  let cleaned = String(value).replace(/[^\d.-]/g, '');

  // Remove negative if not allowed
  if (!allowNegative) {
    cleaned = cleaned.replace(/-/g, '');
  }

  // Parse to number
  let num = parseFloat(cleaned);

  if (isNaN(num)) return returnAsString ? '' : '';

  // Apply constraints
  if (min !== undefined && num < min) num = min;
  if (max !== undefined && num > max) num = max;

  // Round to decimals
  if (decimals >= 0) {
    num = parseFloat(num.toFixed(decimals));
  }

  return returnAsString ? String(num) : num;
};

/**
 * Sanitizes prices (specific for currency values)
 * @param {string|number} price - Price to sanitize
 * @returns {number} Sanitized price
 */
export const sanitizePrice = price => {
  return sanitizeNumber(price, {
    min: 0,
    decimals: 2,
    allowNegative: false,
    returnAsString: false,
  });
};

/**
 * Sanitizes quantities (integers, non-negative)
 * @param {string|number} quantity - Quantity to sanitize
 * @returns {number} Sanitized quantity
 */
export const sanitizeQuantity = quantity => {
  const num = sanitizeNumber(quantity, {
    min: 0,
    decimals: 0,
    allowNegative: false,
    returnAsString: false,
  });
  return Math.floor(num);
};

/**
 * Sanitizes measurements (decimals allowed, positive)
 * @param {string|number} measurement - Measurement to sanitize
 * @returns {number} Sanitized measurement
 */
export const sanitizeMeasurement = measurement => {
  return sanitizeNumber(measurement, {
    min: 0,
    decimals: 1,
    allowNegative: false,
    returnAsString: false,
  });
};

/**
 * Sanitizes textarea content
 * @param {string} text - Textarea content to sanitize
 * @param {object} options - Sanitization options
 * @returns {string} Sanitized textarea content
 */
export const sanitizeTextarea = (text, options = {}) => {
  if (!text || typeof text !== 'string') return '';

  const { maxLength = 5000, allowHTML = false } = options;

  let sanitized = validator.trim(text);

  // Normalize line breaks (Windows/Mac/Unix compatibility)
  sanitized = sanitized.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Remove control characters (except newlines)
  sanitized = validator.stripLow(sanitized, true);

  // Sanitize HTML
  if (allowHTML) {
    // Use DOMPurify to sanitize HTML while allowing safe tags
    sanitized = DOMPurify.sanitize(sanitized, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3'],
      ALLOWED_ATTR: [],
    });
  } else {
    // Escape HTML to prevent XSS
    sanitized = validator.escape(sanitized);
  }

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
};

/**
 * Sanitizes messages (for contact forms, etc.)
 * @param {string} message - Message to sanitize
 * @returns {string} Sanitized message
 */
export const sanitizeMessage = message => {
  return sanitizeTextarea(message, {
    maxLength: 2000,
    allowHTML: false,
  });
};

/**
 * Sanitizes descriptions (product descriptions, etc.)
 * @param {string} description - Description to sanitize
 * @returns {string} Sanitized description
 */
export const sanitizeDescription = description => {
  return sanitizeTextarea(description, {
    maxLength: 5000,
    allowHTML: false, // Set to true if you want to allow basic HTML formatting
  });
};

/**
 * Sanitizes search queries
 * @param {string} query - Search query to sanitize
 * @returns {string} Sanitized search query
 */
export const sanitizeSearchQuery = query => {
  if (!query || typeof query !== 'string') return '';

  let sanitized = validator.trim(query);

  // Remove potentially dangerous characters
  sanitized = sanitized.replace(/[<>]/g, '');

  // Remove control characters
  sanitized = validator.stripLow(sanitized);

  // Escape HTML
  sanitized = validator.escape(sanitized);

  // Limit length (reasonable for search queries)
  if (sanitized.length > 100) {
    sanitized = sanitized.substring(0, 100);
  }

  return sanitized;
};

/**
 * Sanitizes HTML content (for rich text editors)
 * @param {string} html - HTML content to sanitize
 * @param {object} options - DOMPurify options
 * @returns {string} Sanitized HTML
 */
export const sanitizeHTML = (html, options = {}) => {
  if (!html || typeof html !== 'string') return '';

  const defaultOptions = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'a'],
    ALLOWED_ATTR: ['href', 'title'],
    ALLOW_DATA_ATTR: false,
  };

  return DOMPurify.sanitize(html, { ...defaultOptions, ...options });
};

/**
 * General utility: Remove control characters
 * @param {string} text - Text to clean
 * @param {boolean} keepNewlines - Whether to keep newline characters
 * @returns {string} Cleaned text
 */
export const removeControlCharacters = (text, keepNewlines = false) => {
  if (!text || typeof text !== 'string') return '';
  return keepNewlines ? validator.stripLow(text, true) : validator.stripLow(text);
};

/**
 * General utility: Normalize whitespace
 * @param {string} text - Text to normalize
 * @param {boolean} preserveNewlines - Whether to preserve newlines
 * @returns {string} Normalized text
 */
export const normalizeWhitespace = (text, preserveNewlines = false) => {
  if (!text || typeof text !== 'string') return '';

  if (preserveNewlines) {
    return text.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n');
  }

  return text.replace(/\s+/g, ' ');
};

/**
 * General utility: Limit string length
 * @param {string} text - Text to limit
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add if truncated (e.g., '...')
 * @returns {string} Truncated text
 */
export const limitLength = (text, maxLength, suffix = '') => {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};
