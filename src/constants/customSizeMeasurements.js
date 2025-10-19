// Custom size measurement configurations by product category
// All measurements are in inches

export const CUSTOM_SIZE_MEASUREMENTS = {
  pants: {
    category: 'pants',
    fields: [
      { key: 'waist', label: 'Waist', min: 20, max: 60 },
      { key: 'hip', label: 'Hip', min: 25, max: 70 },
      { key: 'length', label: 'Length', min: 20, max: 50 },
    ],
  },
  shorts: {
    category: 'shorts',
    fields: [
      { key: 'waist', label: 'Waist', min: 20, max: 60 },
      { key: 'hip', label: 'Hip', min: 25, max: 70 },
      { key: 'length', label: 'Length', min: 5, max: 25 },
    ],
  },
  skirts: {
    category: 'skirts',
    fields: [
      { key: 'waist', label: 'Waist', min: 20, max: 60 },
      { key: 'hip', label: 'Hip', min: 25, max: 70 },
      { key: 'length', label: 'Length', min: 10, max: 40 },
    ],
  },
  dresses: {
    category: 'dresses',
    fields: [
      { key: 'bust', label: 'Bust', min: 25, max: 60 },
      { key: 'waist', label: 'Waist', min: 20, max: 60 },
      { key: 'hip', label: 'Hip', min: 25, max: 70 },
      { key: 'shoulderWidth', label: 'Shoulder Width', min: 10, max: 25 },
      { key: 'length', label: 'Length', min: 20, max: 60 },
    ],
  },
  tops: {
    category: 'tops',
    fields: [
      { key: 'bust', label: 'Bust', min: 25, max: 60 },
      { key: 'waist', label: 'Waist', min: 20, max: 60 },
      { key: 'hip', label: 'Hip', min: 25, max: 70 },
      { key: 'shoulderWidth', label: 'Shoulder Width', min: 10, max: 25 },
      { key: 'length', label: 'Length', min: 15, max: 40 },
      { key: 'aroundArm', label: 'Around Arm', min: 8, max: 25 },
      { key: 'sleeveLength', label: 'Sleeve Length', min: 5, max: 30 },
    ],
  },
  dungarees: {
    category: 'dungarees',
    fields: [
      { key: 'bust', label: 'Bust', min: 25, max: 60 },
      { key: 'torsoLength', label: 'Shoulder to Waist', min: 15, max: 35 },
      { key: 'waist', label: 'Waist', min: 20, max: 60 },
      { key: 'hip', label: 'Hip', min: 25, max: 70 },
      { key: 'length', label: 'Length', min: 20, max: 50 },
    ],
  },
};

// Helper function to get measurement config by category
export const getMeasurementConfig = category => {
  const normalizedCategory = category?.toLowerCase();
  return CUSTOM_SIZE_MEASUREMENTS[normalizedCategory] || null;
};

// Helper function to get all available categories
export const getAvailableCategories = () => {
  return Object.keys(CUSTOM_SIZE_MEASUREMENTS);
};

// Helper function to validate if a category supports custom sizing
export const supportsCustomSizing = category => {
  return getMeasurementConfig(category) !== null;
};
