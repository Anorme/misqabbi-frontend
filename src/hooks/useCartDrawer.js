import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCartState, useCartDispatch } from '../contexts/cart/useCart';
import { getCartItems, getCartItemCount, getCartSubtotal } from '../contexts/cart/cartSelectors';
import { clearCart } from '../contexts/cart/cartActions';

const useCartDrawer = (isOpen, onClose) => {
  const cartState = useCartState();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  // Derived state
  const cartItems = getCartItems(cartState);
  const itemCount = getCartItemCount(cartState);
  const subtotal = getCartSubtotal(cartState);

  // Handle animation states and body scroll
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

  // Event handlers
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    onClose(); // Close the drawer first
    navigate('/checkout'); // Navigate to checkout
  };

  return {
    // State
    isAnimating,
    cartItems,
    itemCount,
    subtotal,

    // Handlers
    handleBackdropClick,
    handleClearCart,
    handleCheckout,
  };
};

export default useCartDrawer;
