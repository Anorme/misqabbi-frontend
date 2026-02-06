import { useQuery } from '@tanstack/react-query';
import { fetchAdminDashboard } from '../../api/admin';
import { fetchAdminProducts } from '../../api/products';
import { fetchAdminOrders, fetchAdminOrderById } from '../../api/orders';
import { fetchAdminUsers } from '../../api/users';
import { getAdminDiscounts } from '../../api/adminDiscounts';

/**
 * Query hook for fetching admin dashboard data
 */
export const useAdminDashboard = (options = {}) => {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: () => fetchAdminDashboard(),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Query hook for fetching admin products with pagination
 */
export const useAdminProducts = (params = {}, options = {}) => {
  const { page = 1, limit = 12 } = params;

  return useQuery({
    queryKey: ['admin', 'products', { page, limit }],
    queryFn: () => fetchAdminProducts({ page, limit }),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Query hook for fetching admin orders with pagination
 */
export const useAdminOrders = (params = {}, options = {}) => {
  const { page = 1, limit = 12 } = params;

  return useQuery({
    queryKey: ['admin', 'orders', { page, limit }],
    queryFn: () => fetchAdminOrders({ page, limit }),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Query hook for fetching admin users with pagination
 */
export const useAdminUsers = (params = {}, options = {}) => {
  const { page = 1, limit = 12 } = params;

  return useQuery({
    queryKey: ['admin', 'users', { page, limit }],
    queryFn: () => fetchAdminUsers({ page, limit }),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Query hook for fetching a single admin order by ID
 */
export const useAdminOrder = (id, options = {}) => {
  return useQuery({
    queryKey: ['admin', 'orders', 'detail', id],
    queryFn: () => fetchAdminOrderById(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Query hook for fetching admin discounts list with filters and pagination
 */
export const useAdminDiscounts = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ['admin', 'discounts', 'list', params],
    queryFn: () => getAdminDiscounts(params),
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
};
