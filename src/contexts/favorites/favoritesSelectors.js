export const getFavoriteItems = state => Object.values(state.favoriteItems);

export const isFavorite = (state, productId) => !!state.favoriteItems[productId];

export const getFavoriteById = (state, productId) => state.favoriteItems[productId];

export const getFavoritesLoading = state => state.isLoading;

export const getFavoritesError = state => state.error;
