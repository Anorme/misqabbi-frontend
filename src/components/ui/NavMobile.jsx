import { Bell, Menu, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router';

function NavMobile() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <Menu />
      <Search />
      <Link to="/">
        <div className="flex-shrink-0">
          <img
            src="/images/Logo.png"
            alt="Misqabbi Logo"
            className="w-28 sm:w-40 md:w-56 object-contain cursor-pointer"
          />
        </div>
      </Link>
      <SlidersHorizontal />
      <div className="h-[34px] w-[34px] rounded-full flex justify-center items-center shadow">
        <Bell />
      </div>
    </div>
  );
}

export default NavMobile;
