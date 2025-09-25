import { Bell, Menu, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router';

function NavMobile() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Left Section: Menu and Search Icons */}
      <div className="flex gap-4 items-center py-6">
        <Menu size={20} className="text-msq-gold-light" />

        <Search size={20} className="text-msq-gold-light" />
      </div>

      {/* Center Section: Logo */}
      <Link to="/">
        <div className="flex-shrink-0 h-14">
          <img
            src="/images/Logo.png"
            alt="Misqabbi Logo"
            className="w-28 sm:w-40 md:w-56 object-contain h-full cursor-pointer"
          />
        </div>
      </Link>
      {/* Right Section: Filter and Notification Icons */}
      <div className="flex gap-4 items-center py-6 justify-end">
        <SlidersHorizontal size={20} className="text-msq-gold-light" />
        <div className="h-[34px] w-[34px] rounded-full flex justify-center p-2 items-center ring-2 ring-neutral-300/80">
          <Bell size={20} className="text-msq-gold-light" />
        </div>
      </div>
    </div>
  );
}

export default NavMobile;
