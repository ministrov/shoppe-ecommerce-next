/**
 * Конфигурация навигационных ссылок для компонента Header.
 * Централизованное хранение всех ссылок для устранения дублирования кода.
 */

/**
 * Основные навигационные ссылки для десктопного и мобильного меню.
 */
export const NAVIGATION_LINKS = [
  { id: 'home', path: '/', text: 'Главная' },
  { id: 'catalog', path: '/catalog', text: 'Магазин' },
  { id: 'about', path: '/about', text: 'О нас' },
] as const;

/**
 * Элементы мобильного меню с иконками.
 */
export const MOBILE_MENU_ITEMS = [
  { id: 'account', path: '/account', icon: '/user.svg', text: 'Мой аккаунт' },
  { id: 'favorites', path: '/favorites', icon: '/heart.svg', text: 'Избранное' },
] as const;

/**
 * Типы для навигационных ссылок.
 */
export type NavigationLink = typeof NAVIGATION_LINKS[number];
export type MobileMenuItem = typeof MOBILE_MENU_ITEMS[number];