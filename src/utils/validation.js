export const isValidEmail = email => /\S+@\S+\.\S+/.test(email);

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
