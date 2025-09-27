import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartState } from '../../contexts/cart/useCart';
import { getCartItemCount } from '../../contexts/cart/cartSelectors';
import CartDrawer from '../CartDrawer.jsx';

const CartButton = ({ className = '', size = 20, showCount = true }) => {
  const cartState = useCartState();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemCount = getCartItemCount(cartState);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  return (
    <>
      <button
        onClick={handleCartClick}
        className={`p-2 text-msq-gold-light cursor-pointer relative ${className}`}
      >
        <ShoppingCart size={size} />
        {showCount && itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-msq-gold text-white text-[10px] font-lato px-1.5 py-0.5 rounded-full shadow-md">
            {itemCount}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default CartButton;
