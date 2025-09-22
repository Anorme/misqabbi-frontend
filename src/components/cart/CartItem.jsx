import { ShoppingBag } from 'lucide-react';
import CartItemControls from './CartItemControls';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
        {item.images?.[0] ? (
          <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <ShoppingBag className="w-6 h-6 text-gray-400" />
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-lato font-medium text-gray-900 truncate">{item.name}</h3>
        <p className="text-xs font-lato text-gray-500">Size: {item.size}</p>
        <p className="text-sm font-lato font-semibold text-msq-purple-rich">
          GHC {item.price?.toFixed(2) || '0.00'}
        </p>
      </div>

      {/* Quantity Controls */}
      <CartItemControls item={item} onQuantityChange={onQuantityChange} onRemove={onRemove} />
    </div>
  );
};

export default CartItem;
