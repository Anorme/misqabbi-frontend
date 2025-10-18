import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const subscribeToNewsletter = async email => {
  try {
    const response = await axios.post(
      `${API_URL}/newsletter/subscribe`,
      { email },
      { withCredentials: true }
    );

    const { success, message } = response.data;

    if (success) {
      return { success: true, message: message || 'Successfully subscribed to newsletter' };
    } else {
      console.error(message);
      throw new Error(message || 'Failed to subscribe to newsletter');
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};

export { subscribeToNewsletter };
