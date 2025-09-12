import { ButtonLink } from '../buttonLink/ButtonLink';
// import { useFavorites } from '@/hooks/useFavorite';
import styles from './UserMenu.module.css';

type UserMenuProps = {
  pathname: string;
};

export const UserMenu = ({ pathname }: UserMenuProps) => {
  console.log(pathname)
  // const { selectFavoritesCount } = useFavorites();
  // const links = [
  //   { id: 1, path: '/cart', text: '', iconPath: '/shopping-cart.svg', isCount: true, count: 0 },
  //   { id: 2, path: '/favorites', text: '', iconPath: '/heart.svg', isCount: true, count: selectFavoritesCount || 0 },
  //   { id: 3, path: '/orders', text: '', iconPath: '/account.svg' },
  // ];
  return (
    <ul className={styles.userMenu}>
      <li className={styles.userItem}>
        <ButtonLink pathname={'/cart'} path={'/cart'} iconPath={'/shopping-cart.svg'} isCount count={1} />
      </li>
      <li className={styles.userItem}>
        <ButtonLink pathname={'/favorites'} path={'/favorites'} iconPath={'/heart.svg'} isCount count={0} />
      </li>
      <li className={styles.userItem}>
        <ButtonLink pathname={'/orders'} path={'/orders'} iconPath={'/account.svg'} isCount count={0} />
      </li>
    </ul>
  );
};
