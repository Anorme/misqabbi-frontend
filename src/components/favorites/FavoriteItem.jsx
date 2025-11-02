import { memo } from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';
import { useRemoveFavorite } from '../../hooks/mutations/useFavoriteMutations';
import { showRemovedFromFavoritesToast, showErrorToast } from '../../utils/showToast';
import { getPrimaryImageUrl } from '../../utils/productImages';

const FavoriteItem = ({ item, onClose }) => {
  // Use mutation hook for removing favorites
  const removeFavoriteMutation = useRemoveFavorite();

  const handleRemoveFavorite = async () => {
    try {
      const productId = item.productId;
      await removeFavoriteMutation.mutateAsync(productId);
      showRemovedFromFavoritesToast();
    } catch (error) {
      console.error('Error removing favorite:', error);
      showErrorToast('Failed to remove from favorites');
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
        {getPrimaryImageUrl(item) ? (
          <img
            src={getPrimaryImageUrl(item)}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <Heart className="w-6 h-6 text-gray-400" />
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-lato font-medium text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm font-lato font-semibold text-msq-purple-rich">
          GHC {item.price?.toFixed(2) || '0.00'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        {/* View Product Link */}
        <Link
          to={`/product/${item.slug}`}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          title="View product"
          onClick={onClose}
        >
          <ExternalLink className="w-4 h-4 text-gray-600" />
        </Link>

        {/* Remove from Favorites */}
        <button onClick={handleRemoveFavorite} title="Remove from favorites">
          <Heart
            className="w-full h-full cursor-pointer text-msq-gold-light fill-current group-hover:text-msq-gold-light"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};

export default memo(FavoriteItem);
