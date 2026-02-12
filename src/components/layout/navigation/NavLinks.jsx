import { Link, useLocation } from 'react-router';

const NavLinks = ({ className = '', tone = 'solid' }) => {
  const location = useLocation();
  const isTransparentTone = tone === 'transparent';

  const links = [
    { to: '/shop', label: 'Shop' },
    { to: '/bespoke', label: 'Bespoke' },
    { to: '/about-us', label: 'About' },
    { to: '/faqs', label: 'FAQs' },
    { to: '/contact-us', label: 'Contact' },
  ];

  const getLinkClasses = pathname => {
    const isActive = location.pathname === pathname;
    return `px-1 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? isTransparentTone
          ? 'text-white border-b-2 border-white'
          : 'text-msq-purple-rich border-b-2 border-msq-purple-rich'
        : isTransparentTone
          ? 'text-white/90 hover:text-white'
          : 'text-msq-purple-deep hover:text-msq-purple-rich'
    }`;
  };

  return (
    <nav className={`flex items-center gap-1 sm:gap-2 ${className}`} aria-label="Main navigation">
      {links.map(link => (
        <Link key={link.to} to={link.to} className={getLinkClasses(link.to)}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
