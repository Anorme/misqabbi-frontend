import { useQuery } from '@tanstack/react-query';
import { fetchDiscoverableProducts } from '../../api/products';

/**
 * Query hook for fetching discoverable products with filters
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.q - Search query
 * @param {string} params.category - Category filter
 * @param {string} params.minPrice - Minimum price
 * @param {string} params.maxPrice - Maximum price
 * @param {string} params.sort - Sort option
 * @param {Object} options - Additional query options
 */
export const useProducts = (params = {}, options = {}) => {
  const {
    page = 1,
    limit = 12,
    q = '',
    category = '',
    minPrice = '',
    maxPrice = '',
    sort = 'latest',
  } = params;

  return useQuery({
    queryKey: ['products', 'discover', { page, limit, q, category, minPrice, maxPrice, sort }],
    queryFn: () =>
      fetchDiscoverableProducts({ page, limit, q, category, minPrice, maxPrice, sort }),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    ...options,
  });
};
