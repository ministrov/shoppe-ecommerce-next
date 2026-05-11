'use client';

import { ButtonLink } from '../buttonLink/ButtonLink';
import { NAVIGATION_LINKS } from '@/layouts/header/header.config';
import styles from './NavMenu.module.css';
import { NavMenuProps } from './NavMenu.interface';

/**
 * Компонент навигационного меню, отображающий список ссылок на основные разделы сайта.
 * Использует компонент `ButtonLink` для каждой ссылки, подсвечивая активный маршрут.
 * Предназначен для использования в шапке сайта или других навигационных блоках.
 *
 * @param {NavMenuProps} props - Пропсы компонента
 * @param {string} props.pathname - Текущий путь (URL) для определения активной ссылки
 * @returns {JSX.Element} Неупорядоченный список (`<ul>`) с элементами навигации
 *
 * @example
 * // Использование в компоненте Header
 * <NavMenu pathname={currentPath} />
 */
export const NavMenu = ({ pathname }: NavMenuProps) => {
  return (
    <ul className={styles.navMenu}>
      {NAVIGATION_LINKS.map((link) => (
        <li key={link.id} className={styles.navMenuItem}>
          <ButtonLink pathname={pathname} path={link.path} text={link.text} />
        </li>
      ))}
    </ul>
  );
};
