import { useState } from 'react';
import { MdShoppingCart, MdFlashOn, MdLocalOffer } from 'react-icons/md';
import { useCartState } from '../../contexts/cart/useCart';
import {
  getCartItemsWithKeys,
  getCartItemCount,
  getCartSubtotal,
} from '../../contexts/cart/cartSelectors';
import { getPrimaryImageUrl } from '../../utils/productImages';
import { validateDiscount } from '../../api/discounts';

import { EXPRESS_SERVICE_FEE_PER_ITEM } from '../../constants/order';

const OrderSummary = ({ onExpressServiceChange, onDiscountChange }) => {
  const cartState = useCartState();
  const [isExpressService, setIsExpressService] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountFeedback, setDiscountFeedback] = useState({ message: '', type: null });
  const [isValidatingDiscount, setIsValidatingDiscount] = useState(false);

  const cartItems = getCartItemsWithKeys(cartState);
  const itemCount = getCartItemCount(cartState);
  const baseSubtotal = getCartSubtotal(cartState);

  // Calculate express service fee: 150 GHS × total quantity
  const expressServiceFee = isExpressService ? EXPRESS_SERVICE_FEE_PER_ITEM * itemCount : 0;
  const subtotalBeforeDiscount = baseSubtotal + expressServiceFee;
  const discountAmount = appliedDiscount?.amount ?? 0;
  const finalTotal = Math.max(0, subtotalBeforeDiscount - discountAmount);

  const formatPrice = price => {
    return `GHC ${price.toFixed(2)}`;
  };

  const handleExpressServiceToggle = checked => {
    setIsExpressService(checked);
    setAppliedDiscount(null);
    setDiscountFeedback({ message: '', type: null });
    if (onExpressServiceChange) {
      onExpressServiceChange(checked);
    }
    if (onDiscountChange) {
      onDiscountChange(null);
    }
  };

  const buildValidatePayload = () => {
    const cartTotal =
      baseSubtotal + (isExpressService ? EXPRESS_SERVICE_FEE_PER_ITEM * itemCount : 0);
    const items = cartItems.map(item => ({
      product: item.id,
      price: item.price,
      quantity: item.quantity,
      category: item.category ?? '',
    }));
    return { code: discountCode.trim(), cartTotal, itemCount, items };
  };

  const handleApplyDiscount = async () => {
    const code = discountCode.trim();
    if (!code) {
      setDiscountFeedback({ message: 'Enter a discount code', type: 'error' });
      return;
    }

    setIsValidatingDiscount(true);
    setDiscountFeedback({ message: '', type: null });

    try {
      const payload = buildValidatePayload();
      const response = await validateDiscount(payload);

      const discountData = response?.data;
      const amount = discountData?.discountAmount;
      const appliedCode = discountData?.code ?? code;
      const finalTotalFromBackend = discountData?.finalTotal;
      const savingsLabel = discountData?.savings;

      if (amount != null && amount > 0) {
        setAppliedDiscount({
          code: appliedCode,
          amount,
          finalTotal: finalTotalFromBackend,
          savings: savingsLabel,
        });
        setDiscountFeedback({
          message: savingsLabel
            ? `Discount applied: ${savingsLabel}`
            : `Discount applied: ${appliedCode}`,
          type: 'success',
        });
        if (onDiscountChange) {
          onDiscountChange(appliedCode);
        }
      } else {
        setAppliedDiscount(null);
        setDiscountFeedback({
          message: response?.message ?? 'This code could not be applied.',
          type: 'error',
        });
        if (onDiscountChange) {
          onDiscountChange(null);
        }
      }
    } catch (error) {
      setAppliedDiscount(null);
      const message =
        error.response?.data?.error ??
        error.response?.data?.message ??
        error.message ??
        'Invalid or expired code';
      setDiscountFeedback({ message, type: 'error' });
      if (onDiscountChange) {
        onDiscountChange(null);
      }
    } finally {
      setIsValidatingDiscount(false);
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

          {/* Discount Code */}
          <div className="pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 font-lato mb-2">
              Discount code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={discountCode}
                onChange={e => setDiscountCode(e.target.value)}
                placeholder="Enter code"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-lato placeholder:text-gray-400 focus:border-msq-purple-rich focus:outline-none focus:ring-1 focus:ring-msq-purple-rich"
                disabled={isValidatingDiscount}
                aria-label="Discount code"
              />
              <button
                type="button"
                onClick={handleApplyDiscount}
                disabled={isValidatingDiscount || !discountCode.trim()}
                className="rounded-md bg-msq-purple-rich px-4 py-2 text-sm font-medium text-white font-lato hover:bg-msq-purple-rich/90 focus:outline-none focus:ring-2 focus:ring-msq-purple-rich focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isValidatingDiscount ? 'Applying…' : 'Apply'}
              </button>
            </div>
            {discountFeedback.message && (
              <p
                className={`mt-2 text-sm font-lato ${
                  discountFeedback.type === 'success'
                    ? 'text-green-600'
                    : discountFeedback.type === 'error'
                      ? 'text-red-600'
                      : 'text-gray-600'
                }`}
                role="status"
              >
                {discountFeedback.type === 'success' && (
                  <MdLocalOffer className="inline-block mr-1 align-middle" size={16} />
                )}
                {discountFeedback.message}
              </p>
            )}
          </div>
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

          {/* Discount Line Item */}
          {appliedDiscount && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-lato flex items-center space-x-1">
                <MdLocalOffer className="text-green-600" size={16} />
                <span>Discount ({appliedDiscount.code})</span>
              </span>
              <span className="text-sm font-medium text-green-600 font-lato">
                -{formatPrice(appliedDiscount.amount)}
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
              <span className="text-sm text-gray-600 font-lato">Subtotal</span>
              <span className="text-sm font-medium text-gray-900 font-lato">
                {formatPrice(subtotalBeforeDiscount)}
              </span>
            </div>
            {appliedDiscount && (
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600 font-lato">Discount</span>
                <span className="text-sm font-medium text-green-600 font-lato">
                  -{formatPrice(discountAmount)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-bebas text-gray-900">Final total</span>
              <span className="text-lg font-bebas font-bold text-msq-purple-rich">
                {formatPrice(finalTotal)}
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
