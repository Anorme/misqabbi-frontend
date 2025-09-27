import { Heart } from 'lucide-react';

const EmptyFavoritesState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center px-6">
      <Heart className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-bebas text-gray-500 mb-2">No favorites yet</h3>
      <p className="text-sm font-lato text-gray-400">
        Start adding items you love to your favorites
      </p>
    </div>
  );
};

export default EmptyFavoritesState;
