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
      `${API_URL}/admin/users/${id}/role`,
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

const deleteAdminUser = async id => {
  try {
    const response = await axios.delete(`${API_URL}/admin/users/${id}`, {
      withCredentials: true,
    });

    // 204 No Content is common for deletes
    if (response.status === 204) return { success: true };
    if (response.data?.success === false) {
      throw new Error(response.data?.message || 'Failed to delete user');
    }
    return response.data || { success: true };
  } catch (error) {
    console.error('Error deleting admin user:', error);
    throw error;
  }
};

export { deleteAdminUser };

const fetchAdminUserAnalytics = async userId => {
  try {
    const response = await axios.get(`${API_URL}/admin/analytics/${userId}`, {
      withCredentials: true,
    });
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to fetch user analytics');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching admin user analytics:', error);
    throw error;
  }
};

export { fetchAdminUserAnalytics };
