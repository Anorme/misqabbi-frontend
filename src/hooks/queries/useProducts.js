import { useQuery } from '@tanstack/react-query';
import { fetchDiscoverableProducts, fetchProductBySlug } from '../../api/products';

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

/**
 * Query hook for fetching a single product by slug
 * @param {string} slug - Product slug
 * @param {Object} options - Additional query options
 */
export const useProduct = (slug, options = {}) => {
  return useQuery({
    queryKey: ['products', 'slug', slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug, // Only fetch if slug is provided
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    ...options,
  });
};
