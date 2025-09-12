import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface FavoritesState {
  favoriteIds: number[];
}

const initialState: FavoritesState = {
  favoriteIds: [],
};

// 3. Реализация персистентности
// typescript
// Функции для работы с sessionStorage
// const loadFromSessionStorage = () => {
//   // Загрузка из storage
// };

// const saveToSessionStorage = (ids: number[]) => {
//   // Сохранение в storage
//   console.log(ids);
// };

// console.log(loadFromSessionStorage);
// console.log(saveToSessionStorage);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      //  const id = action.payload;
      // const index = state.favoriteIds.indexOf(id);

      // if (index === -1) {
      //   state.favoriteIds.push(id);
      // } else {
      //   state.favoriteIds.splice(index, 1);
      // }
      console.log(state);
      console.log(action);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

// Правильные типизированные селекторы
export const selectFavoriteIds = (state: RootState) =>
  state.favorites.favoriteIds;
export const selectFavoritesCount = (state: RootState) =>
  state.favorites.favoriteIds.length;
export const selectIsFavorite = (id: number) => (state: RootState) =>
  state.favorites.favoriteIds.includes(id);

export default favoritesSlice.reducer;
