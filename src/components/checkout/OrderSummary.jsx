import { MdShoppingCart } from 'react-icons/md';
import { useCartState } from '../../contexts/cart/useCart';
import {
  getCartItemsWithKeys,
  getCartItemCount,
  getCartSubtotal,
} from '../../contexts/cart/cartSelectors';
import { getPrimaryImageUrl } from '../../utils/productImages';

const OrderSummary = () => {
  const cartState = useCartState();

  const cartItems = getCartItemsWithKeys(cartState);
  const itemCount = getCartItemCount(cartState);
  const subtotal = getCartSubtotal(cartState);

  const formatPrice = price => {
    return `GHC ${price.toFixed(2)}`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center py-8">
          <MdShoppingCart className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="font-bebas text-xl text-gray-600 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 font-lato">Add some items to proceed with checkout</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="font-bebas text-xl text-msq-purple-rich uppercase tracking-wide">
          Order Summary
        </h2>
      </div>

      {/* Cart Items */}
      <div className="px-6 py-4">
        <div className="space-y-4">
          {cartItems.map(item => (
            <div
              key={item.key}
              className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0"
            >
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={getPrimaryImageUrl(item)}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md bg-gray-100"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-lato font-medium text-gray-900 truncate">{item.name}</h3>
                <p className="text-sm text-gray-500 font-lato">
                  Size: {item.size} • Qty: {item.quantity}
                </p>
                <p className="text-sm font-medium text-msq-purple-rich font-lato">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Totals */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 font-lato">Items ({itemCount})</span>
            <span className="text-sm font-medium text-gray-900 font-lato">
              {formatPrice(subtotal)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 font-lato">Delivery</span>
            <span className="text-sm font-medium text-msq-purple-rich font-lato">
              Calculated by courier
            </span>
          </div>
          <div className="text-xs text-gray-500 font-lato mt-1">
            Your delivery cost will be determined by our trusted courier partner
          </div>

          <div className="border-t border-gray-300 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bebas text-gray-900">Subtotal</span>
              <span className="text-lg font-bebas font-bold text-msq-purple-rich">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="text-xs text-gray-500 font-lato mt-2 text-center">
              + Delivery charges will be added by our courier partner
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
