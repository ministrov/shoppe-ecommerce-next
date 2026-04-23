'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setToken, setUser, logout } from '@/store/features/auth/authSlice';
import { MOCK_USERS, MOCK_TOKENS } from '@/mocks/auth.mock';
import styles from './DevAuthSwitch.module.css';

export const DevAuthSwitch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  // Показываем только в development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const handleMockLogin = (userType: 'admin' | 'user' | 'premium') => {
    const user = MOCK_USERS[userType];
    const token = MOCK_TOKENS[userType];

    dispatch(setToken(token));
    dispatch(setUser(user));

    console.log(`Mock login as ${userType}:`, user);
    setIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

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
            <button
              className={`${styles.userButton} ${styles.admin}`}
              onClick={() => handleMockLogin('admin')}
            >
              <div className={styles.userInfo}>
                <strong>Admin User</strong>
                <span>{MOCK_USERS.admin.email}</span>
              </div>
            </button>

            <button
              className={`${styles.userButton} ${styles.user}`}
              onClick={() => handleMockLogin('user')}
            >
              <div className={styles.userInfo}>
                <strong>Regular User</strong>
                <span>{MOCK_USERS.user.email}</span>
              </div>
            </button>

            <button
              className={`${styles.userButton} ${styles.premium}`}
              onClick={() => handleMockLogin('premium')}
            >
              <div className={styles.userInfo}>
                <strong>Premium User</strong>
                <span>{MOCK_USERS.premium.email}</span>
              </div>
            </button>
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
};