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
 * @returns {Function} Sanitizer function (always returns a function, never null)
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
      case 'price':
        return sanitizePrice;
      case 'number':
        // Default number sanitization
        return value =>
          sanitizeNumber(value, {
            allowNegative: false,
            returnAsString: true,
          });
      default:
        // Unknown sanitizeType - default to text sanitization
        return sanitizeText;
    }
  }

  // Smart defaults based on type/as props (for backward compatibility)
  if (type === 'email') return sanitizeEmail;
  if (isTextarea) return sanitizeTextarea;
  if (type === 'number') {
    // Default number sanitization
    return value =>
      sanitizeNumber(value, {
        allowNegative: false,
        returnAsString: true,
      });
  }
  return sanitizeText; // Default for text inputs
};
