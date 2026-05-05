'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Logo } from '../../components/logo/Logo';
import { ButtonLink } from '../../components/buttonLink/ButtonLink';
import { NavMenu } from '../../components/navMenu/NavMenu';
import { UserMenu } from '../../components/userMenu/UserMenu';
import { useAuth } from '@/hooks/useAuth';
import { SearchToggle } from './SearchToggle';
import { AuthButton } from './AuthButton';
import { useMobileMenu } from './hooks/useMobileMenu';
import { useSearch } from './hooks/useSearch';
import styles from './Header.module.css';

// Ленивая загрузка мобильного меню (загружается только при открытии)
const MobileMenu = dynamic(() => import('./MobileMenu').then((mod) => mod.MobileMenu), {
  ssr: false,
  loading: () => <div>Загрузка...</div>,
});

/**
 * Компонент шапки сайта.
 * Содержит логотип, навигационное меню, поиск, пользовательское меню и кнопку корзины.
 * Адаптирован для мобильных устройств с выдвижным меню.
 * Использует кастомные хуки для управления состоянием и вынесенные компоненты для устранения дублирования.
 *
 * @returns {JSX.Element} Шапка сайта
 */
export const Header = () => {
  const pathname = usePathname();
  const { clearToken, token } = useAuth();

  const { isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useMobileMenu();
  const { isSearchVisible, toggleSearch } = useSearch();

  return (
    <header className={styles.header}>
      <Logo />

      <div className={styles.mainMenu}>
        <NavMenu pathname={pathname} />

        <div className={styles.userBlock}>
          <SearchToggle
            isVisible={isSearchVisible}
            onToggle={toggleSearch}
          />

          <UserMenu pathname={pathname} />

          {token && <AuthButton
            token={token}
            onLogout={clearToken}
          />}
        </div>
      </div>

      <div className={styles.burgerWrapper}>
        <ButtonLink
          pathname={pathname}
          path={'/cart'}
          iconPath={'/shopping-cart.svg'}
          isCount
          count={2}
        />
        <button className={styles.burgerMenu}>
          <Image
            onClick={openMobileMenu}
            src={'/burger-menu.svg'}
            width={21}
            height={21}
            alt={'Бургер-меню для открытия меню на мобильных устройствах'}
          />
        </button>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        pathname={pathname}
        token={token}
        onLogout={clearToken}
      />
    </header>
  );
};
