import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingBag } from 'lucide-react';
import CartItemControls from './CartItemControls';
import SizeSelectorModal from './SizeSelectorModal';
import useCartItem from '../../hooks/useCartItem';

const CartItem = ({ item, onClose }) => {
  const navigate = useNavigate();
  const [showSizeModal, setShowSizeModal] = useState(false);
  const { handleSizeChange } = useCartItem(item);

  const isCustomSize = item.size === 'CUSTOM' && item.customSize;

  const handleCardClick = () => {
    // Close the drawer first, then navigate to product details
    onClose();
    navigate(`/product/${item.slug}`);
  };

  const handleSizeClick = e => {
    e.stopPropagation(); // Prevent card navigation
    if (!isCustomSize) {
      setShowSizeModal(true);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
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

        {/* Size Display */}
        <div className="space-y-1">
          <p
            onClick={handleSizeClick}
            className="text-xs font-lato text-gray-500 cursor-pointer hover:text-msq-purple-rich transition-colors duration-200"
          >
            Size: {item.size} {!isCustomSize && '(Change)'}
          </p>
        </div>

        <p className="text-sm font-lato font-semibold text-msq-purple-rich">
          GHC {item.price?.toFixed(2) || '0.00'}
        </p>
      </div>

      {/* Quantity Controls - needs click prevention */}
      <div onClick={e => e.stopPropagation()}>
        <CartItemControls item={item} />
      </div>

      {/* Size Selector Modal - only for standard sizes */}
      {showSizeModal && !isCustomSize && (
        <SizeSelectorModal
          currentSize={item.size}
          onSizeChange={handleSizeChange}
          onClose={() => setShowSizeModal(false)}
        />
      )}
    </div>
  );
};

export default CartItem;
