import { getMeasurementConfig } from '../../constants/customSizeMeasurements';
import { formatMeasurement } from '../../utils/customSizeValidation';

const CustomSizeDisplay = ({ customSize, category }) => {
  const config = getMeasurementConfig(category);

  if (!customSize || !config) {
    return null;
  }

  return (
    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-lato font-semibold text-gray-700">Custom Measurements</h4>
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-msq-purple-rich text-white">
          Custom Size
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {config.fields.map(field => {
          const value = customSize[field.key];
          if (!value || isNaN(parseFloat(value))) {
            return null;
          }

          return (
            <div key={field.key} className="flex justify-between items-center">
              <span className="text-sm font-lato text-gray-600">{field.label}:</span>
              <span className="text-sm font-lato font-medium text-gray-900">
                {formatMeasurement(value)}
              </span>
            </div>
          );
        })}
      </div>

      {config.fields.every(
        field => !customSize[field.key] || isNaN(parseFloat(customSize[field.key]))
      ) && <p className="text-sm text-gray-500 font-lato italic">No measurements recorded</p>}
    </div>
  );
};

export default CustomSizeDisplay;
