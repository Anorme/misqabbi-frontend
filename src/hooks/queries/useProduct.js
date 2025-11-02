import { useQuery } from '@tanstack/react-query';
import { fetchProductBySlug } from '../../api/products';

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
