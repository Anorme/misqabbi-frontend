import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAdminUserRole, deleteAdminUser } from '../../api/users';

/**
 * Mutation hook for updating a user's role (admin)
 */
export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }) => updateAdminUserRole(id, role),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] }); // Update dashboard stats
    },
  });
};

/**
 * Mutation hook for deleting a user (admin)
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] }); // Update dashboard stats
    },
  });
};
