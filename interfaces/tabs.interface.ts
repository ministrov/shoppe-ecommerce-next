/**
 * Вкладка (таб) для навигации.
 */
export interface Tab {
  /** URL страницы */
  href: string;
  /** Текст вкладки */
  label: string;
}

/**
 * Массив вкладок для страницы аутентификации.
 */
export const tabs: Tab[] = [
  { href: '/auth/login', label: 'Войти' },
  { href: '/auth/register', label: 'Зарегистрироваться' },
];
