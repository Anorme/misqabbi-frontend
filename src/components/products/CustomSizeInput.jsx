import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getMeasurementConfig } from '../../constants/customSizeMeasurements';
import { initializeMeasurements } from '../../utils/customSizeValidation';

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
    const newMeasurements = { ...localMeasurements, [fieldKey]: value };
    setLocalMeasurements(newMeasurements);
    onMeasurementsChange(newMeasurements);

    // Enable custom sizing when user starts entering measurements
    if (!isCustomSizeEnabled && value && value.trim() !== '') {
      onToggleCustomSize(true);
    }
  };

  // Don't render if category doesn't support custom sizing
  if (!config) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl px-1">Custom Size</h2>
        {isCustomSizeEnabled && (
          <button
            type="button"
            onClick={() => onToggleCustomSize(false)}
            className="p-1 transition-colors duration-200"
            title="Close custom size"
          >
            <X size={20} className="text-gray-500 hover:text-red-600 cursor-pointer" />
          </button>
        )}
      </div>

      {!isCustomSizeEnabled ? (
        <button
          type="button"
          onClick={() => onToggleCustomSize(true)}
          className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-msq-purple-rich rounded-md border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors duration-200 font-medium cursor-pointer"
        >
          Use Custom Size
        </button>
      ) : (
        <div className="border border-solid p-4 border-msq-gold-light rounded-md bg-gray-50">
          {/* Measurement Fields */}
          <div className="grid grid-cols-3 gap-3">
            {config.fields.map(field => (
              <div key={field.key} className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1 font-medium">{field.label}</label>
                <input
                  type="number"
                  value={localMeasurements[field.key] || ''}
                  onChange={e => handleInputChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-msq-purple-rich focus:border-transparent"
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
