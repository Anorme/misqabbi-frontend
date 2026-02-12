import { useState, useRef, useEffect } from 'react';
import { User, Mail, Phone, Shirt, FileText, ImageIcon, X } from 'lucide-react';
import { useAuthState } from '../../contexts/auth/useAuth';
import { submitBespokeRequest } from '../../api/bespoke';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';
import { isValidEmail } from '../../utils/validation';
import {
  sanitizeName,
  sanitizeEmail,
  sanitizeMessage,
  sanitizeMeasurement,
} from '../../utils/sanitization';
import InputField from '../form/InputField';
import PhoneNumberField from '../form/PhoneNumberField';
import { CATEGORIES } from '../../constants/categories';
import { getMeasurementConfig } from '../../constants/customSizeMeasurements';
import { initializeMeasurements } from '../../utils/customSizeValidation';

const MAX_PHOTOS = 5;
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// Garment type options: placeholder + established categories + Other
const GARMENT_OPTIONS = [
  { value: '', label: 'Select garment type' },
  ...CATEGORIES.filter(c => c.value !== '').map(c => ({ value: c.value, label: c.label })),
  { value: 'other', label: 'Other' },
];

const BespokeRequestForm = () => {
  const { isAuthenticated, currentUser } = useAuthState();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    measurements: {},
    garmentType: '',
    garmentTypeOther: '',
    measurementsOther: '',
    styleNotes: '',
    description: '',
  });
  const [referencePhotos, setReferencePhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const measurementConfig = getMeasurementConfig(formData.garmentType);

  // Reset measurements when garment type changes so the right fields appear
  useEffect(() => {
    if (formData.garmentType && formData.garmentType !== 'other') {
      setFormData(prev => ({
        ...prev,
        measurements: initializeMeasurements(formData.garmentType),
        garmentTypeOther: '',
        measurementsOther: '',
      }));
    } else if (formData.garmentType === 'other') {
      setFormData(prev => ({
        ...prev,
        measurements: {},
        measurementsOther: prev.measurementsOther ?? '',
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        measurements: {},
        garmentTypeOther: '',
        measurementsOther: '',
      }));
    }
  }, [formData.garmentType]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleMeasurementChange = (fieldKey, value) => {
    const sanitized = sanitizeMeasurement(value);
    const displayValue = value === '' ? '' : sanitized;
    setFormData(prev => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [fieldKey]: displayValue,
      },
    }));
    setErrors(prev => {
      const { [fieldKey]: _, ...rest } = prev;
      return rest;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isAuthenticated) {
      if (!formData.fullName?.trim()) newErrors.fullName = 'Name is required';
      if (!formData.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (referencePhotos.length > MAX_PHOTOS) {
      newErrors.referencePhotos = `Maximum ${MAX_PHOTOS} photos allowed`;
    }
    const oversized = referencePhotos.find(f => f.size > MAX_FILE_SIZE_BYTES);
    if (oversized) {
      newErrors.referencePhotos = `Each file must be under ${MAX_FILE_SIZE_MB}MB`;
    }

    return newErrors;
  };

  const handleFileChange = e => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const valid = files.filter(f => f.type.startsWith('image/') && f.size <= MAX_FILE_SIZE_BYTES);
    setReferencePhotos(prev => {
      const combined = [...prev, ...valid].slice(0, MAX_PHOTOS);
      return combined;
    });
    if (errors.referencePhotos) {
      setErrors(prev => {
        const { referencePhotos: _, ...rest } = prev;
        return rest;
      });
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removePhoto = index => {
    setReferencePhotos(prev => prev.filter((_, i) => i !== index));
    if (errors.referencePhotos) {
      setErrors(prev => {
        const { referencePhotos: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        garmentType: formData.garmentType || undefined,
        garmentTypeOther:
          formData.garmentType === 'other'
            ? formData.garmentTypeOther?.trim() || undefined
            : undefined,
        measurements:
          formData.garmentType === 'other'
            ? formData.measurementsOther?.trim() || undefined
            : formData.garmentType && measurementConfig
              ? formData.measurements
              : undefined,
        styleNotes: formData.styleNotes?.trim() || undefined,
        description: sanitizeMessage(formData.description),
        referencePhotos,
      };
      if (!isAuthenticated) {
        payload.fullName = sanitizeName(formData.fullName);
        payload.email = sanitizeEmail(formData.email);
        payload.phone = formData.phone?.trim() || undefined;
      } else {
        payload.fullName = currentUser?.displayName ?? '';
        payload.email = currentUser?.email ?? '';
      }

      const result = await submitBespokeRequest(payload);
      showSuccessToast(result.message);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        measurements: {},
        garmentType: '',
        garmentTypeOther: '',
        measurementsOther: '',
        styleNotes: '',
        description: '',
      });
      setReferencePhotos([]);
      setErrors({});
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      showErrorToast(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const customInputClasses =
    'py-2 sm:py-2.5 text-sm border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:border-msq-purple-rich focus:ring-1 focus:ring-msq-purple-rich/20 text-gray-900 placeholder:text-gray-400';
  const customTextareaClasses = `${customInputClasses} min-h-[80px] sm:min-h-[100px]`;

  return (
    <div className="w-full px-2 sm:px-3 lg:px-6 py-6 sm:py-8 lg:py-12 bg-gradient-to-b from-gray-50/40 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Form column: narrower form card, centered */}
          <div className="lg:col-span-7 flex justify-center lg:justify-start">
            <div className="w-full max-w-2xl bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl p-4 sm:p-5 lg:p-6 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-left">
                {isAuthenticated ? (
                  <p className="text-sm text-gray-600 font-lato py-1">
                    Submitting as{' '}
                    <span className="font-medium text-msq-purple-rich">
                      {currentUser?.displayName || currentUser?.email || 'you'}
                    </span>
                  </p>
                ) : (
                  <>
                    <div className="group">
                      <InputField
                        label={
                          <>
                            Full name <span className="text-red-500">*</span>
                          </>
                        }
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        icon={<User size={14} strokeWidth={1.5} className="sm:w-4 sm:h-4" />}
                        iconPosition="left"
                        error={errors.fullName}
                        required
                        sanitizeType="name"
                        className={customInputClasses}
                        labelClassName="text-xs font-medium text-gray-700 mb-1 sm:mb-1.5"
                        aria-required="true"
                        aria-invalid={errors.fullName ? 'true' : 'false'}
                      />
                    </div>
                    <div className="group">
                      <InputField
                        label={
                          <>
                            Email <span className="text-red-500">*</span>
                          </>
                        }
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        icon={<Mail size={14} strokeWidth={1.5} className="sm:w-4 sm:h-4" />}
                        iconPosition="left"
                        error={errors.email}
                        required
                        sanitizeType="email"
                        className={customInputClasses}
                        labelClassName="text-xs font-medium text-gray-700 mb-1 sm:mb-1.5"
                        aria-required="true"
                        aria-invalid={errors.email ? 'true' : 'false'}
                      />
                    </div>
                    <div className="group">
                      <PhoneNumberField
                        label="Phone (optional)"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="241234567"
                        icon={<Phone size={14} strokeWidth={1.5} className="sm:w-4 sm:h-4" />}
                        error={errors.phone}
                        className={customInputClasses}
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1 sm:mb-1.5">
                    Garment type (optional)
                  </label>
                  <select
                    name="garmentType"
                    value={formData.garmentType}
                    onChange={handleInputChange}
                    className={`w-full py-2 sm:py-2.5 px-3 text-sm border rounded-lg font-lato text-gray-900 bg-gray-50/50 focus:bg-white focus:border-msq-purple-rich focus:ring-1 focus:ring-msq-purple-rich/20 ${errors.garmentType ? 'border-red-500' : 'border-gray-200'}`}
                  >
                    {GARMENT_OPTIONS.map(opt => (
                      <option key={opt.value || 'empty'} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.garmentType === 'other' && (
                  <div className="group">
                    <InputField
                      label="Please specify garment type (optional)"
                      type="text"
                      name="garmentTypeOther"
                      value={formData.garmentTypeOther}
                      onChange={handleInputChange}
                      placeholder="e.g. Blouse, Cape, Jumpsuit"
                      className={customInputClasses}
                      labelClassName="text-xs font-medium text-gray-700 mb-1 sm:mb-1.5"
                    />
                  </div>
                )}

                <div className="group">
                  <div className="flex items-baseline gap-2 mb-2">
                    <label className="block text-xs font-medium text-gray-700">
                      Measurements (optional)
                    </label>
                    {formData.garmentType !== 'other' && measurementConfig && (
                      <span className="text-xs text-gray-500">Inches</span>
                    )}
                  </div>
                  {!formData.garmentType ? (
                    <p className="text-xs text-gray-500 py-2 font-lato">
                      Select a garment type above to enter measurements.
                    </p>
                  ) : formData.garmentType === 'other' ? (
                    <InputField
                      label=""
                      name="measurementsOther"
                      value={formData.measurementsOther}
                      onChange={handleInputChange}
                      placeholder="e.g. bust 34, waist 28, length 42 (inches) or your preferred format"
                      as="textarea"
                      sanitizeType="message"
                      className={customTextareaClasses}
                    />
                  ) : measurementConfig ? (
                    <div className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50/50">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {measurementConfig.fields.map(field => (
                          <div key={field.key} className="flex flex-col">
                            <label
                              htmlFor={`measurement-${field.key}`}
                              className="text-xs text-gray-600 mb-1 font-medium"
                            >
                              {field.label}
                            </label>
                            <input
                              id={`measurement-${field.key}`}
                              type="number"
                              value={formData.measurements[field.key] ?? ''}
                              onChange={e => handleMeasurementChange(field.key, e.target.value)}
                              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-900 focus:ring-1 focus:ring-msq-purple-rich focus:border-msq-purple-rich font-lato bg-white"
                              placeholder={field.label}
                              min={field.min}
                              max={field.max}
                              step="0.1"
                              aria-label={field.label}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 py-2 font-lato">
                      Add any measurement notes in the description below.
                    </p>
                  )}
                </div>

                <div className="group">
                  <InputField
                    label="Style notes (optional)"
                    name="styleNotes"
                    value={formData.styleNotes}
                    onChange={handleInputChange}
                    placeholder="Fabric, colour, fit preferences..."
                    icon={<Shirt size={14} strokeWidth={1.5} className="sm:w-4 sm:h-4" />}
                    iconPosition="left"
                    className={customInputClasses}
                    labelClassName="text-xs font-medium text-gray-700 mb-1 sm:mb-1.5"
                  />
                </div>

                <div className="group">
                  <InputField
                    label={
                      <>
                        Describe what you want created or re-created{' '}
                        <span className="text-red-500">*</span>
                      </>
                    }
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell us your vision in detail..."
                    icon={<FileText size={14} strokeWidth={1.5} className="sm:w-4 sm:h-4" />}
                    iconPosition="left"
                    as="textarea"
                    sanitizeType="description"
                    error={errors.description}
                    required
                    className={customTextareaClasses}
                    labelClassName="text-xs font-medium text-gray-700 mb-1 sm:mb-1.5"
                    aria-required="true"
                    aria-invalid={errors.description ? 'true' : 'false'}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1 sm:mb-1.5">
                    Reference photos (optional, max {MAX_PHOTOS}, 10MB each)
                  </label>
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      aria-label="Upload reference photos"
                    />
                    <div
                      className={`flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed rounded-lg transition-colors ${
                        errors.referencePhotos
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-msq-purple-rich'
                      }`}
                    >
                      <ImageIcon className="w-8 h-8 text-gray-400 mb-2" strokeWidth={1.5} />
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-msq-purple-rich">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                  {errors.referencePhotos && (
                    <p className="text-red-500 text-sm font-lato">{errors.referencePhotos}</p>
                  )}
                  {referencePhotos.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {referencePhotos.map((file, index) => (
                        <li
                          key={`${file.name}-${index}`}
                          className="flex items-center justify-between text-sm text-gray-700 bg-gray-50 rounded px-2 py-1.5"
                        >
                          <span className="truncate flex-1">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="p-1 text-gray-500 hover:text-red-600 rounded transition-colors"
                            aria-label={`Remove ${file.name}`}
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full cursor-pointer bg-gradient-to-r from-msq-purple-rich to-msq-purple text-white py-2 sm:py-2.5 lg:py-3 px-5 sm:px-6 rounded-lg font-lato font-semibold text-sm tracking-wide hover:shadow-lg hover:shadow-msq-purple-rich/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none group relative overflow-hidden"
                    aria-label={isLoading ? 'Submitting...' : 'Submit request'}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5">
                      {isLoading ? (
                        <>
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        'Submit request'
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Side panel: tagline and short guidance */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-msq-purple-rich to-msq-purple-deep rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-5 lg:p-6 text-white border border-msq-purple-rich/20 lg:sticky lg:top-24">
              <p className="text-white/90 font-lato text-sm sm:text-base leading-relaxed">
                Share your measurements, style preferences, and reference photos. We’ll follow up to
                bring your vision to life.
              </p>
              <p className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-white/20 text-white/80 italic font-lato text-sm">
                Made with love, made for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BespokeRequestForm;
