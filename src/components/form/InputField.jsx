import { forwardRef } from 'react';

const InputField = forwardRef(
  ({ label, type, name, value, onChange, error, icon, adornment, placeholder, strength }, ref) => {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block mb-1 text-left text-sm font-semibold">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-3 pr-10 border border-gray-300 rounded-[18px] focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : ''}`}
          />
          {icon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
          )}
          {adornment}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {strength && (
          <p
            className={`text-sm mt-1 ${
              strength === 'Strong'
                ? 'text-green-600'
                : strength === 'Weak'
                  ? 'text-yellow-600'
                  : 'text-red-600'
            }`}
          >
            Password strength: {strength}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
