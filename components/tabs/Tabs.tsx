import Link from 'next/link';
import { TabsProps } from './Tabs.interface';
import styles from './Tabs.module.css';

/**
 * Компонент вкладок (табов) для навигации.
 * Отображает список ссылок и подсвечивает активную вкладку на основе текущего пути.
 *
 * @param {TabsProps} props - Свойства компонента
 * @param {Tab[]} props.tabs - Массив вкладок для отображения
 * @param {string} props.pathname - Текущий путь (pathname) для определения активной вкладки
 * @returns {JSX.Element} Контейнер с вкладками-ссылками
 *
 * @example
 * const tabs = [
 *   { href: '/catalog', label: 'Каталог' },
 *   { href: '/about', label: 'О нас' },
 * ];
 * <Tabs tabs={tabs} pathname={pathname} />
 */
export const Tabs = ({ tabs, pathname }: TabsProps) => {
  return (
    <div
      className={styles.tabs}
      role="tablist"
      aria-label="Навигация по разделам аккаунта"
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  )
}
