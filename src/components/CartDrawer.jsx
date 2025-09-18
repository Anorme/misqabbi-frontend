import { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartState, useCartDispatch } from '../contexts/cart/useCart';
import { getCartItems, getCartItemCount, getCartSubtotal } from '../contexts/cart/cartSelectors';
import { updateCartItem, removeFromCart, clearCart } from '../contexts/cart/cartActions';

const CartDrawer = ({ isOpen, onClose }) => {
  const cartState = useCartState();
  const dispatch = useCartDispatch();
  const [isAnimating, setIsAnimating] = useState(false);

  const cartItems = getCartItems(cartState);
  const itemCount = getCartItemCount(cartState);
  const subtotal = getCartSubtotal(cartState);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    } else {
      // Allow body scroll when drawer is closed
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(updateCartItem({ ...item, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = item => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    console.log('Proceeding to checkout...');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={handleBackdropClick}
          style={{
            opacity: isAnimating ? 1 : 0,
          }}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-msq-purple-rich" />
            <h2 className="text-2xl font-bebas text-msq-purple-rich">Shopping Cart</h2>
            {itemCount > 0 && (
              <span className="bg-msq-gold text-white text-sm font-lato px-2 py-1 rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-6">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-bebas text-gray-500 mb-2">Your cart is empty</h3>
              <p className="text-sm font-lato text-gray-400">Add some items to get started</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {cartItems.map(item => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                    {item.images?.[0] ? (
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <ShoppingBag className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-lato font-medium text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs font-lato text-gray-500">Size: {item.size}</p>
                    <p className="text-sm font-lato font-semibold text-msq-purple-rich">
                      GHC {item.price?.toFixed(2) || '0.00'}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="text-sm font-lato font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200 ml-2"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="space-y-4">
              {/* Clear Cart Button */}
              <button
                onClick={handleClearCart}
                className="w-full text-sm font-lato text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                Clear Cart
              </button>

              {/* Summary */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-lato text-gray-600">Items ({itemCount})</span>
                  <span className="text-sm font-lato font-medium">GHC {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bebas text-gray-900">Subtotal</span>
                  <span className="text-lg font-bebas font-bold text-msq-purple-rich">
                    GHC {subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-msq-purple-rich text-white py-3 px-4 rounded-lg font-lato font-medium hover:bg-msq-purple transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
