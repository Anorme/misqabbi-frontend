import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const fetchAdminUsers = async ({ page = 1, limit = 12 } = {}) => {
  try {
    const response = await axios.get(`${API_URL}/admin/users?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to fetch users');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching admin users:', error);
    throw error;
  }
};

const updateAdminUserRole = async (id, role) => {
  try {
    const response = await axios.patch(
      `${API_URL}/admin/users/${id}`,
      { role },
      { withCredentials: true }
    );
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to update user role');
    }
    return response.data;
  } catch (error) {
    console.error('Error updating admin user role:', error);
    throw error;
  }
};

export { fetchAdminUsers, updateAdminUserRole };
