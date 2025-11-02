import { useQuery } from '@tanstack/react-query';
import { fetchFavorites } from '../../api/favorites';

/**
 * Query hook for fetching user favorites
 * @param {Object} options - Additional query options
 */
export const useFavorites = (options = {}) => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => fetchFavorites(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    ...options,
  });
};
