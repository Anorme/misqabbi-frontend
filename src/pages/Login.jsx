import { useState } from 'react';

import { Link } from 'react-router';

import UserAuthForm from '../components/UI/UserAuthForm';
import { useAuthState } from '../contexts/auth/useAuth';

import loginImg from '../assets/login.png';

const Login = () => {
  const { loginUserWithEmail } = useAuthState();
  const [error, setError] = useState('');

  // Handler for login form submission
  const handleLogin = async (username, password) => {
    setError('');
    try {
      await loginUserWithEmail(username, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-purple-300 p-0 m-0 font-lato">
      <div
        className="flex bg-white rounded-2xl overflow-hidden shadow-lg mt-12 mb-12"
        style={{ height: '714px', width: '1000px' }}
      >
        <div className="w-[45%] hidden md:flex items-stretch">
          <img
            src={loginImg}
            alt="Visual"
            className="object-cover w-full h-full"
            style={{ height: '714px' }}
          />
        </div>
        <div className="w-full md:w-[55%] p-10 flex flex-col justify-center pt-8 pb-8">
          <h2 className="font-bebas text-[25px] font-bold uppercase text-purple-700 text-center mb-6">
            LOGIN
          </h2>
          {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
          <UserAuthForm mode="login" onSubmit={handleLogin} />
          <Link to="/register" className="text-purple-700 font-medium mt-4 text-center">
            <span className="font-corsiva">Create Account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
