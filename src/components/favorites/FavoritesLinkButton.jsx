import { Heart } from 'lucide-react';
import { useFavorites } from '../../contexts/favorites/useFavorites';
import { addFavorite, removeFavorite } from '../../contexts/favorites/favoritesActions';
import {
  addFavorite as addFavoriteAPI,
  removeFavorite as removeFavoriteAPI,
} from '../../api/favorites';
import {
  showAddedToFavoritesToast,
  showRemovedFromFavoritesToast,
  showErrorToast,
} from '../../utils/showToast';
import useAuthAction from '../../hooks/useAuthAction';

const FavoritesLinkButton = ({ product, className = '', showText = false, onAuthRequired }) => {
  const { isFavorite, dispatch } = useFavorites();
  const { requireAuth } = useAuthAction();
  const isProductFavorite = isFavorite(product.id);

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
      if (isProductFavorite) {
        // Remove from favorites
        dispatch(removeFavorite(product.id));
        await removeFavoriteAPI(product.id);
        showRemovedFromFavoritesToast();
      } else {
        // Add to favorites
        dispatch(addFavorite(product));
        await addFavoriteAPI(product.id);
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
