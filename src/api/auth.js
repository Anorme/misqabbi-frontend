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

const signInWithGoogleRedirect = async () => {
  // navigate to google auth page
  window.location.href = `${API_URL}/auth/google`;
};

const fetchAuthenticatedUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/me`, { withCredentials: true });

    const { success, message, data } = response.data;

    if (success && data.user) {
      return data.user;
    } else {
      console.error('Failed to fetch user:', message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching authenticated user', error);
    return null;
  }
};

const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });

    const { success, message } = response.data;

    if (success) {
      return true;
    } else {
      console.error(message);
      return false;
    }
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};

const updateUserProfile = async userData => {
  try {
    // Placeholder for future backend integration
    console.log('Updating user profile:', userData);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For now, just return success
    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

const requestPasswordReset = async email => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/forgot-password`,
      { email },
      { withCredentials: true }
    );

    const { success, message } = response.data;

    if (success) {
      return { success: true, message: message || 'Password reset link sent to your email' };
    } else {
      console.error(message);
      throw new Error(message || 'Failed to send password reset email');
    }
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw error;
  }
};

const resetPassword = async (userId, token, newPassword) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/reset-password/${userId}/${token}`,
      { newPassword },
      { withCredentials: true }
    );

    const { success, message, data } = response.data;

    if (success) {
      return { success: true, message: message || 'Password reset successfully', user: data?.user };
    } else {
      console.error(message);
      throw new Error(message || 'Failed to reset password');
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

export {
  registerUserWithEmail,
  loginUserWithEmail,
  signInWithGoogleRedirect,
  fetchAuthenticatedUser,
  logoutUser,
  updateUserProfile,
  requestPasswordReset,
  resetPassword,
};
