import { Heart } from 'lucide-react';
import { useFavorites as useFavoritesQuery } from '../../hooks/queries/useFavorites';
import { useToggleFavorite } from '../../hooks/mutations/useFavoriteMutations';
import {
  showAddedToFavoritesToast,
  showRemovedFromFavoritesToast,
  showErrorToast,
} from '../../utils/showToast';
import useAuthAction from '../../hooks/useAuthAction';

const FavoritesLinkButton = ({ product, className = '', showText = false, onAuthRequired }) => {
  const { requireAuth } = useAuthAction();

  // Use TanStack Query for favorites data
  const { data: favorites = [] } = useFavoritesQuery();
  const isProductFavorite = favorites.some(
    fav => fav.id === product.id || fav.productId === product.id
  );

  // Use mutation hook
  const toggleFavoriteMutation = useToggleFavorite();

  const handleToggleFavorite = async () => {
    // Check if user is authenticated before proceeding
    if (!requireAuth(() => {}, 'favorites')) {
      // If onAuthRequired callback is provided, call it
      if (onAuthRequired) {
        onAuthRequired();
      }
      return;
    }

    try {
      await toggleFavoriteMutation.mutateAsync(product.id);
      if (isProductFavorite) {
        showRemovedFromFavoritesToast();
      } else {
        showAddedToFavoritesToast();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      showErrorToast('Failed to update favorites');
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`flex items-center text-msq-gold-light cursor-pointer transition-colors duration-200 ${className}`}
      title={isProductFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`w-full h-full ${
          isProductFavorite
            ? 'text-msq-gold-light fill-msq-gold-light'
            : 'hover:fill-msq-gold-light active:fill-msq-gold-light'
        } transition-colors duration-200`}
        size={30}
      />
      {showText && (
        <span className="text-sm font-lato">
          {isProductFavorite ? 'Remove' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
};

export default FavoritesLinkButton;
