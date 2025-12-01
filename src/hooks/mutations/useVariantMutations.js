import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVariant, updateVariantSwatchImage, deleteVariant } from '../../api/products';

/**
 * Mutation hook for creating a variant
 */
export const useCreateVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ baseProductId, formData }) => createVariant(baseProductId, formData),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalidate public product list
      // Invalidate specific product if we have the slug
      queryClient.invalidateQueries({ queryKey: ['products', 'slug'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] }); // Update dashboard stats
    },
  });
};

/**
 * Mutation hook for updating a variant's swatch image
 */
export const useUpdateVariantSwatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ baseProductId, variantId, formData }) =>
      updateVariantSwatchImage(baseProductId, variantId, formData),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalidate public product list
      queryClient.invalidateQueries({ queryKey: ['products', 'slug'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] }); // Update dashboard stats
    },
  });
};

/**
 * Mutation hook for deleting a variant
 */
export const useDeleteVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ baseProductId, variantId }) => deleteVariant(baseProductId, variantId),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalidate public product list
      queryClient.invalidateQueries({ queryKey: ['products', 'slug'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] }); // Update dashboard stats
    },
  });
};
