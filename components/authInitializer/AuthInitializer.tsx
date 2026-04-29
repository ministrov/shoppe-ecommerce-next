'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { initializeAuth } from '@/store/features/auth/authSlice';

/**
 * Компонент-инициализатор аутентификации.
 * Выполняет однократную инициализацию состояния аутентификации при монтировании компонента.
 * Использует Redux dispatch для вызова действия `initializeAuth`.
 * Не отображает никакого UI (возвращает null).
 *
 * @returns {null} Компонент не отображает визуальных элементов
 *
 * @example
 * // Использование в корневом layout или App компоненте
 * <AuthInitializer />
 */
export function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return null;
}