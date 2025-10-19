import { X, ShoppingBag } from 'lucide-react';

const CartTitle = ({ itemCount }) => {
  return (
    <div className="flex items-center space-x-3">
      <ShoppingBag className="w-6 h-6 text-msq-purple-rich" />
      <h2 className="text-2xl font-bebas text-msq-purple-rich">Shopping Cart</h2>
      {itemCount > 0 && (
        <span className="bg-msq-gold text-white text-sm font-lato px-2 py-1 rounded-full">
          {itemCount}
        </span>
      )}
    </div>
  );
};

const CloseButton = ({ onClose }) => {
  return (
    <button onClick={onClose} className="p-2 transition-colors duration-200">
      <X className="w-5 h-5 text-gray-600 hover:text-red-600 cursor-pointer transition-colors duration-200 behavior-smooth" />
    </button>
  );
};

const CartDrawerHeader = ({ itemCount, onClose }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <CartTitle itemCount={itemCount} />
      <CloseButton onClose={onClose} />
    </div>
  );
};

export default CartDrawerHeader;
