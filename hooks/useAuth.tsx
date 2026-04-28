'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { initializeAuth, logout } from '@/store/features/auth/authSlice';
import { selectIsAuthenticated } from '@/store/features/auth/authSlice';

/**
 * Хук для работы с аутентификацией.
 * Предоставляет доступ к данным пользователя, токену, статусу аутентификации и методам управления сессией.
 *
 * @returns {Object} Объект с данными и методами аутентификации:
 * @returns {string | null} token - JWT-токен текущего пользователя (или null, если не аутентифицирован)
 * @returns {Object | null} user - Данные пользователя (или null)
 * @returns {boolean} isAuthenticated - Флаг, указывающий, аутентифицирован ли пользователь
 * @returns {boolean} isLoading - Флаг загрузки данных аутентификации
 * @returns {Function} clearToken - Функция для выхода (удаляет токен и сбрасывает состояние)
 * @returns {Function} checkAuth - Функция для проверки аутентификации (инициализирует состояние из localStorage)
 *
 * @example
 * const { token, user, isAuthenticated, clearToken } = useAuth();
 * if (isAuthenticated) {
 *   console.log(`Пользователь ${user.name} авторизован`);
 * }
 */
export function useAuth() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const clearToken = () => {
    dispatch(logout());
  };

  const checkAuth = () => {
    dispatch(initializeAuth());
  };

  return {
    token,
    user,
    isAuthenticated,
    isLoading,
    clearToken,
    checkAuth
  };
}