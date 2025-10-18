import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../contexts/favorites/useFavorites';
import useAuthAction from '../../hooks/useAuthAction';
import FavoritesDrawer from '../favorites/FavoritesDrawer.jsx';
import AuthActionModal from '../auth/AuthActionModal.jsx';

const FavoritesButton = ({ className = '', size = 20, showCount = true }) => {
  const { favoriteItems } = useFavorites();
  const { requireAuth, closeModal, isModalOpen, modalContext } = useAuthAction();
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const favoritesCount = favoriteItems.length;

  const handleFavoritesClick = () => {
    if (requireAuth(() => setIsFavoritesOpen(true), 'favorites')) {
      setIsFavoritesOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleFavoritesClick}
        className={`p-2 text-msq-gold-light cursor-pointer relative ${className}`}
      >
        <Heart className="hover:fill-msq-gold-light" size={size} />
        {showCount && favoritesCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-msq-gold text-white text-[10px] font-lato px-1.5 py-0.5 rounded-full shadow-md">
            {favoritesCount}
          </span>
        )}
      </button>

      {/* Favorites Drawer */}
      <FavoritesDrawer isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />

      {/* Auth Action Modal */}
      <AuthActionModal isOpen={isModalOpen} onClose={closeModal} context={modalContext} />
    </>
  );
};

export default FavoritesButton;
