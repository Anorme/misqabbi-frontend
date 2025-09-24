export const saveCartState = state => {
  try {
    localStorage.setItem('cartState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart state:', error);
  }
};

export const loadCartState = () => {
  try {
    const persistedCartState = localStorage.getItem('cartState');
    return persistedCartState ? JSON.parse(persistedCartState) : null;
  } catch (error) {
    console.error('Error loading cart state:', error);
    return null;
  }
};
