import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const getOrders = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const response = await axios.get(`${API_URL}/orders?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
    if (!response.data?.success) throw new Error('Failed to fetch orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

const getOrderById = async id => {
  try {
    const response = await axios.get(`${API_URL}/orders/${id}`, {
      withCredentials: true,
      // Prevent caching to avoid 304 responses
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    });

    // Handle 304 responses (cached data)
    if (response.status === 304) {
      console.warn('Order data served from cache (304)');
      // Return cached data if available, otherwise throw error
      throw new Error('Order data not available');
    }

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to fetch order');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching order by id:', error);
    throw error;
  }
};

const createOrder = async orderData => {
  try {
    const response = await axios.post(`${API_URL}/orders/checkout`, orderData, {
      withCredentials: true,
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to create order');
    }

    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

const fetchAdminOrders = async ({ page = 1, limit = 12 } = {}) => {
  try {
    const response = await axios.get(`${API_URL}/admin/orders?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to fetch admin orders');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching admin orders:', error);
    throw error;
  }
};

const updateAdminOrderStatus = async (id, status) => {
  try {
    const response = await axios.patch(
      `${API_URL}/admin/orders/${id}`,
      { status },
      { withCredentials: true }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to update order status');
    }

    return response.data; // { success, data, message }
  } catch (error) {
    console.error('Error updating admin order status:', error);
    throw error;
  }
};

export { getOrders, getOrderById, createOrder, fetchAdminOrders, updateAdminOrderStatus };
