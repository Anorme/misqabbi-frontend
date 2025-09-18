import { CART_ACTION_TYPES } from './cartActionTypes';

export const initialCartState = {
  cartItems: {},
};

export const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const key = `${payload._id}-${payload.size}`;
      const existingItem = state.cartItems[key];

      const updatedItem = existingItem
        ? {
            ...existingItem,
            quantity: existingItem.quantity + payload.quantity,
          }
        : payload;

      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [key]: updatedItem,
        },
      };
    }

    case CART_ACTION_TYPES.UPDATE_CART_ITEM: {
      const key = `${payload._id}-${payload.size}`;
      const itemToUpdate = state.cartItems[key];

      if (!itemToUpdate) return state;

      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [key]: { ...itemToUpdate, quantity: payload.quantity },
        },
      };
    }

    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const key = `${payload._id}-${payload.size}`;
      const updatedItems = { ...state.cartItems };

      delete updatedItems[key];

      return {
        ...state,
        cartItems: updatedItems,
      };
    }

    case CART_ACTION_TYPES.CLEAR_CART: {
      return initialCartState;
    }

    default:
      console.warn(`Unhandled cart action type: ${type}`);
      return state;
  }
};
