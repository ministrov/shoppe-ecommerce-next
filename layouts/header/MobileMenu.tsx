'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo } from '../../components/logo/Logo';
import { ButtonLink } from '../../components/buttonLink/ButtonLink';
import { Searching } from '../../components/searching/Searching';
import { NAVIGATION_LINKS, MOBILE_MENU_ITEMS } from './header.config';
import styles from './Header.module.css';

/**
 * Пропсы для компонента мобильного меню.
 */
interface MobileMenuProps {
  /** Флаг открытия меню */
  isOpen: boolean;
  /** Функция закрытия меню */
  onClose: () => void;
  /** Текущий путь для определения активной ссылки */
  pathname: string;
  /** Токен авторизации пользователя */
  token: string | null;
  /** Функция выхода из системы */
  onLogout: () => void;
}

/**
 * Варианты анимации для мобильного меню.
 */
const variants = {
  opened: {
    opacity: 1,
    x: 0,
    transition: {
      stiffness: 20,
    },
  },
  closed: {
    opacity: 0,
    x: '100%',
  },
};

/**
 * Компонент мобильного меню.
 * Отображает навигацию, поиск и пользовательские ссылки на мобильных устройствах.
 * Использует Framer Motion для плавной анимации появления/скрытия.
 *
 * @param {MobileMenuProps} props - Пропсы компонента
 * @returns {JSX.Element} Мобильное меню
 */
export const MobileMenu = ({
  isOpen,
  onClose,
  pathname,
  token,
  onLogout,
}: MobileMenuProps) => {
  return (
    <motion.div
      initial={'closed'}
      variants={variants}
      animate={isOpen ? 'opened' : 'closed'}
      className={styles.mobileMenu}
    >
      <header className={styles.mobileHeader}>
        <Logo />

        <div className={styles.mobileHeaderRight}>
          <ButtonLink
            pathname={pathname}
            path={'/cart'}
            iconPath={'/shopping-cart.svg'}
            isCount
            count={2}
          />

          <button className={styles.closeMenu} onClick={onClose}>
            <Image
              src={'/close.svg'}
              width={20}
              height={20}
              alt={'Кнопка закрытия меню'}
            />
          </button>
        </div>
      </header>

      <Searching />

      <div className={styles.navMobile__content}>
        <div className={styles.navMobile__menu}>
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.path}
              className={styles.navMobile__link}
              onClick={onClose}
            >
              {link.text}
            </Link>
          ))}
        </div>
        <div className={styles.navMobile__hr}></div>
        <div className={styles.navMobile__icons}>
          {MOBILE_MENU_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className={styles.navMobile__link}
              onClick={onClose}
            >
              <Image
                src={item.icon}
                width={21}
                height={21}
                alt={`Иконка ${item.text}`}
              />
              {item.text}
            </Link>
          ))}
          {token && (
            <button className={styles.navMobile__exit} onClick={onLogout}>
              <Image
                src={'/exit.svg'}
                width={21}
                height={21}
                alt={'Иконка выхода'}
              />
              <span>Выход</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};