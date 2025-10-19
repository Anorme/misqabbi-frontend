export const getCartItems = state => Object.values(state.cartItems);

export const getCartItemsWithKeys = state =>
  Object.entries(state.cartItems).map(([key, item]) => ({ ...item, key }));

export const getCartItemCount = state =>
  Object.values(state.cartItems).reduce((sum, item) => sum + item.quantity, 0);

export const getCartSubtotal = state =>
  Object.values(state.cartItems).reduce((sum, item) => sum + item.price * item.quantity, 0);
