'use client';

import { useState, memo } from 'react';
import { useRouter } from 'next/navigation';
import { useDevAuth, UserType } from './hooks/useDevAuth';
import { UserButton } from './components/UserButton/UserButton';
import { MOCK_USERS } from '@/mocks/auth.mock';
import styles from './DevAuthSwitch.module.css';

/**
 * Компонент переключателя аутентификации для разработки.
 * Позволяет быстро входить под разными типами пользователей (admin, user, premium) в development-режиме.
 * В production-режиме компонент не отображается.
 * Использует мемоизацию для оптимизации рендеринга.
 *
 * @returns {JSX.Element | null} Компонент переключателя аутентификации или null в production
 *
 * @example
 * // Использование в layout или корневом компоненте
 * <DevAuthSwitch />
 */
export const DevAuthSwitch = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { handleMockLogin, handleLogout } = useDevAuth();

  // Показываем только в development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const handleUserLogin = (userType: UserType) => {
    handleMockLogin(userType);
    setIsOpen(false);
    router.push('/');
  };

  const userButtonsConfig: Array<{
    userType: UserType;
    title: string;
    email: string;
  }> = [
      {
        userType: 'admin',
        title: 'Admin User',
        email: MOCK_USERS.admin.email,
      },
      {
        userType: 'user',
        title: 'Regular User',
        email: MOCK_USERS.user.email,
      },
      {
        userType: 'premium',
        title: 'Premium User',
        email: MOCK_USERS.premium.email,
      },
    ];

  return (
    <div className={styles.container}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle developer auth options"
      >
        🔐 Dev Auth
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <h3>Developer Authentication</h3>
            <p className={styles.subtitle}>Mock users for development</p>
          </div>

          <div className={styles.userList}>
            {userButtonsConfig.map((config) => (
              <UserButton
                key={config.userType}
                userType={config.userType}
                title={config.title}
                email={config.email}
                onClick={handleUserLogin}
              />
            ))}
          </div>

          <div className={styles.footer}>
            <button
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              Logout
            </button>

            <div className={styles.hint}>
              <small>Use in login form: any email with password ≥8 chars</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

DevAuthSwitch.displayName = 'DevAuthSwitch';