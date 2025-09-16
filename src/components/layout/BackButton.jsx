import { useLocation, useNavigate } from 'react-router';
import { MdArrowBackIos } from 'react-icons/md';

function BackButton({ fallback = '/shop' }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (location.state?.from === fallback) {
      navigate(location.state.from);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button className="absolute left-2 lg:text-2xl cursor-pointer" onClick={handleBack}>
      <MdArrowBackIos />
    </button>
  );
}

export default BackButton;
