import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const fetchPaginatedProducts = async (page = 1, limit = 6) => {
  try {
    const response = await axios.get(`${API_URL}/products?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
    if (!response.data.success) throw new Error('Failed to fetch products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const fetchDiscoverableProducts = async (params = {}) => {
  try {
    const {
      q = '',
      category = '',
      minPrice = '',
      maxPrice = '',
      sort = 'latest',
      page = 1,
      limit = 12,
    } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add optional search parameters
    if (q.trim()) queryParams.append('q', q.trim());
    if (minPrice) queryParams.append('minPrice', minPrice);
    if (maxPrice) queryParams.append('maxPrice', maxPrice);
    if (category) queryParams.append('category', category);
    if (sort && sort !== 'latest') queryParams.append('sort', sort);

    const response = await axios.get(`${API_URL}/products?${queryParams.toString()}`, {
      withCredentials: true,
    });
    if (!response.data.success) throw new Error('Failed to fetch products');
    return response.data;
  } catch (error) {
    console.error('Error fetching discoverable products:', error);
    throw error;
  }
};

const fetchProductBySlug = async slug => {
  try {
    const response = await axios.get(`${API_URL}/products/${slug}?includeRelated=true`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export { fetchPaginatedProducts, fetchProductBySlug, fetchDiscoverableProducts };

const createAdminProduct = async formData => {
  try {
    const response = await axios.post(`${API_URL}/admin/products`, formData, {
      withCredentials: true,
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to create product');
    }

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export { createAdminProduct };

const fetchAdminProducts = async ({ page = 1, limit = 12 } = {}) => {
  try {
    const response = await axios.get(`${API_URL}/admin/products?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to fetch admin products');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching admin products:', error);
    throw error;
  }
};

export { fetchAdminProducts };

const updateAdminProduct = async (id, body) => {
  try {
    const response = await axios.put(`${API_URL}/admin/products/${id}`, body, {
      withCredentials: true,
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to update product');
    }

    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

const deleteAdminProduct = async id => {
  try {
    const response = await axios.delete(`${API_URL}/admin/products/${id}`, {
      withCredentials: true,
    });

    // 204 No Content is success
    if (response.status === 204) {
      return { success: true };
    }

    if (response.data?.success === false) {
      throw new Error(response.data?.message || 'Failed to delete product');
    }

    return response.data || { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export { updateAdminProduct, deleteAdminProduct };

// Variant API functions
const createVariant = async (baseProductId, formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/admin/products/${baseProductId}/variants`,
      formData,
      {
        withCredentials: true,
      }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to create variant');
    }

    return response.data;
  } catch (error) {
    console.error('Error creating variant:', error);
    throw error;
  }
};

const updateVariantSwatchImage = async (baseProductId, variantId, formData) => {
  try {
    const response = await axios.put(
      `${API_URL}/admin/products/${baseProductId}/variants/${variantId}/swatch-image`,
      formData,
      {
        withCredentials: true,
      }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to update variant swatch image');
    }

    return response.data;
  } catch (error) {
    console.error('Error updating variant swatch image:', error);
    throw error;
  }
};

const deleteVariant = async (baseProductId, variantId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/admin/products/${baseProductId}/variants/${variantId}`,
      {
        withCredentials: true,
      }
    );

    // 204 No Content is success
    if (response.status === 204) {
      return { success: true };
    }

    if (response.data?.success === false) {
      throw new Error(response.data?.message || 'Failed to delete variant');
    }

    return response.data || { success: true };
  } catch (error) {
    console.error('Error deleting variant:', error);
    throw error;
  }
};

const fetchProductVariants = async productId => {
  try {
    const response = await axios.get(`${API_URL}/admin/products/${productId}/variants`, {
      withCredentials: true,
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to fetch product variants');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching product variants:', error);
    throw error;
  }
};

export { createVariant, updateVariantSwatchImage, deleteVariant, fetchProductVariants };

// Base product swatch image update
const updateProductSwatchImage = async (productId, formData) => {
  try {
    const response = await axios.put(
      `${API_URL}/admin/products/${productId}/swatch-image`,
      formData,
      {
        withCredentials: true,
      }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to update product swatch image');
    }

    return response.data;
  } catch (error) {
    console.error('Error updating product swatch image:', error);
    throw error;
  }
};

export { updateProductSwatchImage };

// Delete product image functions
const deleteProductImage = async (productId, publicId) => {
  try {
    // URL encode the publicId to handle slashes and special characters
    const encodedPublicId = encodeURIComponent(publicId);
    const response = await axios.delete(
      `${API_URL}/admin/products/${productId}/images/${encodedPublicId}`,
      {
        withCredentials: true,
      }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.error || response.data?.message || 'Failed to delete image');
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting product image:', error);
    throw error;
  }
};

const deleteProductSwatchImage = async productId => {
  try {
    const response = await axios.delete(`${API_URL}/admin/products/${productId}/swatch-image`, {
      withCredentials: true,
    });

    if (!response.data?.success) {
      throw new Error(
        response.data?.error || response.data?.message || 'Failed to delete swatch image'
      );
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting product swatch image:', error);
    throw error;
  }
};

const deleteVariantImage = async (baseProductId, variantId, publicId) => {
  try {
    // URL encode the publicId to handle slashes and special characters
    const encodedPublicId = encodeURIComponent(publicId);
    const response = await axios.delete(
      `${API_URL}/admin/products/${baseProductId}/variants/${variantId}/images/${encodedPublicId}`,
      {
        withCredentials: true,
      }
    );

    if (!response.data?.success) {
      throw new Error(
        response.data?.error || response.data?.message || 'Failed to delete variant image'
      );
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting variant image:', error);
    throw error;
  }
};

export { deleteProductImage, deleteProductSwatchImage, deleteVariantImage };
