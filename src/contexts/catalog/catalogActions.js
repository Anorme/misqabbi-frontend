import { CATALOG_ACTION_TYPES } from './catalogActionTypes';
import { createAction } from '../../utils/createAction';

export const setProducts = products => createAction(CATALOG_ACTION_TYPES.SET_PRODUCTS, products);

export const setFilter = filter => createAction(CATALOG_ACTION_TYPES.SET_FILTER, filter);

export const setPage = page => createAction(CATALOG_ACTION_TYPES.SET_PAGE, page);

export const setTotalPages = totalPages =>
  createAction(CATALOG_ACTION_TYPES.SET_TOTAL_PAGES, totalPages);
