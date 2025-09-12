import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './features/favorites/favoriteSlice';
import counterReducer from './features/counter/counterSlice';

// Конфигурация основного хранилища
export const makeStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
      counter: counterReducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //     serializableCheck: {
    //       // Игнорируем действия redux-persist для сериализации
    //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //     },
    //   }),
  });
};

// Типы для TypeScript
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
