export const isValidEmail = email => /\S+@\S+\.\S+/.test(email);

export const isValidFullName = fullName => fullName.trim().length > 3;

export const isStrongPassword = password =>
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /\d/.test(password) &&
  /[^A-Za-z0-9]/.test(password);

/**
 * Returns a detailed error message explaining what's missing from the password
 * to meet the strength requirements
 */
export const getPasswordStrengthError = password => {
  if (!password) {
    return 'Password is required';
  }

  const requirements = [];

  if (password.length < 8) {
    requirements.push('at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    requirements.push('1 uppercase letter');
  }
  if (!/\d/.test(password)) {
    requirements.push('1 number');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    requirements.push('1 special character (e.g., !@#$%^&*)');
  }

  if (requirements.length === 0) {
    return null; // Password is strong
  }

  // Format the message
  const requirementsText = requirements.join(', ');

  return `Password must contain ${requirementsText}.`;
};

/**
 * Validates a phone number for Ghana (+233)
 * Returns an error message if invalid, or null if valid
 */
export const getPhoneNumberError = (phone, countryCode = '+233') => {
  if (!phone || phone.trim() === '') {
    return 'Phone number is required';
  }

  const cleanPhone = phone.replace(/\s+/g, '');

  // Basic validation - should be numeric
  if (!/^\d+$/.test(cleanPhone)) {
    return 'Phone number should contain only numbers';
  }

  // Length validation based on country code
  const lengthValidation = {
    '+233': { min: 9, max: 9 }, // Ghana
  };

  const validation = lengthValidation[countryCode] || { min: 7, max: 15 };

  if (cleanPhone.length < validation.min || cleanPhone.length > validation.max) {
    return `Phone number should be ${validation.min} digits for ${countryCode}`;
  }

  return null; // Valid
};

/**
 * Simple boolean check for phone number validity
 */
export const isValidPhoneNumber = (phone, countryCode = '+233') => {
  return getPhoneNumberError(phone, countryCode) === null;
};

/**
 * Formats a phone number for storage by removing leading 0 if present
 * This is common in Ghana where numbers like 0241234567 should become 241234567
 */
export const formatPhoneNumberForStorage = phone => {
  if (!phone) return phone;
  const trimmed = phone.trim();
  // Remove leading 0 if present
  return trimmed.startsWith('0') ? trimmed.substring(1) : trimmed;
};
