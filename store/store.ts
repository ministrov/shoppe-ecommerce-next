import { configureStore } from '@reduxjs/toolkit';

// Конфигурация основного хранилища
export const makeStore = () => {
  return configureStore({
    reducer: {
      // favorites: favoritesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
