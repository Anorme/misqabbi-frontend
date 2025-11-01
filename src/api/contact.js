import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const submitContactForm = async ({ name, email, message }) => {
  try {
    const response = await axios.post(
      `${API_URL}/contact`,
      { name, email, message },
      { withCredentials: true }
    );

    const { success, message: responseMessage } = response.data;

    if (success) {
      return { success: true, message: responseMessage || 'Message sent successfully' };
    } else {
      console.error(responseMessage);
      throw new Error(responseMessage || 'Failed to send message');
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export { submitContactForm };
