import { forwardRef } from 'react';
import InputField from './InputField';
import { formatPhoneNumberForStorage } from '../../utils/validation';

const PhoneNumberField = forwardRef(
  (
    { label, name, value, onChange, error, icon, required, className = '', onBlur, ...rest },
    ref
  ) => {
    const handleBlur = e => {
      // Format phone number on blur (remove leading 0 if present)
      const formattedValue = formatPhoneNumberForStorage(e.target.value);
      if (formattedValue !== e.target.value) {
        // Create a synthetic event with the formatted value
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            name,
            value: formattedValue,
          },
        };
        onChange(syntheticEvent);
      }
      // Call original onBlur if provided
      if (onBlur) {
        onBlur(e);
      }
    };

    return (
      <div className={label ? 'mb-4' : ''}>
        {label && (
          <label className="block mb-1 text-left text-sm font-semibold text-gray-900">
            {label}
          </label>
        )}
        <div className="flex items-stretch">
          <div
            className="flex items-center shrink-0 px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-500 font-lato text-sm select-none"
            aria-hidden="true"
          >
            +233
          </div>
          <div className="relative flex-1 min-w-0">
            <InputField
              ref={ref}
              type="tel"
              name={name}
              value={value}
              onChange={onChange}
              onBlur={handleBlur}
              placeholder="241234567"
              icon={icon}
              iconPosition="left"
              error={error}
              required={required}
              className={`rounded-l-none border-l-0 rounded-r-lg focus:ring-msq-purple-rich mb-0 ${className}`}
              pattern="[0-9]*"
              inputMode="numeric"
              label=""
              {...rest}
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-1 font-lato">{error}</p>}
      </div>
    );
  }
);

PhoneNumberField.displayName = 'PhoneNumberField';

export default PhoneNumberField;
