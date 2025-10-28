import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCartState, useCartDispatch } from '../contexts/cart/useCart';
import {
  getCartItemsWithKeys,
  getCartItemCount,
  getCartSubtotal,
} from '../contexts/cart/cartSelectors';
import { clearCart } from '../contexts/cart/cartActions';
import useAuthAction from './useAuthAction';

const useCartDrawer = (isOpen, onClose) => {
  const cartState = useCartState();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();
  const { requireAuth, isModalOpen, modalContext, closeModal } = useAuthAction();
  const [isAnimating, setIsAnimating] = useState(false);

  // Derived state
  const cartItems = getCartItemsWithKeys(cartState);
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

    // Check authentication
    if (!requireAuth(() => navigate('/checkout'), 'checkout', 1000)) {
      return; // Auth modal will be shown, don't proceed
    }
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

    // Auth Modal
    isModalOpen,
    modalContext,
    closeModal,
  };
};

export default useCartDrawer;
