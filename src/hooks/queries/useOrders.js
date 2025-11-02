import { useQuery } from '@tanstack/react-query';
import { getOrders, getOrderById } from '../../api/orders';

/**
 * Query hook for fetching user orders with pagination
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {Object} options - Additional query options
 */
export const useOrders = (params = {}, options = {}) => {
  const { page = 1, limit = 10 } = params;

  return useQuery({
    queryKey: ['orders', 'list', { page, limit }],
    queryFn: () => getOrders({ page, limit }),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

/**
 * Query hook for fetching a single order by ID
 * @param {string} id - Order ID
 * @param {Object} options - Additional query options
 */
export const useOrder = (id, options = {}) => {
  return useQuery({
    queryKey: ['orders', 'detail', id],
    queryFn: () => getOrderById(id),
    enabled: !!id, // Only fetch if id is provided
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};
