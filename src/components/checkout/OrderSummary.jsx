import { useState } from 'react';
import { MdShoppingCart, MdFlashOn } from 'react-icons/md';
import { useCartState } from '../../contexts/cart/useCart';
import {
  getCartItemsWithKeys,
  getCartItemCount,
  getCartSubtotal,
} from '../../contexts/cart/cartSelectors';
import { getPrimaryImageUrl } from '../../utils/productImages';

import { EXPRESS_SERVICE_FEE_PER_ITEM } from '../../constants/order';

const OrderSummary = ({ onExpressServiceChange }) => {
  const cartState = useCartState();
  const [isExpressService, setIsExpressService] = useState(false);

  const cartItems = getCartItemsWithKeys(cartState);
  const itemCount = getCartItemCount(cartState);
  const baseSubtotal = getCartSubtotal(cartState);

  // Calculate express service fee: 150 GHS × total quantity
  const expressServiceFee = isExpressService ? EXPRESS_SERVICE_FEE_PER_ITEM * itemCount : 0;
  const subtotal = baseSubtotal + expressServiceFee;

  const formatPrice = price => {
    return `GHC ${price.toFixed(2)}`;
  };

  const handleExpressServiceToggle = checked => {
    setIsExpressService(checked);
    // Notify parent component
    if (onExpressServiceChange) {
      onExpressServiceChange(checked);
    }
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

      {/* Express Service Option */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="space-y-3">
          {/* Express Service Checkbox */}
          <label className="flex items-start space-x-3 cursor-pointer group">
            <div className="flex items-center h-5 mt-0.5">
              <input
                type="checkbox"
                checked={isExpressService}
                onChange={e => handleExpressServiceToggle(e.target.checked)}
                className="w-4 h-4 text-msq-purple-rich border-gray-300 rounded focus:ring-2 focus:ring-msq-purple-rich focus:ring-offset-0 cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <MdFlashOn
                  className={`text-lg transition-colors ${
                    isExpressService
                      ? 'text-msq-purple-rich'
                      : 'text-gray-400 group-hover:text-msq-gold-light'
                  }`}
                />
                <span
                  className={`font-lato font-medium ${
                    isExpressService ? 'text-msq-purple-rich' : 'text-gray-700'
                  }`}
                >
                  Express Service
                </span>
                {isExpressService && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-msq-purple-rich text-white rounded">
                    +{formatPrice(expressServiceFee)}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600 font-lato mt-1">
                Prioritize your order for faster completion with extra attention
              </p>
              {isExpressService && (
                <p className="text-xs font-semibold text-msq-purple-rich font-lato mt-1.5">
                  ⚡ Estimated delivery: 2-3 working days
                </p>
              )}
            </div>
          </label>

          {/* Regular Order Timeline Note */}
          {!isExpressService && (
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 font-lato">
                📦 Regular orders typically take 3-5 working days to complete
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Order Totals */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 font-lato">Items ({itemCount})</span>
            <span className="text-sm font-medium text-gray-900 font-lato">
              {formatPrice(baseSubtotal)}
            </span>
          </div>

          {/* Express Service Fee Line Item */}
          {isExpressService && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-lato flex items-center space-x-1">
                <MdFlashOn className="text-msq-purple-rich" size={16} />
                <span>Express Service ({itemCount} items)</span>
              </span>
              <span className="text-sm font-medium text-msq-purple-rich font-lato">
                {formatPrice(expressServiceFee)}
              </span>
            </div>
          )}

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
