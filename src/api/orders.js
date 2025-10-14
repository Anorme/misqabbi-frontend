import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const getOrders = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const response = await axios.get(`${API_URL}/orders?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
    if (!response.data?.success) throw new Error('Failed to fetch orders');
    return response.data; // { success, data, total, totalPages, currentPage }
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

const getOrderById = async id => {
  try {
    const response = await axios.get(`${API_URL}/orders/${id}`, { withCredentials: true });
    if (!response.data?.success) throw new Error('Failed to fetch order');
    return response.data; // { success, data }
  } catch (error) {
    console.error('Error fetching order by id:', error);
    throw error;
  }
};

export { getOrders, getOrderById };
