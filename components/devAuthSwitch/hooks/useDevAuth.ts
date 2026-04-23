import { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setToken, setUser, logout } from '@/store/features/auth/authSlice';
import { MOCK_USERS, MOCK_TOKENS } from '@/mocks/auth.mock';
import { User } from '@/interfaces/user.interface';

export type UserType = 'admin' | 'user' | 'premium';

export interface UseDevAuthReturn {
  handleMockLogin: (userType: UserType) => void;
  handleLogout: () => void;
  getMockUser: (userType: UserType) => User;
  getMockToken: (userType: UserType) => string;
}

/**
 * Кастомный хук для управления моковой аутентификацией в режиме разработки
 * Выносит логику аутентификации из компонента DevAuthSwitch
 */
export const useDevAuth = (): UseDevAuthReturn => {
  const dispatch = useAppDispatch();

  const handleMockLogin = useCallback((userType: UserType) => {
    const user = MOCK_USERS[userType];
    const token = MOCK_TOKENS[userType];

    dispatch(setToken(token));
    dispatch(setUser(user));

    console.log(`Mock login as ${userType}:`, user);
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const getMockUser = useCallback((userType: UserType): User => {
    return MOCK_USERS[userType];
  }, []);

  const getMockToken = useCallback((userType: UserType): string => {
    return MOCK_TOKENS[userType];
  }, []);

  return {
    handleMockLogin,
    handleLogout,
    getMockUser,
    getMockToken,
  };
};