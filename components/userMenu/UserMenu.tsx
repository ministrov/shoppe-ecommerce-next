import { ButtonLink } from '../buttonLink/ButtonLink';
import styles from './UserMenu.module.css';

const links = [
  { id: 1, path: '/cart', text: '', iconPath: '/shopping-cart.svg', count: 0 },
  { id: 2, path: '/favorites', text: '', iconPath: '/heart.svg', count: 1 },
  { id: 3, path: '/orders', text: '', iconPath: '/account.svg' },
];

type UserMenuProps = {
  pathname: string;
};

export const UserMenu = ({ pathname }: UserMenuProps) => {
  return (
    <ul className={styles.userMenu}>
      {links.map((link) => (
        <li key={link.id} className={styles.userItem}>
          <ButtonLink pathname={pathname} path={link.path} iconPath={link.iconPath} count={link.count} />
        </li>
      ))}
    </ul>
  );
};
