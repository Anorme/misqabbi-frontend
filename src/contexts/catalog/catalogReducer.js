import { CATALOG_ACTION_TYPES } from './catalogActionTypes';

export const initialState = {
  products: [], // all products
  selectedFilter: 'All', // current filter
  currentPage: 1, // current page
  productsPerPage: 6, // items per page
  totalPages: 1, // total number of pages
};

export const catalogReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATALOG_ACTION_TYPES.SET_PRODUCTS:
      return { ...state, products: payload };
    case CATALOG_ACTION_TYPES.SET_FILTER:
      return { ...state, selectedFilter: payload, currentPage: 1 };
    case CATALOG_ACTION_TYPES.SET_PAGE:
      return { ...state, currentPage: payload };
    case CATALOG_ACTION_TYPES.SET_TOTAL_PAGES:
      return { ...state, totalPages: payload };
    default:
      return state;
  }
};
