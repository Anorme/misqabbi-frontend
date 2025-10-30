import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const fetchAdminDashboard = async () => {
  try {
    const res = await axios.get(`${API_URL}/admin/dashboard`, { withCredentials: true });
    if (!res.data?.success) {
      throw new Error(res.data?.message || 'Failed to load admin dashboard');
    }
    return res.data;
  } catch (error) {
    console.error('Error fetching admin dashboard:', error);
    throw error;
  }
};
