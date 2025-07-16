import { useState, useContext } from 'react';
import { MdPerson, MdEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import AuthContext from '../contexts/AuthContext';
import { isValidEmail, isStrongPassword } from '../utils/validation';

const UserAuthForm = ({ mode = 'register', onSubmit, onGoogleSignIn }) => {
  const { register, signInWithGoogle } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
  });
  const { fullName, email, username, password } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  let passwordStrength = '';
  if (mode === 'register' && password.length > 0) {
    if (isStrongPassword(password)) {
      passwordStrength = 'Strong';
    } else if (password.length >= 8) {
      passwordStrength = 'Weak';
    } else {
      passwordStrength = 'Too short';
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!isValidEmail(email) || !isStrongPassword(password)) {
      setError('Please use a valid email and a strong password.');
      return;
    }
    setLoading(true);
    try {
      await register(email, password, fullName);
      setSuccess('Account created successfully!');
      setFormData({ fullName: '', email: '', username: '', password: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(username, password, rememberMe);
      } else {
        // fallback: just simulate login
        setSuccess('Logged in!');
      }
      setFormData({ fullName: '', email: '', username: '', password: '' });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (onGoogleSignIn) {
        await onGoogleSignIn();
      } else {
        await signInWithGoogle();
      }
      setSuccess('Signed in with Google successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={mode === 'register' ? handleRegister : handleLogin} className="space-y-4">
      {mode === 'register' && (
        <div className="relative">
          <label htmlFor="fullName" className="block mb-1 font-medium text-left">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter your name"
            value={fullName}
            onChange={handleChange}
            className="w-full p-3 pr-10 border border-gray-300 font-medium placeholder:font-medium"
            style={{ borderRadius: '15px' }}
          />
          <span className="absolute right-3 inset-y-0 flex items-center h-full text-gray-400">
            <MdPerson size={20} />
          </span>
        </div>
      )}
      {mode === 'register' ? (
        <div className="relative">
          <label htmlFor="email" className="block mb-1 font-medium text-left">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleChange}
            className="w-full p-3 pr-10 border border-gray-300 font-medium placeholder:font-medium"
            style={{ borderRadius: '15px' }}
          />
          <span className="absolute right-3 inset-y-0 flex items-center h-full text-gray-400">
            <MdEmail size={20} />
          </span>
        </div>
      ) : (
        <div className="relative">
          <label htmlFor="username" className="block mb-1 font-medium text-left">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="enter your username"
            value={username}
            onChange={handleChange}
            className="w-full p-3 pr-10 border border-gray-300 font-medium placeholder:font-medium"
            style={{ borderRadius: '15px' }}
          />
          <span className="absolute right-3 inset-y-0 flex items-center h-full text-gray-400">
            <MdPerson size={20} />
          </span>
        </div>
      )}
      <div className="relative">
        <label htmlFor="password" className="block mb-1 font-medium text-left">
          Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          placeholder={mode === 'register' ? 'Enter a password' : 'enter your password'}
          value={password}
          onChange={handleChange}
          className="w-full p-3 pr-10 border border-gray-300 font-medium placeholder:font-medium"
          style={{ borderRadius: '15px' }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400"
          tabIndex={-1}
        >
          {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
        </button>
        {mode === 'register' && passwordStrength && (
          <p
            className={`text-sm mt-1 ${passwordStrength === 'Strong' ? 'text-green-600' : passwordStrength === 'Weak' ? 'text-yellow-600' : 'text-red-600'}`}
          >
            Password strength: {passwordStrength}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-[60%] mx-auto bg-purple-700 text-white py-3 font-semibold"
        style={{ borderRadius: '15px' }}
        disabled={loading}
      >
        {loading
          ? mode === 'register'
            ? 'Registering...'
            : 'Logging in...'
          : mode === 'register'
            ? 'Create Account'
            : 'Login'}
      </button>
      {mode === 'login' && (
        <div className="flex items-center mb-2">
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-sm font-medium select-none cursor-pointer">
            Remember me
          </label>
        </div>
      )}
      {mode === 'login' && (
        <div className="text-center mt-2">
          <span className="text-black font-medium">Forgot your password? </span>
          <button type="button" className="text-purple-700 underline font-medium ml-1">
            Click here.
          </button>
        </div>
      )}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && <p className="text-green-500 text-sm text-center">{success}</p>}
      <div className="flex items-center my-4 w-[60%] mx-auto">
        <hr className="flex-grow border-t-2 border-gray-400" />
        <span className="mx-4 text-gray-700 font-bold">or</span>
        <hr className="flex-grow border-t-2 border-gray-400" />
      </div>
      <button
        className="w-[60%] mx-auto py-3 rounded-md mb-2 flex justify-center items-center gap-2"
        type="button"
      >
        <MdEmail size={22} />
        Continue with email
      </button>
      <button
        className="w-[60%] mx-auto py-3 rounded-md flex justify-center items-center gap-2"
        type="button"
        onClick={handleGoogle}
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>
    </form>
  );
};

export default UserAuthForm;

