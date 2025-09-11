/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import favoritesReducer from './favoriteSlice';

// Создаем безопасную версию storage
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

// Выбираем правильное хранилище в зависимости от среды выполнения
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

// Конфигурация для persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites'],
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

// Отдельно создаем persistor
export const makePersistor = (store: AppStore) => {
  return persistStore(store);
};

// Типы для TypeScript
export type AppStore = ReturnType<typeof makeStore>['store'];
export type AppPersistor = ReturnType<typeof makeStore>['persistor'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
