import { useState, useEffect } from 'react';

import { getMeasurementConfig } from '../../constants/customSizeMeasurements';
import { initializeMeasurements } from '../../utils/customSizeValidation';
import { sanitizeMeasurement } from '../../utils/sanitization';

import CloseButton from '../ui/CloseButton';

const CustomSizeInput = ({
  category,
  measurements = {},
  onMeasurementsChange,
  onToggleCustomSize,
  isCustomSizeEnabled = false,
}) => {
  const [localMeasurements, setLocalMeasurements] = useState({});

  const config = getMeasurementConfig(category);

  // Initialize measurements when category changes
  useEffect(() => {
    if (config) {
      const initialMeasurements = initializeMeasurements(category);
      setLocalMeasurements(initialMeasurements);
      onMeasurementsChange(initialMeasurements);
    }
  }, [category, config, onMeasurementsChange]);

  // Update local measurements when prop changes
  useEffect(() => {
    if (measurements && Object.keys(measurements).length > 0) {
      setLocalMeasurements(measurements);
    }
  }, [measurements]);

  const handleInputChange = (fieldKey, value) => {
    // Sanitize measurement value
    const sanitizedValue = sanitizeMeasurement(value);
    const newMeasurements = { ...localMeasurements, [fieldKey]: sanitizedValue };
    setLocalMeasurements(newMeasurements);
    onMeasurementsChange(newMeasurements);

    // Enable custom sizing when user starts entering measurements
    if (!isCustomSizeEnabled && sanitizedValue && String(sanitizedValue).trim() !== '') {
      onToggleCustomSize(true);
    }
  };

  // Don't render if category doesn't support custom sizing
  if (!config) {
    return null;
  }

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-baseline gap-2 mb-2">
        <h2 className="text-base sm:text-lg lg:text-xl p-0 text-gray-900">Custom Size</h2>
        <span className="text-xs sm:text-sm top-2">
          <span className="mr-1">(</span>
          Inches
          <span className="ml-1">)</span>
        </span>
        {isCustomSizeEnabled && (
          <CloseButton
            onClose={() => onToggleCustomSize(false)}
            size={20}
            className="p-1"
            ariaLabel="Close custom size"
          />
        )}
      </div>

      {!isCustomSizeEnabled ? (
        <button
          type="button"
          onClick={() => onToggleCustomSize(true)}
          className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-msq-purple-rich rounded-md border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors duration-200 text-sm sm:text-base font-medium cursor-pointer"
        >
          Use Custom Size
        </button>
      ) : (
        <div className="border border-solid p-3 sm:p-4 border-msq-gold-light rounded-md bg-gray-50">
          {/* Measurement Fields */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {config.fields.map(field => (
              <div key={field.key} className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1 font-medium">{field.label}</label>
                <input
                  type="number"
                  value={localMeasurements[field.key] || ''}
                  onChange={e => handleInputChange(field.key, e.target.value)}
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm text-gray-900 focus:ring-2 focus:ring-msq-purple-rich focus:border-transparent"
                  placeholder={`${field.label}`}
                  min={field.min}
                  max={field.max}
                  step="0.1"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSizeInput;
