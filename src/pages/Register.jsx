import UserAuthForm from '../components/UI/UserAuthForm';
import signupImg from '../assets/signup.png';
import { Link } from 'react-router';

const Register = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-purple-300 p-0 m-0 font-lato">
      <div
        className="flex bg-white rounded-2xl overflow-hidden shadow-lg mt-12 mb-12"
        style={{ height: '714px', width: '1000px' }}
      >
        <div className="w-[45%] hidden md:flex items-stretch">
          <img
            src={signupImg}
            alt="Visual"
            className="object-cover w-full h-full"
            style={{ height: '714px' }}
          />
        </div>
        <div className="w-full md:w-[55%] p-10 flex flex-col justify-center pt-8 pb-8">
          <h2 className="font-bebas text-[25px] font-bold uppercase text-purple-700 text-center mb-6 tracking-wide">
            CREATE YOUR ACCOUNT
          </h2>
          <UserAuthForm />
          <p className="text-center mt-4">
            <span className="font-corsiva">Have an account?</span>{' '}
            <Link to="/login" className="text-purple-700 font-medium">
              <span className="font-corsiva">Log in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
