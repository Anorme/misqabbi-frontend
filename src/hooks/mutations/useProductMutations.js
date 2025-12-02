import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  updateProductSwatchImage,
  deleteProductImage,
  deleteProductSwatchImage,
  deleteVariantImage,
} from '../../api/products';

/**
 * Mutation hook for creating a product
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdminProduct,
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalidate public product list
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] }); // Update dashboard stats
    },
  });
};

/**
 * Mutation hook for updating a product
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }) => updateAdminProduct(id, body),
    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalidate public product list
      // Invalidate specific product if we have the slug
      if (variables.body instanceof FormData) {
        // If FormData, we don't have the slug easily accessible
        queryClient.invalidateQueries({ queryKey: ['products', 'slug'] });
      } else if (variables.body?.slug) {
        queryClient.invalidateQueries({
          queryKey: ['products', 'slug', variables.body.slug],
        });
      }
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] }); // Update dashboard stats
    },
  });
};

/**
 * Mutation hook for deleting a product
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminProduct,
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalidate public product list
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] }); // Update dashboard stats
    },
  });
};

/**
 * Mutation hook for updating a product's swatch image
 */
export const useUpdateProductSwatchImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, formData }) => updateProductSwatchImage(productId, formData),
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
 * Mutation hook for deleting a product gallery image
 */
export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, publicId }) => deleteProductImage(productId, publicId),
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
 * Mutation hook for deleting a product's swatch image
 */
export const useDeleteProductSwatchImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productId => deleteProductSwatchImage(productId),
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
 * Mutation hook for deleting a variant gallery image
 */
export const useDeleteVariantImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ baseProductId, variantId, publicId }) =>
      deleteVariantImage(baseProductId, variantId, publicId),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalidate public product list
      queryClient.invalidateQueries({ queryKey: ['products', 'slug'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] }); // Update dashboard stats
    },
  });
};
