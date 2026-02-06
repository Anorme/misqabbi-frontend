import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

/**
 * Validate a discount code against the current cart.
 * User must be logged in (cookie-based auth_token).
 *
 * @param {Object} body
 * @param {string} body.code - User-entered discount code
 * @param {number} body.cartTotal - Cart subtotal (items + express fee if any)
 * @param {number} body.itemCount - Total quantity of items
 * @param {Array<{ product: string, price: number, quantity: number, category: string }>} body.items - Cart line items
 * @returns {Promise<{ success: boolean, data?: { amount?: number, code?: string }, message?: string }>}
 */
const validateDiscount = async body => {
  try {
    const response = await axios.post(`${API_URL}/discounts/validate`, body, {
      withCredentials: true,
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to validate discount');
    }

    return response.data;
  } catch (error) {
    console.error('Discount validation error:', error);
    throw error;
  }
};

export { validateDiscount };
