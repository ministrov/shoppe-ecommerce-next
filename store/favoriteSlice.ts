import { createSlice } from '@reduxjs/toolkit';

// Функции для работы с sessionStorage
// const loadFromSessionStorage = () => {
//   // Загрузка из storage
// };

// const saveToSessionStorage = (ids: number[]) => {
//   // Сохранение в storage
// };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: undefined,
  reducers: {
    toggleFavorite: (state, action) => {
      // Логика переключения
      console.log(state);
      console.log(action);
    },
    // Другие редюсеры
  },
});

export default favoritesSlice.reducer;
