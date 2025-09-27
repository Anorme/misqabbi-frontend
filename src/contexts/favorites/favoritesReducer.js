import { FAVORITES_ACTION_TYPES } from './favoritesActionTypes';

export const initialFavoritesState = {
  favoriteItems: {},
  isLoading: false,
  error: null,
  lastSyncTime: null,
};

export const favoritesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case FAVORITES_ACTION_TYPES.ADD_FAVORITE: {
      const { id } = payload;
      return {
        ...state,
        favoriteItems: {
          ...state.favoriteItems,
          [id]: payload,
        },
        error: null,
      };
    }

    case FAVORITES_ACTION_TYPES.REMOVE_FAVORITE: {
      const updatedItems = { ...state.favoriteItems };
      delete updatedItems[payload];

      return {
        ...state,
        favoriteItems: updatedItems,
        error: null,
      };
    }

    case FAVORITES_ACTION_TYPES.TOGGLE_FAVORITE: {
      const { id } = payload;
      const isCurrentlyFavorite = state.favoriteItems[id];

      if (isCurrentlyFavorite) {
        const updatedItems = { ...state.favoriteItems };
        delete updatedItems[id];
        return {
          ...state,
          favoriteItems: updatedItems,
          error: null,
        };
      } else {
        return {
          ...state,
          favoriteItems: {
            ...state.favoriteItems,
            [id]: payload,
          },
          error: null,
        };
      }
    }

    case FAVORITES_ACTION_TYPES.CLEAR_FAVORITES: {
      return {
        ...state,
        favoriteItems: {},
        error: null,
      };
    }

    case FAVORITES_ACTION_TYPES.SET_FAVORITES: {
      const favoritesMap = {};
      payload.forEach(favorite => {
        favoritesMap[favorite.id] = favorite;
      });

      return {
        ...state,
        favoriteItems: favoritesMap,
        lastSyncTime: Date.now(),
        error: null,
      };
    }

    case FAVORITES_ACTION_TYPES.SET_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }

    case FAVORITES_ACTION_TYPES.SET_ERROR: {
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    }

    default:
      console.warn(`Unhandled favorites action type: ${type}`);
      return state;
  }
};
