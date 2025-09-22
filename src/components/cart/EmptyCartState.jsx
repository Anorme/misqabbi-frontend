import { ShoppingBag } from 'lucide-react';

const EmptyCartState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center px-6">
      <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-bebas text-gray-500 mb-2">Your cart is empty</h3>
      <p className="text-sm font-lato text-gray-400">Add some items to get started</p>
    </div>
  );
};

export default EmptyCartState;
