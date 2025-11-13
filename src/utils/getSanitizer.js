import {
  sanitizeText,
  sanitizeEmail,
  sanitizeNumber,
  sanitizeTextarea,
  sanitizeName,
  sanitizeAddress,
  sanitizeMessage,
  sanitizeDescription,
  sanitizePrice,
} from './sanitization';

/**
 * Returns the appropriate sanitizer function based on sanitizeType or input type
 * @param {string} sanitizeType - Explicit sanitization type ('name', 'email', 'address', 'message', 'description', 'text', 'textarea', 'number', 'price')
 * @param {string} type - HTML input type ('text', 'email', 'number', etc.)
 * @param {boolean} isTextarea - Whether the input is a textarea
 * @returns {Function|null} Sanitizer function or null if sanitization should happen in onChange (for numbers)
 */
export const getSanitizer = (sanitizeType, type, isTextarea = false) => {
  // If explicit sanitizeType provided, use it
  if (sanitizeType) {
    switch (sanitizeType) {
      case 'name':
        return sanitizeName;
      case 'email':
        return sanitizeEmail;
      case 'address':
        return sanitizeAddress;
      case 'message':
        return sanitizeMessage;
      case 'description':
        return sanitizeDescription;
      case 'textarea':
        return sanitizeTextarea;
      case 'text':
        return sanitizeText;
      case 'number':
      case 'price':
        // Number sanitization happens in onChange, not onBlur
        return null;
      default:
        // Unknown sanitizeType - default to text sanitization
        return sanitizeText;
    }
  }

  // Smart defaults based on type/as props (for backward compatibility)
  if (type === 'email') return sanitizeEmail;
  if (isTextarea) return sanitizeTextarea;
  if (type === 'number') return null; // Handled in onChange
  return sanitizeText; // Default for text inputs
};

/**
 * Returns the appropriate number sanitizer function
 * @param {string} sanitizeType - Explicit sanitization type ('price', 'quantity', 'measurement', etc.)
 * @returns {Function} Number sanitizer function
 */
export const getNumberSanitizer = sanitizeType => {
  if (sanitizeType === 'price') {
    return sanitizePrice;
  }
  // Default number sanitization
  return value =>
    sanitizeNumber(value, {
      allowNegative: false,
      returnAsString: true,
    });
};
