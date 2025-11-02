import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavorite, removeFavorite, toggleFavorite } from '../../api/favorites';

/**
 * Mutation hook for adding a favorite
 */
export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      // Invalidate favorites query
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

/**
 * Mutation hook for removing a favorite
 */
export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      // Invalidate favorites query
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

/**
 * Mutation hook for toggling a favorite
 */
export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleFavorite,
    onSuccess: () => {
      // Invalidate favorites query
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};
