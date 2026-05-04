'use client';

import { useMemo } from 'react';
import { ButtonLink } from '../buttonLink/ButtonLink';
import { useFavorites } from '@/hooks/useFavorite';
import { useCart } from '@/hooks/useCart';
import { DEFAULT_USER_MENU_ITEMS } from './userMenu.config';
import type { UserMenuProps, UserMenuItem } from './UserMenu.interface';
import styles from './UserMenu.module.css';
import clsx from 'clsx';

/**
 * Компонент меню пользователя, отображающий иконки корзины, избранного и аккаунта.
 * Использует хуки `useFavorites` и `useCart` для отображения количества избранных товаров и товаров в корзине.
 * Поддерживает кастомизацию через передачу массива `items` и callback `onItemClick`.
 *
 * @param {UserMenuProps} props - Свойства компонента
 * @param {string} props.pathname - Текущий путь для определения активной ссылки
 * @param {UserMenuItem[]} [props.items] - Массив элементов меню (по умолчанию используется DEFAULT_USER_MENU_ITEMS)
 * @param {string} [props.className] - Дополнительный CSS-класс для корневого элемента
 * @param {(item: UserMenuItem) => void} [props.onItemClick] - Callback, вызываемый при клике на элемент меню
 * @returns {JSX.Element} Меню с иконками-ссылками
 *
 * @example
 * // Базовое использование
 * <UserMenu pathname={pathname} />
 *
 * // С кастомными элементами
 * <UserMenu
 *   pathname={pathname}
 *   items={[
 *     { id: 'cart', path: '/cart', iconPath: '/cart.svg', isCount: true, countType: 'cart' },
 *     { id: 'profile', path: '/profile', iconPath: '/user.svg' },
 *   ]}
 *   onItemClick={(item) => console.log('Clicked:', item)}
 * />
 */
export const UserMenu = ({
  pathname,
  items = DEFAULT_USER_MENU_ITEMS,
  className,
  onItemClick,
}: UserMenuProps) => {
  const { favoritesCount } = useFavorites();
  const { itemsCount: cartItemsCount } = useCart();

  /**
   * Обогащает элементы меню актуальными значениями счетчиков.
   * Использует `useMemo` для оптимизации, чтобы пересчитывать только при изменении зависимостей.
   */
  const enrichedItems = useMemo(() => {
    return items.map((item) => {
      // Если count явно задан, используем его
      if (item.count !== undefined) {
        return item;
      }

      // Иначе вычисляем count на основе countType
      let count = 0;
      if (item.countType === 'cart') {
        count = cartItemsCount;
      } else if (item.countType === 'favorites') {
        count = favoritesCount;
      }

      return {
        ...item,
        count,
      };
    });
  }, [items, cartItemsCount, favoritesCount]);

  const handleItemClick = (item: UserMenuItem) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <ul className={clsx(styles.userMenu, className)}>
      {enrichedItems.map((item) => (
        <li key={item.id} className={styles.userItem}>
          <ButtonLink
            pathname={pathname}
            path={item.path}
            iconPath={item.iconPath}
            text={item.text}
            isCount={item.isCount}
            count={item.count}
            onClick={() => handleItemClick(item)}
          />
        </li>
      ))}
    </ul>
  );
};
