import { CATALOG_ACTION_TYPES } from './catalogActionTypes';
import { createAction } from '../../utils/createAction';

export const setProducts = products => createAction(CATALOG_ACTION_TYPES.SET_PRODUCTS, products);

export const setFilter = filter => createAction(CATALOG_ACTION_TYPES.SET_FILTER, filter);

export const setPage = page => createAction(CATALOG_ACTION_TYPES.SET_PAGE, page);

export const setTotalPages = totalPages =>
  createAction(CATALOG_ACTION_TYPES.SET_TOTAL_PAGES, totalPages);

export const setSearchQuery = query => createAction(CATALOG_ACTION_TYPES.SET_SEARCH_QUERY, query);

export const setSearchParams = params =>
  createAction(CATALOG_ACTION_TYPES.SET_SEARCH_PARAMS, params);

export const clearSearch = () => createAction(CATALOG_ACTION_TYPES.CLEAR_SEARCH);

export const setSearchFromURL = params =>
  createAction(CATALOG_ACTION_TYPES.SET_SEARCH_FROM_URL, params);

export const clearSearchAndURL = () => createAction(CATALOG_ACTION_TYPES.CLEAR_SEARCH_AND_URL);

export const setSortOption = sortOption =>
  createAction(CATALOG_ACTION_TYPES.SET_SORT_OPTION, sortOption);
