import { forwardRef } from 'react';
import { getSanitizer } from '../../utils/getSanitizer';

const InputField = forwardRef(
  (
    {
      label,
      type = 'text',
      name,
      value,
      onChange,
      error,
      icon,
      iconPosition = 'right',
      adornment,
      placeholder,
      strength,
      as = 'input', // 'input' or 'textarea'
      className = '',
      labelClassName = '',
      required,
      sanitize = true,
      sanitizeType,
      onBlur: originalOnBlur,
      ...rest
    },
    ref
  ) => {
    const isTextarea = as === 'textarea';
    const iconOnLeft = iconPosition === 'left';
    const paddingClass = icon ? (iconOnLeft ? 'pl-10 pr-3' : 'pr-10 pl-3') : 'px-3';
    const iconPositionClass = iconOnLeft ? 'left-3' : 'right-3';
    const iconTopClass = isTextarea ? 'top-3' : 'top-1/2 -translate-y-1/2';

    // Put paddingClass after className so icon padding isn't overridden by custom classes
    const baseInputClasses = `w-full py-3 border border-gray-300 rounded-[18px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-lato text-gray-900 ${error ? 'border-red-500' : ''} ${className} ${paddingClass}`;
    const textareaClasses = isTextarea ? 'min-h-[80px] resize-none' : '';

    const InputComponent = isTextarea ? 'textarea' : 'input';

    // Sanitize value on blur
    const handleBlur = e => {
      if (!sanitize) {
        if (originalOnBlur) {
          originalOnBlur(e);
        }
        return;
      }

      // Skip sanitization for password and number inputs
      // Passwords: must preserve exact characters
      // Numbers: handled in onChange for real-time feedback
      if (type === 'password' || type === 'number') {
        if (originalOnBlur) {
          originalOnBlur(e);
        }
        return;
      }

      const sanitizer = getSanitizer(sanitizeType, type, isTextarea);
      const sanitizedValue = sanitizer(e.target.value);

      if (sanitizedValue !== e.target.value) {
        onChange({
          ...e,
          target: {
            ...e.target,
            name,
            value: sanitizedValue,
          },
        });
      }

      if (originalOnBlur) {
        originalOnBlur(e);
      }
    };

    // Handle number input changes with sanitization
    const handleChange = e => {
      if (type === 'number' && sanitize) {
        const sanitizer = getSanitizer(sanitizeType, type, isTextarea);
        const sanitizedValue = sanitizer(e.target.value);

        if (sanitizedValue !== e.target.value) {
          onChange({
            ...e,
            target: {
              ...e.target,
              name,
              value: sanitizedValue,
            },
          });
          return;
        }
      }

      // For other types, call onChange directly
      onChange(e);
    };

    return (
      <div className={label !== '' ? 'mb-4' : ''}>
        {label && label !== '' && (
          <label
            htmlFor={name}
            className={`block mb-1 text-left text-sm font-semibold text-gray-900 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <InputComponent
            ref={ref}
            type={isTextarea ? undefined : type}
            name={name}
            id={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`${baseInputClasses} ${textareaClasses}`}
            required={required}
            {...rest}
          />
          {icon && (
            <span className={`absolute ${iconPositionClass} ${iconTopClass} text-gray-400`}>
              {icon}
            </span>
          )}
          {adornment}
        </div>
        {error && <p className="text-red-500 text-sm mt-1 font-lato">{error}</p>}
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
