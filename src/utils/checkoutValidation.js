import { isValidEmail } from './validation';

/**
 * Validation utilities for checkout form fields
 */

// Ghana phone number patterns
const GHANA_PHONE_PATTERNS = [
  /^(\+233|0)?(24|54|55|59|20|50|26|56|27|57|28|58|23|53)[0-9]{7}$/, // Mobile
  /^(\+233|0)?(30|31|32|33|34|35|36|37|38|39)[0-9]{7}$/, // Mobile
];

export const validatePhoneNumber = (phone, countryCode = '+233') => {
  if (!phone || phone.trim() === '') {
    return { isValid: false, message: 'Phone number is required' };
  }

  const cleanPhone = phone.replace(/\s+/g, '');

  // Basic validation - should be numeric and reasonable length
  if (!/^\d+$/.test(cleanPhone)) {
    return {
      isValid: false,
      message: 'Phone number should contain only numbers',
    };
  }

  // Length validation based on country code
  const lengthValidation = {
    '+233': { min: 9, max: 9 }, // Ghana
  };

  const validation = lengthValidation[countryCode] || { min: 7, max: 15 };

  if (cleanPhone.length < validation.min || cleanPhone.length > validation.max) {
    return {
      isValid: false,
      message: `Phone number should be ${validation.min}-${validation.max} digits for ${countryCode}`,
    };
  }

  return { isValid: true, message: '' };
};

export const validateEmail = email => {
  if (!email || email.trim() === '') {
    return { isValid: false, message: 'Email is required' };
  }

  const isValid = isValidEmail(email);

  return { isValid, message: isValid ? '' : 'Please enter a valid email address' };
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return { isValid: false, message: `${fieldName} is required` };
  }

  return { isValid: true, message: '' };
};

export const validateDeliveryAddress = address => {
  if (!address || address.trim() === '') {
    return { isValid: false, message: 'Delivery address is required' };
  }

  if (address.trim().length < 10) {
    return { isValid: false, message: 'Please provide a more detailed address' };
  }

  return { isValid: true, message: '' };
};

// Validate entire checkout form
export const validateCheckoutForm = formData => {
  const errors = {};

  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }

  // Validate phone
  const phoneValidation = validatePhoneNumber(formData.phone, formData.countryCode);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.message;
  }

  // Validate delivery address
  const addressValidation = validateDeliveryAddress(formData.deliveryAddress);
  if (!addressValidation.isValid) {
    errors.deliveryAddress = addressValidation.message;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
