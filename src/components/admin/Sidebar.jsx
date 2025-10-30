import { Link, useLocation } from 'react-router';
import { LayoutDashboard, Package, ShoppingCart, Users, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', href: '/admin/users', icon: Users },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200">
            <Link to="/shop" title="Go to Shop" className="flex items-center">
              <div className="w-8 h-8 bg-msq-purple-rich rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="ml-3 text-xl font-bebas text-msq-purple-rich">Misqabbi Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map(item => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-msq-purple-rich text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <Link to="/shop" title="Go to Shop" className="flex items-center" onClick={onClose}>
              <div className="w-8 h-8 bg-msq-purple-rich rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="ml-3 text-xl font-bebas text-msq-purple-rich">Misqabbi Admin</span>
            </Link>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map(item => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-msq-purple-rich text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
