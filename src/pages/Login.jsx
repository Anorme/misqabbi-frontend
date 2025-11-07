import { useState } from 'react';
import { Link } from 'react-router';

import UserAuthForm from '../components/auth/UserAuthForm';
import PasswordResetModal from '../components/profile/PasswordResetModal';
import SEO from '../components/SEO';

import useMediaQuery from '../hooks/useMediaQuery';

const Login = () => {
  const isMdUp = useMediaQuery('(min-width: 768px)');
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  return (
    <div className="min-h-screen w-screen flex md:items-center justify-center bg-white p-0 m-0 font-lato">
      <SEO
        title="Login"
        description="Log in to your Misqabbi account to access your orders, favorites, and profile."
        robots="noindex,nofollow"
      />
      <div className="w-full max-w-md sm:max-w-lg md:max-w-4xl lg:max-w-5xl flex bg-white rounded-none md:rounded-2xl overflow-visible md:overflow-hidden md:shadow-lg mx-0 md:mx-4 my-0 md:my-16 min-h-screen md:min-h-0">
        {isMdUp && (
          <div className="w-[45%] hidden md:flex items-stretch">
            <img
              src="https://res.cloudinary.com/dyciw970t/image/upload/v1762028288/IMG_0017_copy_hpuavv.jpg"
              alt="Visual"
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="w-full md:w-[55%] p-6 sm:p-8 flex flex-col justify-center">
          <h2 className="font-bebas text-[22px] sm:text-[24px] font-bold uppercase text-msq-purple-rich text-center mb-[74px] sm:mb-6">
            Log in
          </h2>

          <UserAuthForm mode="login" />

          <div className="text-center justify-between space-x-3">
            <button
              onClick={() => setShowPasswordReset(true)}
              className="text-msq-purple-rich font-medium hover:underline py-3 text-center cursor-pointer"
            >
              <span className="font-corsiva">Forgot Password?</span>
            </button>
            <Link
              to="/register"
              className="text-msq-purple-rich font-medium hover:underline py-3 text-center cursor-pointer"
            >
              <span className="font-corsiva">Create account?</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      <PasswordResetModal
        isOpen={showPasswordReset}
        onClose={() => setShowPasswordReset(false)}
        userEmail=""
      />
    </div>
  );
};

export default Login;
