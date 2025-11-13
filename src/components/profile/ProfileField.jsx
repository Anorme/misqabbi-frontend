import { useState } from 'react';
import { Pencil, Check } from 'lucide-react';
import CloseButton from '../ui/CloseButton';
import InputField from '../form/InputField';
import PhoneNumberField from '../form/PhoneNumberField';
import {
  isValidEmail,
  getPhoneNumberError,
  formatPhoneNumberForStorage,
} from '../../utils/validation';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const ProfileField = ({
  label,
  value,
  icon,
  editable = true,
  type = 'text',
  placeholder,
  onSave,
  sanitizeType,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || '');
  const [isLoading, setIsLoading] = useState(false);

  // Helper to extract phone number from value (remove +233 if present)
  const extractPhoneNumber = val => {
    if (type === 'tel' && val) {
      return val.startsWith('+233') ? val.substring(4) : val;
    }
    return val || '';
  };

  const handleEdit = () => {
    if (editable) {
      setIsEditing(true);
      setEditValue(extractPhoneNumber(value));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(extractPhoneNumber(value));
  };

  const handleSave = async () => {
    if (!editable) return;

    let valueToSave = editValue.trim();

    // Format phone number before validation (remove leading 0 if present)
    if (type === 'tel' && valueToSave) {
      valueToSave = formatPhoneNumberForStorage(valueToSave);
    }

    // Validate email if it's an email field
    if (type === 'email' && valueToSave && !isValidEmail(valueToSave)) {
      showErrorToast('Please enter a valid email address');
      return;
    }

    // Validate phone number if it's a tel field
    if (type === 'tel' && valueToSave) {
      const phoneError = getPhoneNumberError(valueToSave);
      if (phoneError) {
        showErrorToast(phoneError);
        return;
      }
    }

    setIsLoading(true);
    try {
      await onSave(valueToSave);
      setIsEditing(false);
      showSuccessToast('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      showErrorToast('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    // Special handling for phone number field
    if (type === 'tel') {
      return (
        <div className="mb-4">
          <label className="block mb-1 text-left text-sm font-semibold text-gray-700">
            {label}
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <PhoneNumberField
                name="phone"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                icon={icon}
                onKeyDown={handleKeyPress}
                label=""
              />
            </div>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="p-2 text-green-600 hover:text-green-700 transition-colors duration-200 disabled:opacity-50 cursor-pointer"
              aria-label="Save changes"
            >
              <Check size={20} />
            </button>
            <CloseButton
              onClose={handleCancel}
              size={20}
              className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200 disabled:opacity-50 cursor-pointer"
              ariaLabel="Cancel changes"
            />
          </div>
        </div>
      );
    }

    // Regular input field for other types
    return (
      <div className="mb-4">
        <label className="block mb-1 text-left text-sm font-semibold text-gray-700">{label}</label>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <InputField
              label=""
              type={type}
              name={label.toLowerCase().replace(' ', '_')}
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              placeholder={placeholder}
              icon={icon}
              sanitizeType={sanitizeType}
              onKeyDown={handleKeyPress}
            />
          </div>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="p-2 text-green-600 hover:text-green-700 transition-colors duration-200 disabled:opacity-50 cursor-pointer"
            aria-label="Save changes"
          >
            <Check size={20} />
          </button>
          <CloseButton
            onClose={handleCancel}
            size={20}
            className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200 disabled:opacity-50 cursor-pointer"
            ariaLabel="Cancel changes"
          />
        </div>
      </div>
    );
  }

  // Format phone number for display
  const displayValue =
    type === 'tel' && value
      ? value.startsWith('+233')
        ? `🇬🇭 +233 ${value.substring(4)}`
        : `🇬🇭 +233 ${value}`
      : value || placeholder;

  return (
    <div className="mb-4">
      <label className="block mb-1 text-left text-sm font-semibold text-gray-700">{label}</label>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {icon && <span className="text-gray-400">{icon}</span>}
          <span
            className={`text-gray-900 text-xs sm:text-sm ${!value ? 'text-gray-400 italic' : ''}`}
          >
            {displayValue}
          </span>
        </div>
        {editable && (
          <button
            onClick={handleEdit}
            className="p-2 text-msq-gold-light hover:text-msq-gold transition-colors duration-200 cursor-pointer"
            aria-label={`Edit ${label.toLowerCase()}`}
          >
            <Pencil size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileField;
