import { CART_ACTION_TYPES } from './cartActionTypes';
import { createAction } from '../../utils/createAction';

export const addToCart = product => createAction(CART_ACTION_TYPES.ADD_TO_CART, product);

export const removeFromCart = product => createAction(CART_ACTION_TYPES.REMOVE_FROM_CART, product);

export const updateCartItem = product => createAction(CART_ACTION_TYPES.UPDATE_CART_ITEM, product);

export const clearCart = () => createAction(CART_ACTION_TYPES.CLEAR_CART, null);
