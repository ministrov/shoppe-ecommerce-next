import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './features/favorites/favoriteSlice';
import counterReducer from './features/counter/counterSlice';
import authReducer from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';

/**
 * Создаёт и настраивает Redux store приложения.
 * Включает редьюсеры для избранного, счётчика, аутентификации и корзины.
 *
 * @returns {Store} Настроенный Redux store
 */
export const makeStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
      counter: counterReducer,
      auth: authReducer,
      cart: cartReducer,
    },
  });
};

/**
 * Типы для TypeScript
 */

/** Тип store приложения */
export type AppStore = ReturnType<typeof makeStore>;

/** Тип корневого состояния */
export type RootState = ReturnType<AppStore['getState']>;

/** Тип dispatch */
export type AppDispatch = AppStore['dispatch'];
