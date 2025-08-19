import { HiOutlineShoppingBag } from 'react-icons/hi';
import { BsPerson } from 'react-icons/bs';
import { Link, useLocation } from 'react-router'; // <-- make sure it's react-router-dom

const NavBar = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about-us', label: 'About Us' },
  ];

  return (
    <div>
      <nav className="flex justify-between">
        <img
          src="/images/Logo.png"
          alt="Logo here"
          className="w-[250px] ml-[70px] mt-[10px]" />
        <ul className="flex mt-[35px] text-2xl text-white gap-[50px]">
          {links.map(({ path, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={isActive ? 'text-[#c01da8] border-b-2 border-white' : ''} >
                <li
                  className={
                    isActive
                      ? 'text-[#c01da8]' // active style
                      : 'hover:text-[#c01da8] hover:border-b-2 hover:border-white'  }>
                  {label}
                </li>
              </Link>
            );
          })}
        </ul>
        <div className="flex text-2xl gap-5 text-white pr-[30px] pt-[30px]">
          <HiOutlineShoppingBag className="border-2 border-[#c01da8] w-[50px] h-[35px] bg-[#c01da8] hover:bg-white hover:text-[#991485]" />
          <BsPerson className="border-2 w-[50px] h-[35px] border-[#c01da8] bg-[#c01da8] hover:bg-white hover:text-[#991485]" />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
