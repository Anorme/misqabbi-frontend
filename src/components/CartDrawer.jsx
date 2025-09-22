import { X, ShoppingBag } from 'lucide-react';
import CartItem from './cart/CartItem';
import CartSummary from './cart/CartSummary';
import EmptyCartState from './cart/EmptyCartState';
import useCartDrawer from '../hooks/useCartDrawer';

const CartDrawer = ({ isOpen, onClose }) => {
  const {
    isAnimating,
    cartItems,
    itemCount,
    subtotal,
    handleBackdropClick,
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
    handleCheckout,
  } = useCartDrawer(isOpen, onClose);

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
        className={`fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
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
        <div
          className="flex-1 overflow-y-auto"
          style={{ willChange: 'scroll-position', WebkitOverflowScrolling: 'touch' }}
        >
          {cartItems.length === 0 ? (
            <EmptyCartState />
          ) : (
            <div className="p-6 space-y-4">
              {cartItems.map(item => (
                <CartItem
                  key={`${item.id}-${item.size}`}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <CartSummary
            itemCount={itemCount}
            subtotal={subtotal}
            onClearCart={handleClearCart}
            onCheckout={handleCheckout}
          />
        )}
      </div>
    </>
  );
};

export default CartDrawer;
