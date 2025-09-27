import { useState, useEffect } from 'react';
import { useFavorites } from '../contexts/favorites/useFavorites';
import { clearFavorites } from '../contexts/favorites/favoritesActions';

const useFavoritesDrawer = (isOpen, onClose) => {
  const { favoriteItems, dispatch } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);

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

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      dispatch(clearFavorites());
    }
  };

  return {
    // State
    isAnimating,
    favoriteItems,

    // Handlers
    handleBackdropClick,
    handleClearFavorites,
  };
};

export default useFavoritesDrawer;
