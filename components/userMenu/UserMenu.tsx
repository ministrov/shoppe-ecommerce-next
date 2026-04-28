import { ButtonLink } from '../buttonLink/ButtonLink';
import { useFavorites } from '@/hooks/useFavorite';
import styles from './UserMenu.module.css';

/**
 * Свойства компонента меню пользователя.
 */
type UserMenuProps = {
  /** Текущий путь (pathname) для определения активной ссылки */
  pathname: string;
};

/**
 * Компонент меню пользователя, отображающий иконки корзины, избранного и аккаунта.
 * Использует хук `useFavorites` для отображения количества избранных товаров.
 *
 * @param {UserMenuProps} props - Свойства компонента
 * @param {string} props.pathname - Текущий путь
 * @returns {JSX.Element} Меню с иконками-ссылками
 */
export const UserMenu = ({ pathname }: UserMenuProps) => {
  const { favoritesCount } = useFavorites();

  const links = [
    { id: 1, path: '/cart', text: '', iconPath: '/shopping-cart.svg', isCount: true, count: 0 },
    { id: 2, path: '/favorites', text: '', iconPath: '/heart.svg', isCount: true, count: favoritesCount || 0 },
    { id: 3, path: '/orders', text: '', iconPath: '/account.svg' },
  ];

  return (
    <ul className={styles.userMenu}>
      {links.map(link => (
        <li key={link.id} className={styles.userItem}>
          <ButtonLink pathname={pathname} path={link.path} iconPath={link.iconPath} isCount={link.isCount} count={link.count} />
        </li>
      ))}
    </ul>
  );
};
