import CartItem from './CartItem';
import CartSummary from './CartSummary';
import EmptyCartState from './EmptyCartState';
import CartDrawerHeader from './CartDrawerHeader';
import useCartDrawer from '../../hooks/useCartDrawer';

const CartDrawer = ({ isOpen, onClose }) => {
  const {
    isAnimating,
    cartItems,
    itemCount,
    subtotal,
    handleBackdropClick,
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
        <CartDrawerHeader itemCount={itemCount} onClose={onClose} />

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
                <CartItem key={`${item.id}-${item.size}`} item={item} />
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
