import { ButtonLink } from '../buttonLink/ButtonLink';
import styles from './UserMenu.module.css';

const links = [
  { id: 1, path: '/cart', text: '', iconPath: '/shopping-cart.svg' },
  { id: 2, path: '/favorites', text: '', iconPath: '/heart.svg' },
  { id: 3, path: '/orders', text: '', iconPath: '/account.svg' },
];

type UserMenuProps = {
  pathname: string;
};

{/* <span className={styles.cartCount}>0</span> */}

export const UserMenu = ({ pathname }: UserMenuProps) => {
  return (
    <ul className={styles.userMenu}>
      {links.map((link) => (
        <li key={link.id} className={styles.userItem}>
          <ButtonLink pathname={pathname} path={link.path} iconPath={link.iconPath} />
        </li>
      ))}
    </ul>
  );
};
