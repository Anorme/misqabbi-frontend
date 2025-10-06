import { CATALOG_ACTION_TYPES } from './catalogActionTypes';

export const initialState = {
  products: [],
  selectedFilter: 'All',
  currentPage: 1,
  productsPerPage: 12,
  totalPages: 1,
  searchQuery: '',
  searchParams: {
    q: '',
    minPrice: '',
    maxPrice: '',
    category: '',
    sort: 'latest',
  },
  sortOption: 'latest',
  isSearching: false,
  isFilterModalOpen: false,
  priceFilter: {
    minPrice: '',
    maxPrice: '',
  },
  layout: {
    mobileColumns: 2,
    desktopColumns: 4,
  },
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
    case CATALOG_ACTION_TYPES.SET_SEARCH_FROM_URL:
      return {
        ...state,
        searchQuery: payload.q || '',
        searchParams: {
          q: payload.q || '',
          minPrice: payload.minPrice || '',
          maxPrice: payload.maxPrice || '',
          category: payload.category || '',
        },
        currentPage: 1,
        isSearching: !!(payload.q && payload.q.trim()),
      };
    case CATALOG_ACTION_TYPES.CLEAR_SEARCH_AND_URL:
      return {
        ...state,
        searchQuery: '',
        searchParams: { q: '', minPrice: '', maxPrice: '', category: '', sort: 'latest' },
        currentPage: 1,
        isSearching: false,
      };
    case CATALOG_ACTION_TYPES.SET_SORT_OPTION:
      return {
        ...state,
        sortOption: payload,
        searchParams: { ...state.searchParams, sort: payload },
        currentPage: 1,
      };
    case CATALOG_ACTION_TYPES.OPEN_FILTER_MODAL:
      return { ...state, isFilterModalOpen: true };
    case CATALOG_ACTION_TYPES.CLOSE_FILTER_MODAL:
      return { ...state, isFilterModalOpen: false };
    case CATALOG_ACTION_TYPES.SET_PRICE_FILTER:
      return {
        ...state,
        priceFilter: payload,
        searchParams: {
          ...state.searchParams,
          minPrice: payload.minPrice,
          maxPrice: payload.maxPrice,
        },
        currentPage: 1,
      };
    case CATALOG_ACTION_TYPES.CLEAR_PRICE_FILTER:
      return {
        ...state,
        priceFilter: { minPrice: '', maxPrice: '' },
        searchParams: { ...state.searchParams, minPrice: '', maxPrice: '' },
        currentPage: 1,
      };
    case CATALOG_ACTION_TYPES.SET_MOBILE_COLUMNS:
      return {
        ...state,
        layout: { ...state.layout, mobileColumns: payload },
      };
    case CATALOG_ACTION_TYPES.SET_DESKTOP_COLUMNS:
      return {
        ...state,
        layout: { ...state.layout, desktopColumns: payload },
      };
    default:
      return state;
  }
};
