import Link from 'next/link';
import { FooterNavigationProps } from './FooterNavigation.interface';
import cn from 'classnames';
import styles from './FooterNavigation.module.css';

/**
 * Компонент навигации в подвале сайта.
 * Отображает список ссылок в горизонтальном формате.
 * Использует next/link для клиентской навигации.
 *
 * @param {FooterNavigationProps} props - Пропсы компонента
 * @param {Array} props.links - Массив объектов с href и label
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {string} [props.ariaLabel] - ARIA-лейбл для навигации
 * @returns {JSX.Element} Навигационный блок с ссылками
 *
 * @example
 * const links = [
 *   { href: '#', label: 'Контакты' },
 *   { href: '#', label: 'Условия покупки' },
 *   { href: '#', label: 'Доставка и возврат' }
 * ];
 *
 * <FooterNavigation links={links} ariaLabel="Навигация по сайту" />
 */
export const FooterNavigation = ({
  links,
  className,
  ariaLabel = 'Навигация по сайту',
}: FooterNavigationProps) => {
  return (
    <nav className={cn(styles.navigation, className)} aria-label={ariaLabel}>
      <h2 className="visually-hidden">Навигация по сайту</h2>
      <ul>
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};