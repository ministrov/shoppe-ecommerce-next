import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const STORAGE_KEY = 'favoriteIds';

/**
 * Состояние избранного.
 */
interface FavoritesState {
  /** Массив ID товаров, добавленных в избранное */
  favoriteIds: number[];
}

/**
 * Загружает список избранного из localStorage.
 * @returns {number[]} Массив ID товаров
 */
const loadFromLocalStorage = (): number[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Ошибка загрузки из localStorage:', error);
    return [];
  }
};

/**
 * Сохраняет список избранного в localStorage.
 * @param {number[]} ids - Массив ID товаров
 */
const saveToLocalStorage = (ids: number[]): void => {
  // Проверяем, что мы на клиенте
  if (typeof window === 'undefined') {
    return;
  }

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
// };

/**
 * Слайс для управления состоянием избранного.
 * Сохраняет данные в localStorage для персистентности.
 */
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {
    /**
     * Добавляет или удаляет товар из избранного.
     * @param {FavoritesState} state - Текущее состояние
     * @param {PayloadAction<number>} action - Действие с ID товара
     */
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

/**
 * Селектор для получения массива ID избранных товаров.
 * @param {RootState} state - Корневое состояние
 * @returns {number[]} Массив ID
 */
export const selectFavoriteIds = (state: RootState) =>
  state.favorites.favoriteIds;

/**
 * Селектор для получения количества избранных товаров.
 * @param {RootState} state - Корневое состояние
 * @returns {number} Количество товаров
 */
export const selectFavoritesCount = (state: RootState) =>
  state.favorites.favoriteIds.length;

/**
 * Селектор для проверки, находится ли товар в избранном.
 * @param {number} id - ID товара
 * @returns {function} Функция, принимающая состояние и возвращающая boolean
 */
export const selectIsFavorite = (id: number) => (state: RootState) =>
  state.favorites.favoriteIds.includes(id);

export default favoritesSlice.reducer;
