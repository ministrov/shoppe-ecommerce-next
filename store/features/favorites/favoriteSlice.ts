import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const STORAGE_KEY = 'favoriteIds';
interface FavoritesState {
  favoriteIds: number[];
}

const loadFromLocalStorage = (): number[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Ошибка загрузки из localStorage:', error);
    return [];
  }
};

const saveToLocalStorage = (ids: number[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error('Ошибка сохранения в localStorage:', error);
  }
};

const initialState: FavoritesState = {
  // favoriteIds: [],
  favoriteIds: loadFromLocalStorage(),
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
      const id = action.payload;
      const index = state.favoriteIds.indexOf(id);

      if (index === -1) {
        state.favoriteIds.push(id);
      } else {
        state.favoriteIds.splice(index, 1);
      }

      saveToLocalStorage(state.favoriteIds);
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
