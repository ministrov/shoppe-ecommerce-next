import { ButtonLink } from '../buttonLink/ButtonLink';
import styles from './NavMenu.module.css';

/**
 * Пропсы для компонента навигационного меню.
 *
 * @property {string} pathname - Текущий путь (URL) для определения активной ссылки
 */
type NavListProps = {
  pathname: string;
};

const links = [
  { id: 1, path: '/catalog', text: 'Магазин' },
  { id: 2, path: '/about', text: 'О нас' },
];

/**
 * Компонент навигационного меню, отображающий список ссылок на основные разделы сайта.
 * Использует компонент `ButtonLink` для каждой ссылки, подсвечивая активный маршрут.
 * Предназначен для использования в шапке сайта или других навигационных блоках.
 *
 * @param {NavListProps} props - Пропсы компонента
 * @param {string} props.pathname - Текущий путь (URL) для определения активной ссылки
 * @returns {JSX.Element} Неупорядоченный список (`<ul>`) с элементами навигации
 *
 * @example
 * // Использование в компоненте Header
 * <NavMenu pathname={currentPath} />
 */
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
