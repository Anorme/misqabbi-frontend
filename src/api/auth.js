import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const registerUserWithEmail = async (email, password, displayName) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/signup`,
      {
        email,
        password,
        displayName,
      },
      { withCredentials: true }
    );

    const { success, message, data } = response.data;

    if (success) {
      return data.user;
    } else {
      console.error(message);
    }
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const loginUserWithEmail = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    const { success, message, data } = response.data;

    if (success) {
      return data.user;
    } else {
      console.error(message);
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

const signInWithGoogleRedirect = () => {
  return `${API_URL}/auth/google`;
};

export { registerUserWithEmail, loginUserWithEmail, signInWithGoogleRedirect };
