import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const verifyPayment = async reference => {
  try {
    const res = await axios.get(`${API_URL}/payment/verify/${reference}`, {
      withCredentials: true,
    });
    return res.data; // expects { success, data: { order, ... } }
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

export { verifyPayment };
