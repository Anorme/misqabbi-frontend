import { Link } from 'react-router';

const NavLogo = ({ variant = 'desktop', className = '' }) => {
  const getLogoClasses = () => {
    if (variant === 'mobile') {
      return 'w-24 sm:w-32 md:w-36 object-contain h-full cursor-pointer';
    }
    // Desktop variant
    return 'w-24 sm:w-32 md:w-36 object-contain cursor-pointer';
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
