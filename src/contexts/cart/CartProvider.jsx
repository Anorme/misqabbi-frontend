import { useReducer, useEffect } from 'react';
import { cartReducer, initialCartState } from './cartReducer';
import { CartContextState, CartContextDispatch } from './cartContext';
import { loadCartState, saveCartState } from '../../utils/cartPersistence';

const getHydratedState = () => {
  const persistedCartState = loadCartState();
  return persistedCartState || initialCartState;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getHydratedState());

  useEffect(() => {
    saveCartState(state);
  }, [state]);

  return (
    <CartContextState.Provider value={state}>
      <CartContextDispatch.Provider value={dispatch}>{children}</CartContextDispatch.Provider>
    </CartContextState.Provider>
  );
};
