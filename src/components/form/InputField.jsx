import { forwardRef } from 'react';

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
      iconPosition = 'right', // 'left' or 'right'
      adornment,
      placeholder,
      strength,
      as = 'input', // 'input' or 'textarea'
      className = '',
      labelClassName = '',
      required,
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
    const baseInputClasses = `w-full py-3 border border-gray-300 rounded-[18px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-lato ${error ? 'border-red-500' : ''} ${className} ${paddingClass}`;
    const textareaClasses = isTextarea ? 'min-h-[80px] resize-none' : '';

    const InputComponent = isTextarea ? 'textarea' : 'input';

    return (
      <div className={label !== '' ? 'mb-4' : ''}>
        {label && label !== '' && (
          <label
            htmlFor={name}
            className={`block mb-1 text-left text-sm font-semibold ${labelClassName}`}
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
            onChange={onChange}
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
