import { isValidEmail, getPhoneNumberError } from './validation';

/**
 * Validation utilities for checkout form fields
 */

export const validatePhoneNumber = (phone, countryCode = '+233') => {
  const error = getPhoneNumberError(phone, countryCode);
  return {
    isValid: error === null,
    message: error || '',
  };
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
