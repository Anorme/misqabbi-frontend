import { useContext } from 'react';
import { CatalogContextState, CatalogContextDispatch } from './catalogContext';

export const useCatalogState = () => {
  const state = useContext(CatalogContextState);
  if (!state) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return state;
};

export const useCatalogDispatch = () => {
  const dispatch = useContext(CatalogContextDispatch);
  if (!dispatch) {
    throw new Error('useCatalogDispatch must be used within a CatalogProvider');
  }
  return dispatch;
};
