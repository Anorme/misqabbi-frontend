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
    const response = await axios.get(`${API_URL}/products/${slug}`, { withCredentials: true });
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
