import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const fetchPaginatedProducts = async (page = 1, limit = 6) => {
  try {
    const response = await axios.get(`${API_URL}/products?page=${page}&limit=${limit}`);
    if (!response.data.success) throw new Error('Failed to fetch products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const fetchProductBySlug = async slug => {
  try {
    const response = await axios.get(`${API_URL}/products/${slug}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export { fetchPaginatedProducts, fetchProductBySlug };
