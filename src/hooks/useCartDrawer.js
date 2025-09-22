import { useState, useEffect } from 'react';
import { useCartState, useCartDispatch } from '../contexts/cart/useCart';
import { getCartItems, getCartItemCount, getCartSubtotal } from '../contexts/cart/cartSelectors';
import {
  updateCartItem,
  removeFromCart,
  clearCart,
  changeItemSize,
} from '../contexts/cart/cartActions';

const useCartDrawer = (isOpen, onClose) => {
  const cartState = useCartState();
  const dispatch = useCartDispatch();
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

  const handleSizeChange = (item, newSize) => {
    dispatch(changeItemSize(item, newSize));
  };

  return {
    // State
    isAnimating,
    cartItems,
    itemCount,
    subtotal,

    // Handlers
    handleBackdropClick,
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
    handleCheckout,
    handleSizeChange,
  };
};

export default useCartDrawer;
