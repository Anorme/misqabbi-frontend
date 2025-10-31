import UserAuthForm from '../components/auth/UserAuthForm';
import signupImg from '../assets/signup.png';
import { Link } from 'react-router';
import useMediaQuery from '../hooks/useMediaQuery';
import SEO from '../components/SEO';

const Register = () => {
  const isMdUp = useMediaQuery('(min-width: 768px)');

  return (
    <div className="min-h-screen w-screen flex md:items-center justify-center bg-white p-0 m-0 font-lato">
      <SEO
        title="Register"
        description="Create your Misqabbi account to start shopping premium fashion tailored for you."
        robots="noindex,nofollow"
      />
      <div className="w-full max-w-md sm:max-w-lg md:max-w-4xl lg:max-w-5xl flex bg-white rounded-none md:rounded-2xl overflow-visible md:overflow-hidden md:shadow-lg mx-0 md:mx-4 my-0 md:my-16 min-h-screen md:min-h-0">
        {isMdUp && (
          <div className="w-[45%] hidden md:flex items-stretch">
            <img src={signupImg} alt="Visual" className="object-cover w-full h-full" />
          </div>
        )}
        <div className="w-full md:w-[55%] p-6 sm:p-8 flex flex-col justify-center">
          <h2 className="font-bebas text-[22px] sm:text-[24px] font-bold uppercase text-msq-purple-rich text-center mb-4 sm:mb-6 tracking-wide">
            Create your account
          </h2>
          <UserAuthForm mode="register" />
          <p className="text-center mt-6">
            <span className="font-corsiva">Have an account?</span>{' '}
            <Link to="/login" className="text-msq-purple-rich font-medium">
              <span className="font-corsiva">Log in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
