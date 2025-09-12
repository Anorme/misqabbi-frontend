import { Link } from 'react-router';

const LoginButton = () => (
  <Link to="/login">
    <button className="text-[#d265ff] hover:text-msq-purple-rich font-medium cursor-pointer">
      Login
    </button>
  </Link>
);

export default LoginButton;
