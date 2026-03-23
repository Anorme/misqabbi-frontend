import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const verifyPayment = async reference => {
  try {
    const res = await axios.get(`${API_URL}/payment/verify/${reference}`, {
      withCredentials: true,
    });
    const body = res.data;
    if (!body?.success) {
      const msg = body?.error || body?.message || 'Payment verification failed';
      throw new Error(msg);
    }
    return body;
  } catch (error) {
    console.error('Error verifying payment:', error);
    if (error.response?.data) {
      const d = error.response.data;
      const msg = d.error || d.message || error.message;
      throw new Error(msg);
    }
    throw error;
  }
};

export { verifyPayment };
