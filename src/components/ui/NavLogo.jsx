import { Link } from 'react-router';

const NavLogo = ({ variant = 'desktop', className = '' }) => {
  const getLogoClasses = () => {
    if (variant === 'mobile') {
      return 'w-36 sm:w-40 md:w-56 object-contain h-full cursor-pointer';
    }
    // Desktop variant
    return 'w-28 sm:w-40 md:w-56 object-contain cursor-pointer';
  };

  const getContainerClasses = () => {
    if (variant === 'mobile') {
      return 'flex-shrink-0 h-14';
    }
    // Desktop variant
    return 'flex-shrink-0';
  };

  return (
    <Link to="/" className={className}>
      <div className={getContainerClasses()}>
        <img src="/images/Logo.png" alt="Misqabbi Logo" className={getLogoClasses()} />
      </div>
    </Link>
  );
};

export default NavLogo;
