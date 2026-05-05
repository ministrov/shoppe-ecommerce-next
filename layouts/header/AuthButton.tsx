'use client';

import Image from 'next/image';
import styles from './Header.module.css';

/**
 * Пропсы для компонента кнопки авторизации.
 */
interface AuthButtonProps {
  /** Токен авторизации пользователя */
  token: string | null;
  /** Функция выхода из системы */
  onLogout: () => void;
  /** Дополнительный CSS-класс */
  className?: string;
}

/**
 * Компонент кнопки авторизации/выхода.
 * Отображает кнопку выхода, если пользователь авторизован (имеется токен).
 * В противном случае ничего не отображает.
 *
 * @param {AuthButtonProps} props - Пропсы компонента
 * @returns {JSX.Element | null} Кнопка выхода или null
 */
export const AuthButton = ({ token, onLogout, className = '' }: AuthButtonProps) => {
  if (!token) {
    return null;
  }

  return (
    <button
      className={`${styles.exitBtn} ${className}`}
      onClick={onLogout}
      aria-label="Выйти из системы"
    >
      <Image
        src={'/exit.svg'}
        width={21}
        height={21}
        alt={'Иконка выхода'}
      />
    </button>
  );
};