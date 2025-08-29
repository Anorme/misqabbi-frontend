import { SET_PRODUCTS, SET_FILTER, SET_PAGE } from "./catalogActionTypes";

export const initialState = {
  products: [],          // all products
  selectedFilter: "All", // current filter
  currentPage: 1,        // current page
  productsPerPage: 6,    // items per page
};

export const catalogReducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case SET_FILTER:
      return { ...state, selectedFilter: action.payload, currentPage: 1 };
    case SET_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};
