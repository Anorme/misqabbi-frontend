import FavoriteItem from './FavoriteItem';
import EmptyFavoritesState from './EmptyFavoritesState';
import FavoritesDrawerHeader from './FavoritesDrawerHeader';
import useFavoritesDrawer from '../../hooks/useFavoritesDrawer';

const FavoritesDrawer = ({ isOpen, onClose }) => {
  const { isAnimating, favoriteItems, handleBackdropClick, handleClearFavorites } =
    useFavoritesDrawer(isOpen, onClose);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={handleBackdropClick}
          style={{
            opacity: isAnimating ? 1 : 0,
          }}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-screen w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        {/* Header */}
        <FavoritesDrawerHeader onClose={onClose} />

        {/* Favorites Items */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ willChange: 'scroll-position', WebkitOverflowScrolling: 'touch' }}
        >
          {favoriteItems.length === 0 ? (
            <EmptyFavoritesState />
          ) : (
            <div className="p-6 space-y-4">
              {favoriteItems.map(item => (
                <FavoriteItem key={item.id} item={item} onClose={onClose} />
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {favoriteItems.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <button
              onClick={handleClearFavorites}
              className="w-full py-2 px-4 text-sm font-lato text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              Clear All Favorites
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritesDrawer;
