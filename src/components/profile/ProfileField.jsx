import { useState } from 'react';
import { Pencil, Check } from 'lucide-react';
import CloseButton from '../ui/CloseButton';
import InputField from '../form/InputField';
import { isValidEmail } from '../../utils/validation';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const ProfileField = ({
  label,
  value,
  icon,
  editable = true,
  type = 'text',
  placeholder,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    if (editable) {
      setIsEditing(true);
      setEditValue(value || '');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(value || '');
  };

  const handleSave = async () => {
    if (!editable) return;

    // Validate email if it's an email field
    if (type === 'email' && editValue && !isValidEmail(editValue)) {
      showErrorToast('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      await onSave(editValue);
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

  return (
    <div className="mb-4">
      <label className="block mb-1 text-left text-sm font-semibold text-gray-700">{label}</label>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {icon && <span className="text-gray-400">{icon}</span>}
          <span
            className={`text-gray-900 text-xs sm:text-sm ${!value ? 'text-gray-400 italic' : ''}`}
          >
            {value || placeholder}
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
