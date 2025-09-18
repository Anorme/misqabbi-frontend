export const getCartItems = state => Object.values(state.cartItems);

export const getCartItemCount = state =>
  Object.values(state.cartItems).reduce((sum, item) => sum + item.quantity, 0);

export const getCartSubtotal = state =>
  Object.values(state.cartItems).reduce((sum, item) => sum + item.product.price * item.quantity, 0);
