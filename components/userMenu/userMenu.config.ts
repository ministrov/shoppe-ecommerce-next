import { UserMenuItem } from './UserMenu.interface';

/**
 * Стандартная конфигурация меню пользователя.
 */
export const DEFAULT_USER_MENU_ITEMS: UserMenuItem[] = [
  {
    id: 'cart',
    path: '/cart',
    text: '',
    iconPath: '/shopping-cart.svg',
    isCount: true,
    countType: 'cart',
  },
  {
    id: 'favorites',
    path: '/favorites',
    text: '',
    iconPath: '/heart.svg',
    isCount: true,
    countType: 'favorites',
  },
  {
    id: 'account',
    path: '/orders',
    text: '',
    iconPath: '/account.svg',
  },
];