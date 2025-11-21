'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Logo } from '../../components/logo/Logo';
import { ButtonLink } from '../../components/buttonLink/ButtonLink';
import { NavMenu } from '../../components/navMenu/NavMenu';
import { UserMenu } from '../../components/userMenu/UserMenu';
import { Searching } from '../../components/searching/Searching';
import { useAuth } from '@/hooks/useAuth';
import styles from './Header.module.css';

export const Header = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const pathname = usePathname();
  const { clearToken, token } = useAuth();

  // useEffect(() => {
  //   console.log("Hello from useEffect");

  //   return () => console.log("componentWillUnmount");
  // }, []);

  const showSearching = {
    hidden: { opacity: 0 },
    visible: { opacity: visible ? 1 : 0 },
  };

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

  return (
    <header className={styles.header}>
      <Logo />

      <div className={styles.mainMenu}>
        <NavMenu pathname={pathname} />

        <div className={styles.userBlock}>
          <div className={styles.searchBox}>
            <motion.div
              className={styles.searching}
              initial={'hidden'}
              animate={'visible'}
              variants={showSearching}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {visible && <Searching />}
            </motion.div>
            <Image
              className={styles.searchIcon}
              src={'/search.svg'}
              width={21}
              height={21}
              alt={'Icon search'}
              onClick={() => setVisible((current) => !current)}
            />
          </div>

          <UserMenu pathname={pathname} />

          {token && (
            <button className={styles.exitBtn} onClick={clearToken}>
              <Image src={'/exit.svg'} width={21} height={21} alt={'Exit icon'} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.burgerWrapper}>
        <ButtonLink pathname={pathname} path={'/cart'} iconPath={'/shopping-cart.svg'} isCount count={2} />
        <button className={styles.burgerMenu}>
          <Image
            onClick={() => setIsOpened(true)}
            src={'/burger-menu.svg'}
            width={21}
            height={21}
            alt={'Burger to open menu on mobile'}
          />
        </button>
      </div>

      <motion.div
        initial={'closed'}
        variants={variants}
        animate={isOpened ? 'opened' : 'closed'}
        className={styles.mobileMenu}
      >
        <header className={styles.mobileHeader}>
          <Logo />

          <div className={styles.mobileHeaderRight}>
            <ButtonLink pathname={pathname} path={'/cart'} iconPath={'/shopping-cart.svg'} isCount count={2} />

            <button className={styles.closeMenu}>
              <Image
                onClick={() => setIsOpened(false)}
                src={'/close.svg'}
                width={20}
                height={20}
                alt={'Cross button to close menu on mobile'}
              />
            </button>
          </div>
        </header>

        <Searching />

        <div className={styles.navMobile__content}>
          <div className={styles.navMobile__menu}>
            <Link href='/' className={styles.navMobile__link}>
              Главная
            </Link>
            <Link href='/catalog' className={styles.navMobile__link}>
              Магазин
            </Link>
            <Link href='/about' className={styles.navMobile__link}>
              О нас
            </Link>
          </div>
          <div className={styles.navMobile__hr}></div>
          <div className={styles.navMobile__icons}>
            <Link href='/account' className={styles.navMobile__link}>
              <Image src={'/user.svg'} width={21} height={21} alt={'User account icon'} />
              Мой аккаунт
            </Link>
            <Link href='/favorites' className={styles.navMobile__link}>
              <Image src={'/heart.svg'} width={21} height={21} alt={'Favorite icon'} />
              Избранное
            </Link>
            {token && (
              <button className={styles.navMobile__exit} onClick={clearToken}>
                <Image src={'/exit.svg'} width={21} height={21} alt={'Exit icon'} />
                <span>Выход</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </header>
  );
};
