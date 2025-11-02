import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder, updateAdminOrderStatus } from '../../api/orders';

/**
 * Mutation hook for creating an order
 */
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] }); // Update dashboard stats
    },
  });
};

/**
 * Mutation hook for updating order status (admin)
 */
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => updateAdminOrderStatus(id, status),
    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] }); // Invalidate user orders
      queryClient.invalidateQueries({
        queryKey: ['admin', 'orders', 'detail', variables.id],
      }); // Invalidate specific order detail
      queryClient.invalidateQueries({
        queryKey: ['orders', 'detail', variables.id],
      }); // Invalidate user order detail
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] }); // Update dashboard stats
    },
  });
};
