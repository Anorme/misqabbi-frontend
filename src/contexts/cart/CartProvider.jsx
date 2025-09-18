import { useReducer } from 'react';
import { cartReducer, initialCartState } from './cartReducer';

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContextState.Provider value={state}>
      <CartContextDispatch.Provider value={dispatch}>{children}</CartContextDispatch.Provider>
    </CartContextState.Provider>
  );
};
