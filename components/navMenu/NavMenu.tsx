import { ButtonLink } from '../buttonLink/ButtonLink';
import styles from './NavMenu.module.css';

type NavListProps = {
  pathname: string;
};

const links = [
  { id: 1, path: '/catalog', text: 'Магазин' },
  { id: 2, path: '/about', text: 'О нас' },
];

export const NavMenu = ({ pathname }: NavListProps) => {
  return (
    <ul className={styles.navMenu}>
      {links.map((link) => (
        <li key={link.id} className={styles.navMenuItem}>
          <ButtonLink pathname={pathname} path={link.path} text={link.text} />
        </li>
      ))}
    </ul>
  );
};
