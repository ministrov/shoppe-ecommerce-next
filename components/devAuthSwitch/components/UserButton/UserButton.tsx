'use client';

import { memo } from 'react';
import { UserButtonProps } from './UserButton.interface';
import styles from './UserButton.module.css';

/**
 * Компонент кнопки пользователя для моковой аутентификации
 * Отображает информацию о пользователе и обрабатывает клик
 */
export const UserButton = memo(({
  userType,
  email,
  title,
  onClick,
  className = '',
}: UserButtonProps) => {
  const handleClick = () => {
    onClick(userType);
  };

  return (
    <button
      className={`${styles.userButton} ${styles[userType]} ${className}`}
      onClick={handleClick}
      aria-label={`Login as ${title}`}
      data-user-type={userType}
    >
      <div className={styles.userInfo}>
        <strong>{title}</strong>
        <span>{email}</span>
      </div>
    </button>
  );
});

UserButton.displayName = 'UserButton';