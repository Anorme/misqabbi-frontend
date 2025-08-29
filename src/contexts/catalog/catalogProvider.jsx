import React, { useReducer } from "react";
import { catalogReducer, initialState } from "./catalogReducer";
import { CatalogContext } from "./catalogContext";
import { setProducts } from "./catalogActions,jsx";
import { setFilter } from "./catalogActions,jsx";
import { setPage } from "./catalogActions,jsx";

export const CatalogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(catalogReducer, initialState);

  const actions = {
    setProducts: (products) => dispatch(setProducts(products)),
    setFilter: (filter) => dispatch(setFilter(filter)),
    setPage: (page) => dispatch(setPage(page)),
  };

  return (
    <CatalogContext.Provider value={{ state, ...actions }}>
      {children}
    </CatalogContext.Provider>
  );
};
