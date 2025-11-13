import { forwardRef } from 'react';
import InputField from './InputField';

const PhoneNumberField = forwardRef(
  ({ label, name, value, onChange, error, icon, required, className = '', ...rest }, ref) => {
    return (
      <div className={label ? 'mb-4' : ''}>
        {label && <label className="block mb-1 text-left text-sm font-semibold">{label}</label>}
        <div className="flex">
          <select
            className="px-3 py-3 border border-gray-300 border-r-0 rounded-l-lg focus:ring-2 focus:ring-msq-purple-rich focus:border-transparent transition-colors duration-200 font-lato cursor-pointer bg-gray-50"
            value="+233"
            disabled
          >
            <option value="+233">🇬🇭 +233</option>
          </select>
          <div className="relative flex-1">
            <InputField
              ref={ref}
              type="tel"
              name={name}
              value={value}
              onChange={onChange}
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
