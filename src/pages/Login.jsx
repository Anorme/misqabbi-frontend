import { Link } from 'react-router';

import UserAuthForm from '../components/ui/UserAuthForm';

import loginImg from '../assets/login.png';

const Login = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center lg:bg-purple-300 p-0 m-0 font-lato">
      <div className="flex bg-white rounded-2xl overflow-hidden lg:shadow-lg w-full max-w-4xl h-[90%]">
        {/* Image section */}
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
          <UserAuthForm mode="login" />
          <Link to="/register" className="text-purple-700 font-medium mt-4 text-center">
            <span className="font-corsiva">Create Account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
