import { useState, useEffect } from 'react';
import { useFavorites as useFavoritesQuery } from '../hooks/queries/useFavorites';
import { useRemoveFavorite } from '../hooks/mutations/useFavoriteMutations';
import { useAuthState } from '../contexts/auth/useAuth';

const useFavoritesDrawer = (isOpen, onClose) => {
  const { isAuthenticated, isAuthLoading } = useAuthState();

  // Use TanStack Query for favorites data
  const { data: favoriteItems = [] } = useFavoritesQuery({
    enabled: isAuthenticated && !isAuthLoading,
  });

  // Mutation hook - must be called at top level
  const removeFavoriteMutation = useRemoveFavorite();

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

  const handleClearFavorites = async () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      try {
        // Remove each favorite - use productId if available, otherwise fall back to id
        await Promise.all(
          favoriteItems.map(item => removeFavoriteMutation.mutateAsync(item.productId || item.id))
        );
        // Query will automatically refetch after mutations invalidate it
      } catch (error) {
        console.error('Error clearing favorites:', error);
      }
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
