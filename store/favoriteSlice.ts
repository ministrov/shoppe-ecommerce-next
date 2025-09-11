import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface FavoritesState {
  favoriteIds: number[];
}

const initialState: FavoritesState = {
  favoriteIds: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      // Логика переключения
      console.log(state);
      console.log(action);
    },
    // Другие редюсеры
  },
});

// export default favoritesSlice.reducer;

// Селекторы
export const selectFavoriteIds = (state: RootState) =>
  state.favorites.favoriteIds;
export const selectIsFavorite = (id: number) => (state: RootState) =>
  state.favorites.favoriteIds.includes(id);
export const selectFavoritesCount = (state: RootState) =>
  state.favorites.favoriteIds.length;

export default favoritesSlice.reducer;
