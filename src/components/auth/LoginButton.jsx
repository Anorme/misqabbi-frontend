import { Link } from 'react-router';

const LoginButton = ({ className = '', onClick, ...props }) => (
  <Link to="/login" onClick={onClick}>
    <button className={`text-msq-purple-light  font-medium cursor-pointer ${className}`} {...props}>
      Login
    </button>
  </Link>
);

export default LoginButton;
