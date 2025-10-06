import { Link } from 'react-router';

import UserAuthForm from '../components/ui/UserAuthForm';

import loginImg from '../assets/login.png';
import useMediaQuery from '../hooks/useMediaQuery';

const Login = () => {
  const isMdUp = useMediaQuery('(min-width: 768px)');

  return (
    <div className="min-h-screen w-screen flex md:items-center justify-center bg-white p-0 m-0 font-lato">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-4xl lg:max-w-5xl flex bg-white rounded-none md:rounded-2xl overflow-visible md:overflow-hidden md:shadow-lg mx-0 md:mx-4 my-0 md:my-16 min-h-screen md:min-h-0">
        {isMdUp && (
          <div className="w-[45%] hidden md:flex items-stretch">
            <img src={loginImg} alt="Visual" className="object-cover w-full h-full" />
          </div>
        )}

        <div className="w-full md:w-[55%] p-6 sm:p-8 flex flex-col justify-center">
          <h2 className="font-bebas text-[22px] sm:text-[24px] font-bold uppercase text-msq-purple-rich text-center mb-[74px] sm:mb-6">
            Log in
          </h2>

          <UserAuthForm mode="login" />

          <Link to="/register" className="text-msq-purple-rich font-medium mt-6 text-center">
            <span className="font-corsiva">Create account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
