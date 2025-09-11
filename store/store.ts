import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import favoritesReducer from './favoriteSlice';

// Конфигурация для persist
const persistConfig = {
  key: 'root', // ключ для хранения в storage
  storage, // используем localStorage
  // whitelist: ['favorites'], // только favorites сохраняем (опционально)
};

// Создаем persisted reducer
const persistedReducer = persistReducer(persistConfig, favoritesReducer);

// Конфигурация основного хранилища
export const makeStore = () => {
  const store = configureStore({
    reducer: {
      favorites: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Игнорируем действия redux-persist для сериализации
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  // Создаем persistor для store
  const persistor = persistStore(store);

  return { store, persistor };
};

// Типы для TypeScript
export type AppStore = ReturnType<typeof makeStore>['store'];
export type AppPersistor = ReturnType<typeof makeStore>['persistor'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
