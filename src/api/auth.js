import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

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

const createGuestSession = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/guest/session`,
      {},
      { withCredentials: true }
    );
    const { success, message, data } = response.data;

    if (success && data?.guestId) {
      return { guestId: data.guestId, message };
    }

    throw new Error(message || 'Failed to create guest session');
  } catch (error) {
    console.error('Error creating guest session:', error);
    const msg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Failed to create guest session';
    throw new Error(msg);
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

const updateUserProfile = async (userData, currentUser) => {
  try {
    // Merge userData with currentUser to ensure all required fields are present
    const updatePayload = {
      email: userData.email !== undefined ? userData.email : currentUser?.email || '',
      contact:
        userData.contact !== undefined
          ? userData.contact
          : currentUser?.contact || currentUser?.phoneNumber || '',
      location: userData.location !== undefined ? userData.location : currentUser?.location || '',
    };

    const response = await axios.patch(`${API_URL}/auth/update-profile`, updatePayload, {
      withCredentials: true,
    });

    const { success, message, data } = response.data;

    if (success) {
      return {
        success: true,
        message: message || 'Profile updated successfully',
        user: data?.user,
      };
    } else {
      console.error(message);
      throw new Error(message || 'Failed to update profile');
    }
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
  signInWithGoogleRedirect,
  fetchAuthenticatedUser,
  createGuestSession,
  logoutUser,
  updateUserProfile,
  requestPasswordReset,
  resetPassword,
};
