'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '../../components/logo/Logo';
import { ButtonLink } from '../../components/buttonLink/ButtonLink';
import { NavMenu } from '../../components/navMenu/NavMenu';
import { UserMenu } from '../../components/userMenu/UserMenu';
import { Searching } from '../../components/searching/Searching';
import styles from './Header.module.css';

export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const pathname = usePathname();

  const showSearching = {
    hidden: { opacity: 0 },
    visible: { opacity: open ? 1 : 0 },
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
              {open && <Searching />}
            </motion.div>
            <Image
              className={styles.searchIcon}
              src={'/search.svg'}
              width={19}
              height={19}
              alt={'Icon search'}
              onClick={() => setOpen((current) => !current)}
            />
          </div>

          <UserMenu pathname={pathname} />
        </div>
      </div>

      <div className={styles.burgerWrapper}>
        <ButtonLink pathname={pathname} path={'/cart'} iconPath={'/shopping-cart.svg'} isCount count={2} />
        <button className={styles.burgerMenu}>
          <Image
            onClick={() => setIsOpened(true)}
            src={'/burger-menu.svg'}
            width={20}
            height={20}
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

        {/* <div classNameName={styles.mobileMenuBottom}>mobile menu bottom</div> */}

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
              {/* <Icon name='icons:user' size='24px' /> */}
              Мой аккаунт
            </Link>
            <Link href='/favorites' className={styles.navMobile__link}>
              {/* <Icon name='icons:favorites' size='24px' /> */}
              Избранное
            </Link>
            <Link href='/cart' className={styles.navMobile__link}>
              {/* <Icon name='icons:exit' size='24px' /> */}
              Выход
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
};
