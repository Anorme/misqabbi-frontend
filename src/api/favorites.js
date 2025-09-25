import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/favorites`);
    return data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

const addFavorite = async productId => {
  try {
    const { data } = await axios.post(`${API_URL}/favorites`, { productId });
    return data;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

const removeFavorite = async productId => {
  try {
    const { data } = await axios.delete(`${API_URL}/favorites/${productId}`);
    return data;
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};

const toggleFavorite = async productId => {
  try {
    const { data } = await axios.patch(`${API_URL}/favorites/${productId}`);
    return data;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};

const checkFavoriteStatus = async productId => {
  try {
    const { data } = await axios.get(`${API_URL}/favorites/${productId}`);
    return data;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    throw error;
  }
};

export { fetchFavorites, addFavorite, toggleFavorite, removeFavorite, checkFavoriteStatus };
