import { useContext } from 'react';
import { CartContextState, CartContextDispatch } from './cartContext';

export const useCartState = () => {
  const state = useContext(CartContextState);
  if (!state) {
    throw new Error('useCartState must be used within a CartProvider');
  }
  return state;
};

export const useCartDispatch = () => {
  const dispatch = useContext(CartContextDispatch);
  if (!dispatch) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return dispatch;
};
