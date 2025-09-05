import { CATALOG_ACTION_TYPES } from './catalogActionTypes';

export const initialState = {
  products: [], // all products
  selectedFilter: 'All', // current filter
  currentPage: 1, // current page
  productsPerPage: 6, // items per page
};

export const catalogReducer = (state, action) => {
  switch (action.type) {
    case CATALOG_ACTION_TYPES.SET_PRODUCTS:
      return { ...state, products: action.payload };
    case CATALOG_ACTION_TYPES.SET_FILTER:
      return { ...state, selectedFilter: action.payload, currentPage: 1 };
    case CATALOG_ACTION_TYPES.SET_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};
