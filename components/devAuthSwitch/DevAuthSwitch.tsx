'use client';

import { useState, memo } from 'react';
import { useDevAuth, UserType } from './hooks/useDevAuth';
import { UserButton } from './components/UserButton/UserButton';
import { MOCK_USERS } from '@/mocks/auth.mock';
import styles from './DevAuthSwitch.module.css';

export const DevAuthSwitch = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleMockLogin, handleLogout } = useDevAuth();

  // Показываем только в development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

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
                onClick={handleMockLogin}
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