import { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  products: [], // all products
  selectedFilter: 'All', // current filter
  currentPage: 1, // current page
  productsPerPage: 6, // items per page
};

// Actions
const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_FILTER = 'SET_FILTER';
const SET_PAGE = 'SET_PAGE';

// Reducer: defines how state changes
function catalogReducer(state, action) {
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
}

// Create context
const CatalogContext = createContext();

// Provider component
export const CatalogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(catalogReducer, initialState);

  const setProducts = products => dispatch({ type: SET_PRODUCTS, payload: products });
  const setFilter = filter => dispatch({ type: SET_FILTER, payload: filter });
  const setPage = page => dispatch({ type: SET_PAGE, payload: page });

  return (
    <CatalogContext.Provider value={{ state, setProducts, setFilter, setPage }}>
      {children}
    </CatalogContext.Provider>
  );
};

// Hook to access catalog context
export const useCatalog = () => useContext(CatalogContext);
