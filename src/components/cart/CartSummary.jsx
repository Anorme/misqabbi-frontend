const ClearCartButton = ({ onClearCart }) => {
  return (
    <button
      onClick={onClearCart}
      className="w-full text-sm font-lato text-red-500 hover:text-red-700 transition-colors duration-200"
    >
      Clear Cart
    </button>
  );
};

const CartTotals = ({ itemCount, subtotal }) => {
  return (
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
  );
};

const CheckoutButton = ({ onCheckout }) => {
  return (
    <button
      onClick={onCheckout}
      className="w-full bg-msq-purple-rich text-white py-3 px-4 rounded-lg font-lato font-medium hover:bg-msq-purple transition-colors duration-200 shadow-md hover:shadow-lg"
    >
      Proceed to Checkout
    </button>
  );
};

const CartSummary = ({ itemCount, subtotal, onClearCart, onCheckout }) => {
  return (
    <div className="border-t border-gray-200 p-6 bg-gray-50">
      <div className="space-y-4">
        <ClearCartButton onClearCart={onClearCart} />
        <CartTotals itemCount={itemCount} subtotal={subtotal} />
        <CheckoutButton onCheckout={onCheckout} />
      </div>
    </div>
  );
};

export default CartSummary;
