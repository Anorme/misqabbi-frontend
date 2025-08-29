import { HiOutlineShoppingBag } from 'react-icons/hi';
import { BsPerson } from 'react-icons/bs';
import { Link, useLocation } from 'react-router'; 

const NavBar = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about-us', label: 'About Us' },
  ];

  return (
    <div>
      <nav className="flex justify-between items-center px-4 sm:px-8 md:px-16 py-3">
        {/* Logo */}
        <img
          src="/images/Logo.png"
          alt="Logo here"
          className="w-28 sm:w-40 md:w-56 object-contain"
        />

        {/* Links */}
        <ul className="flex gap-4 sm:gap-8 md:gap-12 text-base sm:text-lg md:text-2xl text-white">
          {links.map(({ path, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={isActive ? 'text-[#c01da8] border-b-2 border-white' : ''}
              >
                <li
                  className={
                    isActive
                      ? 'text-[#c01da8]'
                      : 'hover:text-[#c01da8] hover:border-b-2 hover:border-white'
                  }
                >
                  {label}
                </li>
              </Link>
            );
          })}
        </ul>

        {/* Icons */}
        <div className="flex text-xl sm:text-2xl gap-3 sm:gap-5 text-white">
          <HiOutlineShoppingBag className="border-2 border-[#c01da8] w-8 h-8 sm:w-10 sm:h-10 bg-[#c01da8] hover:bg-white hover:text-[#991485]" />
          <BsPerson className="border-2 border-[#c01da8] w-8 h-8 sm:w-10 sm:h-10 bg-[#c01da8] hover:bg-white hover:text-[#991485]" />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
