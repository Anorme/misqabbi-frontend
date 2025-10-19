import { getMeasurementConfig } from '../constants/customSizeMeasurements';

// Validate a single measurement value
export const validateMeasurement = (value, field) => {
  if (value === '' || value === null || value === undefined) {
    return { isValid: false, message: `${field.label} is required` };
  }

  const numValue = parseFloat(value);

  if (isNaN(numValue)) {
    return { isValid: false, message: `${field.label} must be a valid number` };
  }

  if (numValue <= 0) {
    return { isValid: false, message: `${field.label} must be greater than 0` };
  }

  if (numValue < field.min) {
    return { isValid: false, message: `${field.label} must be at least ${field.min} inches` };
  }

  if (numValue > field.max) {
    return { isValid: false, message: `${field.label} must be no more than ${field.max} inches` };
  }

  return { isValid: true, message: '' };
};

// Validate all measurements for a category
export const validateCustomSize = (measurements, category) => {
  const config = getMeasurementConfig(category);

  if (!config) {
    return { isValid: false, errors: { general: 'Custom sizing not available for this category' } };
  }

  const errors = {};
  let isValid = true;

  config.fields.forEach(field => {
    const validation = validateMeasurement(measurements[field.key], field);
    if (!validation.isValid) {
      errors[field.key] = validation.message;
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Check if all required measurements are filled
export const isCustomSizeComplete = (measurements, category) => {
  const config = getMeasurementConfig(category);

  if (!config) {
    return false;
  }

  return config.fields.every(field => {
    const value = measurements[field.key];
    return value !== '' && value !== null && value !== undefined && !isNaN(parseFloat(value));
  });
};

// Format measurement for display
export const formatMeasurement = value => {
  if (value === '' || value === null || value === undefined) {
    return '';
  }

  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return '';
  }

  return `${numValue.toFixed(1)}"`;
};

// Get measurement summary for display
export const getMeasurementSummary = (measurements, category) => {
  const config = getMeasurementConfig(category);

  if (!config || !measurements) {
    return '';
  }

  const filledMeasurements = config.fields
    .filter(field => measurements[field.key] && !isNaN(parseFloat(measurements[field.key])))
    .map(field => `${field.label}: ${formatMeasurement(measurements[field.key])}`)
    .join(', ');

  return filledMeasurements || 'No measurements entered';
};

// Initialize empty measurements object for a category
export const initializeMeasurements = category => {
  const config = getMeasurementConfig(category);

  if (!config) {
    return {};
  }

  const measurements = {};
  config.fields.forEach(field => {
    measurements[field.key] = '';
  });

  return measurements;
};
