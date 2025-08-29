import { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import InputField from './InputField';
import IconAdornment from './IconAdornment';
import { getPasswordStrength } from '../../utils/strength';

const PasswordInput = ({
  name = 'password',
  label = 'Password',
  value,
  onChange,
  error,
  placeholder = 'Enter your password',
  showStrength = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const strength = showStrength ? getPasswordStrength(value) : null;

  return (
    <InputField
      label={label}
      type={showPassword ? 'text' : 'password'}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      placeholder={placeholder}
      strength={strength}
      adornment={
        <IconAdornment
          icon={showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
          onClick={() => setShowPassword(prev => !prev)}
        />
      }
    />
  );
};

export default PasswordInput;
