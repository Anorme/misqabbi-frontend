import { CATALOG_ACTION_TYPES } from './catalogActionTypes';

export const initialState = {
  products: [],
  selectedFilter: 'All',
  currentPage: 1,
  productsPerPage: 8,
  totalPages: 1,
  searchQuery: '',
  searchParams: {
    q: '',
    minPrice: '',
    maxPrice: '',
    category: '',
  },
  isSearching: false,
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
    case CATALOG_ACTION_TYPES.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: payload,
        searchParams: { ...state.searchParams, q: payload },
        currentPage: 1,
        isSearching: !!payload.trim(),
      };
    case CATALOG_ACTION_TYPES.SET_SEARCH_PARAMS:
      return {
        ...state,
        searchParams: { ...state.searchParams, ...payload },
        currentPage: 1,
        isSearching: Object.values({ ...state.searchParams, ...payload }).some(
          value => value && value.toString().trim()
        ),
      };
    case CATALOG_ACTION_TYPES.CLEAR_SEARCH:
      return {
        ...state,
        searchQuery: '',
        searchParams: { q: '', minPrice: '', maxPrice: '', category: '' },
        currentPage: 1,
        isSearching: false,
      };
    default:
      return state;
  }
};
