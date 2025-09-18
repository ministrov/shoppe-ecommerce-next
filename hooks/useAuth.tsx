// hooks/useAuth.ts
'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { initializeAuth, logout } from '@/store/features/auth/authSlice';
import { selectIsAuthenticated } from '@/store/features/auth/authSlice';

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