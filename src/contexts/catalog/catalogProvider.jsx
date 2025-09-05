import React, { useReducer } from 'react';
import { catalogReducer, initialState } from './catalogReducer';
import { CatalogContextState, CatalogContextDispatch } from './catalogContext';

export const CatalogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(catalogReducer, initialState);

  return (
    <CatalogContextState.Provider value={state}>
      <CatalogContextDispatch.Provider value={dispatch}>{children}</CatalogContextDispatch.Provider>
    </CatalogContextState.Provider>
  );
};
