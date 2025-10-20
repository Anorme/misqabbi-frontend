const FormField = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  options = [],
  rows = 3,
}) => {
  const inputId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            id={inputId}
            value={value}
            onChange={e => onChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-msq-purple-rich focus:border-transparent ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select {label}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            id={inputId}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-msq-purple-rich focus:border-transparent ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        );

      case 'file':
        return (
          <div className="space-y-2">
            <div className="relative">
              <input
                id={inputId}
                type="file"
                accept="image/*"
                onChange={e => onChange(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                multiple
              />
              <div
                className={`flex items-center justify-center px-4 py-3 border-2 border-dashed rounded-lg transition-colors ${
                  error
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-msq-purple-rich'
                }`}
              >
                <div className="text-center">
                  <svg
                    className="mx-auto h-8 w-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-medium text-msq-purple-rich">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            {value && value.length > 0 && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <svg
                  className="h-4 w-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{value.length} file(s) selected</span>
              </div>
            )}
          </div>
        );

      default:
        return (
          <input
            id={inputId}
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-msq-purple-rich focus:border-transparent ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
