import { useQuery } from '@tanstack/react-query';
import { fetchFavorites } from '../../api/favorites';
import { useAuthState } from '../../contexts/auth/useAuth';

/**
 * Query hook for fetching user favorites
 * @param {Object} options - Additional query options
 */
export const useFavorites = (options = {}) => {
  const { isAuthenticated, hasRestoredAuth } = useAuthState();
  const { enabled = true, ...queryOptions } = options;

  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => fetchFavorites(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    enabled: enabled && hasRestoredAuth && isAuthenticated,
    ...queryOptions,
  });
};
