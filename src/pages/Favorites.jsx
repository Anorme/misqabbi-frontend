import { useFavorites } from '../contexts/favorites/useFavorites';
import { useAuthState } from '../contexts/auth/useAuth';
import AuthActionModal from '../components/auth/AuthActionModal';
import { LoadingSpinner } from '../components/ui/LoadingSpinner.jsx';
import { getPrimaryImageUrl } from '../utils/productImages';
import useAuthAction from '../hooks/useAuthAction';
import { useEffect } from 'react';

const Favorites = () => {
  const { favoriteItems, isLoading } = useFavorites();
  const { isAuthenticated } = useAuthState();
  const { requireAuth, closeModal, isModalOpen, modalContext } = useAuthAction();

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      requireAuth(() => {}, 'favorites');
    }
  }, [isAuthenticated, requireAuth]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AuthActionModal isOpen={isModalOpen} onClose={closeModal} context={modalContext} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size={48} color="#81298c" />
          <p className="text-gray-600 mt-4">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bebas text-msq-purple-rich">My Favorites</h1>
          <p className="text-gray-600 mt-2">
            {favoriteItems.length} {favoriteItems.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {favoriteItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-500 mb-6">Start adding items you love to your favorites</p>
            <a
              href="/shop"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-msq-purple-rich hover:bg-msq-purple"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={getPrimaryImageUrl(item)}
                    alt={item.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-xl font-semibold text-msq-purple-rich">
                    GHC {item.price?.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
