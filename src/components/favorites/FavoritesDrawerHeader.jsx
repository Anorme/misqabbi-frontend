import { X, Heart } from 'lucide-react';

const FavoritesTitle = () => {
  return (
    <div className="flex items-center space-x-3">
      <Heart className="w-6 h-6 text-msq-purple-rich" />
      <h2 className="text-2xl font-bebas text-msq-purple-rich">My Favorites</h2>
    </div>
  );
};

const CloseButton = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
    >
      <X className="w-5 h-5 text-gray-600" />
    </button>
  );
};

const FavoritesDrawerHeader = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <FavoritesTitle />
      <CloseButton onClose={onClose} />
    </div>
  );
};

export default FavoritesDrawerHeader;
